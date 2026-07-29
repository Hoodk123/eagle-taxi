<p align="center">
  <img src="https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white" alt="Astro"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
</p>

<h1 align="center">Eagle Taxi — Premium Travel in Rwanda</h1>

<p align="center">
  Landing page for <strong>Eagle Taxi</strong>, a private car service based in Huye, Rwanda.
  Airport transfers, business travel, events & weddings, daily city rides, and out-of-town
  private trips — available 24/7 via phone or WhatsApp.
</p>

---

## About

This is the marketing site for Eagle Taxi, a real, operating small business in Huye, Rwanda.
It is built with **Astro** (the main framework) and **TypeScript** (for all logic and component
types), and uses **React** islands for the interactive bits. The focus is on bold,
brand-consistent visuals, a fleet carousel of the cars we drive, and the trust messaging the
business already uses offline (Safe · Reliable · Comfortable).

## Tech stack

| Layer            | Tool                                   | Why we picked it                                                                                            |
| :--------------- | :------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| Framework        | **Astro 7** (`@astrojs/react`)         | Static-first output with zero-JS by default; React islands only hydrate where we actually need interactivity.|
| Language         | **TypeScript**                         | End-to-end types for data models (e.g. `VehicleCard`), props, and component APIs.                            |
| UI components    | **shadcn/ui** (`shadcn` + `class-variance-authority`) | Copy-paste, owned component code — no black-box dependency to upgrade.                       |
| Styling          | **Tailwind CSS 4** (`@tailwindcss/vite`) | Utility-first styling, dark mode via the `dark` class, theme tokens via CSS variables.                      |
| Animation        | **Motion** (`motion/react`) + **GSAP** | `whileInView` reveal in the hero and brand strip; GSAP reserved for scroll-driven work.                      |
| Carousel         | **Embla** (`embla-carousel-react` + `embla-carousel-autoplay`) | Lightweight, accessible carousel powering the fleet section.                                  |
| Icons            | **lucide-react**, **@hugeicons/react**, **@iconify/react**, **@fontsource** | Lucide for the bento feature tiles; hugeicons/iconify where the shadcn primitives need them; fonts self-hosted via `@fontsource`. |
| Utilities        | `clsx`, `tailwind-merge`               | Compose conditional classes safely (see `src/lib/utils.ts`).                                                 |

> Node ≥ 22.12.0 is required (`engines.node` in `package.json`).

## Project structure

```text
/
├── public/
│   ├── cars/            # Fleet photos — gitignored (served from cloud storage)
│   ├── car-logos/       # Brand logos — gitignored (served from cloud storage)
│   ├── favicon.svg
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── logo/logo.tsx                  # Eagle Taxi wordmark placeholder used by the header
│   ├── components/
│   │   ├── shadcn-space/
│   │   │   ├── animations/marquee.tsx      # CSS-only infinite marquee (used by the brands strip)
│   │   │   └── blocks/hero-01/             # Header + hero (Reactive UI islands)
│   │   ├── ui/                             # shadcn primitives (button, card, carousel, sheet, navigation-menu)
│   │   ├── features-8.tsx                  # "Why you should choose us" bento grid
│   │   ├── vehicles-section.tsx            # Fleet carousel — car-by-car
│   │   ├── car-brands-strip.tsx            # "Brands we drive" marquee of logos
│   │   ├── stats-stack.tsx
│   │   ├── pricing-section.tsx             # Uses OptionWheel for option selection
│   │   ├── OptionWheel.tsx                 # Curved scrolling wheel used by pricing
│   │   └── cta.astro
│   ├── layouts/Layout.astro                # Root HTML shell, sets dark mode + global CSS
│   ├── lib/utils.ts                        # `cn()` helper
│   ├── pages/index.astro                   # Single page composition
│   └── styles/global.css                   # Tailwind tokens, fonts, base styles
├── .gitignore                              # Ignores dist, node_modules, .astro/, .vscode/, .idea/, env files, public/cars/, public/car-logos/
├── astro.config.mjs                        # React + Tailwind vite plugin wiring
├── components.json                         # shadcn registry config (style "base-maia")
├── tsconfig.json                           # TS config incl. path alias `@/*`
├── AGENTS.md                               # Engineering rules + Astro docs links
└── package.json
```

## Page composition

The home page (`src/pages/index.astro`) renders a one-page narrative in this order:

1. **Header** — sticky nav (`shadcn-space/blocks/hero-01/header.tsx`)
2. **Hero** — headline, subcopy, *Call or WhatsApp* + *Learn More* CTAs
3. **Features** — "Why you should choose us" bento grid (5 service guarantees)
4. **Fleet** — `Our fleet` carousel. **Every car image in `public/cars` is its own card** with the brand name and a small `SEDAN` / `SUV` / `VAN` tag. Add a file named `somemaker-sedan.jpg`, append one line to `DEFAULT_VEHICLES` in `vehicles-section.tsx`, and it’s live.
5. **Brands we drive** — moving marquee of the brand logos in `public/car-logos`.
6. **Stats** — `stats-stack.tsx`
7. **Pricing** — `pricing-section.tsx`
8. **CTA** — `cta.astro`

## Working with the fleet images

Filename suffix maps a photo to its fleet class:

- `*-sedan.*` → Sedan tile
- `*-suv.*` → SUV tile
- `*-van.*` → Van tile

To add a new car:

1. Drop the image into `public/cars/` (e.g. `mazda-sedan.jpg`).
2. Add a one-line entry in `DEFAULT_VEHICLES` in `src/components/vehicles-section.tsx`:

   ```ts
   { name: "Mazda Sedan", description: "…", image: "/cars/mazda-sedan.jpg", category: "Sedan" },
   ```

The carousel loop picks it up automatically — no other wiring is needed.

## Asset hosting

Fleet photos (`public/cars/`) and brand logos (`public/car-logos/`) are **not committed** —
they are gitignored and will be served from cloud storage. The site references them by
absolute path (`/cars/foo-sedan.jpg`, `/car-logos/kia-logo.png`) so swapping the local
files for hosted URLs later is a one-line change in the component's data array:

```ts
image: "https://cdn.example.com/cars/mazda-sedan.jpg",
```

Other `public/` files (favicons, `robots.txt`, manifests, etc.) are tracked normally.

## Commands

All commands run from the project root:

| Command           | Action                                                  |
| :---------------- | :------------------------------------------------------ |
| `npm install`     | Install dependencies                                    |
| `npm run dev`     | Start the dev server at `localhost:4321`                |
| `npm run build`   | Build the production site to `./dist/`                  |
| `npm run preview` | Preview the production build locally                    |
| `npm run astro …` | Run an Astro CLI command (`astro add`, `astro check`, …) |

Per `AGENTS.md`, the dev server is run in background mode:

```sh
astro dev --background
astro dev status
astro dev logs
astro dev stop
```

## Workflows for this repo

- **Type system is enforced at the component level** — see `VehicleCard` in `vehicles-section.tsx`
  for the pattern (typed prop with optional `category: "Sedan" | "SUV" | "Van" | string`).
  Match it when adding new interactive components.
- **Before adding interactive animated UI**, follow the engineering rule in `AGENTS.md`:
  weigh pure-CSS vs. a library, default to CSS where a transition/keyframe will do, and avoid
  `framer-motion` `initial` inline-style flashes on Astro islands.

## License

[Project source is public but it is a non-commercial to anyone. All Eagle Taxi branding, routes and pricing belong to the business.](https://polyformproject.org/licenses/noncommercial/1.0.0/)
