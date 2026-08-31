import 'dotenv/config';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const LOCALES = ['en', 'ru'] as const;
type Locale = (typeof LOCALES)[number];
type Localized<T> = Record<Locale, T>;

// Self-hosted photos live in backend/storage and are committed to the repo.
// The DB stores relative keys (`places/couvent/1.jpg`); the API turns them
// into absolute /static URLs via toAssetUrl.
const STORAGE_DIR = join(__dirname, '..', 'storage');

function assetKeys(...segments: string[]): string[] {
  const dir = join(STORAGE_DIR, ...segments);
  return readdirSync(dir)
    .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file))
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
    .map((file) => [...segments, file].join('/'));
}

// { image, photos } for a place folder — cover is the first file.
function placeImages(slug: string): { image: string; photos: string[] } {
  const photos = assetKeys('places', slug);
  return { image: photos[0], photos };
}

function cityImages(slug: string): { url: string }[] {
  return assetKeys('city', slug).map((url) => ({ url }));
}

type WorkingHours = Record<
  'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun',
  string
>;

type Expectation = { icon: string; label: string; note?: string };

// Free-text strings that appear inside workingHours cells. Everything else in
// a cell ("10:00–19:00") is locale-neutral and reused as-is.
const CLOSED: Localized<string> = { en: 'Closed', ru: 'Закрыто' };
const ALWAYS_OPEN: Localized<string> = {
  en: 'Open 24 hours',
  ru: 'Круглосуточно',
};
const ALWAYS_OPEN_VALUES = new Set(Object.values(ALWAYS_OPEN));

const EXPECTATION_TEXT: Localized<{
  ticketPaid: string;
  ticketFree: string;
  duration: string;
  durationShort: string;
  durationLong: string;
  photos: string;
  shoes: string;
}> = {
  en: {
    ticketPaid: 'Entry ticket',
    ticketFree: 'Free entry',
    duration: 'Time needed',
    durationShort: '30–60 min',
    durationLong: '1–2 hours',
    photos: 'Photography allowed',
    shoes: 'Comfortable shoes',
  },
  ru: {
    ticketPaid: 'Входной билет',
    ticketFree: 'Бесплатный вход',
    duration: 'На осмотр',
    durationShort: '30–60 минут',
    durationLong: '1–2 часа',
    photos: 'Фотосъёмка разрешена',
    shoes: 'Удобная обувь',
  },
};

function buildExpectations(
  place: { price: number; workingHours: WorkingHours },
  locale: Locale,
): Expectation[] {
  const text = EXPECTATION_TEXT[locale];
  const roundTheClock = Object.values(place.workingHours).every((hours) =>
    ALWAYS_OPEN_VALUES.has(hours),
  );

  return [
    place.price > 0
      ? { icon: 'ticket', label: text.ticketPaid, note: `${place.price} €` }
      : { icon: 'ticket', label: text.ticketFree },
    {
      icon: 'clock',
      label: text.duration,
      note: roundTheClock ? text.durationShort : text.durationLong,
    },
    { icon: 'camera', label: text.photos },
    { icon: 'footprints', label: text.shoes },
  ];
}

// Denormalised rating totals — the design shows counts in the thousands,
// far more than the handful of seeded Review rows.
function buildRatingStats(stars: number): {
  ratingCount: number;
  ratingBreakdown: number[];
} {
  const ratingCount = Math.round(240 + stars * 210);
  const weights = [2, 3, 6, 24, 65]; // rough % for 1★ … 5★
  const weightSum = weights.reduce((sum, w) => sum + w, 0);
  const ratingBreakdown = weights.map((w) =>
    Math.round((w / weightSum) * ratingCount),
  );
  // push any rounding drift into the 5★ bucket so the parts sum to the whole
  ratingBreakdown[4] +=
    ratingCount - ratingBreakdown.reduce((sum, n) => sum + n, 0);

  return { ratingCount, ratingBreakdown };
}

