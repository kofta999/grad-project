import { sign, verify } from "hono/jwt";
import type { JWTPayload } from "hono/utils/jwt/types";

export class JwtService<Payload extends JWTPayload> {
  private secret: string;
  // 60 mins * 60 secs
  private TOKEN_EXP_SECONDS = 3600 as const;

  constructor(secret: string) {
    this.secret = secret;
  }

  async sign(payload: Payload): Promise<string> {
    const nowSeconds = Math.floor(Date.now() / 1000);
    return sign(
      {
        ...payload,
        exp: nowSeconds + this.TOKEN_EXP_SECONDS,
        iat: nowSeconds,
      },
      this.secret
    );
  }

  verify(token: string): Promise<Payload> {
    return verify(token, this.secret) as Promise<Payload>;
  }
}
