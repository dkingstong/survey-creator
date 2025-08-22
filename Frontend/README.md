# React Template

A modern React application template built with TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- ⚡ **Vite** - Lightning fast build tool
- ⚛️ **React 18** - Latest React with concurrent features
- 🔷 **TypeScript** - Type-safe development
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **shadcn/ui** - Beautiful, accessible components
- 📱 **Responsive Design** - Mobile-first approach
- 🌙 **Dark Mode Ready** - Built-in dark mode support
- 🔧 **ESLint** - Code quality and consistency

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   └── ui/           # shadcn/ui components
├── lib/
│   └── utils.ts      # Utility functions
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
└── index.css         # Global styles
```

## Adding shadcn/ui Components

To add more shadcn/ui components:

1. Visit [shadcn/ui](https://ui.shadcn.com/)
2. Copy the component code
3. Paste it into `src/components/ui/`
4. Import and use in your components

## Customization

### Styling
- Modify `src/index.css` for global styles
- Update `tailwind.config.js` for theme customization
- Use Tailwind classes directly in components

### Components
- Add new components in `src/components/`
- Follow the existing pattern for TypeScript interfaces
- Use the `cn` utility for conditional classes

## Deployment

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## License

MIT
