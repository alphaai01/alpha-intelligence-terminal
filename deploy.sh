#!/bin/bash
# =============================================
#  Alpha Intelligence Terminal - Deploy Script
#  Pushes code to GitHub & deploys to Azure
# =============================================

set -e

echo "========================================="
echo "  Alpha Intelligence Terminal - Deploy"
echo "========================================="
echo ""

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

# ---- STEP 1: Push to GitHub ----
echo "[1/4] Initializing Git repository..."

# Clean any stale git state
rm -f .git/index.lock 2>/dev/null

if [ ! -d ".git" ]; then
    git init
    git branch -M main
fi

# Ensure .env.local is not committed
if ! grep -q ".env.local" .gitignore 2>/dev/null; then
    echo ".env.local" >> .gitignore
fi

git add -A
git commit -m "Initial commit: Alpha Intelligence Terminal v1.0

Full-stack AI trading intelligence platform for OneAlpha AI
- Next.js 14 with App Router and TypeScript
- Landing page with hero, features, pricing, testimonials, FAQ
- Trading terminal: Market Pulse, Signal Engine, Portfolio, Risk Matrix
- Admin panel: signals, leads, content management
- API routes for leads, signals, contact forms
- Supabase integration ready with full database schema
- Tailwind CSS with dark theme (OneAlpha AI branding)
- SEO optimized with sitemap, robots.txt, Open Graph tags" 2>/dev/null || echo "Already committed"

git branch -M main

if ! git remote | grep -q origin; then
    git remote add origin https://github.com/alphaai01/alpha-intelligence-terminal.git
fi

echo "[2/4] Pushing to GitHub..."
git push -u origin main

echo "✅ Code pushed to GitHub!"
echo "   https://github.com/alphaai01/alpha-intelligence-terminal"
echo ""

# ---- STEP 2: Deploy to Azure ----
echo "[3/4] Checking Azure CLI..."

if ! command -v az &> /dev/null; then
    echo "⚠️  Azure CLI not found. Installing..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install azure-cli 2>/dev/null || {
            echo "Install Azure CLI: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
            echo "Then re-run this script."
            exit 1
        }
    else
        curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
    fi
fi

echo "Logging into Azure..."
az login 2>/dev/null || {
    echo "Please log into Azure in the browser window that opened."
    az login
}

# Create resource group if not exists
RESOURCE_GROUP="alphaai-rg"
LOCATION="centralindia"
APP_NAME="alpha-intelligence-terminal"

echo "[4/4] Deploying to Azure Static Web Apps..."

az group create --name "$RESOURCE_GROUP" --location "$LOCATION" 2>/dev/null || true

# Create Azure Static Web App connected to GitHub
az staticwebapp create \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --source "https://github.com/alphaai01/alpha-intelligence-terminal" \
    --location "$LOCATION" \
    --branch main \
    --app-location "/" \
    --output-location ".next" \
    --login-with-github 2>&1 || {

    echo ""
    echo "If Azure Static Web Apps failed, try Azure App Service instead:"
    echo ""
    echo "  az webapp up --name $APP_NAME --resource-group $RESOURCE_GROUP --runtime 'NODE:18-lts' --sku B1"
    echo ""
}

echo ""
echo "========================================="
echo "  Deployment Complete!"
echo "========================================="
echo ""
echo "  GitHub:  https://github.com/alphaai01/alpha-intelligence-terminal"
echo "  Azure:   https://$APP_NAME.azurestaticapps.net"
echo ""
echo "  Next steps:"
echo "  1. Add Supabase env vars in Azure portal"
echo "  2. Configure custom domain (onealphaai.com)"
echo "  3. Set up CI/CD (auto-deploys on push)"
echo ""