const REVIEW_POOL: {
  author: string;
  rating: number;
  text: Localized<string>;
}[] = [
  {
    author: 'Sarah Jenkins',
    rating: 5,
    text: {
      en: 'An absolutely stunning place. The atmosphere, the details, the view — everything is top notch. I will definitely be back.',
      ru: 'Совершенно потрясающее место. Атмосфера, детали, вид — всё на высоте. Обязательно вернусь.',
    },
  },
  {
    author: 'David O’Connor',
    rating: 5,
    text: {
      en: 'Flawless. We arrived at opening time and had the place almost to ourselves for nearly an hour. Highly recommend going early.',
      ru: 'Безупречно. Пришли к открытию и почти час были почти одни. Очень рекомендую ранний визит.',
    },
  },
  {
    author: 'Марина Соколова',
    rating: 4,
    text: {
      en: 'Beautiful and interesting, but quite crowded in the middle of the day. Buy tickets online in advance.',
      ru: 'Красиво и интересно, но народу многовато в середине дня. Берите билеты заранее онлайн.',
    },
  },
  {
    author: 'Tomáš Novák',
    rating: 5,
    text: {
      en: 'One of the best experiences of the whole trip. Worth every minute.',
      ru: 'Одно из лучших впечатлений за всю поездку. Стоит каждой потраченной минуты.',
    },
  },
  {
    author: 'Aisha Rahman',
    rating: 4,
    text: {
      en: 'Really solid. A few more signs in English would have helped, but otherwise excellent.',
      ru: 'Очень достойно. Немного не хватило указателей на английском, в остальном отлично.',
    },
  },
  {
    author: 'Lucas Almeida',
    rating: 5,
    text: {
      en: 'The locals come here for a reason. Calm, picturesque and none of the tourist crush.',
      ru: 'Местные не зря сюда ходят. Спокойно, живописно и совсем не туристическая толкотня.',
    },
  },
  {
    author: 'Hannah Weber',
    rating: 3,
    text: {
      en: 'I expected more for the price. The place itself is nice, but you see it quickly.',
      ru: 'Ожидала большего за эту цену. Само место симпатичное, но быстро осматривается.',
    },
  },
  {
    author: 'Ігор Коваленко',
    rating: 5,
    text: {
      en: "We came at sunset — the view is simply incredible. One of the city's must-see spots.",
      ru: 'Приехали на закате — вид просто невероятный. Одна из главных точек города.',
    },
  },
];

const DAY_MS = 24 * 60 * 60 * 1000;

/** Same seven cells for every day. */
function everyDay(value: string): WorkingHours {
  return {
    mon: value,
    tue: value,
    wed: value,
    thu: value,
    fri: value,
    sat: value,
    sun: value,
  };
}

type PlaceSeed = {
  slug: string;
  category: string;
  stars: number;
  price: number;
  isOpen: boolean;
  i18n: Localized<{
    name: string;
    description: string;
    address: string;
    workingHours: WorkingHours;
  }>;
};

const CITY_SEED = {
  slug: 'lisbon',
  location: { latitude: 38.7163, longitude: -9.1399 },
  i18n: {
    en: {
      name: 'Lisbon',
      description:
        'Lisbon is the capital of Portugal, spread across several hills and washed by the Atlantic. From the mighty São Jorge Castle a view opens over the whole city and the Tagus river. The historic quarters of Baixa, Alfama and Belém preserve the architectural legacy of the Portuguese Renaissance — the Manueline style. The city is known for its yellow trams, azulejo tiles, fado music and the freshest seafood.',
      weather: { temperature: '18', condition: 'Clear' },
    },
    ru: {
      name: 'Лиссабон',
      description:
        'Лиссабон – столица Португалии, расположенная на нескольких холмах и омываемая водами Атлантического океана. Из величественного замка Святого Георгия открывается вид на весь город и реку Тежу. Исторические кварталы Байша, Алфама и Белен хранят архитектурное наследие португальского Возрождения — стиля мануэлино. Город известен жёлтыми трамваями, изразцами азулежу, музыкой фаду и свежайшими морепродуктами.',
      weather: { temperature: '18', condition: 'Ясно' },
    },
  },
} as const;

