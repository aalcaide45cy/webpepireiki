"use client";

import React, { useState, useEffect } from "react";
import { SiteConfig } from "@/types/content";
import { Sparkles, Calendar, Menu, X, Phone, MessageCircle } from "lucide-react";

interface NavbarProps {
  config: SiteConfig;
  onOpenBooking: (preselectedService?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ config, onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Terapias", href: "#terapias" },
    { name: "Sobre el Espacio", href: "#sobre-mi" },
    { name: "Chakras", href: "#chakras" },
    { name: "Talleres", href: "#talleres" },
    { name: "Armonización", href: "#armonizacion" },
    { name: "Reseñas", href: "#resenas" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#fbf9f5]/90 backdrop-blur-md shadow-sm py-3 border-b border-[#ece4d8]/80"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#3d5a4c] text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
              <Sparkles className="w-5 h-5 text-[#dfc89f]" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wide text-[#212924] block leading-tight">
                {config.name}
              </span>
              <span className="text-xs text-[#5e7065] tracking-wider uppercase font-medium block">
                Terapias Holísticas & Bienestar
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#414d45] hover:text-[#2d473b] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#3d5a4c] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${config.whatsapp}?text=Hola%20${encodeURIComponent(
                config.name
              )},%20quisiera%20consultar%20información%20sobre%20tus%20terapias.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full text-[#3d5a4c] hover:bg-[#eaf0ec] transition-colors"
              title="Contactar por WhatsApp"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3d5a4c] text-white font-medium text-sm shadow-sm hover:bg-[#2d473b] hover:shadow transition-all duration-200 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#dfc89f]" />
              <span>Pedir Cita</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="p-2 rounded-full bg-[#3d5a4c] text-white"
              title="Pedir Cita"
            >
              <Calendar className="w-4 h-4 text-[#dfc89f]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#212924] rounded-lg hover:bg-[#f0ebe1]"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-[#ece4d8] bg-[#fbf9f5] rounded-2xl p-4 shadow-lg">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-base font-medium text-[#2d473b] hover:bg-[#f0ebe1] rounded-lg"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-[#ece4d8] flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#3d5a4c] text-white font-medium text-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#dfc89f]" />
                  <span>Pedir Cita</span>
                </button>
                <a
                  href={`tel:${config.phone}`}
                  className="w-full py-2.5 rounded-xl bg-[#eaf0ec] text-[#2d473b] font-medium text-sm flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Llamar: {config.phoneDisplay}</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
