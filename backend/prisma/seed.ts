import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.place.deleteMany();

  await prisma.city.deleteMany();

  await prisma.city.create({
    data: {
      slug: 'lisbon',
      name: 'Лиссабон',
      description:
        'Лиссабон – столица Португалии, расположенная на нескольких холмах и омываемая водами Атлантического океана. Из величественного замка Святого Георгия открывается вид на весь город и реку Тежу. Исторические кварталы Байша, Алфама и Белен хранят архитектурное наследие португальского Возрождения — стиля мануэлино. Город известен жёлтыми трамваями, изразцами азулежу, музыкой фаду и свежайшими морепродуктами.',
      images: [
        {
          url: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRuRdhouhXqLDrSMEhcjig4Y73R1QQ85jcaIebZcCbdIyLfcbfFbwYlXphrjlP8Ui7hSUC4ni-OUDLLfwZ1IxcAHlk&s=19',
        },
        {
          url: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSrslLas-EnDdtymBjx267iy1TRDlgRylJz8v62vVHJjCGjtstXm5RPO0KOdgR-XtDwEp7S1pXewU4mM5iStMt8l2Xi&s=19',
        },
        {
          url: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGLAbaIeXI9zvmuPpP1sJ6R8ML3fN-HjO0lmM5EgFMgpBrOKATYdM7OGxEqUkz6oyPp_myMVIRfmQW-wIKSrsV2EC4HU3VA1uqV0KsNzfWYLiyZPXzpCj8KqOAbJB04LCBE2Xtk=w1080-h624-n-k-no',
          name: 'Торри-ди-Белен',
        },
        {
          url: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEXy4TyO2OV1sPh3Np7NwFyvA1pKevJebp5MiWdnaJE6unQifVLQ3VJSyokKAsiMjgO8wDfB9DGcfLS3i6j45mAeGoHh3E_e6ouxrR_V5ymHJFc7_oXA2g1kA5YoURLd8KC1A5n=w1080-h624-n-k-no',
          name: 'Замок Св. Георгия',
        },
        {
          url: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAG0j1Eq-soKiFx9710RGbNxCQaSGjEoZ-vkkg-mqelLsiTVJN87dzcm3fstXfDIB5jjOcSTA1tc940Dp3Vi2V-_QtFxKdflf6cdkalo2GabGJmlS1xttPkuYWXX9Zo0ky4njg2TIp8iI6RA=w1080-h624-n-k-no',
          name: 'Монастырь Жеронимуш',
        },
        {
          url: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcStAmDALNzcNZlapbeJlVv7AUbFLO-lD3P_aKV01ad08pc0DgUhW-xgtgf9p0nsecw-9tppbwcbyHGZCbv9Ke9d-UE&s=19',
        },
        {
          url: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcS18vy8fULHk7qR_vKCgyWyxEa8IYjq6zBreU42kTGXk3UipKUQbwa1t6nBp7Ue6QvZiLZX6fbUFd9VPN46FtoLOpE&s=19',
        },
        {
          url: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHQ1P5h_msuiGxrwm2e6Ux0dF-agcbnismIqZ0oGXO6yxetZqce4I04NKsbTFTPJ7PIt_IjH-a6RqH1cgt1ZG48tZoJ783ZUS59S9ehj9fkfmMOIcxNGAxjISMa7x2b_aZsfTi8=w1080-h624-n-k-no',
          name: 'Площадь Коммерции',
        },
        {
          url: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFxayF5-_bBKuYLvwFOOLF2cGYyd9OUKx8JtpqLhvVpe33yyXPH8t1duFdTPlOXMQuPsunAGNnDuT_orVF0uSUnl0PpjVprxfdXHkHI2xIoAxmu6beQzNlPqlquS1Dz5nHC9f_VMw=w1080-h624-n-k-no',
          name: 'Лифт Санта-Хуста',
        },
        {
          url: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTeMgqiMd84aWPo1W4_cWCeF-UHB1RTKT9pb8J5cqEA7XVoUDPhPg2pQ35ZpkH_9avwm2e_TkdtSPWNeujDqVe02rM&s=19',
        },
      ],
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
        image: 'https://i.imgur.com/272X1vd.jpg',
        photos: [
          'https://i.imgur.com/272X1vd.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/1/16/Lisbonne_-_Couvent_des_Carles_-_Vue_g%C3%A9n%C3%A9rale.jpg',
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/c4/70/55/caption.jpg?w=1200&h=1200&s=1',
          'https://media.timeout.com/images/103945188/image.jpg',
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/fb/8f/4e/immersive-spectacle-from.jpg?w=900&h=500&s=1',
          'https://espreitaromundo.com/wp-content/uploads/2018/04/96365.jpg',
          'https://imagens.publico.pt/imagens.aspx/1495450?tp=UH&db=IMAGENS&type=JPG&w=320&act=resize',
          'https://imgmd.net/images/v1/guia/1701547/museu-arqueologico-do-carmo.jpg',
          'https://cdn.bubblyliving.com/wp-content/uploads/2025/03/20241205_133728.webp',
          'https://farm7.static.flickr.com/6006/5962001930_bf85b9d385_z.jpg',
          'https://farm7.static.flickr.com/6027/5962007830_67a2b00d0d.jpg',
        ],
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
        image:
          'https://aws-tiqets-cdn.imgix.net/images/content/f1b4aede4ed54920b69ca2791ecd5f34.jpeg?auto=format%2Ccompress&dpr=2&fit=clip&h=862&q=30&s=55c7d5da6b07879f0670e9e792c9444e&w=null',
        photos: [
          'https://aws-tiqets-cdn.imgix.net/images/content/f1b4aede4ed54920b69ca2791ecd5f34.jpeg?auto=format%2Ccompress&dpr=2&fit=clip&h=862&q=30&s=55c7d5da6b07879f0670e9e792c9444e&w=null',
          'https://mylisbon.ru/wp-content/uploads/2018/01/FD28C444-C09E-43AE-9EA8-AD0EBABAD3D5.jpeg',
          'https://guidelissabon.com/wp-content/uploads/2019/08/lissabonskij-okeanarium.jpg',
          'https://aws-tiqets-cdn.imgix.net/images/content/8261bca9e1dc47b681eac29bf67ff32f.jpeg?auto=format%2Ccompress&dpr=2&fit=clip&h=862&q=30&s=d27af2c7d2150846b5ef9e009ae5ae9d&w=null',
          'https://aws-tiqets-cdn.imgix.net/images/content/17b1d15ad78f4d16b804c0ab6c510448.jpeg?auto=format%2Ccompress&dpr=2&fit=clip&h=862&q=30&s=73cd4c6574fbfa137170145514c9da4a&w=null',
          'https://aws-tiqets-cdn.imgix.net/images/content/d31fa4dffb354c6ab35140fe02c475f5.jpg?auto=format%2Ccompress&dpr=2&fit=clip&h=862&q=30&s=4200d7b7f40f097a24bf535575ce66a1&w=null',
          'https://aws-tiqets-cdn.imgix.net/images/content/6da452c69903401ea19030c48953f75d.jpeg?auto=format%2Ccompress&dpr=2&fit=clip&h=862&q=30&s=afa24623cf8b86d54273f8f655e16f7c&w=null',
          'https://aws-tiqets-cdn.imgix.net/images/content/b29bddc18de8408fbbb243bbbc163057.jpeg?auto=format%2Ccompress&dpr=2&fit=clip&h=862&q=30&s=1aeaab68b14f256332e11a84f4e7f6b4&w=null',
          'https://aws-tiqets-cdn.imgix.net/images/content/bc4b4d350f9449b18ae8cc7f632dc673.jpeg?auto=format%2Ccompress&dpr=2&fit=clip&h=862&q=30&s=928bd3bc42a35fe724dc15ae09e3323e&w=null',
        ],
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
        image:
          'https://cdn-imgix.headout.com/media/images/c78811b923d7d22809ec69778dc4fa98-Sao%20Jorge%20castle%20aerial.jpg?auto=compress%2Cformat&w=1069.6000000000001&h=687.6&q=90&ar=14%3A9&crop=faces&fit=crop',
        photos: [
          'https://cdn-imgix.headout.com/media/images/c78811b923d7d22809ec69778dc4fa98-Sao%20Jorge%20castle%20aerial.jpg?auto=compress%2Cformat&w=1069.6000000000001&h=687.6&q=90&ar=14%3A9&crop=faces&fit=crop',
          'https://cdn-imgix.headout.com/microbrands-banner-image/image/118b214bf4a94ec3f4e5cb47f10331cd-Sao%20Jorge%20Castle%203.jpeg?auto=compress%2Cformat&w=1069.6000000000001&h=687.6&q=90&ar=14%3A9&crop=faces&fit=crop',
          'https://cdn-imgix.headout.com/media/images/0005fb9dbb20e08a9ac05fe394ee37ad-CastelodeSaoJorgewalkingpathandtowers-Lisbon.jpg?auto=compress%2Cformat&w=695.0400000000001&h=434.4&q=96&crop=faces&fit=crop',
          'https://cdn-imgix.headout.com/media/images/881944c93fbe2a77951ba0573ca81748-19023--lisbon-st.-george-s-castle-tickets-02.jpg?auto=compress%2Cformat&w=695.0400000000001&h=434.4&q=96&crop=faces&fit=crop',
          'https://portugal-traveling.ru/images/1lisbon/castle-george/george-castle-view02.jpg',
          'https://portugal-traveling.ru/images/1lisbon/castle-george/george-castle-view01.jpg',
        ],
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
        image:
          'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFEdKuwsGrvWnAbF1uBrb7bOoNwRVA8K0BD61Z9QrMYu4m2swhddfY4CnBXXi4ZgLFcG1cIoDBv7Ta8tBhZKdRA72IbGfJCJoMY32pnosxRlgF5cezM9agLRofImDXp15FmpZNpLJIHE7AH=s1360-w1360-h1020-rw',
        photos: [
          'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFEdKuwsGrvWnAbF1uBrb7bOoNwRVA8K0BD61Z9QrMYu4m2swhddfY4CnBXXi4ZgLFcG1cIoDBv7Ta8tBhZKdRA72IbGfJCJoMY32pnosxRlgF5cezM9agLRofImDXp15FmpZNpLJIHE7AH=s1360-w1360-h1020-rw',
          'https://mylisbon.ru/wp-content/uploads/2015/01/Fotolia_71790497_Subscription_Monthly_M.jpg',
          'https://withportugal.com/uploads/filemanager/c5cf5c8f1fb8d98cf56261a13793543d/jeronimos/mosteiro-dos-jeronimos-898788_1920.jpg',
          'https://portugal-traveling.ru/images/1lisbon/jeronimush/jeronimush2.jpg',
          'https://portugal-traveling.ru/images/1lisbon/jeronimush/jeronimush3.jpg',
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/24/52/8b/santa-maria-de-belem.jpg?w=2000&h=-1&s=1',
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/d6/6b/70/caption.jpg?w=1100&h=-1&s=1',
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/ce/87/62/caption.jpg?w=1400&h=-1&s=1',
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/be/fa/5e/caption.jpg?w=1100&h=-1&s=1',
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/32/59/28/f9/caption.jpg?w=1400&h=-1&s=1',
        ],
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
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Torre_de_Belem_April_2009-2.jpg/1200px-Torre_de_Belem_April_2009-2.jpg',
        photos: [
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Torre_de_Belem_April_2009-2.jpg/1200px-Torre_de_Belem_April_2009-2.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Lisboa_setembro_2013-13.jpg/1280px-Lisboa_setembro_2013-13.jpg',
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/26/0e/aa/torre-de-belem.jpg?w=1200&h=1200&s=1',
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/37/1c/7a/caption.jpg?w=1200&h=1200&s=1',
          'https://portugal-traveling.ru/images/1lisbon/tower-belem/belem-tower01.jpg',
          'https://portugal-traveling.ru/images/1lisbon/tower-belem/belem-tower02.jpg',
          'https://farm4.staticflickr.com/3744/9386889986_e0a2d4e1b0_b.jpg',
        ],
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
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Alfama_neighbourhood%2C_Lisbon%2C_Portugal.jpg/1280px-Alfama_neighbourhood%2C_Lisbon%2C_Portugal.jpg',
        photos: [
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Alfama_neighbourhood%2C_Lisbon%2C_Portugal.jpg/1280px-Alfama_neighbourhood%2C_Lisbon%2C_Portugal.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Lisboa_%2836831596524%29.jpg/1280px-Lisboa_%2836831596524%29.jpg',
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c4/8a/3e/caption.jpg?w=1200&h=1200&s=1',
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/f9/72/alfama.jpg?w=1200&h=1200&s=1',
          'https://portugal-traveling.ru/images/1lisbon/alfama/alfama-01.jpg',
          'https://portugal-traveling.ru/images/1lisbon/alfama/alfama-streets.jpg',
          'https://farm4.staticflickr.com/3706/10074316695_e99e62c7e4_b.jpg',
          'https://farm8.staticflickr.com/7385/8735889088_a84c0a3de9_b.jpg',
        ],
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
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Elevador_de_Santa_Justa_-_Lisboa.jpg/800px-Elevador_de_Santa_Justa_-_Lisboa.jpg',
        photos: [
          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Elevador_de_Santa_Justa_-_Lisboa.jpg/800px-Elevador_de_Santa_Justa_-_Lisboa.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Elevador_de_Santa_Justa_2.jpg/800px-Elevador_de_Santa_Justa_2.jpg',
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/a6/3e/8c/elevador-de-santa-justa.jpg?w=1200&h=1200&s=1',
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/89/3a/7f/caption.jpg?w=1200&h=1200&s=1',
          'https://portugal-traveling.ru/images/1lisbon/elevator-santa-justa/santa-justa-01.jpg',
          'https://farm6.staticflickr.com/5508/11939557135_ea27bff55d_b.jpg',
        ],
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
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Pra%C3%A7a_do_Com%C3%A9rcio_-_Lisboa.jpg/1280px-Pra%C3%A7a_do_Com%C3%A9rcio_-_Lisboa.jpg',
        photos: [
          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Pra%C3%A7a_do_Com%C3%A9rcio_-_Lisboa.jpg/1280px-Pra%C3%A7a_do_Com%C3%A9rcio_-_Lisboa.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Comercio_Square_Lisbon_2015.jpg/1280px-Comercio_Square_Lisbon_2015.jpg',
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/36/6b/5a/praca-do-comercio.jpg?w=1200&h=1200&s=1',
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/e6/c2/3e/caption.jpg?w=1200&h=1200&s=1',
          'https://portugal-traveling.ru/images/1lisbon/praca-comercio/comercio-01.jpg',
        ],
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
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Miradouro_da_Gra%C3%A7a_-_Lisboa.jpg/1280px-Miradouro_da_Gra%C3%A7a_-_Lisboa.jpg',
        photos: [
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Miradouro_da_Gra%C3%A7a_-_Lisboa.jpg/1280px-Miradouro_da_Gra%C3%A7a_-_Lisboa.jpg',
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/8a/4c/2e/miradouro-da-graca.jpg?w=1200&h=1200&s=1',
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/0f/2c/8d/caption.jpg?w=1200&h=1200&s=1',
          'https://portugal-traveling.ru/images/1lisbon/miradouro-graca/graca-view01.jpg',
          'https://portugal-traveling.ru/images/1lisbon/miradouro-graca/graca-view02.jpg',
          'https://farm8.staticflickr.com/7195/6829839918_0aee1b4e49_b.jpg',
          'https://farm4.staticflickr.com/3757/12184023654_7c0a2b5e1f_b.jpg',
        ],
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

  console.log('Seeded 9 places');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
