"use client";

import React, { useState } from "react";
import { WebData } from "@/types/content";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ChakraStrip } from "@/components/ChakraStrip";
import { AboutSection } from "@/components/AboutSection";
import { TherapiesSection } from "@/components/TherapiesSection";
import { WorkshopsSection } from "@/components/WorkshopsSection";
import { HarmonizationSection } from "@/components/HarmonizationSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { BookingSection } from "@/components/BookingSection";
import { LocationSection } from "@/components/LocationSection";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { GoogleSheetsBadge } from "@/components/GoogleSheetsBadge";

interface MainPageClientProps {
  data: WebData;
}

export const MainPageClient: React.FC<MainPageClientProps> = ({ data }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  const handleOpenBooking = (serviceName?: string) => {
    setPreselectedService(serviceName);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setPreselectedService(undefined);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#fbf9f5]">
      {/* Barra de navegación */}
      <Navbar config={data.config} onOpenBooking={handleOpenBooking} />

      {/* Contenido Principal */}
      <main className="flex-1">
        <Hero config={data.config} onOpenBooking={() => handleOpenBooking()} />
        <ChakraStrip chakras={data.chakras} />
        <AboutSection config={data.config} onOpenBooking={() => handleOpenBooking()} />
        <TherapiesSection therapies={data.therapies} onOpenBooking={handleOpenBooking} />
        <WorkshopsSection workshops={data.workshops} config={data.config} />
        <HarmonizationSection items={data.harmonization} config={data.config} />
        <ReviewsSection reviews={data.reviews} config={data.config} />
        <BookingSection config={data.config} onOpenBooking={() => handleOpenBooking()} />
        <LocationSection config={data.config} />
      </main>

      {/* Pie de página */}
      <Footer config={data.config} />

      {/* Modal interactivo de reservas */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        config={data.config}
        therapies={data.therapies}
        preselectedService={preselectedService}
      />
    </div>
  );
};
