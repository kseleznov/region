"use client";

import Image from "next/image";
import { Button } from "@/shared/ui";
import { useGreetingWindow } from "../model/useGreetingWindow";

export function GreetingWindow() {
  const { onClick } = useGreetingWindow();

  return (
    <div className="flex flex-col items-center h-full justify-center">
      <div className="relative h-[100px] w-[100px]">
        <Image
          src="/circle-text.svg"
          className="animate-spin [animation-duration:10s]"
          alt="circle text"
          width={100}
          height={100}
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
      <Image src="/map.svg" alt="map" width={300} height={230} priority />
      <div className="w-[300px] mb-[50px]">
        <h1 className="text-dark text-[42px] text-center font-extrabold">
          Explore Your City Today!
        </h1>
        <p className="text-brand-gray text-center">
          Find the best places, events, and restaurants all in one place
        </p>
      </div>
      <Button className="min-h-[70px]" variant="greeting" onClick={onClick}>
        Start exploring
      </Button>
    </div>
  );
}
