import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  ShieldCheck,
  Timer,
  Armchair,
  MapPin,
  type LucideIcon,
} from "lucide-react";

type Tile = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const TILES: Tile[] = [
  {
    icon: Clock,
    title: "24/7 Available",
    body: "Day or night, weekend or weekday — Eagle Taxi is here whenever you need us, anywhere in Rwanda.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    body: "Your safety is our priority, every ride. Vetted drivers and well-maintained vehicles you can trust.",
  },
  {
    icon: Timer,
    title: "On Time, Always",
    body: "Punctuality you can count on. We pick up and drop off on schedule, every trip.",
  },
  {
    icon: Armchair,
    title: "Comfortable Ride",
    body: "Clean cars with comfortable seats. Private trips for up to 4 people, the way it should be.",
  },
  {
    icon: MapPin,
    title: "Anywhere, Anytime",
    body: "We take you anywhere you want, across Huye, Kigali, and beyond — city rides, airport, out of town.",
  },
];

export default function FeaturesSection() {
  // Five tiles arranged in a bento grid: the first tile spans 2 columns (the
  // headline guarantee), the next four fill the remaining slots.
  // Grid: lg 6 cols, sm 3 cols, base 1 col.
  return (
    <section className="py-16 md:py-32 bg-transparent">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
            Why you should choose us
          </h2>
          <p className="text-base font-normal max-w-2xl text-muted-foreground">
            What makes every Eagle Taxi ride a ride you can rely on.
          </p>
        </div>
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {TILES.map((tile, index) => {
            const Icon = tile.icon;
            // Bento layout (lg, 6 cols):
            //   row 1: tile 0,1,2 — each col-span-2 (fills 6 cols)
            //   row 2: tile 3,4   — each col-span-3 (fills 6 cols)
            // Earlier rows on small screens: stack to 1 col, or 3 cols on sm.
            let span: string;
            if (index <= 2) {
              span = "col-span-full sm:col-span-1 lg:col-span-2";
            } else {
              span = "col-span-full sm:col-span-3 lg:col-span-3";
            }
            return (
              <Card
                key={tile.title}
                className={`relative overflow-hidden rounded-2xl border border-border bg-card text-card-foreground ring-1 ring-foreground/10 ${span}`}
              >
                <CardContent className="pt-6 p-6">
                  <div className="flex flex-col gap-4 h-full">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted/40 text-foreground">
                        <Icon className="size-5" strokeWidth={1.5} />
                      </span>
                      <h2 className="text-base md:text-lg font-medium tracking-tight">
                        {tile.title}
                      </h2>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {tile.body}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
