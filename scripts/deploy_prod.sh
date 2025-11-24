#!/usr/bin/env bash
set -euo pipefail

# Deploy the current repo to Vercel production.
# Requirements:
# - Vercel CLI installed (`npm i -g vercel`) and authenticated OR set VERCEL_TOKEN env var
# - This repo contains a `.vercelignore` to exclude `Partners/` from production deploys
# Usage:
#   VERCEL_TOKEN=your_token ./scripts/deploy_prod.sh

echo "Preparing to deploy to Vercel (production)..."

if ! command -v vercel >/dev/null 2>&1; then
  echo "Error: vercel CLI not found. Install it with: npm i -g vercel"
  exit 2
fi

# Deploy current working directory to production (will respect .vercelignore)
# Regenerate RSS feed before deploy so Mailchimp RSS campaigns see latest content
if command -v python3 >/dev/null 2>&1; then
  if [ -f "scripts/generate_rss.py" ]; then
    echo "Generating RSS feed..."
    python3 scripts/generate_rss.py || echo "Warning: RSS generator failed (continuing to deploy)"
  else
    echo "No RSS generator found at scripts/generate_rss.py (skipping)"
  fi
else
  echo "python3 not found; skipping RSS generation"
fi

# Use --yes to confirm non-interactively
vercel --prod --yes

echo "Deployment command sent to Vercel. Check your Vercel dashboard or CLI output for status."
