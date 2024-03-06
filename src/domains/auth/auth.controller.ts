import { LoginData, RegisterData } from "./auth.model";
import { FastifyRequest, FastifyReply } from "fastify";
import { createUser, getUser } from "./auth.services";
import { validateUser } from "./auth.validator";
// Login
export async function loginController(
  req: FastifyRequest<{ Body: LoginData }>,
  reply: FastifyReply,
) {
  try {
    const { email, password } = req.body;
    const userResult = await getUser(email, false);
    const existingUser = await validateUser(userResult, password, reply);
    // internal disable
    // if (existingUser?.TWO_FA === true) {
    // 	const tfaToken = generate2FACode(parsedBody);
    // 	return reply
    // 		.code(200)
    // 		.send({ ok: true, message: "2FA code is sent " + (await tfaToken) });
    // }
    // req.session.email = parsedBody.email;
    // req.session.authenticated = true;
    // await createRedisSession(req, existingUser);
    console.log(existingUser);
    return reply.status(200).send({ ok: true, message: "Authorized" });
  } catch (error: any) {
    console.log(error);
    return reply
      .status(500)
      .send({ ok: false, message: "Internal Server Error" });
  }
}
// 2FA post code generation
// export async function tfagenController(
//   req: FastifyRequest,
//   reply: FastifyReply,
// ) {
//   try {
//     const parsedBody = tfacodeSchema.parse(req.body);
//     const { user } = (await req.params) as any;
//     // if (!user) {
//     // 	reply.code(400).send("Error logging in please try again");
//     // }
//     // const tfauser = await redis.get(csts.TWO_FACTOR_AUTH + user);
//     // if (tfauser === null) {
//     // 	return reply.code(401).send("Unauthorized");
//     // }
//     // if (tfauser.trim() !== parsedBody.code.trim()) {
//     // 	return reply.code(401).send("invalid 2fa code");
//     // }
//     // const userResult = await getUser(user.trim(), false);
//     // if (!userResult.success) {
//     // 	reply.code(401).send(userResult.error ?? "Invalid passowrd or email");
//     // }
//     //
//     // await redis.del(csts.TWO_FACTOR_AUTH + user);
//     // req.session.email = user;
//     // req.session.authenticated = true;
//     return reply.status(200).send({ ok: true, message: "Authorized" });
//   } catch (error: any) {
//     if (error instanceof ZodError) {
//       return reply.status(400).send({ error: error.issues[0]?.message });
//     } else {
//       return reply.status(500).send({ error: "Internal Server Error" });
//     }
//   }
// }
// Register
export async function reigsterController(
  req: FastifyRequest<{ Body: RegisterData }>,
  reply: FastifyReply,
) {
  try {
    const { username, email, password } = req.body;
    const res = await createUser({
      email: email,
      username: username,
      password: password,
    });
    if (!res.success) {
      return reply
        .code(400)
        .send({ ok: false, message: "registration can't be done" });
    }
    reply.code(201).send({ ok: true, message: "created" });
  } catch (error: any) {
    reply
      .status(500)
      .send({ ok: false, error: "Internal Server Error, check the logs" });
  }
}
// OAUTH2, 2fa-, cookie
