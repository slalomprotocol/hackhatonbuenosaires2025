# 🚀 SLALOM Protocol

**Cross-chain DeFi bridge connecting other blockchains with HyperLiquid**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Polkadot](https://img.shields.io/badge/Polkadot-Testnet-E6007A)](https://polkadot.network/)

---

## 🎯 Overview

SLALOM Protocol is a cross-chain DeFi bridge that connects HyperLiquid's high-performance erpetual trading user vaults with other blockhains. Built with a Disney-themed educational interface to make DeFi accessible to everyone, specially the casual traders. The goal is to make Defi as accesible like a videogame. 

**Key Features:**
- 🌉 Algoand (example) ↔ HyperLiquid Bridge
- 🐼 Disney-themed Educational UX
- 🎮 Auto Demo Mode (no wallet needed)
- 💰 Bonding Curve Vaults
- 🌎 Full English + Spanish Support

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm 10+

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

Create a `.env.local` file with:

```bash
# Required for production
APILLON_API_KEY=your_apillon_api_key
APILLON_API_SECRET=your_apillon_api_secret

# Application settings
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=SLALOM Protocol

# Public endpoints (defaults work)
NEXT_PUBLIC_POLKADOT_ENDPOINT=wss://westend-rpc.polkadot.io
NEXT_PUBLIC_HYPERLIQUID_API_URL=https://api.hyperliquid.xyz
```

**Get Apillon API keys:**
1. Sign up at [app.apillon.io](https://app.apillon.io)
2. Go to API Keys section
3. Create new API key
4. Copy API Key and API Secret to `.env.local`

---

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🌐 Deploy to Vercel

### Quick Deploy

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables from `.env.example`
5. Deploy!

### Environment Variables for Vercel

Add these in Vercel dashboard:

```
APILLON_API_KEY=your_actual_key
APILLON_API_SECRET=your_actual_secret
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_APP_NAME=SLALOM Protocol
NEXT_PUBLIC_POLKADOT_ENDPOINT=wss://westend-rpc.polkadot.io
NEXT_PUBLIC_HYPERLIQUID_API_URL=https://api.hyperliquid.xyz
```

---

## 🏗️ Technology Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS
- **Blockchain:** Polkadot.js, HyperLiquid SDK
- **Animations:** Framer Motion
- **Storage:** Apillon SDK (IPFS)

---

## 📁 Project Structure

```
slalom-protocol/
├── app/              # Next.js pages & routes
├── components/       # React components
├── lib/              # Core libraries & utilities
├── public/           # Static assets
├── styles/           # Global styles
├── package.json      # Dependencies
├── next.config.js    # Next.js configuration
├── tsconfig.json     # TypeScript configuration
└── .env.example      # Environment variables template
```

---

## 🎮 Features

### 1. Auto Demo Mode
- No wallet needed to try the app
- Activates automatically in 3 seconds
- Perfect for testing and demonstrations

### 2. Wallet Integration
- Supports Polkadot.js, Talisman, SubWallet
- Connect to Westend testnet
- Sign messages to deploy vaults

### 3. Educational Tutorial
- 8-chapter interactive guide
- Learn DeFi concepts through Disney metaphors
- Lawrence, the culinary chef, guides your journey

### 4. Cross-Chain Bridge
- Deploy HyperLiquid vaults from Polkadot wallet
- Immutable on-chain records
- Hyperbridge protocol integration

---

## 🛠️ Development

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open browser
# http://localhost:3000
```

### Building for Production

```bash
# Build
npm run build

# Test production build
npm run start
```

---

## 🔒 Security

- ⚠️ Never commit `.env.local` to version control
- ⚠️ Keep API keys secure
- ⚠️ Use different keys for dev/production
- ⚠️ Enable 2FA on all accounts

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file.

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📞 Support

- **GitHub Issues:** Report bugs or request features
- **Polkadot Discord:** Community support
- **Apillon Docs:** [wiki.apillon.io](https://wiki.apillon.io/)

---

## 🏆 Hyerliquid Sheraton Hotel Hackathon 2025

Built for Hyperliquid Hackathon in Buenos Aires, Argentina.

**Tracks:**
- HyperLiquid Buenos Aires Sheraton Hotel Hackhaton

---

**Made with 🐼 and passion for cross-chain DeFi innovation**
