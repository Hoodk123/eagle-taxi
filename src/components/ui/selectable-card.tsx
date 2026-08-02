"use client";

import * as React from "react";
import { Radio } from "@base-ui/react/radio";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * SelectableCard — the single-selection card used across the booking flow
 * (route, trip type, waiting window, passengers, luggage, payment method).
 *
 * The card itself is the radio "Root" element so it gets aria-checked and
 * arrow-key navigation for free through base-ui's RadioGroup. The visual
 * follows BOOKING_FLOW_DESIGN.md exactly:
 *
 *   - Unselected: muted. Lower-emphasis border + lower-emphasis text/icon
 *     (opacity 60%). Resting state.
 *   - Selected:   full emphasis. Solid border, full-opacity text/icon.
 *     No color swap, no new accent introduced.
 *   - Checkmark:  a single bare ✓ glyph in the bottom-right corner. No
 *     circle, no chip, no border — floating in the corner.
 *
 * Side-by-side cards in a RadioGroup; the parent lays out the grid.
 */
type SelectableCardProps = React.ComponentProps<typeof Radio.Root> & {
  /** Title shown in the card body. */
  title: React.ReactNode;
  /** Optional muted subtitle line beneath the title. */
  subtitle?: React.ReactNode;
  /** Optional element rendered on the right of the title row (price, badge…). */
  trailing?: React.ReactNode;
  /** Optional element rendered above the title (a small label/icon row). */
  leading?: React.ReactNode;
  /** Optional "Recommended" badge or similar pill, rendered top-left corner. */
  badge?: React.ReactNode;
};

function SelectableCard({
  title,
  subtitle,
  trailing,
  leading,
  badge,
  className,
  ...props
}: SelectableCardProps) {
  return (
    <Radio.Root
      data-slot="selectable-card"
      className={cn(
        // base-ui's Radio.Root renders a <button>. We re-style it as a card:
        // rounded-2xl matches the existing Card primitive; subtle border +
        // ring tokens are reused, nothing introduced.
        "group/selectable relative flex flex-col text-left rounded-2xl border bg-card text-card-foreground",
        "p-4 sm:p-5 cursor-pointer outline-none select-none",
        "transition-all duration-200 ease-out",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40",
        // Muted/unselected state — lower-emphasis everything.
        "border-border/60 text-muted-foreground",
        // base-ui sets `data-checked` on the Radio.Root when it's the active
        // option in the group. Selected appearance is *contrast* — full-
        // opacity text + a subtle brand-tinted border (the only sanctioned
        // brand-accent use on the card). No ring, no thick bar.
        "group-data-[checked]/selectable:border-brand-accent group-data-[checked]/selectable:text-foreground",
        className,
      )}
      {...props}
    >
      {badge != null && (
        <div className="absolute top-3 left-3 z-10">
          {badge}
        </div>
      )}

      <div className="flex items-start gap-3">
        {leading != null && <div className="shrink-0">{leading}</div>}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-base font-medium tracking-tight">
              {title}
            </span>
            {trailing != null && (
              <span className="text-sm font-medium tabular-nums shrink-0">
                {trailing}
              </span>
            )}
          </div>
          {subtitle != null && (
            <p className="mt-1 text-sm text-muted-foreground/90 leading-snug">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Bare ✓ — no circle, no chip, no background. opacity-0 while
          unselected so the transition is just opacity-in. Color uses the
          brand-accent token — the gold from the original posters — the
          second of the three sanctioned brand-accent uses. */}
      <Check
        aria-hidden="true"
        className="absolute bottom-3 right-3 size-4 transition-opacity duration-200 opacity-0 group-data-[checked]/selectable:opacity-100 text-brand-accent"
      />
    </Radio.Root>
  );
}

export { SelectableCard };
