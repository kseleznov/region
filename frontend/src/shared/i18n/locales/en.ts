/**
 * English is the source of truth: its shape defines `Dictionary`, and every
 * other locale must match it exactly. Keep keys grouped by the widget /
 * feature that uses them.
 *
 * Intentionally not `as const` — `Dictionary` needs widened `string` values
 * so other locales can hold different text for the same keys.
 */
export const en = {
  common: {
    free: "Free",
    open: "Open",
    closed: "Closed",
    from: "from {price}€",
    price: "{price}€",
    readMore: "Read more",
    showLess: "Show less",
    viewAll: "View All",
    retry: "Try again",
    close: "Close",
    loading: "Loading...",
  },

  metadata: {
    title: "Region",
    description: "Find the best places, events and restaurants in your city",
  },

  nav: {
    home: "Home",
    explore: "Explore",
    saved: "Saved",
    profile: "Profile",
  },

  greeting: {
    title: "Explore Your City Today!",
    subtitle: "Find the best places, events, and restaurants all in one place",
    cta: "Start exploring",
  },

  header: {
    selectCity: "Select city",
  },

  profile: {
    accountLabel: "Your account",
    title: "Profile",
    editProfile: "Edit profile",
    logOut: "Log out",
    signIn: "Sign in",
    menu: {
      notifications: "Notifications",
      language: "Language",
      payment: "Payment methods",
      help: "Help & support",
    },
    languageSheet: {
      title: "Language",
      subtitle: "Choose the language for the whole app",
    },
    editSheet: {
      title: "Edit profile",
      nameLabel: "Name",
      usernameLabel: "Username",
      usernameHint: "Your username is unique and can't be changed.",
      bioLabel: "Bio",
      bioPlaceholder: "Tell others about yourself",
      save: "Save",
    },
    followersSheet: {
      tabs: {
        followers: "Followers",
        following: "Following",
      },
      unfollow: "Unfollow",
      empty: "Nobody here yet",
    },
    myTips: {
      title: "My tips",
      empty: "You haven't added any tips yet",
      edit: "Edit",
      editAria: "Edit tip for {name}",
      removeAria: "Remove tip for {name}",
      showAll: "Show all ({count})",
    },
    editTipSheet: {
      title: "Edit tip",
      save: "Save",
    },
  },

  auth: {
    welcomeBack: "Welcome back",
    getStarted: "Get started",
    signIn: "Sign in",
    signUp: "Sign up",
    createAccount: "Create account",
    signingIn: "Signing in...",
    creating: "Creating...",
    namePlaceholder: "Full name",
    emailPlaceholder: "Email address",
    passwordPlaceholder: "Password",
    haveAccount: "Already have an account? ",
    noAccount: "Don't have an account? ",
    orDivider: "or",
    continueWithGoogle: "Continue with Google",
    continueWithApple: "Continue with Apple",
    errors: {
      network: "Can't reach the server. Check your connection and try again.",
      invalidCredentials: "Incorrect email or password",
      invalidInput: "Enter a valid email and password",
      signInGeneric: "Couldn't sign you in. Please try again.",
      emailTaken: "This email is already registered",
      weakPassword:
        "Check your details: password must be at least 6 characters",
      signUpGeneric: "Couldn't create your account. Please try again.",
    },
  },

  region: {
    title: "Choose your city",
    searchPlaceholder: "Search city or country...",
    confirm: "Continue with {city}",
    regions: {
      all: "All",
      europe: "Europe",
      usa: "USA",
      asia: "Asia",
    },
    popular: {
      title: "Popular destinations",
      empty: "No cities in this region",
      comingSoon: "Coming Soon",
    },
  },

  overview: {
    whereToGo: "Where to go",
  },

  explore: {
    label: "Exploring",
    title: "Explore",
    changeCity: "Change city",
    searchInCity: "Search in {city}",
    filters: {
      title: "Filters",
      sort: "Sort by",
      price: "Price",
      rating: "Minimum rating",
      openNow: "Open now",
      openNowHint: "Only show places currently open",
      subcategory: "Subcategory",
      any: "Any",
      showResults: "Show results",
      reset: "Reset filters",
    },
    sort: {
      "top-rated": "Top rated",
      "price-low": "Price (low → high)",
      "price-high": "Price (high → low)",
    },
    priceBuckets: {
      free: "Free",
      "under-10": "≤ 10€",
      "10-25": "10–25€",
      "over-25": "25€ +",
    },
    empty: {
      filteredTitle: "Nothing found",
      filteredHint: "Nothing here matches the selected filters.",
      emptyTitle: "Nothing here yet",
      emptyHint: "No places here yet — try another category.",
    },
  },

  saved: {
    label: "Your collection",
    tabs: {
      saved: "Saved",
      visited: "Visited",
    },
    empty: {
      savedTitle: "Nothing saved yet",
      savedHint: "Tap the heart on any place to save it here for later",
      visitedTitle: "Nothing visited yet",
      visitedHint: "Mark a place as visited and it shows up here",
    },
  },

  toast: {
    saved: "Saved to your collection",
    unsaved: "Removed from saved",
    visited: "Marked as visited",
    unvisited: "Visited mark removed",
    tipAdded: "Added to your tips",
    tipUpdated: "Tip updated",
    tipRemoved: "Tip removed",
    profileUpdated: "Profile updated",
  },

  card: {
    viewAll: "View All",
    openUntil: "Open until {time}",
    openingHours: "Opening hours",
    location: "Location",
    whatToExpect: "What to expect",
    reviewsTitle: "Reviews",
    seeAllReviews: "See all reviews",
    showFewerReviews: "Show fewer reviews",
    similarTitle: "You might also like",
    aria: {
      close: "Close",
      save: "Save",
      unsave: "Unsave",
      markVisited: "Mark as visited",
      unmarkVisited: "Unmark as visited",
      share: "Share",
    },
    days: {
      mon: "Mon",
      tue: "Tue",
      wed: "Wed",
      thu: "Thu",
      fri: "Fri",
      sat: "Sat",
      sun: "Sun",
    },
    shareMenu: {
      share: "Share",
      addTip: "Add to tips",
    },
    addTipSheet: {
      title: "Add a tip",
      placeholder: "What should people know before visiting?",
      confirm: "Add tip",
    },
  },

  cityInfo: {
    weather: "Weather",
    overview: "Overview",
  },

  cityFacts: {
    didYouKnow: "Did you know?",
    about: "About {city}",
    slideAria: "Go to slide {index}",
    lisbon: {
      yearsHistoryValue: "3,000+",
      yearsHistoryLabel: "years of history",
      westernmostCapital:
        "Lisbon is the only Western European capital west of London.",
      belemCaption: "Belém Tower, 15th century",
      hillsValue: "7",
      hillsLabel: "hills of the city",
      tram: "Tram No. 28, launched in 1914, still runs through the historic districts.",
      castleCaption: "São Jorge Castle",
      coastlineValue: "900 km",
      coastlineLabel: "of coastline",
      portuguese:
        "Portuguese is spoken by more than 250 million people worldwide.",
    },
  },

  ranks: {
    wanderer: "Wanderer",
    explorer: "Explorer",
    insider: "Insider",
    localSoul: "Local Soul",
    cityHunter: "City Hunter",
    urbanLegend: "Urban Legend",
    placesVisited: "Places visited",
    districtsUnlocked: "Districts unlocked",
    badgeAria: "Rank: {name}. Tap for details.",
    moreToNext: "{count} more places to",
    reachedTop: "You've reached the top.",
    cityPassport: "City Passport",
    achievements: "Achievements",
    nightExplorer: "Night Explorer",
    foodHunter: "Food Hunter",
    levelUp: "Level up",
    placeAdded: "+1 place",
    progressAria: "Progress toward the next rank",
    rankUpAria: "You reached a new rank: {name}",
    dismissHint: "tap to continue",
    taglines: {
      wanderer: "just starting out",
      explorer: "getting curious",
      insider: "knows the spots",
      localSoul: "almost a local",
      cityHunter: "an expert",
      urbanLegend: "pure elite",
    },
  },

  publicProfile: {
    followers: "Followers",
    following: "Following",
    cities: "Cities",
    citiesCount: "{count} cities",
    places: "places",
    tipsLabel: "tips",
    livesIn: "Lives in {city}",
    follow: "Follow",
    followingAction: "Following",
    rankInCity: "Rank in {city}",
    tabs: {
      tips: "Tips",
      visited: "Visited",
    },
    tipsHeading: "Places {name} personally recommends in {city}",
    noTipsYet: "No tips yet",
    noVisitedYet: "No visited places yet",
    notFound: "This profile doesn't exist",
    aria: {
      back: "Back",
      menu: "More options",
      follow: "Follow {name}",
      unfollow: "Unfollow {name}",
    },
  },

  explanation: {
    createEvents: "CREATE YOUR OWN EVENTS",
    findActivity: "FIND THE PERFECT ACTIVITY",
    buyTickets: "BUY TICKETS ONLINE",
    stayInformed: "STAY INFORMED ABOUT EVENTS",
  },

  staticCities: {
    lisbon: "Lisbon",
    dublin: "Dublin",
    paris: "Paris",
    tokyo: "Tokyo",
  },

  countries: {
    portugal: "Portugal",
    ireland: "Ireland",
    france: "France",
    japan: "Japan",
  },

  categories: {
    parents: {
      all: "All",
      culture: "Culture",
      activities: "Activities",
      nature: "Nature",
    },
    sub: {
      Музей: "Museum",
      Замок: "Castle",
      Монастырь: "Monastery",
      Памятник: "Monument",
      Достопримечательность: "Landmark",
      Площадь: "Square",
      Район: "District",
      Океанариум: "Oceanarium",
      "Смотровая площадка": "Viewpoint",
      Парк: "Park",
    },
  },
};
