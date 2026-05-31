import { cva } from "class-variance-authority";

export const buttonVariants = cva("rounded-full w-full px-[30px] py-[15px]", {
  variants: {
    variant: {
      greeting: ["text-white text-lg font-extrabold", "bg-dark"].join(" "),
      confirmCity: [
        "text-lg font-extrabold text-light",
        "bg-brand-purple",
      ].join(" "),
      selectedCity: [
        "flex items-center justify-center gap-[5px]",
        "w-auto px-[18px] py-[10px]",
        "text-white text-sm font-extrabold",
        "bg-white/15 backdrop-blur-md border border-white/30",
      ].join(" "),
      viewAll: [
        "flex items-center justify-center",
        "w-[48px] h-[48px] p-0",
        "bg-brand-purple",
      ].join(" "),
    },
  },
});
