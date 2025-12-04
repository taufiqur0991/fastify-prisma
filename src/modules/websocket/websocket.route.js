import { websocketHandler } from "./websocket.controller.js";

export default async function websocketRoute(fastify) {
  fastify.get("/room/:room", { websocket: true }, (connection, req) => {
    websocketHandler(connection, req, fastify);
  });
}

// websocket menggunakan authentication JWT misal ws://127.0.0.1:3000/ws/room/test?token=eyJhbGciOiJIUzI1NiIsInR5cCI6Ik...