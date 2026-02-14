const getDepartmentModel = require("../db/models/departmentModel");
const getUserModel = require("../db/models/userModel");
const jwt = require("jsonwebtoken");
const { createChat } = require("./chatController");
const bcrypt = require("bcryptjs");
const { CHAT_CREATED, RECEIVE_MESSAGE } = require("../sockets/events");
const getChatModel = require("../db/models/chatModel");
const getMessage = require("../utils/prefefinedMessage");
const { createMessage } = require("./messageController");
const User = require("../db/models/userModel");
const Department = require("../db/models/departmentModel");
const Chat = require("../db/models/chatModel");
const { initializeDefaultSettings } = require("./settingsController");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const createTokens = (payload) => {
  const access = jwt.sign(payload, accessTokenSecret);
  const refresh = jwt.sign(payload, refreshTokenSecret, {
    expiresIn: "7d",
  });
  return {
    access,
    refresh,
  };
};

const userCreationLocks = {};
async function addUserAndLogin(req, res, next) {
const { io, userSockets } = require("../app");
  const { username, password, role, host, sitename, sites } = req.body;
  const key = `${sitename}_${username}_${role}`;
  if (userCreationLocks[key]) {
    return res.json({
      status: false,
      message: "User creation in progress, please wait.",
    });
  }
  userCreationLocks[key] = true;
  try {
    if (role === "anonymous") {
      delete userCreationLocks[key];
      return createAnonymous(req, res, next);
    }
    let user = await User.findOne({
      username: `${username}_${role}`,
      role,
      instance: req.instance,
      sites
    }).select("+password");
    let tokens = {};
    const admin = await User.findOne({
      role: "admin",
      sites: sites[0],
      instance: req.instance
    });
    let allAgents = [];
    if (!user) {
      tokens.isNewUser = true;
      const department = await Department.findOne({ name: "general", instance: req.instance });
      user = new User({
        departments: [department._id],
        ...req.body,
        username: `${username}_${role}`,
        instance: req.instance
      });
      if (role === "user") {
        const agents = await User.find({
          role: "agent",
          sites: sites[0],
          departments: department._id,
          instance: req.instance
        });
        allAgents = [admin?._id, ...agents?.map((agent) => agent?._id)];
        req.chatPayload = {
          user: user._id,
          agents: allAgents,
          site: sites[0],
        };
        const newChat = await createChat(req, res, next);
        user.assignedChat = newChat?._id;
      }
      user.email = `${username}_${role}@${host}`;
    } else if (!(await bcrypt.compare(password, user.password))) {
      delete userCreationLocks[key];
      return next(new Error("Wrong Username/Password"));
    }
    if (!tokens.isNewUser && user.role !== "user") user.sites = sites;
    tokens = {
      ...tokens,
      ...createTokens({
        id: user._id,
        sites,
      }),
    };
    user.refreshToken = tokens.refresh;
    await user.save();
    if (role==="agent") {
      sites.forEach(async site => {
        await Chat.updateMany(
          { site },
          { $addToSet: { agents: user._id } } // Use $addToSet to avoid duplicates
        );
      })
    }
    if (tokens.isNewUser && role === "user") {
      const newChat = await Chat.findById(user.assignedChat)
        .populate("user")
        .populate("agents");
      if (allAgents?.length) {
        allAgents.forEach((agent) => {
          if (userSockets[agent]?.length) {
            userSockets[agent].forEach(conn => {
              io.to(conn.id).emit(CHAT_CREATED, newChat);
            })
          }
        });
      }
      const messageData = {
        chatId: newChat?._id,
        sender: newChat.agents[0]?._id,
        message: await getMessage({
          type: "welcome",
          data: {
            username: user.username,
            sitename: sites[0],
          },
          site: sites[0],
          instance: req.instance
        }),
      };
      const newMessage = await createMessage(messageData, sitename);
      io.to(newChat?._id).emit(RECEIVE_MESSAGE, newMessage);
    }
    delete userCreationLocks[key];
    if (user.role==="admin") {
      req.sites = user.sites
      await Chat.updateMany(
        { instance: req.instance },
        { $addToSet: { agents: user._id } } // Use $addToSet to avoid duplicates
      );
      initializeDefaultSettings(req, res, next);
    }
    return res.status(200).json(tokens);
  } catch (error) {
    delete userCreationLocks[key];
    next(error);
  } finally {
    delete userCreationLocks[key];
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
  const { io, userSockets } = require("../app");
  try {
    const ip = req.connection.remoteAddress;
    const { host, role, sites, deviceId } = req.body;
    let user = await User.findOne({
      username: `#User-${deviceId}`,
      role: "anonymous",
      instance: req.instance,
      sites
    });
    let tokens = {};
    const admin = await User.findOne({
      role: "admin",
      sites: sites[0],
      instance: req.instance
    });
    let allAgents = [];
    if (!user) {
      tokens.isNewUser = true;
      const department = await Department.findOne({ name: "general", instance: req.instance });
      user = new User({
        username: `#User-${deviceId}`,
        email: `#User-${deviceId}@${host}`,
        password: "123456",
        host,
        ip,
        role,
        departments: [department._id],
        sites,
        instance: req.instance,
      });
      await user.save();
      const agents = await User.find({
        role: "agent",
        sites: sites[0],
        departments: department._id,
        instance: req.instance
      });
      allAgents = [admin?._id, ...agents?.map((agent) => agent?._id)];
      req.chatPayload = {
        user: user._id,
        agents: allAgents,
        site: sites[0],
      };

      const newChat = await createChat(req, res, next);
      user.assignedChat = newChat?._id;
      await user.save();
    }
    tokens = {
      ...tokens,
      ...createTokens({
        id: user._id,
        sites,
      }),
    };
    if (tokens.isNewUser) {
      const newChat = await Chat.findById(user.assignedChat)
        .populate("user")
        .populate("agents");
      if (allAgents?.length) {
        allAgents.forEach((agent) => {
          if (userSockets[agent]?.length) {
            userSockets[agent].forEach(conn => {
              io.to(conn.id).emit(CHAT_CREATED, newChat);
            })
          }
        });
      }
      const messageData = {
        chatId: newChat?._id,
        sender: newChat.agents[0]?._id,
        message: await getMessage({
          type: "welcome",
          data: {
            username: user.username,
            sitename: sites[0],
          },
          site: sites[0],
          instance: req.instance
        }),
      };
      const newMessage = await createMessage(messageData);
      io.to(newChat?._id).emit(RECEIVE_MESSAGE, newMessage);
    }
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
