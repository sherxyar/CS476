import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none",
          variant === "destructive" && "bg-red-500 text-white",
          variant === "outline" && "border border-gray-300",
          variant === "secondary" && "bg-gray-500 text-white",
          variant === "ghost" && "bg-transparent text-gray-700",
          variant === "link" && "bg-transparent text-blue-500",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
