"use client";

// This project's selectable-card pattern uses single-select groups across
// the booking flow (route, trip type, waiting window, passengers, luggage,
// payment method). base-ui doesn't ship a "toggle-group" primitive, but its
// RadioGroup has exactly the semantics we need (single-select, keyboard
// arrow-key nav, ARIA radio roles). Re-exporting under the spec's naming so
// call-sites can say what they mean.
export { RadioGroup as ToggleGroup, RadioItem as ToggleItem } from "@/components/ui/radio-group";
