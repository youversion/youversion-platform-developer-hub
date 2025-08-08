# YouVersion Developer Hub
## Overview

This project contains three applications:
- **Main Platform Portal** - A React-based platform for YouVersion developers
- **API Documentation** - A Zudoku-based documentation site for API reference
- **Bible Directory** - A Next.js app for browsing and filtering Bible versions

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

Install dependencies for all three projects with a single command:

```bash
npm install
```

This will automatically install dependencies for the main platform, the API documentation site, and the Bible Directory.

### Development

Start all development servers simultaneously:

```bash
npm run dev
```

This will start:
- **Main Platform**: http://localhost:8080/
- **API Documentation**: http://localhost:3000/
- **Bible Directory**: http://localhost:3001/

## Available Scripts

### Installation Scripts
- `npm install` - Install dependencies for the root and subprojects (platform, devdocs, bibles)
- `npm run install:all` - Explicitly installs at root, then `devdocs`, then `bibles` (with `--legacy-peer-deps`)

### Development Scripts
- `npm run dev` - Start all servers simultaneously (default)
- `npm run dev:main` - Start only the main platform server
- `npm run dev:devdocs` - Start only the API documentation server
- `npm run dev:bibles` - Start only the Bible Directory server
- `npm run dev:all` - Alternative way to start all servers

### Build Scripts
- `npm run build` - Build the main platform (Platform)
- `npm run build:dev` - Build the main platform in development mode
- `npm run build:devdocs` - Build only the API documentation (Devdocs)
- `npm run build:bibles` - Build only the Bible Directory (Bibles)
- `npm run build:all` - Build all three sites (Platform + Devdocs + Bibles)
- `NODE_ENV=production npm run build` - Build the main platform for production

### Other Scripts
- `npm run lint` - Run ESLint on the main project
- `npm run preview` - Preview the built main platform

## Project Structure

```
youversion-platform-developer-hub/
├── src/                    # Main platform source code
├── devdocs/               # API documentation site
│   ├── pages/            # Documentation pages
│   ├── apis/             # OpenAPI specifications
│   └── zudoku.config.tsx # Zudoku configuration
├── bibles/                # Bible Directory Next.js app
├── public/               # Static assets
└── package.json          # Root package.json with combined scripts
```

## Development Workflow

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Start development servers**: `npm run dev`
4. **Access applications**:
   - Main platform: http://localhost:8080/
   - API docs: http://localhost:3000/
   - Bible Directory: http://localhost:3001/

## Technology Stack

### Main Platform
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Radix UI components
- React Router

### API Documentation
- Zudoku (v0.53.1)
- React 19
- TypeScript
- OpenAPI/Swagger support

## Notes

- All projects use `--legacy-peer-deps` flag for compatibility where required
- The main platform runs on port 8080 by default
- The API documentation runs on port 3000 by default
- The Bible Directory runs on port 3001 by default
- Each server can be started individually if needed
