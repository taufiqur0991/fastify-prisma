import Fastify from "fastify";
import dotenv from "dotenv";
dotenv.config();

import prismaPlugin from "./plugins/prisma.js";
import jwtPlugin from "./plugins/jwt.js";

import websocketRoute from "./modules/websocket/websocket.route.js";
import authRoute from "./modules/auth/auth.route.js";
import userRoute from "./modules/user/user.route.js";

export async function buildApp() {
  const app = Fastify({ logger: true });

  // plugins
  await app.register(prismaPlugin);
  await app.register(jwtPlugin);
  await app.register(import('@fastify/websocket'));

  // routes
  app.register(websocketRoute, { prefix: "/ws" });
  app.register(authRoute, { prefix: "/auth" });
  app.register(userRoute, { prefix: "/user" });

  return app;
}
