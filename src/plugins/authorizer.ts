import { JWT } from "@fastify/jwt";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
import { TOKEN_NAME } from "src/config/default.config";
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
      const token = req.cookies[TOKEN_NAME];

      if (token) {
        return reply.status(401).send({ ok: false, message: "access denied" });
      }
    },
  );
};
export default fastifyPlugin(authorizer);
