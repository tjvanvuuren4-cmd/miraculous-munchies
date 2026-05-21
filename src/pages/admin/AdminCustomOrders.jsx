import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function AdminCustomOrders() {
  const [orders, setOrders] = useState([]);
  const [notes, setNotes] = useState({});

  const loadOrders = async () => {
    const { data } = await supabase
      .from("mm_custom_orders")
      .select("*")
      .order("created_at", { ascending: false });

    setOrders(data || []);

    const noteMap = {};
    (data || []).forEach((order) => {
      noteMap[order.id] = order.internal_notes || "";
    });
    setNotes(noteMap);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await supabase
      .from("mm_custom_orders")
      .update({ status })
      .eq("id", id);

    loadOrders();
  };

  const updateNotes = async (id) => {
    await supabase
      .from("mm_custom_orders")
      .update({ internal_notes: notes[id] || "" })
      .eq("id", id);

    loadOrders();
  };

  const deleteRequest = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this custom order request permanently?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("mm_custom_orders")
      .delete()
      .eq("id", id);

    loadOrders();
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{ background: "#160617" }}
    >
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
          Admin Custom Orders
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

                  <p className="text-white/30 text-xs mt-3">
                    Request ID: {order.id}
                  </p>
                </div>

                <div className="flex flex-col items-start lg:items-end gap-3">
                  <span
                    className={`px-4 py-2 rounded-full text-xs font-bold ${
                      order.status === "completed"
                        ? "bg-green-500/20 text-green-300"
                        : order.status === "quoted"
                        ? "bg-purple-500/20 text-purple-300"
                        : order.status === "in_progress"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {order.status}
                  </span>

                  <div className="flex gap-2 flex-wrap justify-start lg:justify-end">
                    <Button onClick={() => updateStatus(order.id, "new")}>
                      New
                    </Button>

                    <Button onClick={() => updateStatus(order.id, "in_progress")}>
                      In Progress
                    </Button>

                    <Button onClick={() => updateStatus(order.id, "quoted")}>
                      Quoted
                    </Button>

                    <Button onClick={() => updateStatus(order.id, "completed")}>
                      Completed
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() => deleteRequest(order.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-yellow-300/10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-white/40 text-sm mb-2">
                      Custom Request
                    </p>

                    <p className="text-white/75 leading-relaxed">
                      {order.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-white/40 text-sm">
                        Dietary Notes
                      </p>

                      <p className="text-white">
                        {order.dietary_notes || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-white/40 text-sm">
                        Serving Size
                      </p>

                      <p className="text-white">
                        {order.serving_size || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-white/40 text-sm">
                        Preferred Date
                      </p>

                      <p className="text-white">
                        {order.preferred_date || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-white/40 text-sm mb-2">
                    Internal Notes
                  </p>

                  <Textarea
                    placeholder="Add private notes for this request..."
                    value={notes[order.id] || ""}
                    onChange={(e) =>
                      setNotes({
                        ...notes,
                        [order.id]: e.target.value,
                      })
                    }
                  />

                  <Button
                    onClick={() => updateNotes(order.id)}
                    className="mt-3 rounded-full"
                  >
                    Save Notes
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="text-white/60 text-center py-20">
              No custom orders yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}