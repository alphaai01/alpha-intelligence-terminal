#!/bin/bash
# Alpha Intelligence Terminal - Quick Start Script
# Run this script from the alpha-terminal-app directory

echo "========================================="
echo "  Alpha Intelligence Terminal - Setup"
echo "  OneAlpha AI (onealphaai.com)"
echo "========================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed."
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "ERROR: Node.js 18+ is required. Current: $(node -v)"
    exit 1
fi

echo "✓ Node.js $(node -v) detected"

# Install dependencies
if [ ! -d "node_modules" ]; then
    echo ""
    echo "Installing dependencies..."
    npm install
    echo "✓ Dependencies installed"
else
    echo "✓ Dependencies already installed"
fi

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo ""
    echo "Creating .env.local from template..."
    cp .env.example .env.local
    echo "✓ .env.local created"
    echo ""
    echo "NOTE: Edit .env.local to add your Supabase credentials."
    echo "The app will work without them (using mock data), but"
    echo "you'll need them for database features."
fi

echo ""
echo "Starting development server..."
echo ""
echo "========================================="
echo "  Landing page:  http://localhost:3000"
echo "  Terminal:       http://localhost:3000/terminal"
echo "  Admin panel:    http://localhost:3000/admin"
echo "  Pricing:        http://localhost:3000/pricing"
echo "  Contact:        http://localhost:3000/contact"
echo "========================================="
echo ""

npx next dev
