import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { placeOrder } from "@/lib/placeOrder";
import { useCart } from "@/components/cart/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Tag,
  CheckCircle2,
  Copy,
  MapPin,
  Store,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

const DELIVERY_FEE = 49.99;

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();
  const [referralCode, setReferralCode] = useState("");
  const [discount, setDiscount] = useState(null);
  const [applyingCode, setApplyingCode] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    delivery_address: "",
  });
  const [fulfillmentType, setFulfillmentType] = useState("collection");
  const [submitting, setSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderRef, setOrderRef] = useState("");

  const [orderTotal, setOrderTotal] = useState(0);

  const applyReferral = async () => {
    if (!referralCode.trim()) return;
    setApplyingCode(true);
    const referrals = await base44.entities.Referral.filter({ referral_code: referralCode.trim().toUpperCase(), active: true });
    if (referrals.length > 0) {
      setDiscount(referrals[0]);
      toast.success(`${referrals[0].discount_percent}% discount applied!`);
    } else {
      toast.error("Invalid or expired referral code");
      setDiscount(null);
    }
    setApplyingCode(false);
  };

  const deliveryFee = fulfillmentType === "delivery" ? DELIVERY_FEE : 0;
  const discountAmount = discount ? subtotal * (discount.discount_percent / 100) : 0;
  const total = subtotal + deliveryFee - discountAmount;

  const handleCheckout = async (e) => {
  e.preventDefault();

  try {
    setSubmitting(true);

    const order = await placeOrder({
      customerInfo,
      fulfillmentType,
      subtotal,
      deliveryFee,
      discountAmount,
      total,
      discount,
      items,
    });

    setOrderRef(order.id);

    setOrderTotal(total);

    clearCart();

    setOrderPlaced(true);
  } catch (err) {
    console.error(err);
    toast.error("Failed to place order");
  } finally {
    setSubmitting(false);
  }
};
  if (orderPlaced) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
      style={{ background: "#160617" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top center, rgba(255,190,60,0.14), transparent 60%)",
        }}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative z-10 max-w-xl w-full text-center rounded-[2rem] p-8"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,215,90,0.14)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 25px 80px rgba(255,180,40,0.12)",
        }}
      >
        <div className="w-16 h-16 rounded-full bg-yellow-300/15 flex items-center justify-center mx-auto mb-6 border border-yellow-300/20">
          <CheckCircle2 className="w-8 h-8 text-yellow-300" />
        </div>

        <h2 className="text-3xl font-black text-white mb-3">
          Order Placed!
        </h2>

        <p className="text-white/60 mb-8">
          Your order has been received. Please complete your EFT payment using the details below.
        </p>

        <div
          className="rounded-[1.5rem] p-6 text-left mb-8"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,215,90,0.12)",
          }}
        >
          <h3 className="font-bold text-yellow-300 mb-4">
            EFT Banking Details
          </h3>

          <div className="space-y-3 text-sm text-white">
            <p><span className="text-white/50">Bank:</span> ABSA</p>
            <p><span className="text-white/50">Account Name:</span> Miraculous Munchies</p>
            <p><span className="text-white/50">Account Number:</span> WhatsApp 0637114972 for account number</p>
            <p><span className="text-white/50">Branch Code:</span> 632005</p>
            <p>
              <span className="text-white/50">Reference:</span>{" "}
              <span className="font-bold text-yellow-300">MM-{orderRef}</span>
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 h-6 px-2 text-yellow-300"
                onClick={() => {
                  navigator.clipboard.writeText(`MM-${orderRef}`);
                  toast.success("Copied!");
                }}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </p>

            <p className="font-black text-xl mt-4 text-yellow-300">
              Amount: R{orderTotal.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/MyOrders">
            <Button variant="outline" className="rounded-full">
              View Order Tracker
            </Button>
          </Link>

          <Link to="/Menu">
            <Button
              className="rounded-full border-0 font-bold"
              style={{
                background:
                  "linear-gradient(135deg,#f7c948 0%,#ffdf70 45%,#c69214 100%)",
                color: "#1a1203",
              }}
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

  if (items.length === 0) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
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

      <div
        className="relative z-10 max-w-lg mx-auto text-center rounded-[2rem] p-10"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,215,90,0.14)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 20px 60px rgba(255,180,40,0.08)",
        }}
      >
        <ShoppingBag className="w-16 h-16 text-yellow-300 mx-auto mb-6" />

        <h2 className="text-3xl font-black text-white mb-3">
          Your cart is empty
        </h2>

        <p className="text-white/60 mb-8">
          Browse our delicious treats and add something magical to your cart.
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
    </div>
  );
}

  return (
    <div
  className="min-h-screen px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden"
  style={{ background: "#160617" }}
>
  {/* GOLD GLOW */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background:
        "radial-gradient(circle at top center, rgba(255,190,60,0.12), transparent 60%)",
    }}
  />

