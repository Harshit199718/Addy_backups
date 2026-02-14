const getDepartmentModel = require("../db/models/departmentModel");
const getUserModel = require("../db/models/userModel");
const jwt = require("jsonwebtoken");
const { createChat } = require("./chatController");
const bcrypt = require("bcryptjs");
const { CHAT_CREATED } = require("../sockets/events");
const getChatModel = require("../db/models/chatModel");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const createTokens = (payload) => {
  const access = jwt.sign(payload, accessTokenSecret, {
    expiresIn: "15m",
  });
  const refresh = jwt.sign(payload, refreshTokenSecret, {
    expiresIn: "7d",
  });
  return {
    access,
    refresh,
  };
};

async function addUserAndLogin(req, res, next) {
  const { io, userSockets } = require("../app");
  const User = getUserModel(req.dbConnection);
  const Chat = getChatModel(req.dbConnection);
  const Department = getDepartmentModel(req.dbConnection);
  try {
    const { username, password, role, host } = req.body;
    if (role === "anonymous") {
      return createAnonymous(req, res, next);
    }
    let user = await User.findOne({ username, role }).select("+password");
    let tokens = {};
    let agentId = "";
    if (!user) {
      tokens.isNewUser = true;
      const department = await Department.findOne({ name: "general" });
      user = new User({ department: [department._id], ...req.body });
      if (role === "user") {
        const agents = await User.find({ role: "agent" });
        agentId = agents[Math.floor(Math.random() * agents.length)]?._id;
        req.chatPayload = {
          user: user._id,
          agent: agentId,
        };
        const newChat = await createChat(req, res, next);
        user.assignedChat = newChat?._id;
      }
      user.email = `${username}_${role}@${host}`;
    } else if (!(await bcrypt.compare(password, user.password))) {
      return next(new Error("Wrong Username/Password"));
    }
    tokens = {
      ...tokens,
      ...createTokens({
        id: user._id,
      }),
    };
    user.refreshToken = tokens.refresh;
    await user.save();
    if (tokens.isNewUser && role === "user") {
      const newChat = await Chat.findById(user.assignedChat)
        .populate("user")
        .populate("agent");
      io.to(userSockets[agentId].id).emit(CHAT_CREATED, newChat);
    }
    return res.status(200).json(tokens);
  } catch (error) {
    next(error);
  }
}

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7, authHeader.length);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const createAnonymous = async (req, res, next) => {
  const Chat = getChatModel(req.dbConnection);
  const User = getUserModel(req.dbConnection);
  const Department = getDepartmentModel(req.dbConnection);
  try {
    const ip = req.connection.remoteAddress;
    const { host, role } = req.body;
    let user = await User.findOne({
      username: `#User-${ip}`,
      role: "anonymous",
    });
    if (!user) {
      const department = await Department.findOne({ name: "general" });
      user = User({
        username: `#User-${ip}`,
        email: `#User-${ip}@${host}`,
        password: "123456",
        host,
        ip,
        role,
        department: department._id,
      });
      await user.save();
      const agents = await User.find({ role: "agent" });
      agentId = agents[Math.floor(Math.random() * agents.length)]?._id;
      req.chatPayload = {
        user: user._id,
        agent: agentId,
      };
      const newChat = await createChat(req, res, next);
      user.assignedChat = newChat?._id;
      await user.save();
    }
    const tokens = createTokens({
      id: user._id,
    })
    return res.json(tokens);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addUserAndLogin,
  verifyToken,
  createAnonymous,
};
