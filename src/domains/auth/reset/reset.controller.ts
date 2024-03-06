import { ResetData, ResetTokenData } from "../auth.model";
import { FastifyRequest, FastifyReply } from "fastify";
import { editPassword, getUser } from "../auth.services";
import { createId } from "@paralleldrive/cuid2";
import csts from "src/config/consts";
import { FastifyJWT } from "@fastify/jwt";
// Reset
export async function resetController(
  req: FastifyRequest<{ Body: ResetData }>,
  reply: FastifyReply,
) {
  try {
    const { email } = req.body;
    const user = await getUser(email, false);
    console.log(user);
    if (!user.success) {
      return reply.send({
        ok: true,
        message: "A reset link is sent to your email address.",
      });
    }
    if (user.data?.type === csts.OAUTH) {
      return reply
        .status(401)
        .send({ ok: false, message: "An Error occured please try again" });
    }
    const userToken = createId();
    const token = req.jwt.sign({ tokenId: userToken });

    // await redis.set(csts.RESET + userToken, parsedBody.email);
    // await redis.expire(csts.RESET + userToken, redisConf.resetTokenExp);
    reply.code(201).send({ ok: true, message: csts.RESET_LINK + token });
  } catch (error: any) {
    console.log(error);
    reply.status(500).send({ ok: false, message: "Internal Server Error" });
  }
}
// Post reset link generation
export async function resetTokenController(
  req: FastifyRequest<{ Body: ResetTokenData }>,
  reply: FastifyReply,
) {
  try {
    const { email, tokenId, password } = req.body;
    // handle token
    const decoded = req.jwt.verify<FastifyJWT["tokenId"]>(tokenId);
    if (!decoded.tokenId) {
      return reply
        .status(403)
        .send({ ok: false, message: "can't reset the password, try again" });
    }
    const edited = await editPassword(password, email);
    if (!edited.success) {
      reply.status(500).send({ ok: false, message: "Internal Server Error" });
    }
    return reply.code(201).send({ ok: true, message: "password edited" });
  } catch (error: any) {
    reply.status(500).send({ error: "Internal Server Error" });
  }
}

// OAUTH2 , link
