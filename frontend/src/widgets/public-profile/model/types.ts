export interface CityTip {
  id: string;
  placeName: string;
  placeImage: string;
  category: string;
  note: string;
}

export interface CityVisitedPlace {
  id: string;
  placeName: string;
  placeImage: string;
}

export interface CityGuideStats {
  citySlug: string;
  cityName: string;
  placesVisited: number;
  districts: number;
  isNightExplorer: boolean;
  isFoodHunter: boolean;
  tips: CityTip[];
  visited: CityVisitedPlace[];
}

export interface PublicProfileData {
  id: string;
  username: string;
  name: string;
  bio: string;
  livesInLabel: string;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
  cities: CityGuideStats[];
}
