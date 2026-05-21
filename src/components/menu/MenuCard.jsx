import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import { useCart } from "../cart/CartContext";
import { motion } from "framer-motion";
import logoImage from "@/images/logo.jpg";

export default function MenuCard({ item }) {
  const { items, addItem } = useCart();
  const inCart = items.find(i => i.menu_item_id === item.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={item.image_url || logoImage}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = logoImage;
          }}
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-stone-900">{item.name}</h3>
          <span className="text-amber-600 font-bold whitespace-nowrap">R{item.price?.toFixed(2)}</span>
        </div>
        {item.description && (
          <p className="text-sm text-stone-500 mb-4 line-clamp-2">{item.description}</p>
        )}
        <Button
          onClick={() => addItem(item)}
          className={`w-full ${inCart ? "bg-green-600 hover:bg-green-700" : "bg-amber-500 hover:bg-amber-600 text-stone-900"}`}
        >
          {inCart ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              In Cart ({inCart.quantity})
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}