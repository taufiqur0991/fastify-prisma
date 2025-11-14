import Fastify from "fastify";
import dotenv from "dotenv";
dotenv.config();

import prismaPlugin from "./plugins/prisma.js";
import jwtPlugin from "./plugins/jwt.js";

import authRoute from "./modules/auth/auth.route.js";
import userRoute from "./modules/user/user.route.js";

export function buildApp() {
  const app = Fastify();

  // plugins
  app.register(prismaPlugin);
  app.register(jwtPlugin);

  // routes
  app.register(authRoute, { prefix: "/auth" });
  app.register(userRoute, { prefix: "/user" });

  return app;
}
