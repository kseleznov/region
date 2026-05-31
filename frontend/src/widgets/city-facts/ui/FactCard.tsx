import Image from "next/image";
import type { Fact } from "../model/facts";

interface FactCardProps {
  fact: Fact;
}

export function FactCard({ fact }: FactCardProps) {
  if (fact.type === "stat") {
    return (
      <div
        className={`${fact.color} rounded-2xl p-4 h-44 flex flex-col justify-between`}
      >
        <span
          className={`text-5xl font-extrabold leading-none ${fact.textColor}`}
        >
          {fact.value}
        </span>
        <span
          className={`text-xs font-bold tracking-widest uppercase ${fact.textColor}`}
        >
          {fact.label}
        </span>
      </div>
    );
  }

  if (fact.type === "text") {
    return (
      <div className={`${fact.color} rounded-2xl p-4 h-44`}>
        <p
          className={`text-sm font-semibold leading-relaxed ${fact.textColor}`}
        >
          {fact.text}
        </p>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden h-44">
      <Image
        src={fact.url}
        alt={fact.caption}
        fill
        sizes="(max-width: 500px) 80vw, 400px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <span className="absolute bottom-3 left-3 text-sm font-semibold text-white">
        {fact.caption}
      </span>
    </div>
  );
}
