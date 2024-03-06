import { FastifyInstance } from "fastify";
import { loginController, reigsterController } from "./auth.controller";
import { endpoints } from "../../config/default.config";
import { LoginSchema, RegisterSchema } from "./auth.model";
import { RouteResponse } from "../../shared/models";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export default async function (app: FastifyInstance) {
  const server = app.withTypeProvider<ZodTypeProvider>();
  server.post(
    endpoints.login,
    {
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
  // app.post(endpoints.tfaLoginDyn, tfagenController);
}
