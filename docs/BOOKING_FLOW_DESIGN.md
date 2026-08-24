# Eagle Taxi — Booking Drawer Design Spec (Page 2)

This is the visual/interaction companion to `BOOKING_FLOW_FEATURE.md`. That file defines the 7 steps and their content; this file defines how each step should look and behave. Read both before building.

## Component source — use the MCP, don't hand-build

The project already has the shadcn MCP server configured in `opencode.jsonc`:

```jsonc
"shadcn-ui": {
  "type": "remote",
  "url": "https://ui.shadcn.com/r"
}
```

**Instruction for the agent:** pull the `Drawer` component (built on `vaul`) through this MCP server rather than writing a custom sheet/modal from scratch. Do not invent drawer behavior or styling that isn't part of the actual shadcn component — if something needs to deviate from the default, it should be a deliberate, stated change (see below), not an improvisation.

## Drawer structure

- Rounded top corners, drag handle bar centered at the top (standard shadcn Drawer pattern)
- Step content is centered-heading + subtext pattern, same as the shadcn docs example: bold short title, one muted subtext line beneath it
- Content area below holds the actual step (form fields, selectable cards, etc.)
- Do not default to a nearly-full-height sheet as the resting state — keep it compact, sized to the current step's content. It should feel like a focused single-step sheet, not a full secondary page stuffed into a drawer.

## Selectable cards (car type, waiting window, payment method, etc.)

Layout: side-by-side cards with **subtle borders** — consistent with the subtle-border style already used elsewhere on the site. Do not introduce new border colors.

**Selection state — no new colors, ever:**
- **Unselected card:** muted — lower-emphasis border, lower-emphasis text/icon opacity. This is the resting/default state for every card that isn't chosen.
- **Selected card:** full-emphasis — solid/brighter neutral border (not a color swap, just full opacity vs. muted), full-opacity text and icon. It should read as clearly "chosen" purely through contrast, not through introducing blue/green/etc. accent colors that weren't already part of the palette.
- **Checkmark:** a bare ✓ glyph placed at the bottom-right corner of the selected card. No circle, no background chip, no border around it — just the mark itself, floating in that corner.

**"Recommended" badge (Step 3 — car selection):**
- Keep the badge's existing color/style exactly as already established elsewhere on the site — do not create a new badge color for this feature.
- When the recommended card is also the currently-selected card, the badge should read as more visually prominent than on an unselected card — achieved through the same contrast logic as above (full opacity + the card's own selected-state border), not through a new color.

## Buttons

- Not full-width. The shadcn docs example shows a full-width "Close" button at the bottom of the drawer — **do not replicate that width.**
- Use the same medium/small, pill-shaped, content-hugging button style already established on the hero ("Call or WhatsApp," "Learn More") — same sizing, same shape language, same button pairing pattern (one solid/primary, one outline/secondary per screen where relevant).
- Typography and color stay exactly as already defined on the rest of the site. No new fonts, no new weights, no new colors introduced for this feature.

## Deferred feature — car brand/model selection

Idea raised but explicitly **not part of this build**: letting the customer pick a specific brand/model within a car type (e.g. within Sedan: KIA, Toyota, VW, BYD, Mercedes — based on real current fleet availability). This requires live fleet/availability data the project doesn't have wired up yet. Document it here so it isn't lost, but the agent should build only the base flow (car *type* recommendation, per `BOOKING_FLOW_FEATURE.md`) for now. Brand/model selection is a Phase 2 feature once real fleet data exists.
