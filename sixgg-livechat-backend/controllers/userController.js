const Chat = require("../db/models/chatModel");
const getChatModel = require("../db/models/chatModel");
const Department = require("../db/models/departmentModel");
const getDepartmentModel = require("../db/models/departmentModel");
const User = require("../db/models/userModel");
const getUserModel = require("../db/models/userModel");
const { UPDATE_CHAT, CHAT_CREATED, RECEIVE_MESSAGE } = require("../sockets/events");
const getMessage = require("../utils/prefefinedMessage");
const { createChat } = require("./chatController");
const { createMessage } = require("./messageController");

const createUser = async (req, res, next) => {
  const { io, userSockets } = require("../app");
  try {
    const {username, role, host, sites} = req.body
    let allAgents = [];
    const department = await Department.findOne({ name: "general", instance: req.instance });
    user = new User({
      departments: [department._id],
      ...req.body,
      username: `${username}_${role}`,
      email: `${username}_${role}@${host}`,
      instance: req.instance
    });
    const agents = await User.find({
      role: "agent",
      sites: sites[0],
      departments: department._id,
      instance: req.instance
    });
    allAgents = agents?.map((agent) => agent?._id);
    req.chatPayload = {
      user: user._id,
      agents: allAgents,
      site: sites[0],
    };
    const newChat = await createChat(req, res, next);
    user.assignedChat = newChat?._id;
    user.email = `${username}_${role}@${host}`;
    await user.save();
    const chat = await Chat.findById(user.assignedChat)
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
      }),
    };
    const newMessage = await createMessage(messageData);
    io.to(newChat?._id).emit(RECEIVE_MESSAGE, newMessage);
    return res.status(200).json({
      status: true,
      message: "Chat Added",
      data: chat
    });
  } catch (error) {
    next(error)
  }
}
const updateUserDepartment = async (req, res, next) => {
  try {
    const { id, department } = req.body;
    let user = await User.findByIdAndUpdate(id, { department }, { new: true });
    return res.status(200).json({
      status: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getUserDetails = async (req, res, next) => {
  try {
    const { id } = req.user;
    let user = await User.findById(id);
    return res.status(200).json({
      status: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const {lastUserId} = req.query;
    const query = { role: { $ne: "admin" }, instance: req.instance }
    if (lastUserId) {
      query["_id"] = {$gt: lastUserId}
    }
    const users = await User.find(query).limit(20).populate("departments");
    return res.status(200).json({
      status: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getAgentsWithDepartment = async (req, res, next) => {
  try {
    const { department } = req.params;
    const agents = await User.find({ _id: {$ne: req.user.id}, role: "agent", departments: department, sites: req.user.sites, instance: req.instance }).populate("departments");
    return res.status(200).json({
      status: true,
      data: agents,
    });
  } catch (error) {
    next(error);
  }
};

const blockUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    let user = await User.findById(id).populate("departments");
    user.block = !user.block;
    user.save();
    return res.status(200).json({
      status: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const addUserToDepartment = async (req, res, next) => {
  try {
    const { userId, department } = req.body;
    const user = await User.findByIdAndUpdate(userId, {
      $addToSet: { departments: department },
    }, {new: true}).populate("departments");
    return res.status(200).json({
      status: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const changeUserDepartment = async (req, res, next) => {
  const { io, userSockets } = require("../app");
  try {
    const { chatId, userId, department, agentId } = req.body;
    const user = await User.findByIdAndUpdate(userId, {
      departments: [department]
    }, {new: true}).populate("departments");
    // const agents = await User.find({departments: department, role: "agent"})
    // agentId = agents[Math.floor(Math.random() * agents.length)]?._id;
    const agents = await User.find({ role: "agent", sites: user.sites[0], departments: user.departments[0], instance: req.instance });
    const allAgents = agents.map(agent => agent?._id)
    const chat = await Chat.findByIdAndUpdate(chatId, {agents: allAgents}, {new: true}).populate("user")
    .populate("agents");
    if (allAgents?.length) {
      allAgents.forEach(agent => {
        if (userSockets[agent]?.length) {
          userSockets[agent].forEach(conn => {
            io.to(conn.id).emit(CHAT_CREATED, newChat);
          })
        }
      });
    }
    return res.status(200).json({
      status: true,
      data: chat,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  updateUserDepartment,
  getUserDetails,
  getUsers,
  blockUser,
  addUserToDepartment,
  changeUserDepartment,
  getAgentsWithDepartment
};