const PLACE_SEEDS: PlaceSeed[] = [
  {
    slug: 'couvent',
    category: 'Музей',
    stars: 4.5,
    price: 7,
    isOpen: false,
    i18n: {
      en: {
        name: 'Carmo Convent',
        description:
          "The Carmelite convent was founded by Nuno Álvares Pereira, commander-in-chief of King João I's royal army at the Battle of Aljubarrota in 1385, which decided the fate of the Kingdom of Portugal. The grand Gothic church, dedicated to Our Lady of Mount Carmel, was built in 1389 to a design by Gomes Martins. Although the site was ill-suited for construction, Nuno Álvares Pereira insisted the church be raised on this very hill, as it strongly resembled Mount Carmel in Palestine (hence the order's name) and faced Castle Hill, home to the royal palace and the Cathedral. The 1755 earthquake and the fire that followed destroyed the convent. On its ruins the Association of Portuguese Archaeologists founded the Carmo Archaeological Museum, which holds exhibits tracing the city's history from prehistoric times to the Middle Ages, along with a rich collection of tombstones and medieval heraldry.",
        address: 'Largo do Carmo, 1200-092 Lisboa, Carmo Convent',
        workingHours: {
          mon: '10:00–19:00',
          tue: '10:00–19:00',
          wed: '10:00–19:00',
          thu: '10:00–19:00',
          fri: '10:00–19:00',
          sat: '10:00–19:00',
          sun: CLOSED.en,
        },
      },
      ru: {
        name: 'Конвенту-ду-Карму',
        description:
          'Кармелитский монастырь был основан Нуну Алваришем Перейра, главнокомандующим королевской армией короля Жуана I в битве при Алжубаррота в 1385 году за судьбу Португальского королевства. Величественный храм в готическом стиле, посвященный Кармельской Божьей Матери, был построен в 1389 году по проекту Гомиша Мартиниша. Несмотря на то, что это место не очень подходило для строительства, Нуну Алвариш Перейра настоял на том, чтобы храм был построен именно на этом холме, так как он очень напоминал Гору Кармель в Палестине (отсюда название Ордена) и находился напротив Замкового холма, где находился королевский дворец и Кафедральный собор. Землетрясение 1755 года и пожар разрушили монастырь. На месте бывшего монастыря Ассоциация португальских археологов основала Кармельский Археологический музей, в котором хранятся экспонаты, рассказывающие об истории города от доисторических времен до Средних веков, а также богатая коллекция надгробных плит и средневековой геральдики.',
        address: 'Largo do Carmo, 1200-092 Lisboa, Кармелитский монастырь',
        workingHours: {
          mon: '10:00–19:00',
          tue: '10:00–19:00',
          wed: '10:00–19:00',
          thu: '10:00–19:00',
          fri: '10:00–19:00',
          sat: '10:00–19:00',
          sun: CLOSED.ru,
        },
      },
    },
  },
  {
    slug: 'oceanarium',
    category: 'Океанариум',
    stars: 4.7,
    price: 25,
    isOpen: false,
    i18n: {
      en: {
        name: 'Lisbon Oceanarium',
        description:
          'The largest indoor aquarium in Europe, set in the Park of Nations. It holds 5 million litres of seawater and is home to more than 8,000 animals and 500 species of marine life from around the world. The oceanarium is divided into four separate zones, each recreating a distinct ecosystem and habitat: the North Atlantic, Antarctica, the Indian Ocean and the Pacific Ocean.',
        address: 'Esplanada Dom Carlos I s/nº, 1990-005',
        workingHours: everyDay('10:00–19:00'),
      },
      ru: {
        name: 'Лиссабонский океанариум',
        description:
          'Крупнейший крытый аквариум в Европе, расположенный в Парке Наций. Он вмещает 5 миллионов литров морской воды и стал домом для более чем 8 000 животных и 500 видов морских обитателей со всего мира. Океанариум разделен на четыре отдельные зоны, каждая из которых представляет собой уникальную экосистему и среду обитания: Северная Атлантика, Антарктида, Индийский океан, Тихий океан.',
        address: 'Esplanada Dom Carlos I s/nº, 1990-005',
        workingHours: everyDay('10:00–19:00'),
      },
    },
  },
  {
    slug: 'jorge-castle',
    category: 'Замок',
    stars: 4.3,
    price: 17,
    isOpen: false,
    i18n: {
      en: {
        name: 'São Jorge Castle',
        description:
          'The main historic fortress and ancient core of Lisbon, rising on a high hill in the centre of the city. Visible from almost anywhere in the Portuguese capital, the castle combines the ruins of a medieval palace with lush, shady gardens. Eleven towers survive on the grounds (the best known is the Tower of Ulysses). You can walk the crenellated walls and stone bridges, which offer one of the finest panoramic views over Lisbon and the Tagus.',
        address:
          'R. de Santa Cruz do Castelo, 1100-129 Lisboa, São Jorge Castle',
        workingHours: everyDay('09:00–21:00'),
      },
      ru: {
        name: 'Замок Св. Георгия',
        description:
          'Главная историческая крепость и древнее ядро Лиссабона, возвышающееся на высоком холме в центре города. Замок, который видно практически из любой точки португальской столицы, объединяет в себе руины средневекового дворца и пышные тенистые сады. На территории сохранилось 11 башен (самая известная — Башня Одиссея). Вы можете прогуляться по зубчатым стенам и каменным мостам, откуда открывается один из лучших панорамных видов на Лиссабон и реку Тежу.',
        address:
          'R. de Santa Cruz do Castelo, 1100-129 Lisboa, Замок Св. Георгия',
        workingHours: everyDay('09:00–21:00'),
      },
    },
  },
  {
    slug: 'jeronimos',
    category: 'Монастырь',
    stars: 4.5,
    price: 18,
    isOpen: false,
    i18n: {
      en: {
        name: 'Jerónimos Monastery',
        description:
          "The Jerónimos Monastery is a masterpiece of the Portuguese Manueline style and one of the most beautiful monasteries in the world. Built in the early 16th century by order of King Manuel I to mark Vasco da Gama's return from India, it has been a UNESCO World Heritage Site since 1983. Its great jewel is the two-storey cloister, with openwork arches covered in the finest stone carving. The church of Santa Maria holds the tombs of Vasco da Gama and the great Portuguese poet Luís de Camões.",
        address: 'Praça do Império, 1400-206 Lisboa, Jerónimos Monastery',
        workingHours: {
          mon: CLOSED.en,
          tue: '09:30–17:30',
          wed: '09:30–17:30',
          thu: '09:30–17:30',
          fri: '09:30–17:30',
          sat: '09:30–17:30',
          sun: '09:30–17:30',
        },
      },
      ru: {
        name: 'Монастырь Жеронимуш',
        description:
          'Монастырь Жеронимуш — шедевр португальского стиля мануэлино и один из красивейших монастырей в мире. Построен в начале XVI века по указу короля Мануэла I в ознаменование возвращения Васку да Гамы из Индии. С 1983 года входит в список Всемирного наследия ЮНЕСКО. Главная жемчужина монастыря — двухъярусный клуатр (внутренний дворик) с ажурными арками, украшенными тончайшей каменной резьбой. В церкви Санта-Мария покоятся останки Васку да Гамы и великого португальского поэта Луиша де Камоэнса.',
        address: 'Praça do Império, 1400-206 Lisboa, Монастырь Жеронимуш',
        workingHours: {
          mon: CLOSED.ru,
          tue: '09:30–17:30',
          wed: '09:30–17:30',
          thu: '09:30–17:30',
          fri: '09:30–17:30',
          sat: '09:30–17:30',
          sun: '09:30–17:30',
        },
      },
    },
  },
  {
    slug: 'belem-tower',
    category: 'Памятник',
    stars: 4.4,
    price: 6,
    isOpen: false,
    i18n: {
      en: {
        name: 'Belém Tower',
        description:
          "Belém Tower is a symbol of Lisbon and of the Age of Discovery, built between 1516 and 1521 as a fort to guard the entrance to the harbour. It was raised in the Portuguese Manueline style — a unique blend of late Gothic with maritime and colonial motifs. Standing right on the bank of the Tagus, it has been a UNESCO World Heritage Site since 1983. On the façade you can make out carved ropes, crosses of the Order of Christ and an armillary sphere. Inside are five floors: the throne room, the governor's quarters, a chapel and an open terrace with a panoramic view.",
        address: 'Av. Brasília, 1400-038 Lisboa, Belém Tower',
        workingHours: {
          mon: CLOSED.en,
          tue: '10:00–18:30',
          wed: '10:00–18:30',
          thu: '10:00–18:30',
          fri: '10:00–18:30',
          sat: '10:00–18:30',
          sun: '10:00–18:30',
        },
      },
      ru: {
        name: 'Башня Белен',
        description:
          'Башня Белен — символ Лиссабона и эпохи Великих географических открытий, возведённая в 1516–1521 годах как форт для защиты входа в порт. Построена в португальском стиле мануэлино — уникальном сочетании поздней готики с морскими и колониальными мотивами. Башня расположена прямо на берегу реки Тежу и с 1983 года включена в список Всемирного наследия ЮНЕСКО. На фасаде можно разглядеть резные канаты, кресты ордена Христа и армиллярную сферу. Внутри находятся пять этажей: тронный зал, покои губернатора, часовня и открытая терраса с панорамным видом.',
        address: 'Av. Brasília, 1400-038 Lisboa, Башня Белен',
        workingHours: {
          mon: CLOSED.ru,
          tue: '10:00–18:30',
          wed: '10:00–18:30',
          thu: '10:00–18:30',
          fri: '10:00–18:30',
          sat: '10:00–18:30',
          sun: '10:00–18:30',
        },
      },
    },
  },
  {
    slug: 'alfama',
    category: 'Район',
    stars: 4.7,
    price: 0,
    isOpen: true,
    i18n: {
      en: {
        name: 'Alfama',
        description:
          'Alfama is the oldest district of Lisbon, the only quarter to survive the catastrophic earthquake of 1755 almost intact. A labyrinth of narrow cobbled lanes, staircases and archways, it keeps the spirit of the medieval Moorish city. This is where fado was born — the melancholy Portuguese music inscribed by UNESCO on the list of Intangible Cultural Heritage. In the evenings, live performances drift out of the taverns. Scattered across the steep slopes are miradouro viewpoints with panoramas of the city and the Tagus.',
        address: 'Alfama, 1100 Lisboa',
        workingHours: everyDay(ALWAYS_OPEN.en),
      },
      ru: {
        name: 'Алфама',
        description:
          'Алфама — старейший район Лиссабона, единственный квартал, переживший катастрофическое землетрясение 1755 года почти без разрушений. Лабиринт узких мощёных улочек, лестниц и арок хранит дух средневекового мавританского города. Именно здесь родилось фаду — меланхоличная португальская музыка, внесённая ЮНЕСКО в список нематериального культурного наследия. По вечерам из таверн звучат живые выступления. На крутых склонах раскиданы смотровые площадки-мирадоуру с панорамами города и реки Тежу.',
        address: 'Alfama, 1100 Lisboa',
        workingHours: everyDay(ALWAYS_OPEN.ru),
      },
    },
  },
  {
    slug: 'elevator-santa-justa',
    category: 'Достопримечательность',
    stars: 4.1,
    price: 6,
    isOpen: true,
    i18n: {
      en: {
        name: 'Santa Justa Lift',
        description:
          'The Santa Justa Lift is a 45-metre neo-Gothic iron tower connecting the lower Baixa quarter with the Chiado hill. It was built in 1902 by the Portuguese engineer Raoul Mesnier du Ponsard, a pupil of Gustave Eiffel. The wrought-iron structure with its openwork ornament looks like a miniature Eiffel Tower and is a protected architectural monument. Inside, two wooden cabins finished in mahogany are still in service. At the top there is a viewing gallery.',
        address: 'R. de Santa Justa, 1150-060 Lisboa, Santa Justa Lift',
        workingHours: everyDay('07:00–23:00'),
      },
      ru: {
        name: 'Лифт Санта-Жуста',
        description:
          'Лифт Санта-Жуста — неоготическая железная башня высотой 45 метров, соединяющая нижний квартал Байша с холмом Шиаду. Построен в 1902 году португальским инженером Рауль Мениром дю Понсаром, учеником Гюстава Эйфеля. Конструкция из кованого железа с ажурными украшениями напоминает Эйфелеву башню в миниатюре и является охраняемым памятником архитектуры. Внутри работают два деревянных лифта с отделкой красного дерева. На вершине располагается смотровая галерея.',
        address: 'R. de Santa Justa, 1150-060 Lisboa, Лифт Санта-Жуста',
        workingHours: everyDay('07:00–23:00'),
      },
    },
  },
  {
    slug: 'comercio-terreiro',
    category: 'Площадь',
    stars: 4.5,
    price: 0,
    isOpen: true,
    i18n: {
      en: {
        name: 'Comércio Square',
        description:
          "Praça do Comércio is Lisbon's grand ceremonial square on the bank of the Tagus. Before the 1755 earthquake the Ribeira Royal Palace stood here. After the disaster the Marquis of Pombal rebuilt the square in the spirit of the Enlightenment: arcades with yellow façades frame three sides, and an equestrian statue of King José I stands at the centre. The monumental Arco da Rua Augusta triumphal arch, with its allegorical sculptures, leads onto the city's main shopping street.",
        address: 'Praça do Comércio, 1100-148 Lisboa',
        workingHours: everyDay(ALWAYS_OPEN.en),
      },
      ru: {
        name: 'Площадь Коммерции',
        description:
          'Площадь Коммерции (Праса-ду-Комерсиу) — главная парадная площадь Лиссабона на берегу реки Тежу. До землетрясения 1755 года здесь стоял королевский дворец Рибейра. После катастрофы маркиз Помбал отстроил площадь в духе Просвещения: три стороны обрамляют аркады с жёлтыми фасадами, а центр украшает конная статуя короля Жозе I. Величественная триумфальная арка Арку-да-Руа-Августа с аллегорическими скульптурами ведёт на главную торговую улицу города.',
        address: 'Praça do Comércio, 1100-148 Lisboa',
        workingHours: everyDay(ALWAYS_OPEN.ru),
      },
    },
  },
  {
    slug: 'miradouro-da-graca',
    category: 'Смотровая площадка',
    stars: 4.6,
    price: 0,
    isOpen: true,
    i18n: {
      en: {
        name: 'Miradouro da Graça',
        description:
          "Miradouro da Graça is one of Lisbon's most scenic viewpoints, set in the quiet residential district of Graça. Unlike the tourist-packed Santa Catarina and Portas do Sol, it remains a favourite of local residents. The terrace offers a sweeping panorama: the walls of São Jorge Castle directly opposite, the red tiled roofs of Alfama below, the Tagus on the horizon and the 25 de Abril Bridge in the distance.",
        address: 'Largo da Graça, 1170-165 Lisboa',
        workingHours: everyDay(ALWAYS_OPEN.en),
      },
      ru: {
        name: 'Мирадоуру да Граса',
        description:
          'Мирадоуру да Граса — одна из самых живописных смотровых площадок Лиссабона, расположенная в тихом жилом районе Граса. В отличие от переполненных туристами Санта-Катарина и Порташ-ду-Сол, это место остаётся любимым у местных жителей. С площадки открывается захватывающая панорама: крепостные стены замка Св. Георгия прямо напротив, красные черепичные крыши Алфамы внизу, Тежу на горизонте и мост 25 Апреля вдали.',
        address: 'Largo da Graça, 1170-165 Lisboa',
        workingHours: everyDay(ALWAYS_OPEN.ru),
      },
    },
  },
];

