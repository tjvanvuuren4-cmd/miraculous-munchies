import React from "react";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "+27637114972";
  const message = "Hi Miraculous Munchies! I'd like to place an order.";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 hover:scale-110 transition-transform duration-300"
      title="Chat with us on WhatsApp"
    >
      <div className="relative">
        {/* Pulsing background */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse" />
        {/* Button */}
        <div className="relative bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
          <MessageCircle className="w-7 h-7" />
        </div>
        {/* Label */}
        <div className="absolute bottom-full right-0 mb-2 bg-stone-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          Chat on WhatsApp
        </div>
      </div>
    </a>
  );
}
