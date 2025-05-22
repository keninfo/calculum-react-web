# HODL Protocol React Web – Project Overview

This document provides a consolidated view of the code base. It includes the folder layout, notable strengths, known issues and a list of improvement tasks that can be turned into tickets.

## 1. Folder Structure

```
src/
├── app/                 # Next.js routes and views
│   ├── api/             # REST endpoints
│   └── (trade)/         # Protected trading screens
├── components/          # Reusable UI pieces
├── config/              # Wagmi and Viem clients
├── contexts/            # React contexts
├── contracts/           # ABIs for smart contracts
├── hooks/               # Custom React hooks
├── lib/                 # TradingView datafeed
├── services/            # Third‑party providers (RainbowKit, Bandit)
├── shared/              # Constants and types
├── store/               # Zustand slices
├── styles/              # Tailwind themes
└── utils/               # Utility helpers
```

Static assets live under `public/`.

## 2. Strengths

- **TypeScript and Next.js** with strict settings.
- **Modular design**: clear separation of hooks, services and components.
- **Tailwind themes** generated programmatically for easy theming.
- **Blockchain integrations** with wagmi and custom hooks.
- **Env vars** centralised with an `.env.example` template.

## 3. Weaknesses

- Documentation is still incomplete.
- API keys and secrets appear in client code (needs hardening).
- No automated tests.
- Some large ABIs increase bundle size.
- Parts of the code use `any` types.

## 4. Suggested Improvements

1. **Update documentation** in this `docs/` folder for each major component.
2. **Introduce tests** (Jest or similar) for hooks and utils.
3. **Move secrets** to server‑only environment variables.
4. **Refactor complex components** such as `TradeBox` using a reducer or state machine.
5. **Remove unused files and comments** to reduce noise.
6. **Optimise ABIs** so only required functions are included.
7. **Improve type safety** and remove `any` usages.
8. **Add a service layer** for the API and database calls.
9. **Set up CI/CD** to run lint and tests automatically.
10. **Audit dependencies** and scripts for unused packages.

This list can serve as a roadmap for future sprints.
