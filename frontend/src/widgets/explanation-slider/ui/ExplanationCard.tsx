"use client";

import { VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";
import { variants } from "../model/variants";

export function ExplanationCard({
  children,
  variant,
}: React.ComponentProps<"div"> & VariantProps<typeof variants>) {
  return <div className={cn(variants({ variant }))}>{children}</div>;
}
