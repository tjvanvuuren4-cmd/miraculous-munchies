import React from "react";

export default function Terms() {
  return (
    <div
      className="min-h-screen px-4 py-20"
      style={{ background: "#160617" }}
    >
      <div
        className="max-w-4xl mx-auto rounded-[2rem] p-8"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,215,90,0.14)",
          backdropFilter: "blur(18px)",
        }}
      >
        <h1 className="text-4xl font-black text-yellow-300 mb-8">
          Terms & Conditions
        </h1>

        <div className="space-y-6 text-white/70 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              Orders
            </h2>

            <p>
              All orders are subject to availability and confirmation.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              Payments
            </h2>

            <p>
              Payments may be made via EFT or Cash on Delivery unless otherwise arranged.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              Deliveries
            </h2>

            <p>
              Delivery fees may apply depending on location. Delivery times are estimates and may vary.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              Custom Orders
            </h2>

            <p>
              Custom orders may require additional preparation time and confirmation before processing.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              Refunds
            </h2>

            <p>
              Refunds or replacements may be considered for damaged or incorrect orders reported within a reasonable timeframe.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              Contact
            </h2>

            <p>
              For any questions regarding these terms, contact us on WhatsApp at 063 711 4972.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}