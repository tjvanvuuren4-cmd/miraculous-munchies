import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, MessageSquare, Star } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import StarRating from "@/components/reviews/StarRating";
import { format } from "date-fns";

const ratingLabels = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

const avgRating = (reviews, field) => {
  const valid = reviews.filter(r => r[field] > 0);
  if (!valid.length) return 0;
  return valid.reduce((sum, r) => sum + r[field], 0) / valid.length;
};

export default function Reviews() {
  const queryClient = useQueryClient();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    overall_rating: 0,
    food_quality_rating: 0,
    delivery_rating: 0,
    service_rating: 0,
    comment: "",
  });

  const { data: reviews = [], isLoading } = useQuery({
  queryKey: ["reviews"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("mm_reviews")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  },
});

  const mutation = useMutation({
  mutationFn: async (data) => {
    const { error } = await supabase
      .from("mm_reviews")
      .insert([data]);

    if (error) throw error;
  },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      setSubmitted(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.overall_rating === 0) {
      toast.error("Please give an overall rating");
      return;
    }
    mutation.mutate(form);
  };

  const overallAvg = avgRating(reviews, "overall_rating");
  const foodAvg = avgRating(reviews, "food_quality_rating");
  const deliveryAvg = avgRating(reviews, "delivery_rating");
  const serviceAvg = avgRating(reviews, "service_rating");

        return (
     <div
      className="min-h-screen px-4 sm:px-6 lg:px-8 py-16"
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
       <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10">
         <h1
  className="text-5xl font-black mb-4"
  style={{
    background:
      "linear-gradient(135deg,#f7d774,#f7c948,#ffefad)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
>
  Sweet Customer Reviews
</h1>
        <p className="text-white/65 mt-2 text-lg">Your feedback helps us serve you better</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Review Form */}
        <div>
          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-[2rem] p-8 text-center"
              style={{
               background: "rgba(255,255,255,0.05)",
               border: "1px solid rgba(255,215,90,0.14)",
               backdropFilter: "blur(20px)",
               boxShadow: "0 25px 70px rgba(255,180,40,0.08)",
              }}
              >
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
              <p className="text-white/60 mb-6">We really appreciate your feedback. It helps us improve every day.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ customer_name: "", customer_email: "", overall_rating: 0, food_quality_rating: 0, delivery_rating: 0, service_rating: 0, comment: "" });
                }}
              >
                Submit Another Review
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-[2rem] p-6 space-y-5"
              style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,215,90,0.14)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 25px 70px rgba(255,180,40,0.08)",
            }}
            >
              <h2 className="font-semibold text-white text-lg">Leave a Review</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-white">Your Name *</Label>
                  <Input placeholder="Full name" value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} required />
                </div>
                <div className="space-y-1">
                  <Label className="text-white">Email</Label>
                  <Input type="email" placeholder="your@email.com" value={form.customer_email} onChange={(e) => setForm({ ...form, customer_email: e.target.value })} />
                </div>
              </div>

              {/* Ratings */}
              <div className="space-y-4 rounded-[1.5rem] p-5"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,215,90,0.12)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 20px 50px rgba(255,180,40,0.06)",
                }}
              >
                {[
                  { key: "overall_rating", label: "Overall Experience *" },
                  { key: "food_quality_rating", label: "Food Quality" },
                  { key: "delivery_rating", label: "Delivery" },
                  { key: "service_rating", label: "Customer Service" },
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-stone-700 w-40">{label}</span>
                    <div className="flex items-center gap-3">
                      <StarRating
                        value={form[key]}
                        onChange={(val) => setForm({ ...form, [key]: val })}
                      />
                      {form[key] > 0 && (
                        <span className="text-xs text-amber-600 font-medium w-16">{ratingLabels[form[key]]}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <Label className="text-white">Comments</Label>
                <Textarea
                  placeholder="Tell us about your experience..."
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>

              <Button
               type="submit" 
               disabled={mutation.isPending}
               className="w-full rounded-full h-14 border-0 font-bold uppercase tracking-wider"
               style={{
               background:
                 "linear-gradient(135deg,#f7c948 0%,#ffdf70 45%,#c69214 100%)",
               color: "#1a1203",
               boxShadow: "0 12px 35px rgba(255,215,90,0.3)",
              }}
              >
                {mutation.isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
            
          )}
        </div>
        <a
         href="https://wa.me/27637114972?text=Hi%20Miraculous%20Munchies%2C%20I%20have%20a%20question%20about%20my%20experience."
         target="_blank"
         rel="noopener noreferrer"
         className="block text-center text-sm font-semibold text-yellow-300 hover:text-yellow-200 transition-colors mb-4"
        >
        Questions or feedback? WhatsApp us
        </a>
        {/* Stats & Reviews */}
        <div className="space-y-6">
          {/* Summary */}
          {reviews.length > 0 && (
            <div className="rounded-[2rem] p-6"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,215,90,0.14)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 25px 70px rgba(255,180,40,0.08)",
              }}
              >
              <h3 className="font-semibold text-white mb-4">Overall Ratings</h3>
              <div className="flex items-center gap-4 mb-5">
                <span className="text-5xl font-bold text-amber-500">{overallAvg.toFixed(1)}</span>
                <div>
                  <StarRating value={Math.round(overallAvg)} readOnly size="md" />
                  <p className="text-sm text-white/60 mt-1">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Food Quality", avg: foodAvg },
                  { label: "Delivery", avg: deliveryAvg },
                  { label: "Customer Service", avg: serviceAvg },
                ].map(({ label, avg }) => avg > 0 && (
                  <div key={label} className="flex items-center gap-3 text-sm">
                    <span className="text-white/60 w-32">{label}</span>
                    <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(avg / 5) * 100}%` }} />
                    </div>
                    <span className="text-stone-700 font-medium w-6">{avg.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Reviews */}
          <div>
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Customer Reviews
            </h3>
            {isLoading ? (
              <p className="text-stone-400 text-sm">Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <div className="bg-white rounded-xl border border-stone-200 p-6 text-center text-stone-400">
                <Star className="w-8 h-8 mx-auto mb-2 text-stone-200" />
                <p>No reviews yet. Be the first!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2">
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[1.5rem] p-5"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,215,90,0.12)",
                      backdropFilter: "blur(16px)",
                      boxShadow: "0 20px 50px rgba(255,180,40,0.06)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="font-medium text-white text-sm">{review.customer_name}</p>
                        <p className="text-xs text-stone-400">{review.created_date ? format(new Date(review.created_date), "MMM d, yyyy") : ""}</p>
                      </div>
                      <StarRating value={review.overall_rating} readOnly size="sm" />
                    </div>
                    {review.comment && <p className="text-sm text-stone-600 leading-relaxed">{review.comment}</p>}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
);
}