export interface FollowedUser {
  id: number;
  username: string;
  name: string;
}

export interface CityTip {
  id: number;
  placeId: number;
  placeName: string;
  placeImage: string;
  category: string;
  note: string;
}

export interface CityVisitedPlace {
  placeId: number;
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
  id: number;
  username: string;
  name: string;
  bio: string | null;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
  cities: CityGuideStats[];
}
