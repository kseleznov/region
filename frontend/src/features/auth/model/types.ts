export interface User {
  id: number;
  email: string;
  name: string;
  username: string;
  bio: string | null;
}

export interface AuthTokenResponse {
  message: string;
}

export type AuthMode = "sign-in" | "sign-up";
