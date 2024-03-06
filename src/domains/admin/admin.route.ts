import { FastifyInstance } from "fastify";
import { adminController } from "./admin.controller";
import { endpoints } from "../../config/default.config";
export default async function (app: FastifyInstance) {
  app.get(
    endpoints.dashboard,
    { preHandler: app.authenticate },
    adminController,
  );
}
