# Cloudflare Pages Deployment Guide

## Quick Deploy via Cloudflare Dashboard

1. **Go to Cloudflare Dashboard**
   - Visit https://dash.cloudflare.com
   - Navigate to **Pages** → **Create a project**

2. **Connect GitHub Repository**
   - Click **Connect to Git**
   - Select your GitHub account
   - Choose repository: `slalomprotocol/hackhatonbuenosaires2025`
   - Select branch: `main`

3. **Configure Build Settings**
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `npm run build && npm run pages:build`
   - **Build output directory**: `.vercel/output/static`
   - **Root directory**: `/` (leave as default)
   - **Node.js version**: 20

4. **Add Environment Variables**
   Go to **Settings** → **Environment variables** and add:
   
   ```
   APILLON_API_KEY=your_apillon_api_key
   APILLON_API_SECRET=your_apillon_api_secret
   NODE_ENV=production
   NEXT_PUBLIC_APP_NAME=SLALOM Protocol
   NEXT_PUBLIC_POLKADOT_ENDPOINT=wss://westend-rpc.polkadot.io
   NEXT_PUBLIC_HYPERLIQUID_API_URL=https://api.hyperliquid.xyz
   ```

5. **Deploy**
   - Click **Save and Deploy**
   - Wait for build to complete
   - Your app will be live at `https://your-project.pages.dev`

## Deploy via Wrangler CLI

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build for Cloudflare Pages
npm run build
npm run pages:build

# Deploy
wrangler pages deploy .vercel/output/static --project-name=slalom-protocol
```

## Custom Domain

1. Go to your project in Cloudflare Pages
2. Click **Custom domains**
3. Add your domain
4. Follow DNS setup instructions

## Environment Variables

Make sure to add all required environment variables in the Cloudflare Pages dashboard:
- Settings → Environment variables
- Add variables for Production, Preview, and Development environments

## Notes

- Cloudflare Pages supports Next.js through `@cloudflare/next-on-pages`
- API routes work with Cloudflare Workers
- Static assets are served from Cloudflare's CDN
- Automatic deployments on every push to `main` branch

