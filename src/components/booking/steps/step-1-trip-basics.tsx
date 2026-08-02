"use client";

import * as React from "react";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { SelectableCard } from "@/components/ui/selectable-card";
import { ROUTES, findRoute } from "@/components/booking/routes";
import type { BookingState, TripType, WaitingWindow } from "@/components/booking/state";
import { cn } from "@/lib/utils";

// TODO: confirm with owner — the spec lists 5,000–8,000 RWF/hour, we ship the
// lower bound (5,000) for now and revisit before launch.
const WAITING_OVERAGE_RATE = "5,000";

const TRIP_TYPES: { value: TripType; title: string; subtitle: string }[] = [
  { value: "one-way", title: "One-way", subtitle: "Direct trip to your destination." },
  { value: "round-trip", title: "Round trip", subtitle: "Driver waits and brings you back." },
];

const WAITING_WINDOWS: { value: WaitingWindow; title: string }[] = [
  { value: "1h", title: "1 hour" },
  { value: "2h", title: "2 hours" },
  { value: "4h", title: "4 hours" },
  { value: "half-day", title: "Half day" },
];

type Step1Props = {
  state: BookingState;
  setState: React.Dispatch<React.SetStateAction<BookingState>>;
};

export function Step1TripBasics({ state, setState }: Step1Props) {
  const isRoundTrip = state.tripType === "round-trip";

  return (
    <div className="flex flex-col gap-6">
      {/* Route */}
      <fieldset>
        <legend className="text-sm font-medium text-foreground mb-3 px-0">
          Your route
        </legend>
        <ToggleGroup
          value={state.routeId ?? ""}
          onValueChange={(value) =>
            setState((s) => ({ ...s, routeId: value as string }))
          }
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {ROUTES.map((route) => (
            <SelectableCard
              key={route.id}
              value={route.id}
              title={route.name}
              subtitle={route.subtext}
              trailing={route.price}
            />
          ))}
        </ToggleGroup>
      </fieldset>

      {/* Trip type — two-option toggle as small cards */}
      <fieldset>
        <legend className="text-sm font-medium text-foreground mb-3 px-0">
          Trip type
        </legend>
        <ToggleGroup
          value={state.tripType}
          onValueChange={(value) =>
            setState((s) => ({ ...s, tripType: value as TripType }))
          }
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {TRIP_TYPES.map((t) => (
            <SelectableCard
              key={t.value}
              value={t.value}
              title={t.title}
              subtitle={t.subtitle}
            />
          ))}
        </ToggleGroup>
      </fieldset>

      {/* Conditional round-trip block: waiting window + disclaimer */}
      {isRoundTrip && (
        <div className="flex flex-col gap-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          <fieldset>
            <legend className="text-sm font-medium text-foreground mb-3 px-0">
              Expected waiting window
            </legend>
            <ToggleGroup
              value={state.waitingWindow ?? ""}
              onValueChange={(value) =>
                setState((s) => ({ ...s, waitingWindow: (value || null) as WaitingWindow | null }))
              }
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {WAITING_WINDOWS.map((w) => (
                <SelectableCard
                  key={w.value}
                  value={w.value}
                  title={w.title}
                />
              ))}
            </ToggleGroup>
            <p className="mt-2 text-xs text-muted-foreground">
              Picking a window keeps the overage charge fair — you commit your
              time up front, not the driver's.
            </p>
          </fieldset>

          {/* The full disclaimer block — not fine print, not a tooltip. */}
          <div className="rounded-xl border border-border bg-muted/40 p-4">
            <p className="text-sm font-medium text-foreground mb-1">
              Waiting Time Notice
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Round trip pricing includes your selected waiting window. If your
              driver waits longer than the time you selected, an additional
              charge of <strong className="font-medium text-foreground">{WAITING_OVERAGE_RATE} RWF</strong> per hour applies beyond
              that window. Let your driver know as early as possible if your
              plans change — we'll always confirm any extra charge with
              you directly before it applies.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Step1TripBasics;
