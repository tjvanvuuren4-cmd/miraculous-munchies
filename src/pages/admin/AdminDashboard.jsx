import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";
import { Package, ShoppingBag, Star, ClipboardList } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    reviews: 0,
    customOrders: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const [{ count: products }, { count: orders }, { count: reviews }, { count: customOrders }] =
        await Promise.all([
          supabase.from("mm_products").select("*", { count: "exact", head: true }),
          supabase.from("mm_orders").select("*", { count: "exact", head: true }),
          supabase.from("mm_reviews").select("*", { count: "exact", head: true }),
          supabase.from("mm_custom_orders").select("*", { count: "exact", head: true }),
        ]);

      setStats({
        products: products || 0,
        orders: orders || 0,
        reviews: reviews || 0,
        customOrders: customOrders || 0,
      });
    };

    loadStats();
  }, []);

  const cards = [
    { title: "Products", value: stats.products, icon: Package, link: "/admin/products" },
    { title: "Orders", value: stats.orders, icon: ShoppingBag, link: "/admin/orders" },
    { title: "Reviews", value: stats.reviews, icon: Star, link: "/admin/reviews" },
    { title: "Custom Orders", value: stats.customOrders, icon: ClipboardList, link: "/admin/custom-orders" },
  ];

  return (
    <div className="min-h-screen p-8" style={{ background: "#160617" }}>
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-5xl font-black mb-10"
          style={{
            background: "linear-gradient(135deg,#f7d774,#f7c948,#ffefad)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Admin Dashboard
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link key={card.title} to={card.link}>
                <div
                  className="rounded-[2rem] p-6"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,215,90,0.14)",
                    backdropFilter: "blur(18px)",
                  }}
                >
                  <Icon className="w-8 h-8 text-yellow-300 mb-5" />

                  <p className="text-white/50 text-sm">{card.title}</p>

                  <h2 className="text-4xl font-black text-white mt-2">
                    {card.value}
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}