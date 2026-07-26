## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Before writing interactive UI components (RULE)

For every interactive/animated component (carousels, stacks, reveal-on-scroll,
counters, drag-reorder, wheels, etc.), STOP and do this BEFORE writing code:

1. **Two columns on paper**: list approach **A — pure CSS + a small hook**
   vs. approach **B — add a library**. For each, list every risk you can
   foresee (SSR inline-style flash, hydration mismatch, bundle-size, dep
   maintenance, build complexity, brittle selector chains).
2. **Weigh output vs. risk** for each column: more risks with worse output
   = reject. Fewer risks with acceptable output = proceed.
3. **Default to CSS** when:
   - the motion can be expressed with CSS transitions / `@keyframes`, or
   - the interactivity is a small amount of glue (pointer events, an
     IntersectionObserver, a `setInterval`).
4. **Only reach for a library** when it removes more risk than it adds
   (e.g. real charting, complex physics, accessibility features you would
   otherwise wrongly reimplement).
5. **Avoid `framer-motion` for SSR-rendered Astro islands**: it emits the
   `initial` state as inline CSS (`style="opacity:0;..."`) during SSR,
   which kills visibility until hydration triggers `whileInView`. If you
   must use it, use `initial={false}` or render CSS-transition fallbacks.
6. **Show the user the comparison**: number the risks of approach A and
   approach B, then say which you pick and why.
