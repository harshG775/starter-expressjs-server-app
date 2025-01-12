#!/bin/bash

set -e  # Exit on any error

# Pull latest changes
echo "Pulling latest changes from dev branch..."
if ! git pull origin dev; then
  echo "Error: Failed to pull changes from dev. Please resolve conflicts or ensure the branch exists."
  exit 1
fi

# Add build artifacts
echo "Staging changes..."
git add -f dist package.json vercel.json deploy.sh

# Commit changes
echo "Committing changes..."
git commit -m "Build and deploy artifacts to staging"

# Push changes
echo "Pushing to dev branch..."
if ! git push origin dev; then
  echo "Error: Failed to push changes. Please check your network or repository access."
  exit 1
fi

# Trigger deploy hook
echo "Triggering deployment to staging..."
if ! curl -X POST https://api.vercel.com/v1/integrations/deploy/hooks/<staging-hook-id>; then
  echo "Error: Failed to trigger deploy hook."
  exit 1
fi

# Switch back to dev
echo "Switching back to dev branch..."
git switch dev

echo "Deployment complete!"
