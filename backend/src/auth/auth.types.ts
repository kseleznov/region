export type JwtUser = { id: number; email: string; name: string };

export type JwtRefreshUser = { id: number; email: string; refreshToken: string };

export type AuthTokens = { accessToken: string; refreshToken: string };

export type JwtPayload = { sub: number; email: string; name: string };

export type JwtRefreshPayload = { sub: number; email: string };
