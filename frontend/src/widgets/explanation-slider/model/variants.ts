import { cva } from "class-variance-authority";

export const variants = cva(
  "min-w-[200px] min-h-[260px] p-[24px] text-dark text-[26px] rounded-[16px] font-extrabold",
  {
    variants: {
      variant: {
        first: "bg-brand-purple",
        second: "bg-brand-green",
        third: "bg-brand-yellow",
        fourd: "bg-brand-pink",
      },
    },
  },
);
