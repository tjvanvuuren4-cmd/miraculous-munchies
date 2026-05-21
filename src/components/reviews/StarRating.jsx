import React from "react";
import { Star } from "lucide-react";

export default function StarRating({ value, onChange, size = "md", readOnly = false }) {
  const sizes = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-8 h-8" };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange && onChange(star)}
          className={`${readOnly ? "cursor-default" : "cursor-pointer hover:scale-110 transition-transform"}`}
        >
          <Star
            className={`${sizes[size]} ${
              star <= value
                ? "fill-amber-400 text-amber-400"
                : "fill-none text-stone-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}