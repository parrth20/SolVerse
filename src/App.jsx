"use client"

import { useState } from "react"
import "./App.css"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui"

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css"
import { Dashboard } from "./components/Dashboard"
import { Interface3D } from "./components/Interface3D"
import { Buffer } from "buffer";
if (typeof window !== "undefined") {
  window.Buffer = Buffer;
}

function App() {
  const [activeSection, setActiveSection] = useState("dashboard")

  return (
    <div className="app-container">
      <div className="header">
        <h1 className="title">SolanaVerse</h1>
        <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <div className="wallet-buttons">
                <WalletMultiButton />
                <WalletDisconnectButton />
              </div>
              <div className="navigation">
                <button
                  className={activeSection === "dashboard" ? "active" : ""}
                  onClick={() => setActiveSection("dashboard")}
                >
                  Dashboard
                </button>
                <button
                  className={activeSection === "tokenLaunchpad" ? "active" : ""}
                  onClick={() => setActiveSection("tokenLaunchpad")}
                >
                  Token Launchpad
                </button>
              </div>
              <div className="content-container">
                <div className="canvas-container">
                  <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    <Interface3D activeSection={activeSection} setActiveSection={setActiveSection} />
                    <OrbitControls enableZoom={false} />
                    <Environment preset="city" />
                  </Canvas>
                </div>
                <Dashboard activeSection={activeSection} />
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </div>
    </div>
  )
}

export default App

