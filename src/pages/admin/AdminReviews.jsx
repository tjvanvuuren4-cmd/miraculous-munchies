import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Star, Trash2 } from "lucide-react";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);

  const loadReviews = async () => {
    const { data } = await supabase
      .from("mm_reviews")
      .select("*")
      .order("created_at", { ascending: false });

    setReviews(data || []);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const toggleApproval = async (id, approved) => {
    await supabase
      .from("mm_reviews")
      .update({
        approved: !approved,
      })
      .eq("id", id);

    loadReviews();
  };

  const deleteReview = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this review permanently?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("mm_reviews")
      .delete()
      .eq("id", id);

    loadReviews();
  };

  const renderStars = (count) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < count
                ? "fill-yellow-300 text-yellow-300"
                : "text-white/20"
            }`}
          />
        ))}
      </div>
    );
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
          Admin Reviews
        </h1>

        <div className="grid gap-5">
          {reviews.map((review) => (
            <div
              key={review.id}
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
                    {review.customer_name}
                  </h2>

                  <p className="text-white/60 text-sm">
                    {review.customer_email}
                  </p>

                  <div className="mt-3">
                    {renderStars(review.overall_rating)}
                  </div>

                  <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-white/40">
                        Overall
                      </p>

                      <p className="text-yellow-300">
                        {review.overall_rating}/5
                      </p>
                    </div>

                    <div>
                      <p className="text-white/40">
                        Food Quality
                      </p>

                      <p className="text-yellow-300">
                        {review.food_quality_rating}/5
                      </p>
                    </div>

                    <div>
                      <p className="text-white/40">
                        Delivery
                      </p>

                      <p className="text-yellow-300">
                        {review.delivery_rating}/5
                      </p>
                    </div>

                    <div>
                      <p className="text-white/40">
                        Service
                      </p>

                      <p className="text-yellow-300">
                        {review.service_rating}/5
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start lg:items-end gap-3">
                  <span
                    className={`px-4 py-2 rounded-full text-xs font-bold ${
                      review.approved
                        ? "bg-green-500/20 text-green-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {review.approved
                      ? "VISIBLE"
                      : "HIDDEN"}
                  </span>

                  <div className="flex gap-2 flex-wrap">
                    <Button
                      onClick={() =>
                        toggleApproval(
                          review.id,
                          review.approved
                        )
                      }
                    >
                      {review.approved
                        ? "Hide Review"
                        : "Approve Review"}
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() =>
                        deleteReview(review.id)
                      }
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>

              {review.comment && (
                <div className="mt-6 pt-6 border-t border-yellow-300/10">
                  <p className="text-white/75 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              )}

              <div className="mt-5">
                <p className="text-white/30 text-xs">
                  {review.created_at
                    ? new Date(
                        review.created_at
                      ).toLocaleString()
                    : ""}
                </p>
              </div>
            </div>
          ))}

          {reviews.length === 0 && (
            <div className="text-white/60 text-center py-20">
              No reviews yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}