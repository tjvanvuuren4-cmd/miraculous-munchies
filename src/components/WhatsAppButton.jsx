import React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsAppButton({ className = "" }) {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "+27637114972";
  const message = "Hi Miraculous Munchies! I'd like to place an order.";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <Button className="bg-green-500 hover:bg-green-600 text-white gap-2">
        <MessageCircle className="w-4 h-4" />
        Chat on WhatsApp
      </Button>
    </a>
  );
}
