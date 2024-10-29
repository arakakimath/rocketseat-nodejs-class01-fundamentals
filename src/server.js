// CommonJS  => require const http = require('http')
// ESModules => import/export
import http from "node:http"; // Uses 'node:' to identify intern modules

import { bodyConstructor } from "./middlewares/bodyConstructor.js";
import { routes } from "./middlewares/routes.js";

const server = http.createServer(async (req, res) => {
  await bodyConstructor(req, res);

  const route = routes.find(route => {
    return route.method === req.method && route.path.test(req.url)
  })

  if(route) {
    const routeParams = req.url.match(route.path)

    req.params = { ...routeParams.groups }
    
    return route.handler(req, res)
  }

  return res.writeHead(404).end();
});

server.listen(3333);
