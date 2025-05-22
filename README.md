# HODL Protocol React Web

This project is a **Next.js** + **TypeScript** application that powers the front-end for the **HODL Protocol** ecosystem. It integrates blockchain contracts, wallet connections and a custom charting experience.

## Getting Started

1. Install dependencies and generate CSS variables (themes):
   ```bash
   npm install
   npm run css-vars
   ```
2. Copy `.env.example` to `.env` and fill in all required keys.
3. Run the development server:
   ```bash
   npm run dev
   ```
   Then open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Configuration values are loaded from environment variables. See `.env.example` for all options, including database credentials, API tokens and Web3 keys.

## Project Structure

```
src/
├── app/               # Next.js routes and pages
├── components/        # Reusable React components
├── config/            # viem/wagmi clients
├── contexts/          # React contexts (CoinsContext)
├── contracts/         # Smart contract ABIs and addresses
├── hooks/             # Custom hooks for contract interaction
├── lib/               # Custom data feed for TradingView
├── services/          # Providers such as RainbowKit & Bandit
├── shared/            # Shared constants
├── store/             # Zustand stores
├── styles/            # Tailwind themes and globals
└── utils/             # Utility helpers
```

### Components Overview

| Component | Description |
|-----------|-------------|
| **AppProviders** | Wraps the app with context providers (Redux, RainbowKit, etc.) |
| **Bandit** | Displays quests and leaderboards powered by the Bandit SDK |
| **Bearam** | Dashboard page for Momentum strategy charts |
| **ChartOptions** | Small controls to switch chart ranges and windows |
| **ChartsContainer** | Renders charts such as Return on Capital and Rolling Volatility |
| **Disclaimer** | Banner with disclaimers about risks |
| **Footer** | Global footer with links |
| **Help** | Help dialog and documentation links |
| **Home** | Landing page layout |
| **InitialPopup** | Introductory modal shown on first visit |
| **MarketTransactions** | Shows recent blockchain transactions |
| **Navbar** | Main navigation bar and wallet connect button |
| **Positions** | Displays open trading positions |
| **ProductMetrics** | Presents metrics like performance and volatility |
| **StrategyInfoTitle** | Header with summary information about current strategy |
| **StrategyOptions** | Selector for strategies/coins |
| **TVChartContainer** | Wrapper around the TradingView chart widget |
| **TVNews** | News feed panel |
| **TVTicker** | Animated ticker with market data |
| **TradeBox** | Handles deposits and withdrawals into the strategies |
| **Transactions** | History of user transactions |
| **MaintenanceDialog** | Dialog shown when contracts are under maintenance |
| **UserPositions** | Components and hooks for fetching user balances |

Small reusable pieces live in `components/common` (buttons, modals, alerts, etc.).

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Type check and lint the project
- `npm run css-vars` – Generate color themes used by Tailwind

## Documentation Roadmap

Additional documentation lives in the [`docs/`](docs/PROJECT_OVERVIEW.md) folder. The following tasks describe how we plan to expand it:

- Add more details for each component (props and examples).
- Include diagrams of the data flow between hooks, stores and components.
- Document the API routes in `src/app/api` and their expected parameters.
- Create onboarding notes for setting up the database and environment.
- Provide a contribution guide describing coding standards and how to run tests.

## Improvement Plan

The repository analysis identified several areas to address:

1. Centralise API base URLs and remove hard-coded `/v1` paths.
2. Add a gas buffer or `estimateGas` fallback for transactions.
3. Move secrets out of the client bundle and into server-only environment variables.
4. Refactor `TradeBox` into a reducer or state machine for maintainability.
5. Remove unused code and enforce type safety across hooks and utilities.
6. Introduce automated tests and a CI pipeline to run lint and tests.
7. Optimise large ABIs and adopt a service layer for API/database access.

