// CommonJS  => require const http = require('http')
// ESModules => import/export
import http from "node:http"; // Uses 'node:' to identify intern modules
import { bodyConstructor } from "./middlewares/bodyConstructor.js";
import { Database } from "./database/database.js";

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await bodyConstructor(req, res);

  if ((method === "GET") & (url === "/users")) {
    const users = database.select("users");

    return res.end(JSON.stringify(users));
  }

  if ((method === "POST") & (url === "/users")) {
    const { name, email } = req.body;

    const user = {
      id: 1,
      name,
      email,
    };

    database.insert("users", user);

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(3333);
