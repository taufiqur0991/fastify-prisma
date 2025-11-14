import { buildApp } from "./app.js";

const app = buildApp();

app.listen({ port: 3000 }, (err) => {
  if (err) throw err;
  console.log("Server running at http://localhost:3000");
});
