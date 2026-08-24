# Eagle Taxi — Booking Drawer Feature Spec

This document specifies the in-page booking flow: a bottom sheet ("drawer") that lets a customer select a route, get a car recommendation, and send a booking request — without leaving the landing page. Read `PROJECT_CONTEXT.md` first for company/brand background; this file covers the booking feature specifically.

## Component

Use shadcn's `Drawer` component (built on `vaul`). It slides up from the bottom of the screen, supports swipe-to-dismiss, and works like the bottom sheets in Google Maps or Uber (tap a route → sheet rises with details). **This is not a new page or route** — it opens over the current page and closes back to it.

---

## Pricing model

### One-way

Standard published rate per route, shown on the Pricing section (already live): e.g. Huye → Kigali = 130,000 RWF.

### Round trip

**Round trip = one-way rate × 2.** No separate discounted "return price," no multiplier beyond that. The customer is paying for the same distance twice — that's the honest baseline, and it's easy to explain.

### Waiting time — this is where driver compensation actually lives

Every round trip includes a **committed waiting window**, agreed on the booking screen (not fixed site-wide — the customer picks how long they expect to be at the destination, from a set of options, e.g. 1 hr / 2 hr / 4 hr / half-day).

- If the driver waits **within** the committed window: no extra charge.
- If the driver waits **beyond** the committed window: an hourly overage fee applies (e.g. 5,000–8,000 RWF/hour — confirm exact rate with the business owner before shipping this).
- The customer sets their own expected window up front, so the "commitment" is theirs, not a hidden site default — this is what makes the overage fee feel fair rather than a gotcha.

### Required disclaimer text

This must appear clearly on the round-trip step of the booking drawer — not in fine print, not only in a tooltip:

> **Waiting Time Notice**
> Round trip pricing includes your selected waiting window. If your driver waits longer than the time you selected, an additional charge of [X] RWF per hour applies beyond that window. Let your driver know as early as possible if your plans change — we'll always confirm any extra charge with you directly before it applies.

That last sentence matters: it commits to *confirming* overage charges with the customer rather than silently billing them, which is the difference between a fair policy and a customer complaint waiting to happen.

---

## Booking flow — screen order

Field order matters for completion rate: low-commitment questions first, identity/payment last, so people are already invested by the time they're asked for personal info.

### Step 1 — Trip basics
- Fields: From / To (or pre-filled if entered via a Pricing card), One-way or Round trip toggle
- If Round trip is selected, show the waiting-window selector (1 hr / 2 hr / 4 hr / half-day) plus the disclaimer text above
- Button: **Continue**

### Step 2 — Passengers & luggage
- Tap-select, not typed: passengers (1–3 / 4 / 5+), luggage (Light / Heavy)
- Button: **Continue**

### Step 3 — Recommended car
- Show the recommended vehicle first with a **"Recommended"** badge, using the logic table below
- Show 2–3 alternate vehicles below it, always selectable — never block a customer from choosing a bigger car than recommended
- Button: **Continue**

### Step 4 — Contact info
- Fields: Name, Phone number (required — this is also their WhatsApp contact), Email (optional)
- Button: **Continue**

### Step 5 — Schedule
- Toggle: **Book Now** or **Schedule for later** (date + time picker if scheduled)
- Button: **Continue**

### Step 6 — Payment method (UI only for now — see note below)
- Options: Airtel Money, MTN MoMo, Card
- Button: **Review Booking**

### Step 7 — Summary & confirm
- Full recap: route, one-way/round trip + waiting window if applicable, car, passengers/luggage, name, phone, schedule, payment method
- Button: **Confirm & Send via WhatsApp**

### Car recommendation logic

| Passengers | Luggage | Recommended |
|---|---|---|
| 1–3 | Light | Sedan |
| 1–3 | Heavy | Sedan (SUV if truly heavy) |
| 4 | Light–Medium | Sedan or SUV |
| 4+ | Heavy | SUV |
| 5+ | Any | Van |

---

## Payment — implementation note

Airtel Money and MTN MoMo require a merchant/aggregator account (e.g. via Flutterwave, Pesapal, or IntouchPay) — this is a business/API integration, not something to wire up on the frontend alone. **For this branch:** build the full payment-method UI (Step 6) so the flow feels complete, but the "Confirm & Send" button should generate a pre-filled WhatsApp message summarizing the full booking (route, trip type, waiting window if applicable, car, passengers, name, phone, schedule, chosen payment method) and open `wa.me/250798086791` with that message pre-filled. The driver/business owner confirms and arranges actual payment directly. Real payment API integration can replace this handoff later once there's booking volume to justify the setup.

## Data collection note

Keep required fields minimal: name and phone number only. Email stays optional. Every extra required field before a first-time visitor can complete a booking is a chance to lose them — this is a new site building trust, not an established platform.

## Progress & UX mechanics

- Show a step indicator (e.g. "Step 3 of 7") so users can see how close they are to finishing
- One decision per screen — don't combine steps
- Back button preserves already-entered data
- If a customer opens the drawer from a specific route card in the Pricing section, pre-fill Step 1 and jump straight to Step 2