<div
  className="min-h-screen px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden"
  style={{ background: "#160617" }}
>
  {/* GOLD GLOW */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background:
        "radial-gradient(circle at top center, rgba(255,190,60,0.12), transparent 60%)",
    }}
  />

  <div className="max-w-6xl mx-auto relative z-10">
      <h1
  className="text-5xl font-black mb-10"
  style={{
    background:
      "linear-gradient(135deg,#f7d774,#f7c948,#ffefad)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
>
  Your Sweet Cart
</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div
  key={item.menu_item_id}
  className="rounded-[1.8rem] p-4 flex items-center justify-between gap-4"
  style={{
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,215,90,0.14)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 20px 60px rgba(255,180,40,0.08)",
  }}
>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white truncate">{item.name}</h3>
                <p className="text-sm text-amber-600 font-semibold">R{item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.menu_item_id, item.quantity - 1)}>
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.menu_item_id, item.quantity + 1)}>
                  <Plus className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600" onClick={() => removeItem(item.menu_item_id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <span className="font-semibold text-white w-20 text-right">R{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Summary & Checkout */}
        <div className="space-y-4">
          {/* Fulfillment Toggle */}
          <div
  className="rounded-[1.8rem] p-5"
  style={{
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,215,90,0.14)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 20px 60px rgba(255,180,40,0.08)",
  }}
>
            <h3 className="font-semibold text-white mb-3">Collection or Delivery?</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFulfillmentType("collection")}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  fulfillmentType === "collection"
                    ? "border-amber-500 bg-amber-50 text-amber-700"
                    : "border-stone-200 text-white/60 hover:border-stone-300"
                }`}
              >
                <Store className="w-5 h-5" />
                <span>Collection</span>
                <span className="text-xs font-normal">Free</span>
              </button>
              <button
                type="button"
                onClick={() => setFulfillmentType("delivery")}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  fulfillmentType === "delivery"
                    ? "border-amber-500 bg-amber-50 text-amber-700"
                    : "border-stone-200 text-white/60 hover:border-stone-300"
                }`}
              >
                <MapPin className="w-5 h-5" />
                <span>Delivery</span>
                <span className="text-xs font-normal">R{DELIVERY_FEE.toFixed(2)}</span>
              </button>
            </div>
          </div>

          {/* Referral Code */}
          <div className="rounded-[1.8rem]
           p-5">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2"><Tag className="w-4 h-4" /> Referral Code</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Enter code"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                className="uppercase"
              />
              <Button onClick={applyReferral} disabled={applyingCode} variant="outline">
                {applyingCode ? "..." : "Apply"}
              </Button>
            </div>
            {discount && (
              <p className="text-green-600 text-sm mt-2 font-medium">{discount.discount_percent}% discount applied!</p>
            )}
          </div>

          {/* Totals */}
<div
  className="rounded-[1.8rem] p-5"
  style={{
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,215,90,0.14)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 20px 60px rgba(255,180,40,0.08)",
  }}
