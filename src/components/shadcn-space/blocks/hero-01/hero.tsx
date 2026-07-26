"use client";

import "@fontsource/instrument-serif/400-italic.css";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowRight } from "lucide-react";

// Headline accent word ("Priority") keeps the shadcn-space design language.
const instrumentSerifClass = "font-['Instrument_Serif',serif] italic tracking-tight";

function HeroSection() {
  return (
    <section>
      <div className="w-full h-full relative">
        <div className="relative w-full pt-0 md:pt-20 pb-6 md:pb-10 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-sky-100 before:via-white before:to-amber-100 before:rounded-full before:top-24 before:blur-3xl before:-z-10 dark:before:from-slate-800 dark:before:via-black dark:before:to-stone-700 dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10">
          <div className="container mx-auto relative z-10">
            <div className="flex flex-col max-w-5xl mx-auto gap-8">
              <div className="relative flex flex-col text-center items-center sm:gap-6 gap-4">
                <motion.h1
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="lg:text-8xl md:text-7xl text-5xl font-medium leading-14 md:leading-20 lg:leading-24"
                >
                  Your Ride,{" "}
                  <span className={instrumentSerifClass}>
                    Our Priority
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: "easeInOut" }}
                  className="text-base font-normal max-w-2xl text-muted-foreground"
                >
                  Eagle Taxi gets you there safely and on time — airport transfers, business trips, or a ride across town. Available 24/7 in Huye and across Rwanda. We take you anywhere you want.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
                className="flex items-center justify-center flex-col sm:flex-row gap-5"
              >
                {/* Primary: Call or WhatsApp — same pill style as Book Now buttons elsewhere */}
                <a
                  href="https://wa.me/250798086791?text=Hello%20Eagle%20Taxi%2C%20I%20would%20like%20to%20book%20a%20ride"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 w-fit overflow-hidden cursor-pointer inline-flex items-center bg-primary text-primary-foreground hover:bg-primary/85 transition-all duration-500 hover:ps-14 hover:pe-6 gap-0"
                >
                  <span className="relative z-10 transition-all duration-500 flex items-center gap-2">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="size-4"
                    >
                      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.888 9.884a9.86 9.86 0 0 0 1.669 5.521l-.999 3.648 3.738-.978zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>Call or WhatsApp</span>
                  </span>
                  <span className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </span>
                </a>

                {/* Secondary: Learn More — outline pill linking to the routes section */}
                <a
                  href="#book"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-transparent text-foreground hover:bg-muted transition-colors px-6 h-12 text-sm font-medium cursor-pointer w-fit"
                >
                  <span>Learn More</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
