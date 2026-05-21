import React from "react";

export default function Privacy() {
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
          Privacy Policy
        </h1>

        <div className="space-y-6 text-white/70 leading-relaxed">
          <p>
            Miraculous Munchies values your privacy and is committed to protecting your personal information.
          </p>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              Information We Collect
            </h2>

            <p>
              We may collect your name, phone number, email address, delivery address, and order information when placing orders or contacting us.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              How We Use Your Information
            </h2>

            <p>
              Your information is used to process orders, arrange deliveries, provide customer support, and improve our services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              Information Security
            </h2>

            <p>
              We take reasonable steps to protect your information and do not sell or share your personal information with third parties unless required to complete your order.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              Contact
            </h2>

            <p>
              For privacy-related questions, please contact us via WhatsApp at 063 711 4972.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}