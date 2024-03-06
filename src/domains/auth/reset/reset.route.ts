import { FastifyInstance } from "fastify";
import { resetController, resetTokenController } from "./reset.controller";
import { endpoints } from "../../../config/default.config";
import { ResetSchema, ResetTokenSchema } from "../auth.model";
import { RouteResponse } from "src/shared/models";
export default async function (app: FastifyInstance) {
  app.post(
    endpoints.reset,
    {
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
