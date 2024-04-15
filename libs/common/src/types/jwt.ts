export interface IJwtCustomPayload {
  role: string;
  email?: string;
}

export interface IJwtPayload extends IJwtCustomPayload {
  sub: string;
  iat: number;
  exp: number;
}

export interface IJwtTokenResponse extends IJwtPayload {
  access_token: string;
}
