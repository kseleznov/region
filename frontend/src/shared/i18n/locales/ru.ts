import type { Dictionary } from "../dictionaries";

export const ru: Dictionary = {
  common: {
    free: "Бесплатно",
    open: "Открыто",
    closed: "Закрыто",
    from: "от {price}€",
    price: "{price}€",
    readMore: "Подробнее",
    showLess: "Свернуть",
    viewAll: "Все",
    retry: "Повторить",
    close: "Закрыть",
    loading: "Загрузка...",
  },

  metadata: {
    title: "Region",
    description: "Лучшие места, события и рестораны вашего города",
  },

  nav: {
    home: "Главная",
    explore: "Обзор",
    saved: "Сохранённое",
    profile: "Профиль",
  },

  greeting: {
    title: "Открой свой город сегодня!",
    subtitle: "Лучшие места, события и рестораны — всё в одном месте",
    cta: "Начать",
  },

  header: {
    selectCity: "Выбрать город",
  },

  profile: {
    accountLabel: "Ваш аккаунт",
    title: "Профиль",
    editProfile: "Редактировать профиль",
    logOut: "Выйти",
    signIn: "Войти",
    menu: {
      notifications: "Уведомления",
      language: "Язык",
      payment: "Способы оплаты",
      help: "Помощь и поддержка",
    },
    languageSheet: {
      title: "Язык",
      subtitle: "Выберите язык для всего приложения",
    },
    editSheet: {
      title: "Редактировать профиль",
      nameLabel: "Имя",
      usernameLabel: "Никнейм",
      usernameHint: "Никнейм уникальный и его нельзя изменить.",
      bioLabel: "О себе",
      bioPlaceholder: "Расскажите о себе",
      save: "Сохранить",
    },
    followersSheet: {
      tabs: {
        followers: "Подписчики",
        following: "Подписки",
      },
      unfollow: "Отписаться",
      empty: "Пока никого нет",
    },
    myTips: {
      title: "Мои советы",
      empty: "Вы ещё не добавили ни одного совета",
      edit: "Редактировать",
      editAria: "Редактировать совет про {name}",
      removeAria: "Удалить совет про {name}",
      showAll: "Показать все ({count})",
    },
    editTipSheet: {
      title: "Редактировать совет",
      save: "Сохранить",
    },
  },

  auth: {
    welcomeBack: "С возвращением",
    getStarted: "Начнём",
    signIn: "Войти",
    signUp: "Регистрация",
    createAccount: "Создать аккаунт",
    signingIn: "Входим...",
    creating: "Создаём...",
    namePlaceholder: "Имя и фамилия",
    emailPlaceholder: "Электронная почта",
    passwordPlaceholder: "Пароль",
    haveAccount: "Уже есть аккаунт? ",
    noAccount: "Нет аккаунта? ",
    orDivider: "или",
    continueWithGoogle: "Продолжить с Google",
    continueWithApple: "Продолжить с Apple",
    errors: {
      network: "Не удаётся связаться с сервером. Проверьте соединение.",
      invalidCredentials: "Неверная почта или пароль",
      invalidInput: "Введите корректную почту и пароль",
      signInGeneric: "Не удалось войти. Попробуйте ещё раз.",
      emailTaken: "Эта почта уже зарегистрирована",
      weakPassword: "Проверьте данные: пароль должен быть не короче 6 символов",
      signUpGeneric: "Не удалось создать аккаунт. Попробуйте ещё раз.",
    },
  },

  region: {
    title: "Выберите город",
    searchPlaceholder: "Поиск города или страны...",
    confirm: "Продолжить с городом {city}",
    regions: {
      all: "Все",
      europe: "Европа",
      usa: "США",
      asia: "Азия",
    },
    popular: {
      title: "Популярные направления",
      empty: "Нет городов в этом регионе",
      comingSoon: "Скоро",
    },
  },

  overview: {
    whereToGo: "Куда сходить",
  },

  explore: {
    label: "Обзор",
    title: "Обзор",
    changeCity: "Сменить город",
    searchInCity: "Поиск в городе {city}",
    filters: {
      title: "Фильтры",
      sort: "Сортировка",
      price: "Цена",
      rating: "Минимальный рейтинг",
      openNow: "Открыто сейчас",
      openNowHint: "Показывать только открытые сейчас места",
      subcategory: "Подкатегория",
      any: "Любой",
      showResults: "Показать результаты",
      reset: "Сбросить фильтры",
    },
    sort: {
      "top-rated": "По рейтингу",
      "price-low": "Цена (по возрастанию)",
      "price-high": "Цена (по убыванию)",
    },
    priceBuckets: {
      free: "Бесплатно",
      "under-10": "≤ 10€",
      "10-25": "10–25€",
      "over-25": "25€ +",
    },
    empty: {
      filteredTitle: "Ничего не найдено",
      filteredHint: "Под выбранные фильтры здесь ничего не подходит.",
      emptyTitle: "В этом разделе пока пусто",
      emptyHint: "Тут ещё нет мест — загляните в другие категории.",
    },
  },

  saved: {
    label: "Ваша коллекция",
    tabs: {
      saved: "Сохранённое",
      visited: "Посещённое",
    },
    empty: {
      savedTitle: "Пока ничего не сохранено",
      savedHint: "Нажмите на сердечко у любого места, чтобы сохранить его",
      visitedTitle: "Пока ничего не посещено",
      visitedHint: "Отметьте место как посещённое, и оно появится здесь",
    },
  },

  toast: {
    saved: "Сохранено в коллекцию",
    unsaved: "Удалено из сохранённого",
    visited: "Отмечено как посещённое",
    unvisited: "Отметка о посещении снята",
    tipAdded: "Добавлено в советы",
    tipUpdated: "Совет обновлён",
    tipRemoved: "Совет удалён",
    profileUpdated: "Профиль обновлён",
  },

  card: {
    viewAll: "Все",
    openUntil: "Открыто до {time}",
    openingHours: "Часы работы",
    location: "Расположение",
    whatToExpect: "Что вас ждёт",
    reviewsTitle: "Отзывы",
    seeAllReviews: "Все отзывы",
    showFewerReviews: "Свернуть отзывы",
    similarTitle: "Вам может понравиться",
    aria: {
      close: "Закрыть",
      save: "Сохранить",
      unsave: "Убрать из сохранённого",
      markVisited: "Отметить как посещённое",
      unmarkVisited: "Снять отметку о посещении",
      share: "Поделиться",
    },
    days: {
      mon: "Пн",
      tue: "Вт",
      wed: "Ср",
      thu: "Чт",
      fri: "Пт",
      sat: "Сб",
      sun: "Вс",
    },
    shareMenu: {
      share: "Поделиться",
      addTip: "Добавить в советы",
    },
    addTipSheet: {
      title: "Добавить совет",
      placeholder: "Что стоит знать перед посещением?",
      confirm: "Добавить совет",
    },
  },

  cityInfo: {
    weather: "Погода",
    overview: "Обзор",
  },

  cityFacts: {
    didYouKnow: "Знаешь ли ты?",
    about: "О городе {city}",
    slideAria: "Перейти к слайду {index}",
    lisbon: {
      yearsHistoryValue: "3 000+",
      yearsHistoryLabel: "лет истории",
      westernmostCapital:
        "Лиссабон — единственная западноевропейская столица к западу от Лондона.",
      belemCaption: "Башня Белен, XV век",
      hillsValue: "7",
      hillsLabel: "холмов города",
      tram: "Трамвай №28, запущенный в 1914 году, до сих пор курсирует по историческим районам.",
      castleCaption: "Замок Св. Георгия",
      coastlineValue: "900 км",
      coastlineLabel: "береговой линии",
      portuguese:
        "На португальском языке говорят более 250 млн человек по всему миру.",
    },
  },

  ranks: {
    wanderer: "Странник",
    explorer: "Исследователь",
    insider: "Свой человек",
    localSoul: "Местная душа",
    cityHunter: "Охотник за городом",
    urbanLegend: "Городская легенда",
    placesVisited: "Мест посещено",
    districtsUnlocked: "Районов открыто",
    badgeAria: "Ранг: {name}. Нажмите для деталей.",
    moreToNext: "Ещё {count} мест до ранга",
    reachedTop: "Вы достигли вершины.",
    cityPassport: "Паспорт города",
    achievements: "Достижения",
    nightExplorer: "Ночной исследователь",
    foodHunter: "Охотник за едой",
    levelUp: "Новый уровень",
    placeAdded: "+1 место",
    progressAria: "Прогресс до следующего ранга",
    rankUpAria: "Вы достигли нового ранга: {name}",
    dismissHint: "нажмите, чтобы продолжить",
    taglines: {
      wanderer: "только начинает",
      explorer: "просыпается любопытство",
      insider: "знает места",
      localSoul: "почти местный",
      cityHunter: "эксперт",
      urbanLegend: "настоящая элита",
    },
  },

  publicProfile: {
    followers: "Подписчики",
    following: "Подписки",
    cities: "Города",
    citiesCount: "{count} города",
    places: "мест",
    tipsLabel: "советов",
    livesIn: "Живёт в {city}",
    follow: "Подписаться",
    followingAction: "Вы подписаны",
    rankInCity: "Ранг в городе {city}",
    tabs: {
      tips: "Советы",
      visited: "Посещено",
    },
    tipsHeading: "Места в городе {city}, которые {name} советует лично",
    noTipsYet: "Советов пока нет",
    noVisitedYet: "Посещённых мест пока нет",
    notFound: "Такого профиля не существует",
    aria: {
      back: "Назад",
      menu: "Ещё",
      follow: "Подписаться на {name}",
      unfollow: "Отписаться от {name}",
    },
  },

  explanation: {
    createEvents: "СОЗДАВАЙ СОБСТВЕННЫЕ СОБЫТИЯ",
    findActivity: "НАХОДИ ИДЕАЛЬНОЕ ЗАНЯТИЕ",
    buyTickets: "ПОКУПАЙ БИЛЕТЫ ОНЛАЙН",
    stayInformed: "БУДЬ В КУРСЕ СОБЫТИЙ",
  },

  staticCities: {
    lisbon: "Лиссабон",
    dublin: "Дублин",
    paris: "Париж",
    tokyo: "Токио",
  },

  countries: {
    portugal: "Португалия",
    ireland: "Ирландия",
    france: "Франция",
    japan: "Япония",
  },

  categories: {
    parents: {
      all: "Все",
      culture: "Культура",
      activities: "Развлечения",
      nature: "Природа",
    },
    sub: {
      Музей: "Музей",
      Замок: "Замок",
      Монастырь: "Монастырь",
      Памятник: "Памятник",
      Достопримечательность: "Достопримечательность",
      Площадь: "Площадь",
      Район: "Район",
      Океанариум: "Океанариум",
      "Смотровая площадка": "Смотровая площадка",
      Парк: "Парк",
    },
  },
};
