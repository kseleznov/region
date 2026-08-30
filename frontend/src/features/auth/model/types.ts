export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthTokenResponse {
  message: string;
}

export type AuthMode = "sign-in" | "sign-up";
