"use client";

import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { Radio } from "@base-ui/react/radio";

import { cn } from "@/lib/utils";

// Thin shadcn-style wrappers over base-ui's RadioGroup + Radio primitives.
// We don't ship a RadioIndicator dot here — the selectable-card pattern in
// this project uses a bare ✓ glyph and full-opacity contrast (see
// SelectableCard), not a circular radio dot. Keep this primitive minimal.

function RadioGroup({
  className,
  ...props
}: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

// Radio.Root is the per-option element. We let it render as a div by default;
// SelectableCard composes this with its own card visual.
function RadioItem({
  className,
  ...props
}: React.ComponentProps<typeof Radio.Root>) {
  return (
    <Radio.Root
      data-slot="radio-item"
      className={cn("outline-none", className)}
      {...props}
    />
  );
}

export { RadioGroup, RadioItem };
