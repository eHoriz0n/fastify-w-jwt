import { FastifyInstance } from "fastify";
import {
  loginController,
  logoutController,
  reigsterController,
} from "./auth.controller";
import { endpoints } from "../../config/default.config";
import { LoginSchema, RegisterSchema } from "./auth.model";
import { RouteResponse } from "../../shared/models";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export default async function (app: FastifyInstance) {
  const server = app.withTypeProvider<ZodTypeProvider>();
  server.post(
    endpoints.login,

    {
      preHandler: server.authorize,
      schema: {
        body: LoginSchema,
        response: {
          200: RouteResponse,
          400: RouteResponse,
          401: RouteResponse,
          500: RouteResponse,
        },
      },
    },
    loginController,
  );
  app.post(
    endpoints.register,
    {
      preHandler: server.authorize,
      schema: {
        body: RegisterSchema,
        response: {
          201: RouteResponse,
          400: RouteResponse,
          401: RouteResponse,
          500: RouteResponse,
        },
      },
    },
    reigsterController,
  );
  app.delete(
    endpoints.logout,
    {
      preHandler: app.authenticate,
      schema: {
        response: {
          200: RouteResponse,
          400: RouteResponse,
          401: RouteResponse,
          500: RouteResponse,
        },
      },
    },

    logoutController,
  );

  // app.post(endpoints.tfaLoginDyn, tfagenController);
}
