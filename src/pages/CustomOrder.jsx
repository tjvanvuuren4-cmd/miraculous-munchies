import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function CustomOrder() {
  const [form, setForm] = useState({
    description: "",
    dietary_notes: "",
    serving_size: "1 person",
    preferred_date: "",
    customer_name: "",
    customer_email: "",
    customer_phone: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setForm({
      description: "",
      dietary_notes: "",
      serving_size: "1 person",
      preferred_date: "",
      customer_name: "",
      customer_email: "",
      customer_phone: "",
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  const { error } = await supabase
    .from("mm_custom_orders")
    .insert([
      {
        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_phone: form.customer_phone,
        description: form.description,
        dietary_notes: form.dietary_notes,
        serving_size: form.serving_size,
        preferred_date: form.preferred_date,
        status: "new",
      },
    ]);

  setLoading(false);

  if (error) {
    console.error(error);
    return;
  }

  setSubmitted(true);
};

  if (submitted) {
    return (
      <div
        className="min-h-screen px-4 py-24 flex items-center justify-center"
        style={{ background: "#160617" }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-lg text-center rounded-[2rem] p-8"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,215,90,0.14)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 25px 70px rgba(255,180,40,0.12)",
          }}
        >
          <div className="w-16 h-16 rounded-full bg-yellow-300/15 flex items-center justify-center mx-auto mb-6 border border-yellow-300/20">
            <CheckCircle2 className="w-8 h-8 text-yellow-300" />
          </div>

          <h2 className="text-3xl font-black text-white mb-3">
            Request Submitted!
          </h2>

          <p className="text-white/65 mb-7 leading-relaxed">
            We’ve received your custom treat request. We’ll review it and get
            back to you with a quote.
          </p>

          <Button
            onClick={() => {
              setSubmitted(false);
              resetForm();
            }}
            className="rounded-full h-12 px-8 font-bold border-0"
            style={{
              background:
                "linear-gradient(135deg,#f7c948 0%,#ffdf70 45%,#c69214 100%)",
              color: "#1a1203",
              boxShadow: "0 12px 35px rgba(255,215,90,0.28)",
            }}
          >
            Submit Another Request
          </Button>
        </motion.div>
      </div>
    );
  }

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

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-10">
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
              Custom Treat Request
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
            Create Your Perfect Order
          </h1>

          <p className="text-white/65 text-lg">
            Tell us what you’re craving and we’ll help make it special.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] p-6 md:p-8 space-y-6"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,215,90,0.14)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 25px 70px rgba(255,180,40,0.1)",
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">
              What would you like us to make? *
            </Label>

            <Textarea
              id="description"
              placeholder="Describe your rusks, biscuits, treat box or special order..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dietary" className="text-white">
              Dietary Requirements / Notes
            </Label>

            <Textarea
              id="dietary"
              placeholder="Any allergies, preferences, flavours or special notes..."
              value={form.dietary_notes}
              onChange={(e) =>
                setForm({ ...form, dietary_notes: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Serving Size</Label>

              <Select
                value={form.serving_size}
                onValueChange={(v) => setForm({ ...form, serving_size: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="1 person">1 Person</SelectItem>
                  <SelectItem value="2 people">2 People</SelectItem>
                  <SelectItem value="4 people">4 People</SelectItem>
                  <SelectItem value="6+ people">6+ People</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-white">
                Preferred Date
              </Label>

              <Input
                id="date"
                type="date"
                value={form.preferred_date}
                onChange={(e) =>
                  setForm({ ...form, preferred_date: e.target.value })
                }
              />
            </div>
          </div>

          <div className="pt-6 space-y-4 border-t border-yellow-300/10">
            <h3 className="font-bold text-white text-lg">Your Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Name *
                </Label>

                <Input
                  id="name"
                  placeholder="Your full name"
                  value={form.customer_name}
                  onChange={(e) =>
                    setForm({ ...form, customer_name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email *
                </Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.customer_email}
                  onChange={(e) =>
                    setForm({ ...form, customer_email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">
                Phone Number
              </Label>

              <Input
                id="phone"
                type="tel"
                placeholder="Your phone number"
                value={form.customer_phone}
                onChange={(e) =>
                  setForm({ ...form, customer_phone: e.target.value })
                }
              />
            </div>
          </div>

<a
  href="https://wa.me/27637114972?text=Hi%20Miraculous%20Munchies%2C%20I%20would%20like%20help%20with%20a%20custom%20order."
  target="_blank"
  rel="noopener noreferrer"
  className="block text-center text-sm font-semibold text-yellow-300 hover:text-yellow-200 transition-colors"
>
  Need help with a custom order? WhatsApp us
</a>
          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-full h-14 border-0 font-bold uppercase tracking-wider"
            style={{
              background:
                "linear-gradient(135deg,#f7c948 0%,#ffdf70 45%,#c69214 100%)",
              color: "#1a1203",
              boxShadow: "0 12px 35px rgba(255,215,90,0.3)",
            }}
          >
            {loading ? (
              "Submitting..."
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Request
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}