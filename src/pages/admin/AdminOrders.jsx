import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  const loadOrders = async () => {
    const { data } = await supabase
      .from("mm_orders")
      .select(`
        *,
        mm_order_items (*)
      `)
      .order("created_at", { ascending: false });

    setOrders(data || []);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await supabase
      .from("mm_orders")
      .update({ order_status: status })
      .eq("id", id);

    loadOrders();
  };

  const markPaymentConfirmed = async (id) => {
    await supabase
      .from("mm_orders")
      .update({ payment_status: "confirmed" })
      .eq("id", id);

    loadOrders();
  };

  const cancelOrder = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    await supabase
      .from("mm_orders")
      .update({ order_status: "cancelled" })
      .eq("id", id);

    loadOrders();
  };

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this order permanently?"
    );

    if (!confirmDelete) return;

    await supabase.from("mm_orders").delete().eq("id", id);

    loadOrders();
  };

  const sendWhatsAppOrder = (order) => {
    const itemsText =
      order.mm_order_items
        ?.map(
          (item) =>
            `${item.quantity}x ${item.name} - R${(
              item.price * item.quantity
            ).toFixed(2)}`
        )
        .join("\n") || "No items listed";

    const message = `
🔥 New Miraculous Munchies Order

Customer: ${order.customer_name}
Phone: ${order.customer_phone || "-"}
Email: ${order.customer_email || "-"}

Items:
${itemsText}

Total: R${order.total}
Method: ${order.fulfillment_type}
Payment: ${order.payment_status}
Status: ${order.order_status}
Address: ${order.delivery_address || "Collection"}

Order ID: ${order.id}
`;

    window.open(
      `https://wa.me/27637114972?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen p-8" style={{ background: "#160617" }}>
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-5xl font-black mb-10"
          style={{
            background:
              "linear-gradient(135deg,#f7d774,#f7c948,#ffefad)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Admin Orders
        </h1>

        <div className="grid gap-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-[2rem] p-6"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,215,90,0.14)",
                backdropFilter: "blur(18px)",
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                <div>
                  <h2 className="text-white font-bold text-xl">
                    {order.customer_name}
                  </h2>

                  <p className="text-white/60 text-sm">
                    {order.customer_email}
                  </p>

                  <p className="text-white/60 text-sm">
                    {order.customer_phone}
                  </p>

                  {order.delivery_address && (
                    <p className="text-white/60 text-sm mt-2">
                      {order.delivery_address}
                    </p>
                  )}

                  <p className="text-white/40 text-xs mt-3">
                    Order ID: {order.id}
                  </p>
                </div>

                <div className="flex flex-col items-start lg:items-end gap-3">
                  <div className="flex gap-2 flex-wrap justify-start lg:justify-end">
                    <Badge
                      className="border-0 capitalize"
                      style={{
                        background: "rgba(255,215,90,0.12)",
                        color: "#ffe082",
                      }}
                    >
                      {order.order_status}
                    </Badge>

                    <Badge
                      className="border-0 capitalize"
                      style={{
                        background:
                          order.payment_status === "confirmed"
                            ? "rgba(34,197,94,0.18)"
                            : "rgba(255,215,90,0.12)",
                        color:
                          order.payment_status === "confirmed"
                            ? "#86efac"
                            : "#ffe082",
                      }}
                    >
                      Payment: {order.payment_status}
                    </Badge>
                  </div>

                  <div className="text-yellow-300 font-black text-2xl">
                    R{Number(order.total).toFixed(2)}
                  </div>

                  <div className="flex gap-2 flex-wrap justify-start lg:justify-end">
                    <Button onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}>
                      {expandedId === order.id ? "Hide Items" : "View Items"}
                    </Button>

                    <Button onClick={() => markPaymentConfirmed(order.id)}>
                      Payment Confirmed
                    </Button>

                    <Button onClick={() => updateStatus(order.id, "preparing")}>
                      Preparing
                    </Button>

                    <Button onClick={() => updateStatus(order.id, "ready")}>
                      Ready
                    </Button>

                    <Button onClick={() => updateStatus(order.id, "delivered")}>
                      Delivered
                    </Button>

                    <Button
                      onClick={() => sendWhatsAppOrder(order)}
                      style={{
                        background: "#25D366",
                        color: "white",
                      }}
                    >
                      WhatsApp
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => cancelOrder(order.id)}
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() => deleteOrder(order.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>

              {expandedId === order.id && (
                <div className="mt-6 pt-6 border-t border-yellow-300/10">
                  <h3 className="text-white font-bold mb-4">
                    Order Items
                  </h3>

                  <div className="grid gap-3">
                    {order.mm_order_items?.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between rounded-xl p-4"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,215,90,0.08)",
                        }}
                      >
                        <div>
                          <p className="text-white font-semibold">
                            {item.quantity}x {item.name}
                          </p>

                          <p className="text-white/50 text-sm">
                            R{Number(item.price).toFixed(2)} each
                          </p>
                        </div>

                        <p className="text-yellow-300 font-bold">
                          R{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-5 pt-5 border-t border-yellow-300/10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-white/40">Method</p>
                    <p className="text-white">{order.fulfillment_type}</p>
                  </div>

                  <div>
                    <p className="text-white/40">Delivery Fee</p>
                    <p className="text-white">
                      R{Number(order.delivery_fee).toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p className="text-white/40">Discount</p>
                    <p className="text-white">
                      R{Number(order.discount_amount).toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p className="text-white/40">Created</p>
                    <p className="text-white">
                      {order.created_at
                        ? new Date(order.created_at).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="text-white/60 text-center py-20">
              No orders yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}