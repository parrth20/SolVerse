"use client"

import { Airdrop } from "./Airdrop"
import { ShowBalance } from "./ShowBalance"
import { SendSol } from "./SendSol"
import { Sign } from "./Sign"
import { TokenLaunchpad } from "./TokenLaunchpad"

export function Dashboard({ activeSection }) {
  return (
    <div className="dashboard-container">
      {activeSection === "dashboard" && (
        <>
          <div className="card">
            <Airdrop />
          </div>

          <div className="card">
            <ShowBalance />
          </div>

          <div className="card">
            <SendSol />
          </div>

          <div className="card">
            <Sign />
          </div>
        </>
      )}

      {activeSection === "tokenLaunchpad" && (
        <div className="card">
          <TokenLaunchpad />
        </div>
      )}
    </div>
  )
}
// This component serves as a dashboard for various functionalities related to the Solana blockchain. It conditionally renders different components based on the active section passed as a prop. The components include Airdrop, ShowBalance, SendSol, Sign, and TokenLaunchpad, each encapsulated within a card layout for better organization and presentation. This modular approach allows for easy maintenance and scalability of the dashboard's features.