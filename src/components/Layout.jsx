import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Home, BookOpen, MessageSquare, Gift, ClipboardList, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "/images/mm-logo.webp";
import FloatingWhatsApp from "./FloatingWhatsApp";

const navLinks = [
  { path: "/Home", label: "Home", icon: Home },
  { path: "/Menu", label: "Menu", icon: BookOpen },
  { path: "/CustomOrder", label: "Custom Order", icon: MessageSquare },
  { path: "/Referrals", label: "Refer a Friend", icon: Gift },
  { path: "/MyOrders", label: "Order Tracker ", icon: ClipboardList },
  { path: "/Reviews", label: "Rate Us", icon: Star },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-stone-50">
      <style>{`
        :root {
          --brand-gold: #D4A853;
          --brand-dark: #1C1917;
          --brand-cream: #FBF7F0;
        }
      `}</style>

      {/* Header */}
      <header
        className="sticky top-0 z-50 backdrop-blur-xl border-b"
        style={{
          background: "rgba(22, 6, 23, 0.92)",
          borderColor: "rgba(255, 215, 90, 0.14)",
          boxShadow: "0 10px 40px rgba(255, 180, 40, 0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/Home" className="flex items-center gap-2">
              <span className="text-2xl"></span>
              <span className="font-bold text-xl tracking-tight"
                style={{
                  background: "linear-gradient(135deg,#f7d774,#f7c948,#ffefad)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>Miraculous Munchies</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link key={path} to={path}>
                  <Button
                    variant="ghost"
                    className={`text-stone-300 hover:text-amber-400 hover:bg-stone-800 ${location.pathname === path ? "text-amber-400 bg-stone-800" : ""
                      }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </Button>
                </Link>
              ))}
              <Link to="/Cart">
                <Button variant="ghost" className="text-stone-300 hover:text-amber-400 hover:bg-stone-800 relative">
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </Link>
            </nav>
            </div>

            {/* Mobile toggle */}
            <div className="md:hidden flex items-center gap-2">
              <Link to="/Cart">
                <Button variant="ghost" size="icon" className="text-stone-300">
                  <ShoppingCart className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="text-stone-300" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-stone-900 border-t border-stone-800 overflow-hidden"
            >
              <nav className="px-4 py-3 space-y-1">
                {navLinks.map(({ path, label, icon: Icon }) => (
                  <Link key={path} to={path} onClick={() => setMobileOpen(false)}>
                    <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${location.pathname === path
                        ? "text-amber-400 bg-stone-800"
                        : "text-stone-300 hover:text-amber-400 hover:bg-stone-800"
                      }`}>
                      <Icon className="w-4 h-4" />
                      {label}
                    </div>
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
    <footer
  className="relative overflow-hidden mt-0"
  style={{
    background: "#160617",
    borderTop: "1px solid rgba(255,215,90,0.12)",
  }}
>
  {/* Watermark Logo */}
  <img
    src={logoImage}
    alt="MM Logo"
    className="absolute left-[-20px] bottom-[0px] w-[500px] opacity-[0.035] pointer-events-none select-none"
    style={{
      filter: "blur(1px)",
    }}
  />

  {/* Glow */}
  <div
    className="absolute inset-0"
    style={{
      background:
        "radial-gradient(circle at top center, rgba(255,190,60,0.12), transparent 60%)",
    }}
  />

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

      {/* Brand */}
      <div>
        <h3
          className="text-3xl font-bold mb-4"
          style={{
            background:
              "linear-gradient(135deg,#f7d774,#f7c948,#ffefad)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Miraculous Munchies
        </h3>

        <p className="text-white/65 leading-relaxed max-w-sm">
          Homemade rusks, cookies and sweet treats crafted with warmth, love and premium ingredients.
        </p>
      </div>
{/* Links */}
<div>
  <h4 className="text-yellow-300 font-semibold mb-5 uppercase tracking-widest text-sm">
    Quick Links
  </h4>

  <div className="space-y-3 text-sm">

    <Link
      to="/Menu"
      className="block text-white/65 hover:text-yellow-300 transition-colors"
    >
      Our Treats
    </Link>

    <Link
      to="/CustomOrder"
      className="block text-white/65 hover:text-yellow-300 transition-colors"
    >
      Custom Orders
    </Link>

    <Link
      to="/Reviews"
      className="block text-white/65 hover:text-yellow-300 transition-colors"
    >
      Customer Reviews
    </Link>

    <Link
      to="/privacy"
      className="block text-white/65 hover:text-yellow-300 transition-colors"
    >
      Privacy Policy
    </Link>

    <Link
      to="/terms"
      className="block text-white/65 hover:text-yellow-300 transition-colors"
    >
      Terms & Conditions
    </Link>

    <div className="pt-4 flex gap-4">
      <a
        href="https://www.facebook.com/profile.php?id=61589695194322"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/65 hover:text-yellow-300 transition-colors"
      >
        Facebook
      </a>

      <a
        href="#"
        className="text-white/65 hover:text-yellow-300 transition-colors"
      >
        TikTok
      </a>
    </div>

  </div>
</div>
      {/* Contact */}
      <div>
        <h4 className="text-yellow-300 font-semibold mb-5 uppercase tracking-widest text-sm">
          Contact
        </h4>

        <div className="space-y-4 text-sm text-white/65">

          <div>
            <p className="text-yellow-300 font-semibold mb-1">
              Orders & WhatsApp
            </p>

            <a
              href="https://wa.me/27637114972"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition-colors"
            >
              063 711 4972
            </a>
          </div>

          <div>
            <p className="text-yellow-300 font-semibold mb-1">
              Service Area
            </p>

            <p>
              Benoni & surrounding areas. Other areas can also be serviced.
            </p>
          </div>

          <div>
            <p className="text-yellow-300 font-semibold mb-1">
              Payment Methods
            </p>

            <p>
              EFT or Cash on Delivery
            </p>
          </div>

          <div>
            <p className="text-yellow-300 font-semibold mb-1">
              Delivery
            </p>

            <p>
              Delivery to your doorstep available at an additional charge.
            </p>
          </div>

        </div>
      </div>

    </div>

    {/* Bottom */}
    <div
      className="mt-12 pt-8 text-center text-sm text-gray-300"
      style={{
        borderTop: "1px solid rgba(255,215,90,0.08)",
      }}
    >
      © 2026 Miraculous Munchies. Crafted with love.
    </div>

  </div>
</footer>

      {/* Floating WhatsApp Widget */}
      <FloatingWhatsApp />
    </div>
  );
}