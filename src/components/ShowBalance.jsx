"use client"

import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useState, useEffect } from "react"

export function ShowBalance() {
  const { connection } = useConnection()
  const wallet = useWallet()
  const [balance, setBalance] = useState(null)
  const [loading, setLoading] = useState(false)

  async function getUserBalance() {
    if (!wallet.publicKey) return

    try {
      setLoading(true)
      const balance = await connection.getBalance(wallet.publicKey)
      // this is the function to get user balance
      console.log("User Balance: ", balance)
      setBalance(balance / LAMPORTS_PER_SOL)
    } catch (error) {
      console.error("Failed to get balance:", error)
      alert("Failed to get balance: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (wallet.publicKey) {
      getUserBalance()
    } else {
      setBalance(null)
    }
  }, [wallet.publicKey])

  return (
    <div>
      <h2>Wallet Balance</h2>
      {balance !== null ? (
        <div className="balance-display">
          Your balance: <span className="balance-value">{balance}</span> SOL
        </div>
      ) : (
        <div className="balance-display">
          {wallet.publicKey ? "Loading balance..." : "Connect wallet to view balance"}
        </div>
      )}
      <button onClick={getUserBalance} disabled={!wallet.publicKey || loading}>
        {loading ? "Loading..." : "Refresh Balance"}
      </button>
    </div>
  )
}

