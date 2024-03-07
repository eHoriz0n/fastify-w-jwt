// 2FA Code generator

import csts from "src/config/consts";
import { redisConf } from "src/config/default.config";
import { redis } from "src/config/redis-client";

// interface parsedBodyType {
//   password: string;
//   email: string;
// }
export function generateRandom6DigitNumber(): string {
  const randomNumber = Math.floor(Math.random() * 1000000);
  const sixDigitNumber = randomNumber.toString().padStart(6, "0");
  return sixDigitNumber;
}
export async function generateCode(
  email: string | null | undefined,
  type: "2FA" | "RESET",
) {
  const tfaToken = generateRandom6DigitNumber();
  const tp = type === "2FA" ? csts.TWO_FACTOR_AUTH : csts.RESET;
  await redis.set(tp + email, tfaToken);
  await redis.expire(csts.TWO_FACTOR_AUTH + email, redisConf.tfaTokenExp);
  return tfaToken;
}
