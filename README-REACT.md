# Medical Crowdfunding Platform - React + Vite

This project has been successfully converted from Next.js to a React SPA (Single Page Application) using Vite.

## 🚀 Getting Started

### Install Dependencies
```bash
npm install --legacy-peer-deps
```

### Run Development Server
```bash
npm run dev
```
The app will be available at [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
medical-crowdfunding/
├── public/               # Static assets (images, etc.)
├── src/
│   ├── components/       # Reusable UI components
│   │   └── ui/          # shadcn/ui components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components (routes)
│   ├── App.tsx          # Main app component with routing
│   ├── main.tsx         # App entry point
│   └── index.css        # Global styles
├── index.html           # HTML entry point
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## 🔄 Migration Changes

### What Changed:

1. **Build Tool**: Migrated from Next.js to Vite
2. **Routing**: Replaced Next.js App Router with React Router v6
3. **Links**: Changed from `next/link` to `react-router-dom` Link component
4. **File Structure**: Moved from `app/` directory to `src/` with `pages/` for routes
5. **Dependencies**: Removed Next.js specific packages, added Vite and React Router

### Key Differences:

- **Links**: Use `<Link to="/path">` instead of `<Link href="/path">`
- **Dynamic Routes**: Use `useParams()` hook instead of Next.js params
- **No Server-Side Rendering**: This is now a client-side SPA
- **Images**: Use standard `<img>` tags instead of Next.js `<Image>`

## 🎨 Features

- ✅ Medical crowdfunding campaigns
- ✅ Modern UI with Tailwind CSS and shadcn/ui
- ✅ Responsive design
- ✅ Campaign browsing and filtering
- ✅ Donor and Admin dashboards
- ✅ User authentication pages

## 📝 Development Notes

- The app uses Vite for fast hot module replacement (HMR)
- Path aliases are configured (`@/` maps to `src/`)
- All page components are in `src/pages/`
- Shared components are in `src/components/`

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **Lucide React** - Icons

## 📦 Next Steps

To complete the full conversion of all pages from the original Next.js app:

1. Copy content from `app/` folder pages into corresponding `src/pages/` files
2. Replace all `next/link` imports with `react-router-dom`
3. Update any server-side specific code to client-side alternatives
4. Test all routes and functionality

## 🤝 Contributing

When adding new pages:
1. Create a new file in `src/pages/` (e.g., `AboutPage.tsx`)
2. Add the route in `src/App.tsx`
3. Use `Link` from `react-router-dom` for navigation

---

Happy coding! 🎉
