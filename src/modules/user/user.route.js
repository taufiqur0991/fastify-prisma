import UserService from "./user.service.js";
import UserController from "./user.controller.js";

export default async function userRoute(fastify) {
  const service = new UserService(fastify.prisma);
  const controller = new UserController(service);

  fastify.get("/profile", { preHandler: [fastify.authVerify] }, controller.profile);
}
