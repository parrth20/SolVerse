"use client"

import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useState } from "react"

// const connection = new Connection("https://api.devnet.solana.com");
// this is the connection to devnet solana blockchain

export function Airdrop() {
  const wallet = useWallet()
  const { connection } = useConnection()
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)

  async function sentAirdrop() {
    if (!amount || !wallet.publicKey) return

    try {
      setLoading(true)
      // Convert the input amount to a number for safety
      const parsedAmount = parseFloat(amount)
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        alert("Please enter a valid positive amount.")
        return
      }
      // Request the airdrop
      await connection.requestAirdrop(wallet.publicKey, parsedAmount * LAMPORTS_PER_SOL)
      alert("Airdrop sent")
      // this is the function to send airdrop
      setAmount("")
    } catch (error) {
      console.error("Airdrop failed:", error)
      alert("Airdrop failed: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Solana Airdrop</h2>
      <div className="input-group">
        <input
          type="number"
          placeholder="Enter amount of Solana"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={!wallet.publicKey || loading}
        />
        <button onClick={sentAirdrop} disabled={!wallet.publicKey || !amount || loading}>
          {loading ? "Processing..." : "Request Airdrop"}
        </button>
      </div>
    </div>
  )
}
// This component allows users to request an airdrop of Solana tokens. It uses the Solana wallet adapter and web3.js libraries to interact with the Solana blockchain. The user can input the amount of Solana they want to request, and upon clicking the button, an airdrop request is sent to their wallet address. The component handles loading states and error messages for a better user experience.