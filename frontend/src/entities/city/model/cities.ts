import type { City } from "./types";

export const cities: City[] = [
  {
    name: "Lisbon",
    country: "Portugal",
    image:
      "https://images.squarespace-cdn.com/content/v1/56e8fcc03c44d89db7df9b3e/1555999875852-WLL11DEFUG78U088FD9F/image+1+lisbon+copy.jpg",
    weather: { temperature: 21, condition: "sunny" },
    available: true,
  },
  {
    name: "Dublin",
    country: "Ireland",
    image:
      "https://bucket-files.city-sightseeing.com/blog/2023/02/cityview-dublin-scaled.jpg",
    weather: { temperature: 14, condition: "cloudy" },
    available: false,
  },
  {
    name: "Paris",
    country: "France",
    image:
      "https://www.royalcaribbean.com/media-assets/pmc/content/dam/shore-x/paris-le-havre-leh/lh17-paris-sightseeing-without-lunch/stock-photo-skyline-of-paris-with-eiffel-tower-at-sunset-in-paris-france-eiffel-tower-is-one-of-the-most-752725282.jpg?w=1920",
    weather: { temperature: 16, condition: "partly-cloudy" },
    available: false,
  },
  {
    name: "Tokyo",
    country: "Japan",
    image:
      "https://wanderwithsasha.com/wp-content/uploads/2025/01/IMG_7555-scaled.jpg",
    weather: { temperature: 19, condition: "snowy" },
    available: false,
  },
];
