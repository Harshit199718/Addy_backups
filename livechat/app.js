require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { connectDatabase, dbConnections } = require("./db/db");
const { createDefaultDepartment } = require("./middlewares/dbMiddlewares");
const { errorHandler } = require("./middlewares/errorMiddlewares");
const allRoutes = require("./routes");
const {
  JOIN_CHAT,
  MARK_READ,
  UPDATE_CHAT,
  NEW_MESSAGE,
  RECEIVE_MESSAGE,
} = require("./sockets/events");
const getChatModel = require("./db/models/chatModel");
const getUserModel = require("./db/models/userModel");
const { createMessage } = require("./controllers/messageController");
const { defineSockets } = require("./sockets/socket");
const { initializeDefaultSettings } = require("./controllers/settingsController");
const { createProcesses } = require("./process");

const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this to your frontend's origin for better security, e.g., "http://localhost:3000"
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: "*", // For debugging only, specify actual origins for production
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Add other methods as needed
    allowedHeaders: ["Content-Type", "Authorization", "site-name"], // Include custom headers here
  })
);
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(connectDatabase);
app.use(createDefaultDepartment);
app.use(initializeDefaultSettings);

app.use("/app/api", allRoutes);

// Define routes here, utilizing `req.dbConnection` for DB operations

// Error handling
app.use(errorHandler);

// Socket connections
const userSockets = {};

io.on("connection", (socket) => {
  console.log("user connected: ", socket.id);
  const siteName = socket.handshake.query["site-name"];
  const token = socket.handshake.query["token"];
  let userId = "";
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return console.log("403 Error");
    }
    userId = user.id;
  });
  userSockets[userId] = socket;
  defineSockets({io, socket, userSockets, userId, siteName});
});


// Listen to server
createProcesses(server);

module.exports = {io, userSockets}