"use client"

//along with interacting with web3 server blockchain most webiste also interact with a web2 server which stores some information
// the question is how does it ensures who is asking to web2 server indeed owns this public key it's majorly about security its done by
// only person owning that public key can get data of that public key stored in web2 server

/// this is done by signing the transaction

// so basicallly siginig message is important for security when we are tallking to web2 server

import { useWallet } from "@solana/wallet-adapter-react"
import { ed25519 } from "@noble/curves/ed25519"
import bs58 from "bs58"
import { useState } from "react"

export function Sign() {
  const { publicKey, signMessage } = useWallet()
  const [message, setMessage] = useState("")
  const [signature, setSignature] = useState("")
  const [loading, setLoading] = useState(false)

  async function signMessageHandler() {
    if (!message || !publicKey || !signMessage) return

    try {
      setLoading(true)
      const encodedMessage = new TextEncoder().encode(message)
      //this convert message into array of bytes uint8array
      const signature = await signMessage(encodedMessage)
      // this is the function to sign message only 2 steps first encode the message and then sign it

      if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
        throw new Error("Signature is not valid")
      }
      // this is the function to verify message

      const encodedSignature = bs58.encode(signature)
      setSignature(encodedSignature)
      console.log("Message Signature:", encodedSignature)
    } catch (error) {
      console.error("Signing failed:", error)
      alert("Signing failed: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Sign Message</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter message to sign"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!publicKey || loading}
        />
        <button onClick={signMessageHandler} disabled={!publicKey || !message || loading}>
          {loading ? "Signing..." : "Sign Message"}
        </button>
      </div>

      {signature && (
        <div className="signature-result">
          <h3>Signature:</h3>
          <div className="signature-box">
            {signature.substring(0, 20)}...{signature.substring(signature.length - 20)}
          </div>
        </div>
      )}
    </div>
  )
}

// this made to verify the ownership of user in web2 backend

