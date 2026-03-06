# HMI Test Frontend - Copilot Instructions

## Project Overview
This is an empty Vite React project with TypeScript configured and ready for development.

## Tech Stack
- **Framework**: React 18+
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: CSS (Tailwind or other CSS framework can be added)

## Project Structure
```
src/
  ├── App.tsx           # Main App component
  ├── App.css           # App styles
  ├── main.tsx          # Entry point
  └── index.css         # Global styles
public/                 # Static assets
dist/                   # Production build output
```

## Getting Started

### Running the Development Server
Use the included task: `npm run dev`
The app will be available at `http://localhost:5173`

### Building for Production
Use the included task: `npm run build`
This outputs optimized files to the `dist/` directory.

## Available Commands
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks

## Development Guidelines
- Keep components in small, reusable modules
- Use TypeScript for type safety
- Follow ESLint configuration for code quality
- Update this file as the project evolves

## Next Steps
1. Install additional dependencies as needed:
   - UI Library: `npm install shadcn-ui` or `npm install material-ui`
   - Styling: `npm install tailwindcss postcss autoprefixer`
   - State Management: `npm install zustand` or `npm install redux`
   - HTTP Client: `npm install axios` or use native fetch

2. Create feature folders in `src/` based on your application requirements

3. Configure environment variables in `.env` files

4. Add linting and formatting tools (Prettier, Husky) if needed
