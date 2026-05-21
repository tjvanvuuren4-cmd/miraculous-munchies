import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          `
          flex min-h-[100px] w-full rounded-xl
          border border-yellow-300/10
          bg-white/5
          px-4 py-3
          text-base text-white
          shadow-sm
          backdrop-blur-md
          transition-all duration-300
          placeholder:text-white/40

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-yellow-300/25
          focus-visible:border-yellow-300/30

          disabled:cursor-not-allowed
          disabled:opacity-50

          md:text-sm
          `,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };