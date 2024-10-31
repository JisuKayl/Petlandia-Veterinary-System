const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./src/database/db");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const http = require("http");
const { WebSocketServer } = require("ws");
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

require("dotenv").config();
const port = process.env.port;

const routes = require("./src/routes/index");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(routes);

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Sent: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Test");
});

server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
