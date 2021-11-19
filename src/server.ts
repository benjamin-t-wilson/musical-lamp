import http, { Server } from "http";
import express, { Express } from "express";

const server: Express = express();

server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return res.status(200).json({});
  }
  next();
});

const httpServer: Server = http.createServer(server);
const PORT: string = process.env.PORT ?? "6060";

httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
