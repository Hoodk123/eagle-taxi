"use client";

import Autoplay from "embla-carousel-autoplay";
import type { EmblaOptionsType } from "embla-carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type VehicleCard = {
  name: string;
  description: string;
  image: string;
  imageClassName?: string;
  /**
   * Optional fleet class tag rendered as a small pill on the card
   * (e.g. "Sedan", "SUV", "Van"). Matches the filename suffix in /public/cars.
   */
  category?: "Sedan" | "SUV" | "Van" | string;
};

type VehiclesSectionProps = {
  vehicles?: VehicleCard[];
};

// Every car image in /public/cars becomes its own carousel card. Filename
// suffix maps to its fleet class: *-sedan -> Sedan, *-suv -> SUV, *-van -> Van.
// Add a file in /public/cars and an entry here; the carousel scales for free.
const DEFAULT_VEHICLES: VehicleCard[] = [
  // --- Sedans ---
  { name: "Toyota Sedan", description: "Smooth, comfortable city ride.", image: "https://res.cloudinary.com/dz4fsirbc/image/upload/toyota-sedan_kljgwy.jpg", category: "Sedan" },
  { name: "Hyundai Sedan", description: "Reliable and efficient for everyday trips.", image: "https://res.cloudinary.com/dz4fsirbc/image/upload/hyundai-sedan_danjwm.jpg", category: "Sedan" },
  { name: "BYD Sedan", description: "Modern electric comfort, quiet and clean.", image: "https://res.cloudinary.com/dz4fsirbc/image/upload/byd-sedan_xm5vb6.jpg", category: "Sedan" },
  { name: "Kia Sedan", description: "Spacious sedan for business and family.", image: "https://res.cloudinary.com/dz4fsirbc/image/upload/kia-sedan_vokvmd.jpg", category: "Sedan" },
  // --- SUVs ---
  { name: "Mercedes-AMG SUV", description: "Premium performance and presence.", image: "https://res.cloudinary.com/dz4fsirbc/image/upload/amg-suv_dkpir1.jpg", category: "SUV" },
  { name: "BMW SUV", description: "Sporty, refined, ready for the long road.", image: "https://res.cloudinary.com/dz4fsirbc/image/upload/bmw-suv_pcleyl.jpg", category: "SUV" },
  { name: "Kia Sportage SUV", description: "Versatile 4x4 for city and safari.", image: "https://res.cloudinary.com/dz4fsirbc/image/upload/kia-1-suv_mkz9wt.jpg", category: "SUV" },
  { name: "Kia SUV", description: "Spacious 4x4 for group trips.", image: "https://res.cloudinary.com/dz4fsirbc/image/upload/kia-suv_yjuwhz.jpg", category: "SUV" },
  // --- Vans ---
  { name: "Volkswagen ID. Buzz", description: "Electric van with retro charm and room for all.", image: "https://res.cloudinary.com/dz4fsirbc/image/upload/id-buzz-van_kcjtb9.png", category: "Van" },
  { name: "Volkswagen Van", description: "Room for the whole family and luggage.", image: "https://res.cloudinary.com/dz4fsirbc/image/upload/vw-van_tihmgk.jpg", category: "Van" },
];

const OPTIONS: EmblaOptionsType = { loop: true, align: "center" };
const AUTOPLAY = Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true });

const BookNowButton = ({ className }: { className?: string }) => (
  <Button
    className={cn(
      "relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer",
      className
    )}
  >
    <span className="relative z-10 transition-all duration-500">Book Now</span>
    <span className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
      <ArrowUpRight size={16} />
    </span>
  </Button>
);

function VehiclesSection({ vehicles = DEFAULT_VEHICLES }: VehiclesSectionProps) {
  return (
    <section className="py-16 md:py-32 bg-transparent">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
            Our fleet
          </h2>
          <p className="text-base font-normal max-w-2xl text-muted-foreground">
            Explore the vehicles and experiences we offer across Rwanda.
          </p>
        </div>

        <div className="relative">
        <Carousel opts={OPTIONS} plugins={[AUTOPLAY]} className="w-full">
            <CarouselContent className="-ml-2 sm:-ml-4">
              {vehicles.map((vehicle, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 sm:pl-4 md:basis-4/5 lg:basis-4/5 basis-4/5"
                >
                  <div className="flex flex-col h-[28em] rounded-xl overflow-hidden border border-border bg-card text-card-foreground">
                    <div className="relative flex-1 bg-muted/30">
                      {vehicle.image ? (
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className={cn(
                            "absolute inset-0 size-full object-cover",
                            vehicle.imageClassName
                          )}
                        />
                      ) : (
                        <div className="absolute inset-0 grid place-items-center text-muted-foreground text-sm">
                          {vehicle.name} image
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-4 p-6 bg-card">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-medium">{vehicle.name}</h3>
                          {vehicle.category && (
                            <span className="text-xs font-medium uppercase tracking-wide rounded-full border border-border bg-muted/40 px-2 py-0.5 text-muted-foreground">
                              {vehicle.category}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {vehicle.description}
                        </p>
                      </div>
                      <BookNowButton />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export default VehiclesSection;
