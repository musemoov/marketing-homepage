'use client';

// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./hero";
import { DataMarketing } from "./data-marketing";
import WhyChooseUs from "./why-choose-us";
import CarouselFeatures from "./carousel-features";
import Pricing from "./solution";
import { GoodCase } from "./good-case";

export default function Campaign() {
  return (
    <>
      <Navbar />
      <div className="animate-fade-in">
        <Hero />
      </div>
      <div className="animate-fade-in">
        <DataMarketing />
      </div>
      <div className="animate-fade-in">
        <WhyChooseUs />
      </div>
      <CarouselFeatures />
      <div className="animate-fade-in">
        <Pricing />
      </div>
      <div className="animate-fade-in">
        <GoodCase />
      </div>
      <Footer />
    </>
  );
}
