# Monie Fest — Coming Soon

Professional landing site for the Monie Fest event. This repository contains a Vite + React + TypeScript frontend built with TailwindCSS and a small component library.

## Overview

This project is a marketing and informational site for Monie Fest, featuring pages for Programme, Speakers, Highlights, Exhibitors and related content. Several sections are currently presented as "coming soon" placeholders while details are finalised.

## Key Features

- Fast development using Vite and React (TypeScript)
- TailwindCSS-based design system
- Reusable components and UI patterns
- Simple deploy script for GitHub Pages

## Tech stack

- Node.js (LTS recommended)
- Vite
- React 18
- TypeScript
- TailwindCSS

## Prerequisites

Install Node.js (v18+ recommended) and a package manager (`npm`, `pnpm` or `yarn`).

## Setup (local)

Install dependencies and run the dev server:

```powershell
# npm
npm install
npm run dev

# or pnpm
pnpm install
pnpm dev

# or yarn
yarn
yarn dev
```

Open the site at `http://localhost:5173` (Vite default) after running the dev server.

## Build & Preview

To create a production build:

```powershell
npm run build
# or
pnpm build
```

To locally preview a production build:

```powershell
npm run preview
# or
pnpm preview
```

There is also a branch-ready build for GitHub Pages:

```powershell
npm run build:gh
```

## Project Structure (high-level)

- `src/` — application source
  - `components/` — UI components
  - `pages/` — routed pages (Index, Programme, Speakers, Highlights)
  - `assets/` — images and static assets

## Deployment

This repository includes a script and GitHub workflow setup for deploying to GitHub Pages. The `build:gh` script sets the correct base path before building.

To deploy manually:

1. Build for production: `npm run build:gh`
2. Push the `dist/` output via your chosen deployment method (or use the included GH Actions workflow).

## Contributing

- Keep commits focused and use descriptive commit messages.
- Run the dev server locally to verify visual and functional changes.
- If adding assets, place them under `src/assets/` and update imports accordingly.

## Useful commands

```powershell
# show git status
git status

# stage and commit changes
git add .
git commit -m "chore: update site content and components"

# push to origin
git push
```


