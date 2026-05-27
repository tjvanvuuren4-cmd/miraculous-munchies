import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChefHat, Gift, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";
import WhatsAppButton from "@/components/WhatsAppButton";

const features = [
  { icon: ChefHat, title: "Set Menu", desc: "Browse our curated selection of delicious treats", link: "/Menu" },
  { icon: Star, title: "Custom Orders", desc: "Tell us what you crave and we'll make it happen", link: "/CustomOrder" },
  { icon: Gift, title: "Refer & Save", desc: "Share with friends and get 10% off your next order", link: "/Referrals" },
  { icon: Clock, title: "Easy EFT Payment", desc: "Simple bank transfer — no fuss, no hidden fees", link: "/Menu" },
];

export default function Home() {
  return (
    <div>
{/* Hero */}
<section className="relative min-h-[88vh] overflow-hidden bg-[#160617] text-white">
  <motion.img
    src="/images/mm-hero.webp"
    alt="Miraculous Munchies"
    initial={{ scale: 1.01 }}
    animate={{
      scale: [1.01, 1.04, 1.01],
      y: [0, -8, 0],
    }}
    transition={{
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute inset-0 h-full w-full object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-r from-[#160617]/10 via-transparent to-[#160617]/10" />

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[88vh] flex items-end pb-20">
    <div className="flex flex-wrap gap-4">
      <Link to="/Menu">
        <Button
          size="lg"
          className="group border-0 rounded-full px-8 h-14 text-sm font-bold uppercase tracking-wider transition-all duration-300"
          style={{
            background:
              "linear-gradient(135deg, #f7c948 0%, #ffdf70 45%, #c69214 100%)",
            color: "#1a1203",
            boxShadow: "0 10px 35px rgba(255,215,90,0.35)",
          }}
        >
          View Treats
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>

      <a
        href="https://wa.me/27637114972"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          size="lg"
          className="group rounded-full px-8 h-14 text-sm font-bold uppercase tracking-wider border transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,215,90,0.35)",
            color: "#ffe082",
            boxShadow: "0 8px 28px rgba(255,215,90,0.12)",
          }}
        >
          Chat on WhatsApp
        </Button>
      </a>
    </div>
  </div>
</section>

     {/* Features */}
<section className="bg-[#160617] px-4 sm:px-6 lg:px-8 py-20">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-14">
      <p className="text-yellow-300 uppercase tracking-[0.3em] text-sm font-bold mb-3">
        Sweet & Simple
      </p>
      <h2 className="text-4xl font-bold text-white mb-4">
        How It Works
      </h2>
      <p className="text-white/70 max-w-lg mx-auto">
        Order homemade rusks, cookies and treats in just a few easy steps.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <Link to={f.link}>
            <div className="group h-full rounded-3xl p-6 transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,215,90,0.18)",
                boxShadow: "0 20px 60px rgba(255,180,40,0.08)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="w-14 h-14 rounded-2xl bg-yellow-400/15 flex items-center justify-center mb-5 border border-yellow-300/25">
                <f.icon className="w-7 h-7 text-yellow-300" />
              </div>

              <h3 className="font-bold text-white mb-3">
                {f.title}
              </h3>

              <p className="text-sm text-white/60 leading-relaxed">
                {f.desc}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* CTA */}
<section className="bg-[#160617] px-4 sm:px-6 lg:px-8 pb-24">
  <div className="max-w-7xl mx-auto">
    <div className="relative rounded-[2rem] overflow-hidden min-h-[360px] flex items-center justify-center text-center"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,215,90,0.12), rgba(90,20,75,0.8))",
        border: "1px solid rgba(255,215,90,0.18)",
        boxShadow: "0 30px 90px rgba(255,180,40,0.12)",
      }}
    >
      <img
        src="/images/mm-hero.webp"
        alt="Miraculous Munchies treats"
        className="absolute inset-0 w-full h-full object-cover opacity-35"
      />

      <div className="absolute inset-0 bg-[#160617]/65" />

      <div className="relative z-10 px-6 max-w-2xl">
        <p className="text-yellow-300 uppercase tracking-[0.3em] text-sm font-bold mb-4">
          Custom Treats
        </p>

        <h3 className="text-3xl md:text-5xl font-bold text-white mb-5">
          Got something sweet in mind?
        </h3>

        <p className="text-white/70 mb-8">
          Tell us what you’re craving and we’ll help create the perfect homemade treat order.
        </p>

        <Link to="/CustomOrder">
          <Button
            size="lg"
            className="rounded-full px-8 h-14 font-bold uppercase tracking-wider border-0"
            style={{
              background:
                "linear-gradient(135deg, #f7c948 0%, #ffdf70 45%, #c69214 100%)",
              color: "#1a1203",
              boxShadow: "0 10px 35px rgba(255,215,90,0.35)",
            }}
          >
            Place a Custom Order
          </Button>
        </Link>
      </div>
    </div>
  </div>
</section> 
    </div>
  );
}