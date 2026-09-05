import type { PublicProfileData } from "./types";

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/${id}?w=300&auto=format`;

/**
 * Placeholder data for the public-profile UI mockup — there is no
 * followers/username/per-city-rank backend yet, so this stands in until
 * that lands.
 */
export const MOCK_PUBLIC_PROFILE: PublicProfileData = {
  id: "mock-user-1",
  username: "maria_o",
  name: "Мария Орлова",
  bio: "Собираю места, куда вожу друзей: виды, кофе и старые трамваи.",
  livesInLabel: "Лиссабоне",
  followersCount: 1284,
  followingCount: 96,
  isFollowing: false,
  cities: [
    {
      citySlug: "lisbon",
      cityName: "Лиссабон",
      placesVisited: 18,
      districts: 5,
      isNightExplorer: true,
      isFoodHunter: true,
      tips: [
        {
          id: "lis-tip-1",
          placeName: "Convento do Carmo",
          placeImage: UNSPLASH("photo-1555881400-74d7acaacd8b"),
          category: "Музей",
          note: "Приходите к открытию — во дворе почти никого, свет мягкий.",
        },
        {
          id: "lis-tip-2",
          placeName: "Miradouro da Graça",
          placeImage: UNSPLASH("photo-1585208798174-6cedd86e019a"),
          category: "Смотровая площадка",
          note: "Лучший закат в городе, берите вино в соседнем киоске.",
        },
        {
          id: "lis-tip-3",
          placeName: "LX Factory",
          placeImage: UNSPLASH("photo-1601924582970-9238bcb495d9"),
          category: "Район",
          note: "По воскресеньям книжный рынок во дворе — стоит заглянуть.",
        },
      ],
      visited: [
        {
          id: "lis-v-1",
          placeName: "Convento do Carmo",
          placeImage: UNSPLASH("photo-1555881400-74d7acaacd8b"),
        },
        {
          id: "lis-v-2",
          placeName: "Castelo de São Jorge",
          placeImage: UNSPLASH("photo-1555881400-74d7acaacd8b"),
        },
        {
          id: "lis-v-3",
          placeName: "Miradouro da Graça",
          placeImage: UNSPLASH("photo-1585208798174-6cedd86e019a"),
        },
        {
          id: "lis-v-4",
          placeName: "LX Factory",
          placeImage: UNSPLASH("photo-1601924582970-9238bcb495d9"),
        },
        {
          id: "lis-v-5",
          placeName: "Torre de Belém",
          placeImage: UNSPLASH("photo-1555881400-74d7acaacd8b"),
        },
      ],
    },
    {
      citySlug: "paris",
      cityName: "Париж",
      placesVisited: 6,
      districts: 2,
      isNightExplorer: false,
      isFoodHunter: true,
      tips: [
        {
          id: "par-tip-1",
          placeName: "Musée Rodin",
          placeImage: UNSPLASH("photo-1544967082-d9d25d867d66"),
          category: "Музей",
          note: "Сад вокруг музея почти всегда пустой — идеально для чтения.",
        },
        {
          id: "par-tip-2",
          placeName: "Rue Crémieux",
          placeImage: UNSPLASH("photo-1502602898657-3e91760cbb34"),
          category: "Район",
          note: "Приходите утром в будни — по выходным толпы фотографов.",
        },
      ],
      visited: [
        {
          id: "par-v-1",
          placeName: "Musée Rodin",
          placeImage: UNSPLASH("photo-1544967082-d9d25d867d66"),
        },
        {
          id: "par-v-2",
          placeName: "Rue Crémieux",
          placeImage: UNSPLASH("photo-1502602898657-3e91760cbb34"),
        },
      ],
    },
    {
      citySlug: "madrid",
      cityName: "Мадрид",
      placesVisited: 2,
      districts: 0,
      isNightExplorer: false,
      isFoodHunter: false,
      tips: [
        {
          id: "mad-tip-1",
          placeName: "El Retiro",
          placeImage: UNSPLASH("photo-1539037116277-4db20889f2d4"),
          category: "Парк",
          note: "Возьмите лодку на пруду — очередь короче, чем кажется.",
        },
      ],
      visited: [
        {
          id: "mad-v-1",
          placeName: "El Retiro",
          placeImage: UNSPLASH("photo-1539037116277-4db20889f2d4"),
        },
        {
          id: "mad-v-2",
          placeName: "Mercado de San Miguel",
          placeImage: UNSPLASH("photo-1555881400-74d7acaacd8b"),
        },
      ],
    },
  ],
};
