import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        `
        flex h-12 w-full rounded-xl
        border border-yellow-300/10
        bg-white/5
        px-4 py-2
        text-base text-white
        shadow-sm
        backdrop-blur-md
        transition-all duration-300
        placeholder:text-white/40

        file:border-0
        file:bg-transparent
        file:text-sm
        file:font-medium
        file:text-yellow-300

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
});

Input.displayName = "Input";

export { Input };