"use client";

import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  INITIAL_BOOKING_STATE,
  type BookingState,
} from "@/components/booking/state";
import { findRoute } from "@/components/booking/routes";
import { Step1TripBasics } from "@/components/booking/steps/step-1-trip-basics";
import { Step2Passengers } from "@/components/booking/steps/step-2-passengers";

const TOTAL_STEPS = 7;

const STEP_META: { title: string; subtitle: string }[] = [
  { title: "Trip basics", subtitle: "Where are you headed?" },
  { title: "Passengers & luggage", subtitle: "Who and what are you bringing?" },
  { title: "Choose your car", subtitle: "Pick a vehicle — or take our recommendation." },
  { title: "Your details", subtitle: "How do we reach you?" },
  { title: "Schedule", subtitle: "Now or later?" },
  { title: "Payment", subtitle: "How would you like to pay?" },
  { title: "Review & confirm", subtitle: "Almost there — one last look." },
];

type BookingDrawerProps = {
  /**
   * Optional explicit open control. When omitted, the drawer listens for
   * a global `'eagle:open-booking'` CustomEvent on document so any other
   * island (header, pricing cards) can open it without sharing React state.
   */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const OPEN_EVENT = "eagle:open-booking";

type OpenEventDetail = { routeId?: string } | undefined;

export function openBookingDrawer(
  prefill: { routeId?: string } | undefined = undefined,
) {
  if (typeof document === "undefined") return;
  document.dispatchEvent(
    new CustomEvent<OpenEventDetail>(OPEN_EVENT, { detail: prefill }),
  );
}

export default function BookingDrawer({
  open: controlledOpen,
  onOpenChange,
}: BookingDrawerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [state, setState] = React.useState<BookingState>(INITIAL_BOOKING_STATE);
  /** Prefill arriving from an external trigger (a pricing card). */
  const pendingPrefillRef = React.useRef<{ routeId?: string } | null>(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (isControlled) onOpenChange?.(next);
      else setUncontrolledOpen(next);
    },
    [isControlled, onOpenChange],
  );

  // Listen for the global open event so header / pricing cards can open
  // the drawer without lifting state across Astro islands.
  React.useEffect(() => {
    if (isControlled) return;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<OpenEventDetail>).detail;
      pendingPrefillRef.current = detail ?? null;
      setOpen(true);
    };
    document.addEventListener(OPEN_EVENT, handler as EventListener);
    return () => document.removeEventListener(OPEN_EVENT, handler as EventListener);
  }, [isControlled, setOpen]);

  // Apply prefill + reset state whenever the drawer is opened.
  React.useEffect(() => {
    if (!open) return;
    setStep(1);
    setState((prev) => {
      const prefill = pendingPrefillRef.current;
      pendingPrefillRef.current = null;
      const next: BookingState = {
        ...INITIAL_BOOKING_STATE,
        // Preserve contact across reopens — don't discard a user's details.
        contact: { ...prev.contact },
      };
      if (prefill?.routeId && findRoute(prefill.routeId)) {
        next.routeId = prefill.routeId;
        // Per spec: opening from a pricing card jumps straight to Step 2.
        // scheduleMicrotask so we don't trigger a state update during setState.
        queueMicrotask(() => setStep(2));
      }
      return next;
    });
  }, [open]);

  // The Continue button stays disabled until the current step has its
  // primary selection made. Enforces the "one decision per screen" rule.
  const canContinue = React.useMemo(() => {
    switch (step) {
      case 1:
        return (
          state.routeId !== null &&
          (state.tripType !== "round-trip" || state.waitingWindow !== null)
        );
      case 2:
        return state.passengers !== null && state.luggage !== null;
      default:
        return true;
    }
  }, [step, state]);

  const meta = STEP_META[step - 1];

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else setOpen(false);
  };

  const handleContinue = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
    else setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent aria-describedby={undefined}>
        <DrawerHeader>
          <DrawerTitle>{meta.title}</DrawerTitle>
          <DrawerDescription>{meta.subtitle}</DrawerDescription>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground/80 pt-1">
            Step {step} of {TOTAL_STEPS}
          </p>
        </DrawerHeader>

        {/* Step content — switched by `step`. Each step component reads
            and writes the shared `state` via `setState` so Step 3 will be
            able to read passengers/luggage for the recommendation. */}
        <div className="px-6 py-4 min-h-32">
          {step === 1 && <Step1TripBasics state={state} setState={setState} />}
          {step === 2 && <Step2Passengers state={state} setState={setState} />}
          {step >= 3 && (
            <div className="rounded-xl border border-dashed border-border bg-muted/20 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                (Step {step} content goes here — built in P2–P3)
              </p>
            </div>
          )}
        </div>

        <DrawerFooter>
          <div className="flex items-center gap-3">
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-6"
              onClick={handleBack}
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </Button>
            <Button
              size="lg"
              className="h-12 px-6"
              onClick={handleContinue}
              disabled={!canContinue}
            >
              <span>{step < TOTAL_STEPS ? "Continue" : "Close"}</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
