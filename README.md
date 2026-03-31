# Portfolio

A portfolio website showcasing projects, skills, and personal information.

## Features

- **Hero Section** - Introduction with animated WebGL shader.
- **About Me** - Professional background and personal information
- **Projects** - Showcase of work with filtering by tags
- **Skills** - Technical skills organized by category
- **Feedback** - System for collecting visitor feedback

## Backend

The backend provides API endpoints for managing projects, skills, and feedback. It uses serverless functions deployed on Netlify with MongoDB for data persistence.

## Tech Stack

**Frontend:**
- React with TypeScript
- Vite for fast development and builds
- Tailwind CSS for styling
- Three.js for 3D graphics

**Backend:**
- Netlify Functions (serverless)
- MongoDB with Mongoose
- TypeScript

**Shared:**
- fp-ts and io-ts for functional programming patterns
- Type-safe data validation and error handling

## Why This Stack

- **TypeScript** throughout for type safety and better developer experience
- **Functional programming** with fp-ts for predictable, composable code
- **Serverless backend** for reduced infrastructure management
- **Monorepo structure** for shared code and consistent tooling across frontend and backend
