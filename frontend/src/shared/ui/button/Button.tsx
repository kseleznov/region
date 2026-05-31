import * as React from "react";
import { cn } from "@/shared/lib/cn";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./variants";

type TButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function Button({
  type,
  variant,
  className,
  children,
  onClick,
  disabled,
}: TButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant }), className)}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
