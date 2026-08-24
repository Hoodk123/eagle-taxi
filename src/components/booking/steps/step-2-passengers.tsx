"use client";

import * as React from "react";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { SelectableCard } from "@/components/ui/selectable-card";
import type { BookingState, PassengerBand, Luggage } from "@/components/booking/state";

const PASSENGERS: { value: PassengerBand; title: string; subtitle: string }[] = [
  { value: "1-3", title: "1–3", subtitle: "Private ride" },
  { value: "4", title: "4", subtitle: "Full car" },
  { value: "5+", title: "5 or more", subtitle: "Needs a van" },
];

const LUGGAGE: { value: Luggage; title: string; subtitle: string }[] = [
  { value: "light", title: "Light", subtitle: "Day bags, hand luggage" },
  { value: "heavy", title: "Heavy", subtitle: "Large suitcases, gear" },
];

type Step2Props = {
  state: BookingState;
  setState: React.Dispatch<React.SetStateAction<BookingState>>;
};

export function Step2Passengers({ state, setState }: Step2Props) {
  return (
    <div className="flex flex-col gap-6">
      {/* Passengers */}
      <fieldset>
        <legend className="text-sm font-medium text-foreground mb-3 px-0">
          How many passengers?
        </legend>
        <ToggleGroup
          value={state.passengers ?? ""}
          onValueChange={(value) =>
            setState((s) => ({ ...s, passengers: (value || null) as PassengerBand | null }))
          }
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {PASSENGERS.map((p) => (
            <SelectableCard
              key={p.value}
              value={p.value}
              title={p.title}
              subtitle={p.subtitle}
            />
          ))}
        </ToggleGroup>
      </fieldset>

      {/* Luggage */}
      <fieldset>
        <legend className="text-sm font-medium text-foreground mb-3 px-0">
          Luggage
        </legend>
        <ToggleGroup
          value={state.luggage ?? ""}
          onValueChange={(value) =>
            setState((s) => ({ ...s, luggage: (value || null) as Luggage | null }))
          }
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {LUGGAGE.map((l) => (
            <SelectableCard
              key={l.value}
              value={l.value}
              title={l.title}
              subtitle={l.subtitle}
            />
          ))}
        </ToggleGroup>
      </fieldset>

      <p className="text-xs text-muted-foreground">
        We use this in the next step to recommend the right vehicle — you can
        always pick a bigger car if you prefer.
      </p>
    </div>
  );
}

export default Step2Passengers;
