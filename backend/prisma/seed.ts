import 'dotenv/config';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

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

type Expectation = { icon: string; label: string; note?: string };

function buildExpectations(place: {
  price: number;
  workingHours: unknown;
}): Expectation[] {
  const hours = place.workingHours as Record<string, string>;
  const roundTheClock = Object.values(hours).every(
    (h) => h === 'Круглосуточно',
  );

  return [
    place.price > 0
      ? { icon: 'ticket', label: 'Входной билет', note: `${place.price} €` }
      : { icon: 'ticket', label: 'Бесплатный вход' },
    {
      icon: 'clock',
      label: 'На осмотр',
      note: roundTheClock ? '30–60 минут' : '1–2 часа',
    },
    { icon: 'camera', label: 'Фотосъёмка разрешена' },
    { icon: 'footprints', label: 'Удобная обувь' },
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

const REVIEW_POOL = [
  {
    author: 'Sarah Jenkins',
    rating: 5,
    text: 'Совершенно потрясающее место. Атмосфера, детали, вид — всё на высоте. Обязательно вернусь.',
  },
  {
    author: 'David O’Connor',
    rating: 5,
    text: 'Безупречно. Пришли к открытию и почти час были почти одни. Очень рекомендую ранний визит.',
  },
  {
    author: 'Марина Соколова',
    rating: 4,
    text: 'Красиво и интересно, но народу многовато в середине дня. Берите билеты заранее онлайн.',
  },
  {
    author: 'Tomáš Novák',
    rating: 5,
    text: 'Одно из лучших впечатлений за всю поездку. Стоит каждой потраченной минуты.',
  },
  {
    author: 'Aisha Rahman',
    rating: 4,
    text: 'Очень достойно. Немного не хватило указателей на английском, в остальном отлично.',
  },
  {
    author: 'Lucas Almeida',
    rating: 5,
    text: 'Местные не зря сюда ходят. Спокойно, живописно и совсем не туристическая толкотня.',
  },
  {
    author: 'Hannah Weber',
    rating: 3,
    text: 'Ожидала большего за эту цену. Само место симпатичное, но быстро осматривается.',
  },
  {
    author: 'Ігор Коваленко',
    rating: 5,
    text: 'Приехали на закате — вид просто невероятный. Одна из главных точек города.',
  },
];

const DAY_MS = 24 * 60 * 60 * 1000;

function buildReviews(placeId: number, offset: number) {
  return Array.from({ length: 4 }, (_, i) => {
    const pick = REVIEW_POOL[(offset + i) % REVIEW_POOL.length];
    const avatarId = ((offset * 4 + i) % 70) + 1;

    return {
      placeId,
      author: pick.author,
      avatar: `https://i.pravatar.cc/120?img=${avatarId}`,
      rating: pick.rating,
      text: pick.text,
      createdAt: new Date(Date.now() - (i * 9 + offset * 3 + 3) * DAY_MS),
    };
  });
}

async function main() {
  // Clear child rows before places to satisfy foreign keys.
  await prisma.review.deleteMany();
  await prisma.savedPlace.deleteMany();
  await prisma.visitedPlace.deleteMany();

  await prisma.place.deleteMany();

  await prisma.city.deleteMany();

  await prisma.city.create({
    data: {
      slug: 'lisbon',
      name: 'Лиссабон',
      description:
        'Лиссабон – столица Португалии, расположенная на нескольких холмах и омываемая водами Атлантического океана. Из величественного замка Святого Георгия открывается вид на весь город и реку Тежу. Исторические кварталы Байша, Алфама и Белен хранят архитектурное наследие португальского Возрождения — стиля мануэлино. Город известен жёлтыми трамваями, изразцами азулежу, музыкой фаду и свежайшими морепродуктами.',
      images: cityImages('lisbon'),
      location: { latitude: 38.7163, longitude: -9.1399 },
      weather: { temperature: '18', condition: 'Ясно' },
    },
  });

  await prisma.place.createMany({
    data: [
      {
        name: 'Конвенту-ду-Карму',
        category: 'Музей',
        description:
          'Кармелитский монастырь был основан Нуну Алваришем Перейра, главнокомандующим королевской армией короля Жуана I в битве при Алжубаррота в 1385 году за судьбу Португальского королевства. Величественный храм в готическом стиле, посвященный Кармельской Божьей Матери, был построен в 1389 году по проекту Гомиша Мартиниша. Несмотря на то, что это место не очень подходило для строительства, Нуну Алвариш Перейра настоял на том, чтобы храм был построен именно на этом холме, так как он очень напоминал Гору Кармель в Палестине (отсюда название Ордена) и находился напротив Замкового холма, где находился королевский дворец и Кафедральный собор. Землетрясение 1755 года и пожар разрушили монастырь. На месте бывшего монастыря Ассоциация португальских археологов основала Кармельский Археологический музей, в котором хранятся экспонаты, рассказывающие об истории города от доисторических времен до Средних веков, а также богатая коллекция надгробных плит и средневековой геральдики.',
        ...placeImages('couvent'),
        stars: 4.5,
        price: 7,
        address: 'Largo do Carmo, 1200-092 Lisboa, Кармелитский монастырь',
        isOpen: false,
        workingHours: {
          mon: '10:00–19:00',
          tue: '10:00–19:00',
          wed: '10:00–19:00',
          thu: '10:00–19:00',
          fri: '10:00–19:00',
          sat: '10:00–19:00',
          sun: 'Закрыто',
        },
      },
      {
        name: 'Лиссабонский океанариум',
        category: 'Океанариум',
        description:
          'Крупнейший крытый аквариум в Европе, расположенный в Парке Наций. Он вмещает 5 миллионов литров морской воды и стал домом для более чем 8 000 животных и 500 видов морских обитателей со всего мира. Океанариум разделен на четыре отдельные зоны, каждая из которых представляет собой уникальную экосистему и среду обитания: Северная Атлантика, Антарктида, Индийский океан, Тихий океан.',
        ...placeImages('oceanarium'),
        stars: 4.7,
        price: 25,
        address: 'Esplanada Dom Carlos I s/nº, 1990-005',
        isOpen: false,
        workingHours: {
          mon: '10:00–19:00',
          tue: '10:00–19:00',
          wed: '10:00–19:00',
          thu: '10:00–19:00',
          fri: '10:00–19:00',
          sat: '10:00–19:00',
          sun: '10:00–19:00',
        },
      },
      {
        name: 'Замок Св. Георгия',
        category: 'Замок',
        description:
          'Главная историческая крепость и древнее ядро Лиссабона, возвышающееся на высоком холме в центре города. Замок, который видно практически из любой точки португальской столицы, объединяет в себе руины средневекового дворца и пышные тенистые сады. На территории сохранилось 11 башен (самая известная — Башня Одиссея). Вы можете прогуляться по зубчатым стенам и каменным мостам, откуда открывается один из лучших панорамных видов на Лиссабон и реку Тежу.',
        ...placeImages('jorge-castle'),
        stars: 4.3,
        price: 17,
        address:
          'R. de Santa Cruz do Castelo, 1100-129 Lisboa, Замок Св. Георгия',
        isOpen: false,
        workingHours: {
          mon: '09:00–21:00',
          tue: '09:00–21:00',
          wed: '09:00–21:00',
          thu: '09:00–21:00',
          fri: '09:00–21:00',
          sat: '09:00–21:00',
          sun: '09:00–21:00',
        },
      },
      {
        name: 'Монастырь Жеронимуш',
        category: 'Монастырь',
        description:
          'Монастырь Жеронимуш — шедевр португальского стиля мануэлино и один из красивейших монастырей в мире. Построен в начале XVI века по указу короля Мануэла I в ознаменование возвращения Васку да Гамы из Индии. С 1983 года входит в список Всемирного наследия ЮНЕСКО. Главная жемчужина монастыря — двухъярусный клуатр (внутренний дворик) с ажурными арками, украшенными тончайшей каменной резьбой. В церкви Санта-Мария покоятся останки Васку да Гамы и великого португальского поэта Луиша де Камоэнса.',
        ...placeImages('jeronimos'),
        stars: 4.5,
        price: 18,
        address: 'Praça do Império, 1400-206 Lisboa, Монастырь Жеронимуш',
        isOpen: false,
        workingHours: {
          mon: 'Закрыто',
          tue: '09:30–17:30',
          wed: '09:30–17:30',
          thu: '09:30–17:30',
          fri: '09:30–17:30',
          sat: '09:30–17:30',
          sun: '09:30–17:30',
        },
      },
      {
        name: 'Башня Белен',
        category: 'Памятник',
        description:
          'Башня Белен — символ Лиссабона и эпохи Великих географических открытий, возведённая в 1516–1521 годах как форт для защиты входа в порт. Построена в португальском стиле мануэлино — уникальном сочетании поздней готики с морскими и колониальными мотивами. Башня расположена прямо на берегу реки Тежу и с 1983 года включена в список Всемирного наследия ЮНЕСКО. На фасаде можно разглядеть резные канаты, кресты ордена Христа и армиллярную сферу. Внутри находятся пять этажей: тронный зал, покои губернатора, часовня и открытая терраса с панорамным видом.',
        ...placeImages('belem-tower'),
        stars: 4.4,
        price: 6,
        address: 'Av. Brasília, 1400-038 Lisboa, Башня Белен',
        isOpen: false,
        workingHours: {
          mon: 'Закрыто',
          tue: '10:00–18:30',
          wed: '10:00–18:30',
          thu: '10:00–18:30',
          fri: '10:00–18:30',
          sat: '10:00–18:30',
          sun: '10:00–18:30',
        },
      },
      {
        name: 'Алфама',
        category: 'Район',
        description:
          'Алфама — старейший район Лиссабона, единственный квартал, переживший катастрофическое землетрясение 1755 года почти без разрушений. Лабиринт узких мощёных улочек, лестниц и арок хранит дух средневекового мавританского города. Именно здесь родилось фаду — меланхоличная португальская музыка, внесённая ЮНЕСКО в список нематериального культурного наследия. По вечерам из таверн звучат живые выступления. На крутых склонах раскиданы смотровые площадки-мирадоуру с панорамами города и реки Тежу.',
        ...placeImages('alfama'),
        stars: 4.7,
        price: 0,
        address: 'Alfama, 1100 Lisboa',
        isOpen: true,
        workingHours: {
          mon: 'Круглосуточно',
          tue: 'Круглосуточно',
          wed: 'Круглосуточно',
          thu: 'Круглосуточно',
          fri: 'Круглосуточно',
          sat: 'Круглосуточно',
          sun: 'Круглосуточно',
        },
      },
      {
        name: 'Лифт Санта-Жуста',
        category: 'Достопримечательность',
        description:
          'Лифт Санта-Жуста — неоготическая железная башня высотой 45 метров, соединяющая нижний квартал Байша с холмом Шиаду. Построен в 1902 году португальским инженером Рауль Мениром дю Понсаром, учеником Гюстава Эйфеля. Конструкция из кованого железа с ажурными украшениями напоминает Эйфелеву башню в миниатюре и является охраняемым памятником архитектуры. Внутри работают два деревянных лифта с отделкой красного дерева. На вершине располагается смотровая галерея.',
        ...placeImages('elevator-santa-justa'),
        stars: 4.1,
        price: 6,
        address: 'R. de Santa Justa, 1150-060 Lisboa, Лифт Санта-Жуста',
        isOpen: true,
        workingHours: {
          mon: '07:00–23:00',
          tue: '07:00–23:00',
          wed: '07:00–23:00',
          thu: '07:00–23:00',
          fri: '07:00–23:00',
          sat: '07:00–23:00',
          sun: '07:00–23:00',
        },
      },
      {
        name: 'Площадь Коммерции',
        category: 'Площадь',
        description:
          'Площадь Коммерции (Праса-ду-Комерсиу) — главная парадная площадь Лиссабона на берегу реки Тежу. До землетрясения 1755 года здесь стоял королевский дворец Рибейра. После катастрофы маркиз Помбал отстроил площадь в духе Просвещения: три стороны обрамляют аркады с жёлтыми фасадами, а центр украшает конная статуя короля Жозе I. Величественная триумфальная арка Арку-да-Руа-Августа с аллегорическими скульптурами ведёт на главную торговую улицу города.',
        ...placeImages('comercio-terreiro'),
        stars: 4.5,
        price: 0,
        address: 'Praça do Comércio, 1100-148 Lisboa',
        isOpen: true,
        workingHours: {
          mon: 'Круглосуточно',
          tue: 'Круглосуточно',
          wed: 'Круглосуточно',
          thu: 'Круглосуточно',
          fri: 'Круглосуточно',
          sat: 'Круглосуточно',
          sun: 'Круглосуточно',
        },
      },
      {
        name: 'Мирадоуру да Граса',
        category: 'Смотровая площадка',
        description:
          'Мирадоуру да Граса — одна из самых живописных смотровых площадок Лиссабона, расположенная в тихом жилом районе Граса. В отличие от переполненных туристами Санта-Катарина и Порташ-ду-Сол, это место остаётся любимым у местных жителей. С площадки открывается захватывающая панорама: крепостные стены замка Св. Георгия прямо напротив, красные черепичные крыши Алфамы внизу, Тежу на горизонте и мост 25 Апреля вдали.',
        ...placeImages('miradouro-da-graca'),
        stars: 4.6,
        price: 0,
        address: 'Largo da Graça, 1170-165 Lisboa',
        isOpen: true,
        workingHours: {
          mon: 'Круглосуточно',
          tue: 'Круглосуточно',
          wed: 'Круглосуточно',
          thu: 'Круглосуточно',
          fri: 'Круглосуточно',
          sat: 'Круглосуточно',
          sun: 'Круглосуточно',
        },
      },
    ],
  });

  const places = await prisma.place.findMany();

  await Promise.all(
    places.map((place) =>
      prisma.place.update({
        where: { id: place.id },
        data: {
          expectations: buildExpectations(place),
          ...buildRatingStats(place.stars),
        },
      }),
    ),
  );

  await prisma.review.createMany({
    data: places.flatMap((place, index) => buildReviews(place.id, index)),
  });

  console.log(`Seeded ${places.length} places with expectations and reviews`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
