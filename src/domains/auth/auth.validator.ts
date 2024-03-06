import { Result } from "../../result.model";
import csts from "src/config/consts";
import { userType } from "./auth.model";
import { FastifyReply } from "fastify";
import { comparePasswords } from "src/lib/auth-utils/hash-password";

export async function validateUser(
  userResult: Result<userType | undefined, string | Error | undefined>,
  password: string,
  reply: FastifyReply,
) {
  if (!userResult.success) {
    console.log(userResult.error);
    return reply.code(401).send({
      ok: false,
      message: "Invalid passowrd or email",
    });
  }

  const existingUser = userResult.data;
  if (existingUser?.type === csts.OAUTH) {
    return reply.code(401).send({ ok: false, message: "Invalid operation" });
  }
  const match = await comparePasswords(
    password,
    existingUser?.password as string,
  );
  if (match === false) {
    reply.code(401).send({ ok: false, message: "Invalid passowrd or email" });
  }
  return existingUser;
}
