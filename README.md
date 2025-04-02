# solVerse - Liquid Staking on Solana

## Overview

solVerse is a liquid staking solution on the Solana blockchain. With solVerse, users can stake their SOL and receive a liquid staking token in return. These tokens represent your staked SOL along with any accumulated rewards and can be redeemed for an equivalent amount of SOL at any time. solVerse allows you to enjoy staking rewards without locking up your SOL, giving you flexibility to use your assets in DeFi applications and other Solana-based projects.

## How It Works

- **Staking SOL:**  
  When you stake SOL through solVerse, you receive liquid staking tokens in exchange. The amount you receive is determined by the current exchange rate, which reflects both the staked SOL value and accrued rewards.

- **Unstaking:**  
  You can convert your staking tokens back to SOL at any time. The redemption value is based on the current rate, which factors in the staking rewards earned during the staking period.

- **Liquid Staking Benefits:**  
  - **Liquidity:** Trade or use your staking tokens in various DeFi platforms without waiting for a lock-up period.  
  - **Flexibility:** Use your liquid staking tokens to participate in lending, swapping, or providing liquidity, all while still earning staking rewards.  
  - **Continuous Rewards:** Even while using your tokens in other protocols, your underlying staked SOL continues to earn rewards.

> **Note:** solVerse offers similar benefits to other well-known liquid staking protocols on Solana, enabling both security and flexibility.

## How to Use

1. **Connect Your Solana Wallet:**  
   Ensure your wallet is connected to the Devnet (or Mainnet once supported).

2. **Stake SOL:**  
   Input the amount of SOL you wish to stake. You will receive liquid staking tokens based on the current exchange rate.

3. **Unstake:**  
   When you decide to retrieve your SOL, simply redeem your staking tokens. You will receive SOL according to the prevailing exchange rate.

4. **Participate in DeFi:**  
   Use your staking tokens in DeFi applications to earn additional rewards while your SOL remains staked.

## Installation

### Frontend Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/psg-19/Liquid_State_Token_Exchange.git
   cd Liquid_State_Token_Exchange

2. **Install Frontend Dependencies:**

   ```bash
   cd frontend
   npm install --force

3. **Create a .env File in the Frontend Root Directory and Add:**

   ```bash
    VITE_API_KEY=http://localhost:3000

4. **Start the Frontend:**

   ```bash
     npm run dev


- ##Technologies Used

  -**Solana:** Blockchain for staking SOL.
  -**Helius Webhook:** Monitors wallet transactions of the staking authority to provide real-time blockchain data.
  -**@solana/web3.js:** SDK for interacting with the Solana blockchain.
  -**@solana/spl-token:** Manages SPL tokens, including the liquid staking token.
  -**Tailwind CSS:** Provides responsive and modern UI styling.

  













