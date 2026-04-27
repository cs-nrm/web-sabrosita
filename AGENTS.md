# Agent Guide: web-sabrosita

This document serves as a guide for AI agents and developers working on the `web-sabrosita` project.

## Project Overview
**web-sabrosita** is a radio/media content website built with Astro. It delivers rich multimedia content including:
- 📻 Live Radio Streaming
- 📅 Seasonal Events (Navidad, Dia de Muertos, etc.)
- 📰 News and Interviews
- 🎧 Podcasts

## Technology Stack
- **Framework**: [Astro](https://astro.build/) (v5.x)
- **Styling**: Tailwind CSS + Sass (`.scss` supported)
- **Languages**: TypeScript / JavaScript (ESM)
- **Build System**: Vite

## Project Structure & Conventions

### 📂 Directory Map
- **`src/pages/`**: Contains the route definitions.
    - Routes are file-system based.
    - **Crucial**: Large number of directories for specific themes (`navidad`, `son-sonidero`). Always check if a feature belongs to a specific seasonal/topical folder before creating new global pages.
- **`src/components/`**: Reusable UI components.
    - **Naming Convention**: Uses `PascalCase`.
    - Note the specificity: `MoreNavidad.astro`, `MoreNews.astro` etc. suggest a pattern of creating specific "Read More" or "Related" components per category rather than a single generic one. **Follow this pattern** unless instructed to refactor.
- **`src/layouts/`**: Page wrapper layouts and specific content "Cards".
    - `Layout.astro`: Main page shell.
    - `Cards*.astro`: Specific grid/card layouts for different sections (e.g., `CardsHomeNavidad.astro`).
- **`src/js/`**: Client-side logic.
    - `streaming.js`: **Critical**. Handles the radio player and media streaming. Be careful when modifying this as it likely affects the core product utility.

### 🎨 Styling
- Use **Tailwind CSS** utility classes for layout and spacing.
- Use **Sass** for complex component-specific styling if needed (though Tailwind is preferred for consistency).
- **Design System**: Colors and typography are likely defined in `tailwind.config.js` or global CSS. Respect existing aesthetics (Premium, Vibrant).

### 🚀 Key Workflows
- **Development**: `npm run dev` (starts Astro dev server).
- **Build**: `npm run build` (generates static site in `/dist`).
- **Preview**: `npm run preview`.

## Best Practices for Agents
1.  **Respect the Content Structure**: When adding new pages, verify if they fit into an existing content category (e.g., `src/pages/navidad/`) or require a new one.
2.  **Component Reusability vs. Specificity**: The code currently leans towards *specific* components (`SliderHotParade`, `SliderPodcast`). When fixing bugs, edit the specific component. When adding features, ask yourself if you should create a new specific component or (if requested) refactor to a generic one.
3.  **Media Handling**: Changes to audio/video playback should be tested against `streaming.js` logic to avoid breaking the radio stream.

## Context
- The project appears to be a migration or evolution of a legacy site, given the high specificity of components.
- **Design Priority**: High. "Sabrosita" implies a lively, energetic brand. Visuals should reflect this.