function placeTranslationRows(seed: PlaceSeed) {
  return LOCALES.map((locale) => {
    const text = seed.i18n[locale];
    return {
      locale,
      name: text.name,
      description: text.description,
      address: text.address,
      workingHours: text.workingHours,
      expectations: buildExpectations(
        { price: seed.price, workingHours: text.workingHours },
        locale,
      ),
    };
  });
}

function reviewRowsFor(offset: number) {
  return Array.from({ length: 4 }, (_, i) => {
    const pick = REVIEW_POOL[(offset + i) % REVIEW_POOL.length];
    const avatarId = ((offset * 4 + i) % 70) + 1;

    return {
      author: pick.author,
      avatar: `https://i.pravatar.cc/120?img=${avatarId}`,
      rating: pick.rating,
      createdAt: new Date(Date.now() - (i * 9 + offset * 3 + 3) * DAY_MS),
      translations: {
        create: LOCALES.map((locale) => ({
          locale,
          text: pick.text[locale],
        })),
      },
    };
  });
}

async function main() {
  // Clear child rows before parents to satisfy foreign keys. Translation
  // rows cascade with their parent, so they don't need explicit deletes.
  await prisma.review.deleteMany();
  await prisma.savedPlace.deleteMany();
  await prisma.visitedPlace.deleteMany();
  await prisma.place.deleteMany();
  await prisma.city.deleteMany();

  await prisma.city.create({
    data: {
      slug: CITY_SEED.slug,
      images: cityImages(CITY_SEED.slug),
      location: CITY_SEED.location,
      translations: {
        create: LOCALES.map((locale) => ({
          locale,
          name: CITY_SEED.i18n[locale].name,
          description: CITY_SEED.i18n[locale].description,
          weather: CITY_SEED.i18n[locale].weather,
        })),
      },
    },
  });

  for (const [index, seed] of PLACE_SEEDS.entries()) {
    await prisma.place.create({
      data: {
        category: seed.category,
        stars: seed.stars,
        price: seed.price,
        isOpen: seed.isOpen,
        ...placeImages(seed.slug),
        ...buildRatingStats(seed.stars),
        translations: { create: placeTranslationRows(seed) },
        reviews: { create: reviewRowsFor(index) },
      },
    });
  }

  console.log(
    `Seeded ${PLACE_SEEDS.length} places and 1 city in ${LOCALES.join('/')}`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
