require("dotenv").config();
const express = require("express");
const app = express();
// const http = require("http");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
// const server = http.createServer(app);
const { Server } = require("socket.io");
const { connectDatabase } = require("./db/db");
const { createDefaultDepartment } = require("./middlewares/dbMiddlewares");
const { errorHandler } = require("./middlewares/errorMiddlewares");
const allRoutes = require("./routes");
const { defineSockets } = require("./sockets/socket");
const {
  initializeDefaultSettings,
} = require("./controllers/settingsController");
const { verifyInstance, decryptData } = require("./middlewares/instanceVerification");
const { initializeBackofficeSettings, initializeBackofficeColors } = require("./controllers/backofficeSettingsController");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Add other methods as needed
    allowedHeaders: ["Content-Type", "Authorization", "site-name", "instance-token", "is-superbo"], // Include custom headers here
    credentials: true
  })
);

// Test api
app.use("/app/api", verifyInstance)
app.get("/ping", (req, res) => {
  res.send("pong v17");
});
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use(connectDatabase);

// Test DB
app.get("/testDB", (req, res) => {
  res.send("Yes");
});

app.use("/app/api", createDefaultDepartment);
app.use("/app/api", initializeBackofficeColors);

app.use("/app/api", allRoutes);

// Define routes here, utilizing `req.dbConnection` for DB operations

// Error handling
app.use(errorHandler);

// Listen to server
// createProcesses(io);
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log('Running on Port:',PORT, ' PID: ', process.pid);
  connectDatabase()
});

const io = new Server(server, {
  transports: ["websocket"],
});

// Socket connections
const userSockets = {};

io.on("connection", (socket) => {
  try {
    io.emit("CONNECTED", socket.id);
    const siteName = socket.handshake.query["site-name"];
    const token = socket.handshake.query["token"];
    const instanceToken = socket.handshake.query["instance-token"];
    let userId = "";
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return;
      }
      userId = user.id;
    });
    console.log("CONNECTED", userId, socket.id);
    if (!userSockets[userId]) {
        userSockets[userId] = [];
      }
    userSockets[userId].push(socket);
    socket.on("disconnect", () => {
      // Remove the socket from userSockets when it disconnects
      if (userSockets[userId]) {
        userSockets[userId] = userSockets[userId].filter(s => s !== socket);
        if (userSockets[userId].length === 0) {
          delete userSockets[userId];
        }
      }
      console.log(`Socket ${socket.id} disconnected`);
    });
    const {instanceName, instanceId} = decryptData(instanceToken, "your_secret_key");
    const instance = `${instanceName}_${instanceId}`
    defineSockets({ io, socket, userSockets, userId, siteName, instance});
  } catch (error) {
    console.log("🚀 ~ io.on ~ error:", error)
  }
});


// AWS Healthcheck 
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

/** Graceful shutdown */
process.on('SIGTERM', shutdown('SIGTERM'));
process.on('SIGINT', shutdown('SIGINT'));

function shutdown(signal) {
  return () => {
    console.log(`Received ${signal}. Gracefully shutting down...`);
    server.close(() => {
      console.log('Closed out remaining connections.');
      process.exit(0);
    });
  };
}

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Optionally send the error to an external logging service
});

module.exports = { io, userSockets };
