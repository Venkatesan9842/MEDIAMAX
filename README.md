# Monte Real Estate Landing Page

A responsive, single-page real-estate marketing site for **Monte Real Estate**. The page presents Dubai property investment information with an editorial card layout, property categories, FAQ content, and scroll-driven motion.

## What is included

- Responsive React landing page for desktop and mobile
- Hero section with property statistics and contact/catalogue actions
- Investment promotion banner with a continuously moving marquee
- Selected-properties grid, services, ownership journey, benefits, categories, FAQ, developer marquee, and footer
- Smooth scrolling powered by Lenis
- GSAP entrance, scroll reveal, image-parallax, text-character, hover, and continuous animations
- Google Fonts (`DM Sans`, `DM Mono`, and `Playfair Display`)
- Remote background photography from Unsplash

## Tech stack

| Technology | Purpose |
| --- | --- |
| React | Component-based user interface |
| Vite | Development server and production build tooling |
| GSAP + ScrollTrigger | Intro, text, hover, and scroll-linked animations |
| Lenis | Smooth wheel-scroll experience, synchronized with ScrollTrigger |
| CSS | Responsive layouts, cards, typography, and image backgrounds |

## Run the project

### Requirements

- Node.js 18 or newer
- npm

### Commands

```bash
npm install
npm run dev
```

Vite prints a local address (normally `http://localhost:5173`) after the development server starts.

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project structure

```text
src/
├── App.jsx                     # Page composition and shared motion hooks
├── main.jsx                    # React entry point and global stylesheet imports
├── components/
│   ├── HeroReference.jsx        # Main hero card
│   ├── PromoBanner.jsx          # Investment promotion marquee
│   ├── PropertyGrid.jsx         # Selected-property cards
│   ├── Services.jsx             # Services section
│   ├── Performance.jsx          # Stats and performance image panel
│   ├── Ownership.jsx            # Ownership path diagram
│   ├── Advantages.jsx           # Dubai benefits grid
│   ├── CategoryGrid.jsx         # Property-type cards
│   ├── Faq.jsx                  # Expandable questions
│   ├── BrandMarquee.jsx         # Developer logo marquee
│   └── SiteFooter.jsx           # Footer and newsletter form
├── hooks/
│   ├── useSmoothScroll.js       # Lenis + GSAP ticker integration
│   ├── usePageMotion.js         # Intro and section-reveal animations
│   └── useAmbientMotion.js      # Image, hover, and ambient animations
└── styles/
    ├── global.css               # Global rules and fonts
    ├── reference.css            # Core page and component layout
    ├── pages.css                # Section-specific styles
    ├── motion.css               # Motion-related CSS optimizations
    ├── hero-match.css           # Hero card refinements
    ├── promo-height.css         # Promo-section sizing
    └── brand-marquee.css        # Developer marquee styles
```

`dist/` is the generated production output. Do not edit it manually; regenerate it with `npm run build`.

## Page sections

1. **Hero** — Brand identity, Dubai property message, statistics, and action controls.
2. **Promotion banner** — Full-width investment message with a background image and marquee.
3. **Selected properties** — Four visual property cards.
4. **Services** — Service overview and service list.
5. **Performance** — Team information, animated statistics, and a visual consultation card.
6. **Smart ownership** — Three-step investment path.
7. **Advantages** — Reasons to invest in Dubai.
8. **Property categories** — Grid of available property types.
9. **FAQ** — Native expandable `details`/`summary` questions.
10. **Developers and footer** — Featured developer marquee, navigation, subscription UI, and contact details.

## Animation system

GSAP is registered with `ScrollTrigger` in the motion hooks. `App.jsx` creates a page ref and passes it to the animation hooks so their effects are scoped to this page.

### Smooth scrolling

`useSmoothScroll.js` creates a Lenis instance. Its scroll updates are passed to `ScrollTrigger`, and its animation frame loop is connected to GSAP’s ticker. This keeps the scroll position and scroll-triggered animations synchronized.

### Page and text animation

`usePageMotion.js` controls the first-screen entrance and section reveals:

- Top bar, hero copy, and hero image animate into view on load.
- The hero heading is split into character spans and revealed with a staggered rise/fade animation.
- Existing heading markup is restored when the component unmounts, which is important for React cleanup and hot reloads.
- Major content blocks reveal when they enter the viewport.

### Image animation

`useAmbientMotion.js` contains image-focused scroll effects:

- Hero photo background shifts as the user scrolls away.
- Promo background zooms while its section crosses the viewport.
- Performance image layer pans and zooms independently, so its text and buttons remain stable.
- Performance text and visual columns enter from opposite directions with scroll scrubbing.

### Other interaction motion

- Property and category cards scale slightly on pointer hover.
- Service-list items slide horizontally on hover.
- The promotional and developer marquees loop continuously.
- The ownership circle rotates continuously.
- Performance statistics count up once they enter the viewport.

## Images, fonts, and media

- Most visual images are CSS `background-image` URLs served from Unsplash.
- Fonts are loaded from Google Fonts in `src/styles/global.css`.
- `LifestyleVideo.jsx` is a reusable video-card component with pointer tilt interaction. It expects `/public/healthy-lifestyle-tips.mp4` when it is added to the rendered page.

Because fonts and images are remote, they require an internet connection in development and production. For a fully self-contained deployment, download approved assets into `public/` and replace the external URLs.

## Customization guide

- **Change text/content:** edit the matching component in `src/components/`.
- **Change background images:** search for `images.unsplash.com` in `src/styles/`.
- **Adjust timings or ScrollTrigger ranges:** update `usePageMotion.js` or `useAmbientMotion.js`.
- **Adjust smoothness:** change Lenis options in `useSmoothScroll.js`.
- **Update layout/colors:** edit the CSS files in `src/styles/`.

## Notes

- The buttons and newsletter input are currently presentational; they are not connected to a backend, form service, routing, or contact workflow.
- The FAQ uses browser-native expand/collapse behavior.
- The site includes reduced-motion CSS rules for users who request less motion. The Performance-section reveal hook also checks the browser’s reduced-motion preference.
