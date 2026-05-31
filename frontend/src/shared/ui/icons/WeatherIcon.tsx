export type WeatherCondition =
  | "sunny"
  | "cloudy"
  | "snowy"
  | "rainy"
  | "partly-cloudy";

interface WeatherIconProps {
  condition: WeatherCondition;
  className?: string;
}

export function WeatherIcon({ condition, className }: WeatherIconProps) {
  switch (condition) {
    case "sunny":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path
            d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    case "cloudy":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M18 10a6 6 0 0 0-11.9-1A4 4 0 1 0 6 17h12a4 4 0 0 0 0-8z" />
        </svg>
      );
    case "partly-cloudy":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M10 2a5 5 0 0 1 4.9 4.1A3 3 0 1 1 15 12H6a4 4 0 0 1 0-8 3.9 3.9 0 0 1 .6.05A5 5 0 0 1 10 2z" />
          <circle cx="18" cy="6" r="3" />
        </svg>
      );
    case "rainy":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M18 10a6 6 0 0 0-11.9-1A4 4 0 1 0 6 17h12a4 4 0 0 0 0-8z" />
          <path
            d="M8 19v2M12 19v2M16 19v2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    case "snowy":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07" />
        </svg>
      );
  }
}
