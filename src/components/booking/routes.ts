// Single source of truth for the routes Eagle Taxi sells. Shared across:
//   - src/components/pricing-section.tsx (the published pricing cards)
//   - src/components/booking/steps/step-1-trip-basics.tsx (the Step 1 selector)
//
// Update this list once and both surfaces reflect it. `id` is the stable key
// the booking state stores — indices would shift if the order changed.

export type Route = {
  id: string;
  /** "From → To" display string. */
  name: string;
  /** Price as a formatted RWF string — kept as text so we don't have to
      match number formatting in two places. */
  price: string;
  /** Subtext shown on the pricing card and optionally on the Step 1 card. */
  subtext: string;
};

export const ROUTES: Route[] = [
  {
    id: "huye-kigali",
    name: "Huye → Kigali",
    price: "130,000 RWF",
    subtext: "Private car, up to 4 people",
  },
  {
    id: "huye-kibeho",
    name: "Huye → Kibeho",
    price: "50,000 RWF",
    subtext: "Private car, up to 4 people",
  },
  {
    id: "huye-akagera",
    name: "Huye → Akagera National Park",
    price: "270,000 RWF",
    subtext: "Private car, Ride in park with confidence.",
  },
  {
    id: "huye-lake-kivu",
    name: "Huye → Lake Kivu",
    price: "250,000 RWF",
    subtext: "Private car · Eben Lake Kivu Cottages & Villas",
  },
];

// Lookup helper — used to resolve the prefill that pricing cards will send.
export function findRoute(id: string | undefined): Route | undefined {
  if (!id) return undefined;
  return ROUTES.find((r) => r.id === id);
}
