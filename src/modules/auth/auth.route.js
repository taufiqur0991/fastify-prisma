import AuthService from "./auth.service.js";
import AuthController from "./auth.controller.js";

export default async function authRoute(fastify) {
  const service = new AuthService(fastify.prisma, fastify.jwt);
  const controller = new AuthController(service);

  fastify.post("/register", controller.register);
  fastify.post("/login", controller.login);
}
