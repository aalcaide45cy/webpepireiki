"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";

interface CartDrawerProps {
  whatsappNumber?: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ whatsappNumber = "34600123456" }) => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
  
  const [deliveryType, setDeliveryType] = useState<"cabina" | "envio">("cabina");
  const [clientName, setClientName] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [notes, setNotes] = useState("");

  if (!isCartOpen) return null;

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    let message = `🌿 *Nuevo Pedido - Blanco y Negro Tienda*\n\n`;
    message += `Hola Pepi, me gustaría realizar este pedido:\n\n`;

    items.forEach((item, index) => {
      const sub = (item.product.price * item.quantity).toFixed(2);
      message += `${index + 1}. *${item.product.name}*\n   Cantidad: ${item.quantity} x ${item.product.price.toFixed(2)}€ = ${sub}€\n`;
    });

    message += `\n💰 *Total Estimado: ${totalPrice.toFixed(2)}€*\n`;
    message += `📦 *Modalidad:* ${deliveryType === "cabina" ? "Recogida en Cabina (Gratis)" : "Envío a Domicilio"}\n`;

    if (clientName.trim()) {
      message += `👤 *Nombre:* ${clientName.trim()}\n`;
    }
    if (deliveryType === "envio" && clientCity.trim()) {
      message += `📍 *Dirección/Ciudad:* ${clientCity.trim()}\n`;
    }
    if (notes.trim()) {
      message += `📝 *Nota:* ${notes.trim()}\n`;
    }

    message += `\n¿Tenéis disponibilidad de stock para confirmar el pago por Bizum?`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#e8ded0]">
          
          {/* Cabecera del Carrito */}
          <div className="bg-[#3d5a4c] px-6 py-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#dfc89f]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold leading-tight">Tu Cesta Holística</h3>
                <p className="text-xs text-white/80">{totalItems} {totalItems === 1 ? "producto" : "productos"}</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lista de Productos */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#f4efe5] text-[#3d5a4c] mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-[#212924]">Tu cesta está vacía</h4>
                <p className="text-xs text-[#6e7d73] max-w-xs mx-auto">
                  Añade algún aceite esencial, mineral o herramienta de autocuidado para iniciar tu pedido.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#3d5a4c] hover:underline"
                >
                  <span>Explorar productos &rarr;</span>
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#fbf9f5] border border-[#ece4d8]"
                    >
                      {/* Miniatura */}
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#e8ded0] flex-shrink-0">
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Datos */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-[#212924] truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs font-bold text-[#3d5a4c] mt-0.5">
                          {item.product.price.toFixed(2)}€
                        </p>

                        {/* Controles de cantidad */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="inline-flex items-center border border-[#cbdbd0] rounded-lg bg-white">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 hover:bg-[#f3eee4] text-[#4a584f]"
                              aria-label="Restar una unidad"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-[#212924]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 hover:bg-[#f3eee4] text-[#4a584f]"
                              aria-label="Añadir una unidad"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1 text-[#9aa79f] hover:text-red-600 transition-colors"
                            title="Eliminar producto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal del item */}
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs font-bold text-[#212924]">
                          {(item.product.price * item.quantity).toFixed(2)}€
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Preferencia de entrega */}
                <div className="pt-4 border-t border-[#ece4d8] space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3d5a4c]">
                    Modalidad de Entrega:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType("cabina")}
                      className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                        deliveryType === "cabina"
                          ? "bg-[#eaf0ec] border-[#3d5a4c] text-[#2d473b] font-semibold"
                          : "bg-white border-[#e0d8cc] text-[#55645a]"
                      }`}
                    >
                      <span className="block font-semibold">Recogida en Cabina</span>
                      <span className="text-[10px] text-[#718276]">Gratis en Valencia</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType("envio")}
                      className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                        deliveryType === "envio"
                          ? "bg-[#eaf0ec] border-[#3d5a4c] text-[#2d473b] font-semibold"
                          : "bg-white border-[#e0d8cc] text-[#55645a]"
                      }`}
                    >
                      <span className="block font-semibold">Envío a Domicilio</span>
                      <span className="text-[10px] text-[#718276]">Consultar tarifa</span>
                    </button>
                  </div>

                  {/* Datos opcionales del cliente */}
                  <div className="space-y-2 pt-1">
                    <input
                      type="text"
                      placeholder="Tu nombre (opcional)"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#cbdbd0] text-xs text-[#212924] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3d5a4c]"
                    />
                    {deliveryType === "envio" && (
                      <input
                        type="text"
                        placeholder="Ciudad / Código Postal para envío"
                        value={clientCity}
                        onChange={(e) => setClientCity(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#cbdbd0] text-xs text-[#212924] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3d5a4c]"
                      />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Pie del Carrito con Subtotal y CTA WhatsApp */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#ece4d8] bg-[#fbf9f5] space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-[#6e7d73]">
                  <span>Subtotal productos</span>
                  <span>{totalPrice.toFixed(2)}€</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#6e7d73]">
                  <span>Entrega</span>
                  <span>{deliveryType === "cabina" ? "Gratis" : "A convenir"}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-[#212924] pt-1.5 border-t border-[#e8ded0]">
                  <span>Total Estimado</span>
                  <span className="text-base text-[#3d5a4c]">{totalPrice.toFixed(2)}€</span>
                </div>
              </div>

              {/* Botón de pedido WhatsApp */}
              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Pedir por WhatsApp (Bizum / En mano)</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#718276]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3d5a4c]" />
                <span>Trato directo sin comisiones intermedias</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
