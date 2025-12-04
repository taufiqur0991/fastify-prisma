import Fastify from "fastify";
import path from "path";
import { fileURLToPath } from "url";
import fastifyStatic from "@fastify/static";
import dotenv from "dotenv";
dotenv.config();

import prismaPlugin from "./plugins/prisma.js";
import jwtPlugin from "./plugins/jwt.js";

import websocketRoute from "./modules/websocket/websocket.route.js";
import authRoute from "./modules/auth/auth.route.js";
import userRoute from "./modules/user/user.route.js";

// path helper
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function buildApp() {
  const app = Fastify({ logger: true });

  // plugins
  await app.register(prismaPlugin);
  await app.register(jwtPlugin);
  await app.register(import('@fastify/websocket'));
  // serve static Html
  app.register(fastifyStatic, {
    root: path.join(__dirname, "public"),
  });

  // routes
  app.register(websocketRoute, { prefix: "/ws" });
  app.register(authRoute, { prefix: "/auth" });
  app.register(userRoute, { prefix: "/user" });

  return app;
}
