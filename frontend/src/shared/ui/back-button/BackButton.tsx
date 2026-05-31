"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config/routes";

export function BackButton() {
  const router = useRouter();

  function onClick() {
    router.push(ROUTES.greeting);
  }

  return (
    <button onClick={onClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 19l-7-7 7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
