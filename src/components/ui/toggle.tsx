"use client";

// base-ui ships Toggle as a primitive, but the design spec's selection
// pattern is single-select groups (radio semantics), not independent
// on/off toggles. The actual trip-type toggle in Step 1 etc. is rendered
// as a small 2-option RadioGroup via ToggleGroup above.
// Keep this file as a placeholder so the import path `@/components/ui/toggle`
// exists per the spec wording ; nothing in the codebase should reach for a
// bare on/off toggle that one isn't using RadioGroup for.
export {};
