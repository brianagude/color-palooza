# R3F Starter

An **opinionated** React Three Fiber starter template built on Next.js. This is a learning project that will evolve as I explore new R3F patterns and techniques.

> ⚠️ **Note**: This starter reflects my current understanding and preferences. As I learn new things in React Three Fiber, the structure, patterns, and choices here will be updated accordingly.

## What's This?

A 3D web application starter that combines Next.js with React Three Fiber for building interactive 3D experiences. The setup includes physics simulation, lighting controls, performance monitoring, and debugging tools.

## Tech Stack

### Core

- **Next.js 16** (App Router)
- **React Three Fiber** - React renderer for Three.js
- **React Three Rapier** - Physics engine wrapper
- **Drei** - Helpful R3F utilities
- **Three.js** - 3D library

### Development Tools

- **Leva** - Interactive GUI controls for debugging
- **r3f-perf** - Performance monitor overlay
- **Biome** - Fast formatter/linter
- **Zustand** - State management (available but not currently used)

### Styling

- **Tailwind CSS v4** - Utility-first CSS
- **TypeScript** - Type safety (with JSX support)

## Scripts

```bash
pnpm dev      # Development server
pnpm build    # Production build
pnpm start    # Production server
pnpm lint     # Lint with Biome
pnpm format   # Format with Biome
```

## Dependencies

See `package.json` for full dependency list. Key packages:

- `@react-three/fiber` - React renderer for Three.js
- `@react-three/rapier` - Physics simulation
- `@react-three/drei` - R3F utilities and helpers
- `leva` - GUI controls for runtime tweaking
- `r3f-perf` - Performance monitoring
- `three` - Three.js core library

## Key Concepts

This starter uses common R3F patterns:

- React components for Three.js objects
- `useFrame` for animations
- Physics via Rapier
- Leva controls for interactive debugging
- Performance monitoring overlay

Check the code to see how these are implemented.

## Resources

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Drei Documentation](https://github.com/pmndrs/drei)
- [React Three Rapier](https://github.com/pmndrs/react-three-rapier)
- [Three.js Docs](https://threejs.org/docs/)
- [Leva Controls](https://github.com/pmndrs/leva)
