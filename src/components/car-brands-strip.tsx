"use client";

import { Marquee } from "@/components/shadcn-space/animations/marquee";

// Car brand logos live in /public/car-logos. Add a file there and append
// the entry here — the marquee will pick it up automatically.
const BRANDS: { image: string; name: string }[] = [
  { image: "https://res.cloudinary.com/dz4fsirbc/image/upload/kia-logo_osrbvc.png", name: "Kia" },
  { image: "https://res.cloudinary.com/dz4fsirbc/image/upload/toyota-logo_wkojrv.png", name: "Toyota" },
  { image: "https://res.cloudinary.com/dz4fsirbc/image/upload/volkswagen-logo_n1copj.png", name: "Volkswagen" },
  { image: "https://res.cloudinary.com/dz4fsirbc/image/upload/land-rover-logo_ck4i7d.png", name: "Land Rover" },
];

export default function CarBrandsStrip() {
  return (
    <section aria-label="Car brands we offer" className="py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm font-normal text-muted-foreground mb-6 md:mb-8">
          Brands we drive
        </p>
        <Marquee pauseOnHover className="[--duration:25s] p-0">
          {BRANDS.map((brand) => (
            <img
              key={brand.name}
              src={brand.image}
              alt={`${brand.name} logo`}
              className="h-10 md:h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity mr-12 lg:mr-20"
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
