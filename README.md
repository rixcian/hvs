# home-verifiability-score

The Home Verifiability Score (HVS) is a metric that measures how easily and efficiently a blockchain network can be verified by consumer hardware at home. A higher score indicates better accessibility and lower hardware requirements for running a full node.

## Overview

This project provides a comparison tool for evaluating different blockchain networks based on their hardware requirements for running full nodes. The HVS is calculated as a weighted average of key hardware components:

- RAM (30%)
- CPU (30%) 
- Storage (15%)
- Bandwidth (25%)

Each component is scored based on accessibility for typical home setups, considering both hardware purchase costs and ongoing maintenance costs.

## Data Sources

Overall all information are gathered from the official documentations of each blockchains. Storage data are collected from: https://chainstats.org.

## Development

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.