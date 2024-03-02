import { FastifyReply, FastifyRequest } from "fastify";
// import redis from "../config/redis-client";
import { endpoints } from "../config/default.config";
import { csts } from "../config/consts";
export default async function authorizer(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    if (
      request.url.trim() === endpoints.oauth_start_redirect_path ||
      request.url.trim() === endpoints.login ||
      request.url.trim() === endpoints.register ||
      request.url.trim().includes(endpoints.tfaLogin)
    ) {
      if (request.session.authenticated) {
        return reply.code(401).redirect(endpoints.homeUrl);
      }
    }
  } catch (err) {
    reply.code(500).redirect(endpoints.homeUrl);
  }
}

// cookie
