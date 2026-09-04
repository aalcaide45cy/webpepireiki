"use client";

import React from "react";
import { SiteConfig } from "@/types/content";
import { Sparkles, CheckCircle2, HeartHandshake, Feather, Flower2 } from "lucide-react";
import Image from "next/image";

interface AboutSectionProps {
  config: SiteConfig;
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ config, onOpenBooking }) => {
  return (
    <section id="sobre-mi" className="py-24 bg-[#fbf9f5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Imagen y Composición Visual */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md">
              
              {/* Imagen de la terapeuta / espacio */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] bg-[#ece4d8]">
                <Image
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80"
                  alt={`Espacio y terapeuta de ${config.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#212924]/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-serif text-2xl font-medium">{config.therapistName}</p>
                  <p className="text-xs text-[#dfc89f] tracking-wider uppercase">
                    Quiromasajista & Terapeuta Holística
                  </p>
                </div>
              </div>

              {/* Distintivo de Filosofía */}
              <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-white p-5 rounded-2xl shadow-xl border border-[#ece4d8] max-w-[240px]">
                <div className="flex items-center gap-2 text-[#3d5a4c] mb-1.5">
                  <Feather className="w-5 h-5 text-[#b5935b]" />
                  <span className="font-semibold text-xs uppercase tracking-wider">Tacto Consciente</span>
                </div>
                <p className="text-xs text-[#55645a] leading-relaxed">
                  Tratamos a la persona en su totalidad, nunca a un síntoma aislado.
                </p>
              </div>
            </div>
          </div>

          {/* Texto y Principios */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eaf0ec] text-[#345041] text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#b5935b]" />
              <span>Sobre Mí y la Esencia del Espacio</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1e2621] font-normal tracking-tight leading-tight mb-6">
              Un refugio para soltar el ruido y{" "}
              <span className="italic font-medium text-[#385345]">volver a tu centro</span>.
            </h2>

            <p className="text-base sm:text-lg text-[#55645a] leading-relaxed mb-6">
              {config.therapistBio}
            </p>

            <p className="text-sm sm:text-base text-[#617267] leading-relaxed mb-8">
              En <strong className="text-[#212924] font-semibold">{config.name}</strong>, cada sesión comienza con una pequeña escucha previa para comprender qué necesita tu cuerpo en ese instante: si una descarga muscular profunda, la calma sutil de una imposición de manos o la claridad que aportan los Registros Akáshicos.
            </p>

            {/* Los 3 Pilares Holísticos */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#ece4d8] shadow-xs">
                <div className="p-2 rounded-xl bg-[#eaf0ec] text-[#3d5a4c] flex-shrink-0 mt-0.5">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#212924]">Presencia y Escucha Activa</h4>
                  <p className="text-xs sm:text-sm text-[#55645a] mt-0.5">
                    No aplicamos protocolos mecánicos; adaptamos la presión, el ritmo y la técnica a lo que tus tejidos y tu energía comunican.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#ece4d8] shadow-xs">
                <div className="p-2 rounded-xl bg-[#eaf0ec] text-[#3d5a4c] flex-shrink-0 mt-0.5">
                  <Flower2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#212924]">Cosmética y Botánica Sagrada</h4>
                  <p className="text-xs sm:text-sm text-[#55645a] mt-0.5">
                    Utilizamos exclusivamente aceites vegetales de primera presión en frío y aceites esenciales puros ecológicos, libres de parafinas o químicos sintéticos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-[#ece4d8] shadow-xs">
                <div className="p-2 rounded-xl bg-[#eaf0ec] text-[#3d5a4c] flex-shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#212924]">Entorno Armonizado & Desconexión Total</h4>
                  <p className="text-xs sm:text-sm text-[#55645a] mt-0.5">
                    Música en frecuencia 432Hz, luz cálida y espacio purificado antes de cada cita para que tu mente desconecte nada más cruzar la puerta.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#3d5a4c] text-white font-medium text-sm shadow-sm hover:bg-[#2d473b] hover:shadow transition-all cursor-pointer"
            >
              <span>Conoce el Espacio · Solicitar Cita</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
