# YouVersion Developer Hub
## Overview

This project contains two main applications:
- **Main Platform Portal** - A React-based platform for YouVersion developers
- **API Documentation** - A Zudoku-based documentation site for API reference

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

Install dependencies for both projects with a single command:

```bash
npm install
```

This will automatically install dependencies for both the main platform and the API documentation site.

### Development

Start both development servers simultaneously:

```bash
npm run dev
```

This will start:
- **Main Platform**: http://localhost:8080/
- **API Documentation**: http://localhost:3000/

## Available Scripts

### Installation Scripts
- `npm install` - Install dependencies for both projects (main + devdocs)
- `npm run install:all` - Alternative install method using `npm install` instead of `npm ci`

### Development Scripts
- `npm run dev` - Start both servers simultaneously (default)
- `npm run dev:main` - Start only the main platform server
- `npm run dev:devdocs` - Start only the API documentation server
- `npm run dev:all` - Alternative way to start both servers

### Build Scripts
- `npm run build` - Build the main platform
- `npm run build:dev` - Build the main platform in development mode
- `npm run build:all` - Build both projects
- `npm run build:devdocs` - Build only the API documentation

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

- Both projects use `--legacy-peer-deps` flag for compatibility
- The main platform runs on port 8080 by default
- The API documentation runs on port 3000 by default
- Both servers can be started individually if needed
