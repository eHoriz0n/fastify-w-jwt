import { FastifyInstance } from "fastify";
import { resetController, resetTokenController } from "./reset.controller";
import { endpoints } from "../../../config/default.config";
import { ResetSchema, ResetTokenSchema } from "../auth.model";
import { RouteResponse } from "src/shared/models";
import { ZodTypeProvider } from "fastify-type-provider-zod";
export default async function (app: FastifyInstance) {
  const server = app.withTypeProvider<ZodTypeProvider>();

  server.post(
    endpoints.reset,
    {
      preHandler: server.authorize,

      schema: {
        body: ResetSchema,
        response: {
          200: RouteResponse,
          400: RouteResponse,
          401: RouteResponse,
          500: RouteResponse,
        },
      },
    },
    resetController,
  );
  app.put(
    endpoints.resetDyn,
    {
      preHandler: server.authorize,
      schema: {
        body: ResetTokenSchema,
        response: {
          200: RouteResponse,
          400: RouteResponse,
          401: RouteResponse,
          500: RouteResponse,
        },
      },
    },
    resetTokenController,
  );
}
