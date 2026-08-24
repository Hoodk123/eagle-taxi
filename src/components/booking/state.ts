// Single shared booking state object passed to every step. Keeping the shape
// here lets Step 3 read passengers/luggage for the car recommendation
// without prop-drilling, and lets Step 7 build the WhatsApp message from the
// full envelope.

export type TripType = "one-way" | "round-trip";
export type WaitingWindow = "1h" | "2h" | "4h" | "half-day";
export type PassengerBand = "1-3" | "4" | "5+";
export type Luggage = "light" | "heavy";
export type VehicleType = "sedan" | "suv" | "van";
export type PaymentMethod = "airtel" | "mtn" | "card";
export type Schedule = { kind: "now" } | { kind: "later"; datetime: string };

export type ContactInfo = {
  name: string;
  phone: string;
  email?: string;
};

export type BookingState = {
  /** Route id from ROUTES list. */
  routeId: string | null;
  tripType: TripType;
  waitingWindow: WaitingWindow | null;
  passengers: PassengerBand | null;
  luggage: Luggage | null;
  vehicle: VehicleType | null;
  contact: ContactInfo;
  schedule: Schedule;
  payment: PaymentMethod | null;
};

export const INITIAL_BOOKING_STATE: BookingState = {
  routeId: null,
  tripType: "one-way",
  waitingWindow: null,
  passengers: null,
  luggage: null,
  vehicle: null,
  contact: { name: "", phone: "", email: "" },
  schedule: { kind: "now" },
  payment: null,
};

// The car recommendation logic table from BOOKING_FLOW_FEATURE.md (Step 3).
// Kept here next to the state so Step 3's UI file only owns presentation.
export function recommendVehicle(
  passengers: PassengerBand | null,
  luggage: Luggage | null,
): VehicleType {
  if (passengers === "5+") return "van";
  if (passengers === "4") {
    if (luggage === "heavy") return "suv";
    return "sedan";
  }
  // passengers "1-3"
  if (luggage === "heavy") return "suv";
  return "sedan";
}
