import Image from "next/image";

export function Banner() {
  return (
    <div className="relative mt-[40px] flex flex-col items-center">
      <Image
        className="animate-spin [animation-duration:4s] mb-[20px]"
        src="/smile.svg"
        alt="smile icon"
        width={200}
        height={200}
        priority
      />
      <h1 className="text-light font-extrabold text-[32px] max-w-[200px] text-center mb-[100px]">
        FIND YOUR EMOTIONS.
      </h1>
      <svg
        className="absolute bottom-0 left-0 w-full h-[100px]"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
      >
        <path
          fill="white"
          d="M0,120 C240,200 480,40 720,120 C960,200 1200,40 1440,120 L1440,220 L0,220 Z"
        />
      </svg>
    </div>
  );
}
