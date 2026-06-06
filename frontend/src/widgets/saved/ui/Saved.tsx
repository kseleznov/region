"use client";

import { Heart } from "lucide-react";
import { Card } from "@/entities/card";
import { useSaved } from "../model/useSaved";

export function Saved() {
  const { savedCards } = useSaved();

  if (!savedCards.length) {
    return (
      <div className="flex flex-col px-4 pt-6">
        <div>
          <p className="text-sm text-brand-gray">Your collection</p>
          <h1 className="text-3xl font-bold text-dark">Saved</h1>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 mt-32">
          <div className="w-24 h-24 rounded-3xl bg-brand-pink/20 flex items-center justify-center">
            <Heart size={40} className="text-brand-pink fill-brand-pink" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xl font-bold text-dark">Nothing saved yet</p>
            <p className="text-sm text-brand-gray text-center">
              Tap the heart on any place to save it
              <br />
              here for later
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4 pt-6">
      <div>
        <p className="text-sm text-brand-gray">Your collection</p>
        <h1 className="text-3xl font-bold text-dark">Saved</h1>
      </div>
      <ul className="flex flex-col gap-3 mt-4">
        {savedCards.map((card) => (
          <Card key={card.id ?? card.name} {...card} />
        ))}
      </ul>
    </div>
  );
}
