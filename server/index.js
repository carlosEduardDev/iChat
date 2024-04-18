const { WebSocketServer } = require("ws");
const dotenv = require("dotenv");

dotenv.config();

const webSocketServer = new WebSocketServer({ port: process.env.PORT || 8080 });

webSocketServer.on("connection", (webSocket) => {
  webSocket.on("error", console.error);

  webSocket.on("message", (data) => {
    webSocketServer.clients.forEach((client) => client.send(data.toString()));
  });
});
