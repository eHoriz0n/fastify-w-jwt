import fastify from "fastify";
import configureSession from "./config/session";
import configureOAuth2 from "./config/oauth";
import authorizer from "./middlewares/authorizer";
import cors from "@fastify/cors";
import { dirname, join } from "path";
import { fastifyAutoload } from "@fastify/autoload";
import { fileURLToPath } from "url";
import { config } from "dotenv";
config();
// import fastifyCookie from "@fastify/cookie";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { endpoints } from "./config/default.config";
const server = fastify({
  logger: false,
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

server.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  // allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);
server.log.info("Registering plugins...");
server
  .register(fastifyAutoload, {
    dir: join(__dirname, "plugins"),
  })
  .after(() => {
    server.log.info("All plugins are ready");
  });

server.addHook("preHandler", authorizer); // Post session authorizer

configureOAuth2(server); // oauth provider
// server.register(fastifyCookie)
configureSession(server); // session config
server.register(import("./domains/auth/auth.route")); // credentials auth routes
server.register(import("./domains/auth/oauth/oauth.route")); // oauth routes
server.register(import("./domains/auth/reset/reset.route")); // Reset password routes
// server.register(import("./domains/auth/2FA/2FA.route")); // 2fa routes
server.register(import("./domains/admin/admin.route")); // protected route

server.get(endpoints.home, (_request, reply) => {
  reply.send("auth sys by clog");
});

const PORT = process.env.PORT || 8080;

server.listen({ port: PORT, host: process.env.HOST }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
