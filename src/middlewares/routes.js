import { randomUUID } from "node:crypto";
import { Database } from "../database/database.js";
import { buildRoutePath } from "../utils/buildRoutePath.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      return res.end(JSON.stringify(database.select("users")));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { name, email } = req.body;

      const user = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert("users", user);

      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params

      if (database.delete("users", id))
        return res.writeHead(204).end()
      else
        return res.writeHead(404).end()
    },
  },
];
