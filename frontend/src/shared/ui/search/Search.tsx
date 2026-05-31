"use client";

export function Search({
  onChange,
  placeholder,
  className,
}: React.ComponentProps<"input">) {
  return (
    <div
      className={`flex items-center gap-3 bg-search-bg rounded-2xl px-4 py-3 ${className}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 text-brand-gray"
      >
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path
          d="M16.5 16.5L21 21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <input
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        className="w-full text-sm text-dark placeholder:text-brand-gray outline-none"
      />
    </div>
  );
}
