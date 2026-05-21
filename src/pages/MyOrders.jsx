import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import {
  ClipboardList,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function MyOrders() {
  const [expandedId, setExpandedId] = useState(null);

  const { data: orders = [], isLoading } = useQuery({
  queryKey: ["myOrders"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("mm_orders")
      .select(`
        *,
        mm_order_items (*)
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  },
});

  if (isLoading) {
    return (
      <div
        className="min-h-screen px-4 py-16"
        style={{ background: "#160617" }}
      >
        <div className="max-w-3xl mx-auto space-y-4">
          <Skeleton className="h-8 w-48" />
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Skeleton
                key={i}
                className="h-28 w-full rounded-[2rem]"
              />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden"
      style={{ background: "#160617" }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top center, rgba(255,190,60,0.12), transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
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
              Order Tracking
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
            Live Orders
          </h1>

          <p className="text-white/60 text-lg">
            View recent bakery orders and live order statuses.
          </p>
        </div>

        {orders.length === 0 ? (
          <div
            className="text-center py-20 rounded-[2rem]"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,215,90,0.14)",
              backdropFilter: "blur(18px)",
              boxShadow: "0 20px 60px rgba(255,180,40,0.08)",
            }}
          >
            <ClipboardList className="w-16 h-16 text-yellow-300 mx-auto mb-5" />

            <h2 className="text-3xl font-black text-white mb-3">
              No orders yet
            </h2>

            <p className="text-white/60 mb-8">
              Place your first sweet order from our magical menu.
            </p>

            <Link to="/Menu">
              <Button
                className="rounded-full px-8 h-14 border-0 font-bold uppercase tracking-wider"
                style={{
                  background:
                    "linear-gradient(135deg,#f7c948 0%,#ffdf70 45%,#c69214 100%)",
                  color: "#1a1203",
                  boxShadow: "0 12px 35px rgba(255,215,90,0.3)",
                }}
              >
                Browse Treats
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="overflow-hidden rounded-[2rem]"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,215,90,0.14)",
                  backdropFilter: "blur(18px)",
                  boxShadow: "0 20px 60px rgba(255,180,40,0.08)",
                }}
              >
                <button
                  onClick={() =>
                    setExpandedId(
                      expandedId === order.id ? null : order.id
                    )
                  }
                  className="w-full p-6 flex items-center justify-between"
                >
                  <div className="text-left">
                    <p className="font-bold text-white text-lg">
                      Order #
                      {order.id?.slice(-6).toUpperCase()}
                    </p>

                    <p className="text-sm text-white/50 mt-1">
                      {order.created_date
                        ? format(
                            new Date(order.created_date),
                            "MMM d, yyyy 'at' h:mm a"
                          )
                        : ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge
                      className="capitalize border-0"
                      style={{
                        background: "rgba(255,215,90,0.12)",
                        color: "#ffe082",
                      }}
                    >
                      {order.order_status}
                    </Badge>

                    <span className="font-black text-yellow-300 text-lg">
                      R{order.total?.toFixed(2)}
                    </span>

                    {expandedId === order.id ? (
                      <ChevronUp className="w-5 h-5 text-white/40" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/40" />
                    )}
                  </div>
                </button>

                {expandedId === order.id && (
                  <div className="border-t border-yellow-300/10 p-6 space-y-4">
                    {order.items?.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-sm text-white"
                      >
                        <span>
                          {item.quantity}x {item.name}
                        </span>

                        <span className="text-white/60">
                          R
                          {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}

                    {order.discount_amount > 0 && (
                      <div className="flex justify-between text-green-400 text-sm">
                        <span>
                          Discount ({order.referral_code_used})
                        </span>

                        <span>
                          -R
                          {order.discount_amount?.toFixed(2)}
                        </span>
                      </div>
                    )}

                    <div className="border-t border-yellow-300/10 pt-4 flex justify-between font-bold text-white">
                      <span>Total</span>

                      <span className="text-yellow-300">
                        R{order.total?.toFixed(2)}
                      </span>
                    </div>

                    <div className="pt-2">
                      <Badge
                        className="border-0"
                        style={{
                          background: "rgba(255,215,90,0.12)",
                          color: "#ffe082",
                        }}
                      >
                        Payment: {order.payment_status}
                      </Badge>
                    </div>

                    {order.payment_status === "pending" && (
                      <div
                        className="rounded-[1.5rem] p-4 text-sm"
                        style={{
                          background:
                            "rgba(255,215,90,0.06)",
                          border:
                            "1px solid rgba(255,215,90,0.12)",
                        }}
                      >
                        <p className="font-bold text-white mb-1">
                          EFT Payment Pending
                        </p>

                        <p className="text-white/60">
                          Reference:
                          <span className="font-black text-yellow-300 ml-2">
                            MM-{order.id}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}