>
  <div className="space-y-3 text-sm text-white">
    <div className="flex justify-between">
      <span className="text-white/60">Subtotal</span>
      <span>R{subtotal.toFixed(2)}</span>
    </div>

    {deliveryFee > 0 && (
      <div className="flex justify-between">
        <span className="text-white/60">Delivery Fee</span>
        <span>R{deliveryFee.toFixed(2)}</span>
      </div>
    )}

    {discount && (
      <div className="flex justify-between text-green-400">
        <span>Discount ({discount.discount_percent}%)</span>
        <span>-R{discountAmount.toFixed(2)}</span>
      </div>
    )}

    <div className="border-t border-yellow-300/15 pt-3 flex justify-between text-lg font-bold">
      <span>Total</span>
      <span className="text-yellow-300">R{total.toFixed(2)}</span>
    </div>
  </div>
</div>

{/* Customer Info */}
<a
  href="https://wa.me/27637114972?text=Hi%20Miraculous%20Munchies%2C%20I%20need%20help%20with%20my%20order."
  target="_blank"
  rel="noopener noreferrer"
  className="block text-center text-sm font-semibold text-yellow-300 hover:text-yellow-200 transition-colors mb-4"
>
  Need help? WhatsApp us
</a>
<form
  onSubmit={handleCheckout}
  className="rounded-[1.8rem] p-5 space-y-4"
  style={{
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,215,90,0.14)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 20px 60px rgba(255,180,40,0.08)",
  }}
>
  <h3 className="font-semibold text-white">
    {fulfillmentType === "delivery" ? "Delivery Details" : "Your Details"}
  </h3>

  <div className="space-y-3">
    <div>
      <Label className="text-white">Name *</Label>
      <Input
        placeholder="Full name"
        value={customerInfo.customer_name}
        onChange={(e) =>
          setCustomerInfo({
            ...customerInfo,
            customer_name: e.target.value,
          })
        }
        required
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,215,90,0.12)",
          color: "white",
        }}
      />
    </div>

    <div>
      <Label className="text-white">Email *</Label>
      <Input
        type="email"
        placeholder="your@email.com"
        value={customerInfo.customer_email}
        onChange={(e) =>
          setCustomerInfo({
            ...customerInfo,
            customer_email: e.target.value,
          })
        }
        required
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,215,90,0.12)",
          color: "white",
        }}
      />
    </div>

    <div>
      <Label className="text-white">Phone</Label>
      <Input
        type="tel"
        placeholder="Phone number"
        value={customerInfo.customer_phone}
        onChange={(e) =>
          setCustomerInfo({
            ...customerInfo,
            customer_phone: e.target.value,
          })
        }
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,215,90,0.12)",
          color: "white",
        }}
      />
    </div>

    {fulfillmentType === "delivery" && (
      <div>
        <Label className="text-white">Delivery Address *</Label>
        <Input
          placeholder="Your delivery address"
          value={customerInfo.delivery_address}
          onChange={(e) =>
            setCustomerInfo({
              ...customerInfo,
              delivery_address: e.target.value,
            })
          }
          required
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,215,90,0.12)",
            color: "white",
          }}
        />
      </div>
    )}
  </div>

  <Button
    type="submit"
    disabled={submitting}
    className="w-full rounded-full h-14 border-0 font-bold uppercase tracking-wider"
    style={{
      background:
        "linear-gradient(135deg,#f7c948 0%,#ffdf70 45%,#c69214 100%)",
      color: "#1a1203",
      boxShadow: "0 12px 35px rgba(255,215,90,0.3)",
    }}
  >
    {submitting ? "Placing Order..." : `Place Order — R${total.toFixed(2)}`}
  </Button>

  <p className="text-xs text-white/45 text-center">
    Payment via EFT. Banking details will be provided after placing your order.
  </p>
</form>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}