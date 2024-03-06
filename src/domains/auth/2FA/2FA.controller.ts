// import { ZodError } from "zod";
// import { ResetSchema } from "../auth.model";
import { FastifyRequest, FastifyReply } from "fastify";
// import { getUser } from "../auth.services";
// import csts from "src/config/consts";
// 2FA enable
export async function TFAController(
  _req: FastifyRequest,
  _reply: FastifyReply,
) {
  // try {
  //   const parsedBody = ResetSchema.parse(req.body);
  //   const user = await getUser(req.session.get("email"), false);
  //   if (user.data === null) {
  //     return reply.send({
  //       ok: true,
  //       message: "A 2FA code is sent to your email address.",
  //     });
  //   }
  //   if (user.data?.type === csts.OAUTH) {
  //     return reply
  //       .code(401)
  //       .send({ ok: false, error: "An Error occured please try again" });
  //   }
  //   return reply.code(200).send({ ok: true, message: "2FA enabeled" });
  // } catch (error: any) {
  //   if (error instanceof ZodError) {
  //     reply.status(400).send({ error: error.issues[0].message });
  //   } else {
  //     reply.status(500).send({ error: "Internal Server Error" });
  //   }
  // }
}
// 2FA disable
export async function TFAControllerDisable(
  _req: FastifyRequest,
  _reply: FastifyReply,
) {
  // try {
  //   const user = await getUser(req.session.get("email"), false);
  //   if (user.data === null) {
  //     return reply.send({
  //       ok: true,
  //       message: "A 2FA code is sent to your email address.",
  //     });
  //   }
  //   if (user.data?.type === csts.OAUTH) {
  //     return reply
  //       .code(401)
  //       .send({ ok: false, error: "An Error occured please try again" });
  //   }
  //   return reply.code(200).send({ ok: true, message: "2FA disabled" });
  // } catch (error: any) {
  //   if (error instanceof ZodError) {
  //     reply.status(400).send({ error: error.issues[0]?.message });
  //   } else {
  //     reply.status(500).send({ error: "Internal Server Error" });
  //   }
  // }
}

// OAUTH2 , cookie
