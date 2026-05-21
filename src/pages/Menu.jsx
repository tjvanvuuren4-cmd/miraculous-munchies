import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MenuCard from "@/components/menu/MenuCard";
import { useCart } from "@/components/cart/CartContext";

const categories = [
  { value: "all", label: "All" },
  { value: "rusks", label: "🥨 Homemade Rusks" },
  { value: "biscuits", label: "🍪 Biscuits" },
  { value: "cookies", label: "🍫 Cookies" },
  { value: "cakes", label: "🎂 Cakes" },
  { value: "cupcakes", label: "🧁 Cupcakes" },
  { value: "platters", label: "🍱 Platters" },
  { value: "treat_boxes", label: "🎁 Treat Boxes" },
  { value: "specials", label: "✨ Specials" },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { itemCount } = useCart();

  const { data: menuItems = [], isLoading } = useQuery({
  queryKey: ["menuItems"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("mm_products")
      .select("*");

    if (error) throw error;

    return data;
  },
});

  const filteredItems =
    activeCategory === "all"
      ? menuItems.filter((i) => i.available !== false)
      : menuItems.filter(
          (i) => i.category === activeCategory && i.available !== false
        );

  return (
    <div
      className="min-h-screen px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden"
      style={{ background: "#160617" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top center, rgba(255,190,60,0.13), transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
              style={{
                background: "rgba(255,215,90,0.1)",
                border: "1px solid rgba(255,215,90,0.18)",
                color: "#ffe082",
              }}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">
                Freshly Baked
              </span>
            </div>

            <h1
              className="text-5xl font-black mb-4"
              style={{
                background:
                  "linear-gradient(135deg,#f7d774,#f7c948,#ffefad)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Our Treat Menu
            </h1>

            <p className="text-white/65 text-lg">
              Homemade rusks, cookies and sweet delights made with love.
            </p>
          </div>
          <div className="text-center mb-8">
          <a
            href="https://wa.me/27637114972?text=Hi%20Miraculous%20Munchies%2C%20I%20would%20like%20help%20choosing%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-semibold text-yellow-300 hover:text-yellow-200 transition-colors"
          >
            Need help choosing treats? WhatsApp us
          </a>
        </div>

          {itemCount > 0 && (
            <Link to="/Cart">
              <Button
                className="rounded-full h-14 px-8 border-0 font-bold uppercase tracking-wider"
                style={{
                  background:
                    "linear-gradient(135deg,#f7c948 0%,#ffdf70 45%,#c69214 100%)",
                  color: "#1a1203",
                  boxShadow: "0 12px 35px rgba(255,215,90,0.3)",
                }}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                View Cart ({itemCount})
              </Button>
            </Link>
          )}
        </div>

        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-10">
          <TabsList
            className="flex-wrap h-auto gap-2 p-2 rounded-[1.5rem]"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,215,90,0.14)",
              backdropFilter: "blur(18px)",
            }}
          >
            {categories.map((c) => (
              <TabsTrigger
                key={c.value}
                value={c.value}
                className="rounded-full px-5 py-2 text-white/70 data-[state=active]:text-[#1a1203]"
                style={{
                  fontWeight: 700,
                }}
              >
                {c.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="rounded-[2rem] overflow-hidden">
                  <Skeleton className="aspect-[4/3] w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>
                </div>
              ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div
            className="text-center py-20 rounded-[2rem]"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,215,90,0.14)",
              backdropFilter: "blur(18px)",
            }}
          >
            <p className="text-5xl mb-4">🍪</p>
            <p className="text-xl font-bold text-white">
              No treats in this category yet.
            </p>
            <p className="text-white/60 mt-2">
              Check back soon for delicious new additions!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}