// session config
import { FastifyInstance } from "fastify";
import fjwt from "@fastify/jwt";
import fCookie from "@fastify/cookie";
import { JWT } from "@fastify/jwt";
declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
}
declare module "fastify" {
  interface Session {
    authenticated: boolean;
    email: string;
  }
}
async function configureJWT(fastify: FastifyInstance) {
  // fastify.register(fastifySecureSession, {
  //   // the name of the attribute decorated on the request-object, defaults to 'session'
  //   sessionName: cookiesConf.sessionName,
  //   // the name of the session cookie, defaults to value of sessionName
  //   cookieName: cookiesConf.cookiename,
  //   // adapt this to point to the directory where secret-key is located
  //   secret: process.env.SECRET as string,
  //   salt: process.env.SALT as string,
  //   cookie: {
  //     maxAge: cookiesConf.maxage,
  //     path: endpoints.home,
  //   },
  // });

  // fastify.register(fastifyCookie, {});
  fastify.register(fjwt, {
    secret: process.env.SESSION_SECRET,
  });
  fastify.addHook("preHandler", (req, _res, next) => {
    // here we are
    req.jwt = fastify.jwt;
    return next();
  }); // cookies
  fastify.register(fCookie, {
    secret: process.env.SECRET,
    hook: "preHandler",
  });
}
export default configureJWT;
