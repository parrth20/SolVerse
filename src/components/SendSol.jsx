"use client"

import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js"
import { useState } from "react"

export function SendSol() {
  const { connection } = useConnection()
  const wallet = useWallet()
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)

  async function sendToken() {
    if (!recipient || !amount || !wallet.publicKey) return

    try {
      setLoading(true)
      const parsedAmount = parseFloat(amount)
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        alert("Please enter a valid positive amount.")
        return
      }
      const lamports = parsedAmount * LAMPORTS_PER_SOL
      const transaction = new Transaction() //this is transaction created which has multiple instructions but here we are only sending one instruction

      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: recipient,
          lamports,
        }),
      )

      await wallet.sendTransaction(transaction, connection)
      alert("Transaction sent: " + parsedAmount + " SOL to " + recipient)
      // this is the function to send token
      setRecipient("")
      setAmount("")
    } catch (error) {
      console.error("Transaction failed:", error)
      alert("Transaction failed: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Send SOL</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          disabled={!wallet.publicKey || loading}
        />
        <input
          type="number"
          placeholder="Amount (SOL)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={!wallet.publicKey || loading}
        />
        <button onClick={sendToken} disabled={!wallet.publicKey || !recipient || !amount || loading}>
          {loading ? "Processing..." : "Send SOL"}
        </button>
      </div>
    </div>
  )
}
// This component allows users to send SOL (Solana tokens) to a specified recipient address. It uses the Solana wallet adapter and web3.js libraries to create and send a transaction. Users can input the recipient's address and the amount of SOL they wish to send. The component handles loading states and error messages for a better user experience.