"use client";

import Image from "next/image";
import { Button } from "@/shared/ui";
import { useTranslation } from "@/shared/i18n";
import { useGreetingWindow } from "../model/useGreetingWindow";

export function GreetingWindow() {
  const { onClick } = useGreetingWindow();
  const { t } = useTranslation();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-7">
      <div className="relative h-[92px] w-[92px] flex-shrink-0">
        <Image
          src="/circle-text.svg"
          className="animate-spin [animation-duration:10s]"
          alt="circle text"
          width={92}
          height={92}
          style={{ width: "100%", height: "100%" }}
          priority
        />
        <Image
          src="/pin.svg"
          alt="pin"
          width={20}
          height={20}
          className="absolute top-1/2 left-1/2 h-[20px] w-[20px] -translate-x-1/2 -translate-y-1/2"
          priority
        />
      </div>

      {/* Grows to fill the free space, but capped — and the only element
          allowed to shrink when the screen is short. */}
      <div className="relative w-full max-w-[300px] min-h-0 max-h-[240px] flex-1">
        <Image
          src="/map.svg"
          alt="map"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="w-full max-w-[360px] flex-shrink-0">
        <h1 className="text-dark text-[40px] leading-[1.08] text-center font-extrabold">
          {t("greeting.title")}
        </h1>
        <p className="mt-2 text-brand-gray text-center">
          {t("greeting.subtitle")}
        </p>
      </div>

      <Button
        className="min-h-[70px] w-full max-w-[440px] flex-shrink-0"
        variant="greeting"
        onClick={onClick}
      >
        {t("greeting.cta")}
      </Button>
    </div>
  );
}
