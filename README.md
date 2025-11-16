# RoamSteady

A modern car rental reservation platform built with React, TypeScript, and Supabase.

## Features

- Browse multiple rental plans (Standard, Unlimited, Premium)
- User authentication and authorization
- Real-time reservation management
- Integration with Supabase backend
- Responsive design with Tailwind CSS
- Modern UI components with shadcn/ui

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v6
- **Form Handling**: React Hook Form with Zod validation

## Prerequisites

- Node.js 18+ (or use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm or bun package manager
- Supabase account and project

## Getting Started

### 1. Clone the repository

```sh
git clone <YOUR_GIT_URL>
cd roamsteady-main
```

### 2. Install dependencies

```sh
npm install
# or
bun install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

### 4. Run the development server

```sh
npm run dev
```

The app will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## Deployment

### GitHub Pages

1. Update the repository field in `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/roamsteady-main"
   ```

2. Deploy to GitHub Pages:
   ```sh
   npm run deploy
   ```

### Using GitHub Actions (Recommended)

The project includes automated deployment via GitHub Actions. Push to the `main` branch to trigger automatic deployment.

## Project Structure

```
roamsteady-main/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── integrations/   # External service integrations (Supabase)
│   ├── lib/            # Utility functions
│   └── assets/         # Static assets
├── supabase/           # Supabase migrations and functions
└── public/             # Public static files
```

## Supabase Setup

This project uses Supabase for backend services. Make sure to:

1. Create a Supabase project
2. Run the migrations in the `supabase/migrations` folder
3. Configure your environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT
