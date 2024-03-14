import http from "http";
import express from "express";
import { readFileSync } from "node:fs";
import { Server as IOServer } from "socket.io";
import { getValues, getImageValue, updateImageValues } from "./getValues.js";
import addWebpackMiddleware from "./middlewares/addWebpackMiddleware.js";

const app = express();
const httpServer = http.createServer(app);

addWebpackMiddleware(app);

let port = process.env.PORT;
if (!port) port = 8000;
httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

const io = new IOServer(httpServer, {
  // pour permettre à express-status-monitor de fonctionner
  // cf. https://github.com/RafalWilinski/express-status-monitor/issues/181#issuecomment-1086649762
  allowEIO3: true,
});

app.use(express.static("client/public"));

io.on("connection", (socket) => {
  console.log("a user connected");
});

updateImageValues();
