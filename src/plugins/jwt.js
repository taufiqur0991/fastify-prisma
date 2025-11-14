import fp from "fastify-plugin";

export default fp(async (fastify) => {
  fastify.register(import("fastify-jwt"), {
    secret: process.env.JWT_SECRET,
  });

  fastify.decorate("authVerify", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ message: "Unauthorized" });
    }
  });
});
