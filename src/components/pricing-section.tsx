"use client";

import { useState, useMemo } from "react";
import { Check } from "lucide-react";
import OptionWheel from "@/components/OptionWheel";

type Route = {
  name: string;
  price: string;
  subtext: string;
};

const ROUTES: Route[] = [
  {
    name: "Huye → Kigali",
    price: "130,000 RWF",
    subtext: "Private car, up to 4 people",
  },
  {
    name: "Huye → Kibeho",
    price: "50,000 RWF",
    subtext: "Private car, up to 4 people",
  },
  {
    name: "Huye → Akagera National Park",
    price: "270,000 RWF",
    subtext: "Private car, Ride in park with confidence.",
  },
  {
    name: "Huye → Lake Kivu",
    price: "250,000 RWF",
    subtext: "Private car · Eben Lake Kivu Cottages & Villas",
  },
];

const INCLUDED = [
  "Safe & Trusted — your safety is our promise",
  "Professional Drivers — experienced, friendly & respectful",
  "Clean & Comfortable — well maintained vehicles",
  "On Time, Every Time — punctuality you can count on",
  "Anywhere You Need — city rides, out of town, airport & more",
];

function RoutesIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx={6} cy={6} r="3" />
      <circle cx={18} cy={18} r="3" />
      <path d="M6 9v6a3 3 0 0 0 3 3h6" />
    </svg>
  );
}

function PricingSection() {
  // The wheel drives the cards: when wheel index changes, the active card
  // moves to the front of the visual stack with a CSS transition. No
  // framer-motion, no SSR inline-style traps (cards are visible by default,
  // pure CSS transitions on transform/z-index).
  const [activeIndex, setActiveIndex] = useState(0);
  const wheelLabels = useMemo(() => ROUTES.map((r) => r.name), []);

  return (
    <section id="pricing" className="py-16 md:py-24 bg-transparent scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="flex flex-col items-center text-center gap-4 mb-10 md:mb-16">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
            <RoutesIcon className="size-4" />
            Routes
          </span>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
            Routes & Pricing
          </h2>
          <p className="text-base font-normal max-w-2xl text-muted-foreground">
            Spin the wheel to explore our route, then book your ride. Every
            trip comes with the same Eagle Taxi guarantees.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left: Option Wheel (5 cols on lg) — naked on the page bg, no card wrapper.
              Items fade out at the edges exactly like the wheel always has. */}
          <div className="lg:col-span-5">
            <div className="relative h-[28rem] w-full">
              <OptionWheel
                items={wheelLabels}
                defaultSelected={0}
                side="left"
                loop
                draggable
                fontSize={1.5}
                spacing={2}
                tilt={7}
                curve={1}
                blur={1.5}
                fade={0.25}
                minOpacity={0.08}
                textColor="var(--muted-foreground)"
                activeColor="var(--foreground)"
                onChange={(index) => setActiveIndex(index)}
                className="text-foreground"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-2 top-1/2 hidden -translate-y-1/2 text-muted-foreground text-xs sm:block"
              >
                scroll · drag · click
              </span>
            </div>
          </div>

          {/* Right: stacked pricing cards (7 cols on lg) — deck, not a list.
              Only the active card is fully visible; the others sit behind,
              with only a sliver of their top edge showing so users know they
              exist. When the wheel changes the active route, the new card
              slides forward and the old one slides back. */}
          <div className="lg:col-span-7">
            <div className="relative h-[28rem] w-full">
              {ROUTES.map((route, index) => {
                const isActive = activeIndex === index;
                // Position in the deck from the front (0 = front, 1 = one back, ...).
                // Wraps around so the stack cycles through all 4 routes.
                const deckPos = (index - activeIndex + ROUTES.length) % ROUTES.length;
                // Only show up to 2 cards behind the front; cards beyond that
                // are fully hidden (avoids a noisy stack).
                const visible = deckPos <= 2;
                // Each step back: nudged down + scaled down + faded, plus a
                // slight horizontal inset so an edge peeks out from behind.
                const offsetY = deckPos * 14;
                const scale = 1 - deckPos * 0.04;
                const opacity = deckPos === 0 ? 1 : deckPos === 1 ? 0.55 : 0.25;
                return (
                  <article
                    key={route.name}
                    aria-hidden={isActive ? undefined : "true"}
                    className={[
                      "absolute inset-x-0 top-0 rounded-2xl border bg-card text-card-foreground ring-1 ring-foreground/10 overflow-hidden",
                      "transition-all duration-500 ease-out will-change-transform",
                      isActive ? "shadow-2xl shadow-primary/10" : "shadow-md",
                    ].join(" ")}
                    style={{
                      transform: `translateY(${offsetY}px) scale(${scale})`,
                      opacity: visible ? opacity : 0,
                      zIndex: ROUTES.length - deckPos,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <div className="divide-y divide-border">
                      <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                        <div className="flex-1">
                          <h3 className="text-lg md:text-xl font-medium tracking-tight">
                            {route.name}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {route.subtext}
                          </p>
                        </div>
                        <div className="flex sm:flex-col items-start sm:items-end gap-2 sm:gap-1">
                          <strong className="text-2xl md:text-3xl font-semibold tabular-nums">
                            {route.price}
                          </strong>
                          <span className="text-xs text-muted-foreground">
                            per ride
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <p className="text-sm font-medium text-muted-foreground mb-3">
                          What's included:
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {INCLUDED.map((line) => (
                            <li
                              key={line}
                              className="flex items-start gap-2 text-sm text-foreground"
                            >
                              <span
                                className={[
                                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border",
                                  isActive
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-transparent text-muted-foreground border-border",
                                ].join(" ")}
                              >
                                <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                              </span>
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>

                        <button
                          type="button"
                          className={[
                            "mt-6 w-full rounded-full border text-sm font-medium",
                            "h-11 px-5 transition-colors cursor-pointer",
                            isActive
                              ? "border-primary bg-primary text-primary-foreground hover:bg-primary/85"
                              : "border-border bg-transparent text-foreground hover:bg-muted",
                          ].join(" ")}
                        >
                          Book This Ride
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
