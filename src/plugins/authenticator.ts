import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
import { FastifyJWT, JWT } from "@fastify/jwt";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
  }
}

export type UserPayload = {
  email: string;
  username: string;
  verified: boolean;
};

export type ResetPayload = {
  tokenId: string;
};
declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: UserPayload;
    tokenId: ResetPayload;
  }
}
const authenticator = async (app: FastifyInstance) => {
  app.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const token = req.cookies["access_token"];

      if (!token) {
        return reply
          .status(401)
          .send({ ok: false, message: "Authentication required" });
      }
      // here decoded will be a different type by default but we want it to be of user-payload type
      const decoded = req.jwt.verify<FastifyJWT["user"]>(token);
      req.user = decoded;
    },
  );
};
export default fastifyPlugin(authenticator);
