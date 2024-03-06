import { JWT } from "@fastify/jwt";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authorize: any;
  }
}

const authorizer = async (app: FastifyInstance) => {
  app.decorate(
    "authorize",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const token = req.cookies["access_token"];

      if (token) {
        return reply.status(401).send({ ok: false, message: "access denied" });
      }
    },
  );
};
export default fastifyPlugin(authorizer);
