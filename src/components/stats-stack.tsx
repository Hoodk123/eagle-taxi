"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Users, Timer, MapPin, type LucideIcon } from "lucide-react";

type StackCard = {
  icon: LucideIcon;
  title: string;
  body: string;
};

type StatsStackProps = {
  cards?: StackCard[];
  rightTitle?: string;
  rightBody?: string;
};

const DEFAULT_CARDS: StackCard[] = [
  {
    icon: ShieldCheck,
    title: "Safe & Trusted",
    body: "Your safety is our promise, every ride. We pick you up and drop you off with vetted drivers and well-maintained private cars.",
  },
  {
    icon: Users,
    title: "Professional Drivers",
    body: "Experienced, friendly, and respectful. Our drivers know Rwanda's roads — city, countryside, and long-distance routes.",
  },
  {
    icon: Timer,
    title: "On Time, Every Time",
    body: "Punctuality you can count on. We respect your schedule for airport transfers, business trips, and events.",
  },
  {
    icon: MapPin,
    title: "Anywhere You Need",
    body: "City rides, out of town, airport, and more. Based in Huye, we take you anywhere you want across Rwanda.",
  },
];

function useInViewOnce<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      options ?? { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView, mounted };
}

function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "up" | "left";
  delay?: number;
  className?: string;
}) {
  const { ref, inView, mounted } = useInViewOnce<HTMLDivElement>();
  const applyHidden = mounted && !inView;
  const hidden =
    variant === "up"
      ? { opacity: 0, transform: "translateY(40px)" }
      : { opacity: 0, transform: "translateX(40px)" };
  const visible = { opacity: 1, transform: "none" };
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        ...(applyHidden ? hidden : visible),
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function StatsStack({
  cards = DEFAULT_CARDS,
  rightTitle = "Why Eagle Taxi",
  rightBody = "Based in Huye, Eagle Taxi is a private car service available 24/7 across Rwanda. We book by call or WhatsApp — no app, no surge, just a trusted driver arriving on time, taking you anywhere you want to go.",
}: StatsStackProps) {
  const rotations = ["rotate-1", "-rotate-1", "rotate-2", "-rotate-2"];
  const accents = [
    "bg-primary/15",
    "bg-secondary/15",
    "bg-accent/15",
    "bg-muted/20",
  ];
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-32 bg-transparent">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: stacking cards column */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Reveal
                  key={card.title}
                  variant="up"
                  delay={index * 80}
                  className={`lg:sticky lg:top-24 transition-transform duration-300 ${rotations[index % rotations.length]} ${hovered === index ? "-translate-y-2 rotate-0" : ""}`}
                >
                  <figure
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                    className={`relative rounded-2xl border border-border p-6 md:p-8 shadow-sm ${accents[index % accents.length]} backdrop-blur-sm cursor-default`}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm">
                          <Icon className="size-5" strokeWidth={1.5} />
                        </span>
                        <h3 className="text-xl md:text-2xl font-medium tracking-tight">
                          {card.title}
                        </h3>
                      </div>
                      <p className="text-sm md:text-base text-muted-foreground max-w-md">
                        {card.body}
                      </p>
                    </div>
                  </figure>
                </Reveal>
              );
            })}
          </div>

          {/* Right: static title + body, slide-in */}
          <div className="lg:sticky lg:top-24 lg:h-screen lg:grid lg:place-content-center">
            <div className="flex flex-col gap-6 max-w-md">
              <Reveal variant="left">
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
                  {rightTitle}
                </h2>
              </Reveal>
              <Reveal variant="left" delay={150}>
                <p className="text-base md:text-lg text-muted-foreground">
                  {rightBody}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsStack;
