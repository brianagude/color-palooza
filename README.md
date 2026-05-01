# Color Palooza

An interactive 3D visualization exploring the correlation between historical RYB color spaces and RGB, built with React Three Fiber and Next.js.

**Live site:** https://color-palooza.pages.dev/

## What Is It?

Color Palooza visualizes how different historical color models relate to the RGB cube. Artists and painters throughout history have used RYB (Red-Yellow-Blue) as a conceptual color model — but "RYB" isn't a single standard. Different traditions and color theorists defined the relationships between hues differently, resulting in distinct color cubes that produce noticeably different results when mapping to RGB.

This project uses [rybitten](https://github.com/meodai/rybitten), a library that encodes several of these historical color spaces as 3D lookup tables. By rendering those lookup tables as navigable 3D voxel grids, you can visually compare how each model distributes colors through space — and see exactly where yellow sits relative to orange, or how a given tradition places violet versus blue.

There are three viewing modes:

- **RYB** — the color cube rendered in its native RYB space (the background also shifts to match white's RYB equivalent)
- **RYB-In-RGB** — the RYB landmark colors (the 8 vertices: white, black, red, yellow, blue, orange, green, violet) plotted within the RGB cube, making the geometric distortion visible
- **RGB** — the standard RGB cube for comparison

## Versions

The site has three iterations accessible by route:

| Route | Description                                                                                                                                                                                                                                                                                                                                   |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`   | Voxel grid of boxes — every point in the NxNxN cube colored by the selected preset and mode. Use the Leva panel to switch color space presets, mode, box size, and resolution.                                                                                                                                                                |
| `/v2` | Landmark-only view — just the 8 key colors of the selected color space rendered as spheres inside a glass-walled room. Clean way to see how the corners of the color cube shift between presets.                                                                                                                                              |
| `/v3` | Camera + audio experiment — live webcam feed with an audio-reactive GLSL glitch shader. Volume from the microphone drives horizontal distortion. Unrelated to the color space work; we toyed with using the camera as a canvas to see how the colors change relative to the color spaces but ultimately decided to move in another direction. |

## Running It

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

```bash
pnpm build   # production build
pnpm start   # production server
pnpm lint    # lint with Biome
pnpm format  # format with Biome
```

## Tech Stack

- **Next.js 16** (App Router)
- **React Three Fiber** — React renderer for Three.js
- **Three.js** — 3D library
- **rybitten** — RYB color space conversions and historical color cube presets
- **Drei** — R3F utilities (Instances, OrbitControls, shaderMaterial)
- **Leva** — runtime GUI controls
- **Tailwind CSS v4**
- **Biome** — linting and formatting

## Collaboration

Built in collaboration with [@abettercoach](https://github.com/abettercoach), met at [Recurse Center](https://github.com/recursecenter).

## Evolution

The continuation of this project is [paint-palooza](https://github.com/brianagude/paint-palooza).
