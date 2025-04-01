"use client"

import { Keypair, SystemProgram, Transaction } from "@solana/web3.js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import {
  TOKEN_2022_PROGRAM_ID,
  createMintToInstruction,
  createAssociatedTokenAccountInstruction,
  getMintLen,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  TYPE_SIZE,
  LENGTH_SIZE,
  ExtensionType,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token"
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata"
import { useState } from "react"

export function TokenLaunchpad() {
  const { connection } = useConnection()
  const wallet = useWallet()
  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [tokenImageUrl, setTokenImageUrl] = useState("")
  const [initialSupply, setInitialSupply] = useState("")
  const [loading, setLoading] = useState(false)
  const [mintAddress, setMintAddress] = useState("")

  async function createToken() {
    if (!tokenName || !tokenSymbol || !tokenImageUrl || !initialSupply || !wallet.publicKey) return

    try {
      setLoading(true)
      const mintKeypair = Keypair.generate()
      const metadata = {
        mint: mintKeypair.publicKey,
        name: tokenName,
        symbol: tokenSymbol,
        uri: tokenImageUrl,
        additionalMetadata: [],
      }

      const mintLen = getMintLen([ExtensionType.MetadataPointer])
      const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length

      const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen)

      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: mintLen,
          lamports,
          programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeMetadataPointerInstruction(
          mintKeypair.publicKey,
          wallet.publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID,
        ),
        createInitializeMintInstruction(mintKeypair.publicKey, 9, wallet.publicKey, null, TOKEN_2022_PROGRAM_ID),
        createInitializeInstruction({
          programId: TOKEN_2022_PROGRAM_ID,
          mint: mintKeypair.publicKey,
          metadata: mintKeypair.publicKey,
          name: metadata.name,
          symbol: metadata.symbol,
          uri: metadata.uri,
          mintAuthority: wallet.publicKey,
          updateAuthority: wallet.publicKey,
        }),
      )

      transaction.feePayer = wallet.publicKey
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
      transaction.partialSign(mintKeypair)

      await wallet.sendTransaction(transaction, connection)

      console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`)
      setMintAddress(mintKeypair.publicKey.toBase58())

      const associatedToken = getAssociatedTokenAddressSync(
        mintKeypair.publicKey,
        wallet.publicKey,
        false,
        TOKEN_2022_PROGRAM_ID,
      )

      console.log(associatedToken.toBase58())

      const transaction2 = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          associatedToken,
          wallet.publicKey,
          mintKeypair.publicKey,
          TOKEN_2022_PROGRAM_ID,
        ),
      )

      await wallet.sendTransaction(transaction2, connection)

      const transaction3 = new Transaction().add(
        createMintToInstruction(
          mintKeypair.publicKey,
          associatedToken,
          wallet.publicKey,
          Number(initialSupply) * 10 ** 9,
          [],
          TOKEN_2022_PROGRAM_ID,
        ),
      )

      await wallet.sendTransaction(transaction3, connection)

      console.log("Minted!")
      alert(`Token created successfully! Mint address: ${mintKeypair.publicKey.toBase58()}`)

      // Reset form
      setTokenName("")
      setTokenSymbol("")
      setTokenImageUrl("")
      setInitialSupply("")
    } catch (error) {
      console.error("Token creation failed:", error)
      alert("Token creation failed: " + error.message)
    } finally {
      setLoading(false)
    }
  }
  //this we can create our own custom driven token from here

  return (
    <div>
      <h2>Solana Token Launchpad</h2>
      <div className="token-form">
        <input
          type="text"
          placeholder="Token Name"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          disabled={!wallet.publicKey || loading}
        />
        <input
          type="text"
          placeholder="Token Symbol"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
          disabled={!wallet.publicKey || loading}
        />
        <input
          type="text"
          placeholder="Token Image URL"
          value={tokenImageUrl}
          onChange={(e) => setTokenImageUrl(e.target.value)}
          disabled={!wallet.publicKey || loading}
        />
        <input
          type="number"
          placeholder="Initial Supply"
          value={initialSupply}
          onChange={(e) => setInitialSupply(e.target.value)}
          disabled={!wallet.publicKey || loading}
        />
        <button
          onClick={createToken}
          disabled={!wallet.publicKey || !tokenName || !tokenSymbol || !tokenImageUrl || !initialSupply || loading}
        >
          {loading ? "Creating Token..." : "Create Token"}
        </button>
      </div>

      {mintAddress && (
        <div className="mint-result">
          <h3>Token Created!</h3>
          <p>
            Mint Address: <span className="mint-address">{mintAddress}</span>
          </p>
        </div>
      )}
    </div>
  )
}

