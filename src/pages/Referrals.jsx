import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Gift,
  Copy,
  Users,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Referrals() {
  const [user, setUser] = useState(null);
  const [myReferral, setMyReferral] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    const me = await base44.auth.me();

    setUser(me);

    if (me?.email) {
      const referrals = await base44.entities.Referral.filter({
        owner_email: me.email,
      });

      if (referrals.length > 0) {
        setMyReferral(referrals[0]);
      }
    }

    setLoading(false);
  };

  const generateCode = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let code = "MM-";

    for (let i = 0; i < 6; i++) {
      code += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    return code;
  };

  const createReferral = async () => {
    const ownerEmail = user?.email || email;
    const ownerName = user?.full_name || name;

    if (!ownerEmail) {
      toast.error("Please enter your email");
      return;
    }

    setCreating(true);

    const referral =
      await base44.entities.Referral.create({
        referral_code: generateCode(),
        owner_email: ownerEmail,
        owner_name: ownerName,
        discount_percent: 10,
        times_used: 0,
        active: true,
      });

    setMyReferral(referral);

    setCreating(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(
      myReferral.referral_code
    );

    toast.success("Code copied to clipboard!");
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#160617" }}
      >
        <div
          className="w-12 h-12 rounded-full border-4 animate-spin"
          style={{
            borderColor:
              "rgba(255,215,90,0.2)",
            borderTopColor: "#f7c948",
          }}
        />
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

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
            style={{
              background:
                "rgba(255,215,90,0.1)",
              border:
                "1px solid rgba(255,215,90,0.18)",
              color: "#ffe082",
            }}
          >
            <Sparkles className="w-4 h-4" />

            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              Share The Sweetness
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
            Refer a Friend
          </h1>

          <p className="text-white/60 max-w-xl mx-auto text-lg">
            Invite friends and family to enjoy
            Miraculous Munchies and reward them
            with 10% off their first order.
          </p>
        </div>

        {myReferral ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              className="rounded-[2rem] p-8 text-center"
              style={{
                background:
                  "rgba(255,255,255,0.05)",
                border:
                  "1px solid rgba(255,215,90,0.14)",
                backdropFilter: "blur(18px)",
                boxShadow:
                  "0 20px 60px rgba(255,180,40,0.08)",
              }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background:
                    "rgba(255,215,90,0.1)",
                  border:
                    "1px solid rgba(255,215,90,0.18)",
                }}
              >
                <Gift className="w-10 h-10 text-yellow-300" />
              </div>

              <p className="text-white/50 mb-3 text-sm uppercase tracking-[0.2em]">
                Your Referral Code
              </p>

              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="text-4xl font-black text-yellow-300 tracking-[0.2em]">
                  {myReferral.referral_code}
                </span>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyCode}
                  className="rounded-full border-yellow-300/20 bg-white/5 text-yellow-300 hover:bg-yellow-300/10"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 text-sm mb-8">
                <div className="flex items-center gap-2 text-white/70">
                  <Users className="w-4 h-4 text-yellow-300" />

                  <span>
                    {myReferral.times_used || 0} friends referred
                  </span>
                </div>

                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle2 className="w-4 h-4" />

                  <span>Referral Active</span>
                </div>
              </div>

              <p className="text-white/50 leading-relaxed">
                Share this code with your friends.
                When they use it at checkout,
                they'll automatically receive
                10% off their first order.
              </p>
            </div>
          </motion.div>
        ) : (
          <div
            className="rounded-[2rem] p-8"
            style={{
              background:
                "rgba(255,255,255,0.05)",
              border:
                "1px solid rgba(255,215,90,0.14)",
              backdropFilter: "blur(18px)",
              boxShadow:
                "0 20px 60px rgba(255,180,40,0.08)",
            }}
          >
            <h3 className="font-bold text-white text-2xl mb-6">
              Generate Your Referral Code
            </h3>

            {!user?.email && (
              <div className="space-y-4 mb-6">
                <div>
                  <Label className="text-white">
                    Your Name
                  </Label>

                  <Input
                    placeholder="Full name"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    style={{
                      background:
                        "rgba(255,255,255,0.04)",
                      border:
                        "1px solid rgba(255,215,90,0.12)",
                      color: "white",
                    }}
                  />
                </div>

                <div>
                  <Label className="text-white">
                    Your Email *
                  </Label>

                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                    style={{
                      background:
                        "rgba(255,255,255,0.04)",
                      border:
                        "1px solid rgba(255,215,90,0.12)",
                      color: "white",
                    }}
                  />
                </div>
              </div>
            )}

            <Button
              onClick={createReferral}
              disabled={creating}
              className="w-full rounded-full h-14 border-0 font-bold uppercase tracking-wider"
              style={{
                background:
                  "linear-gradient(135deg,#f7c948 0%,#ffdf70 45%,#c69214 100%)",
                color: "#1a1203",
                boxShadow:
                  "0 12px 35px rgba(255,215,90,0.3)",
              }}
            >
              {creating
                ? "Generating..."
                : "Generate My Referral Code"}
            </Button>
          </div>
        )}

        {/* How it works */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              title: "Get Your Code",
              desc:
                "Generate your personal referral code.",
            },
            {
              step: "2",
              title: "Share It",
              desc:
                "Send it to friends and family.",
            },
            {
              step: "3",
              title: "They Save",
              desc:
                "They receive 10% off their first order.",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="text-center rounded-[1.8rem] p-6"
              style={{
                background:
                  "rgba(255,255,255,0.05)",
                border:
                  "1px solid rgba(255,215,90,0.14)",
                backdropFilter: "blur(18px)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full font-black flex items-center justify-center mx-auto mb-4"
                style={{
                  background:
                    "linear-gradient(135deg,#f7c948,#c69214)",
                  color: "#1a1203",
                }}
              >
                {s.step}
              </div>

              <h4 className="font-bold text-white mb-2">
                {s.title}
              </h4>

              <p className="text-sm text-white/55 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}