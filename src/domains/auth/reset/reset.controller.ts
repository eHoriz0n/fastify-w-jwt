import { ResetData, ResetTokenData } from "../auth.model";
import { FastifyRequest, FastifyReply } from "fastify";
import { editPassword, getUser } from "../auth.services";
import csts from "src/config/consts";
import { transporter } from "src/config/mailer";
import { generateCode } from "src/lib/auth-utils/2fa-code-gen";
import { redis } from "src/config/redis-client";
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
        message: "A reset code is sent to your email address.",
      });
    }
    if (user.data?.type === csts.OAUTH) {
      return reply
        .status(401)
        .send({ ok: false, message: "An Error occured please try again" });
    }
    const token = await generateCode(user?.data?.email, "RESET");
    // await redis.set(csts.RESET + userToken, parsedBody.email);
    // await redis.expire(csts.RESET + userToken, redisConf.resetTokenExp);
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: user?.data?.email as string,
      subject: "Subject",
      text: "this is a test from fastify jwt " + token,
    };
    transporter.sendMail(mailOptions, function (error, _info) {
      if (error) {
        console.log(error);
        reply.code(500).send({ ok: false, message: "Internal Server Error" });
      }
    });
    return reply.code(201).send({
      ok: true,
      message: "A reset code is sent to your email address.",
    });
  } catch (error: any) {
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
    const token_email = await redis.get(csts.RESET + email);
    if (token_email === null || token_email !== tokenId) {
      return reply.status(401).send({
        ok: false,
        message: "unauthorized",
      });
    }
    const edited = await editPassword(password, email);
    if (!edited.success) {
      reply.status(500).send({ ok: false, message: "Internal Server Error" });
    }
    await redis.del(csts.RESET + email);
    return reply.code(201).send({ ok: true, message: "password edited" });
  } catch (error: any) {
    reply.status(500).send({ error: "Internal Server Error" });
  }
}

// OAUTH2 , link
