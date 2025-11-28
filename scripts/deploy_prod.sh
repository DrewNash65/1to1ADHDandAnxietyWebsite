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

# If NEW_ARTICLE_URL is provided (and MAILCHIMP_TRIGGER_SECRET set), trigger Mailchimp send
# Usage example:
#   NEW_ARTICLE_URL="https://adhd.1to1pediatrics.com/blog/articles/five-signs-of-adhd-blog.html" \
#   NEW_ARTICLE_TITLE="Five Signs Your Child May Have ADHD" \
#   NEW_ARTICLE_PREVIEW="Five signs that your child may have ADHD..." \
#   MAILCHIMP_TRIGGER_SECRET="$MAILCHIMP_TRIGGER_SECRET" ./scripts/deploy_prod.sh
if [ -n "${NEW_ARTICLE_URL:-}" ]; then
  if [ -z "${MAILCHIMP_TRIGGER_SECRET:-}" ]; then
    echo "MAILCHIMP_TRIGGER_SECRET not set locally; skipping Mailchimp trigger"
  else
    echo "Triggering Mailchimp campaign for: ${NEW_ARTICLE_URL}"
    curl -sS -X POST "https://adhd.1to1pediatrics.com/api/send-mailchimp-campaign" \
      -H "Content-Type: application/json" \
      -H "x-mailchimp-trigger: ${MAILCHIMP_TRIGGER_SECRET}" \
      -d "{ \"title\": \"${NEW_ARTICLE_TITLE:-New Blog Post}\", \"url\": \"${NEW_ARTICLE_URL}\", \"preview\": \"${NEW_ARTICLE_PREVIEW:-}\" }" || echo "Warning: Mailchimp trigger failed"
  fi
else
  echo "NEW_ARTICLE_URL not provided; skipping Mailchimp trigger"
fi
