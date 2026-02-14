const getChatModel = require("../db/models/chatModel");
const getDepartmentModel = require("../db/models/departmentModel");
const getUserModel = require("../db/models/userModel");
const { UPDATE_CHAT, CHAT_CREATED } = require("../sockets/events");

const updateUserDepartment = async (req, res, next) => {
  const User = getUserModel(req.dbConnection);
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
  const User = getUserModel(req.dbConnection);
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
  const User = getUserModel(req.dbConnection);
  try {
    const users = await User.find({ role: { $ne: "admin" } }).populate("departments");
    return res.status(200).json({
      status: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getAgentsWithDepartment = async (req, res, next) => {
  const User = getUserModel(req.dbConnection);
  try {
    const { department } = req.params;
    const agents = await User.find({ _id: {$ne: req.user.id}, role: "agent", departments: department }).populate("departments");
    return res.status(200).json({
      status: true,
      data: agents,
    });
  } catch (error) {
    next(error);
  }
};

const blockUser = async (req, res, next) => {
  const User = getUserModel(req.dbConnection);
  try {
    const { id } = req.body;
    let user = await User.findById(id);
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
  const User = getUserModel(req.dbConnection);
  const Department = getDepartmentModel(req.dbConnection);
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
  const User = getUserModel(req.dbConnection);
  const Chat = getChatModel(req.dbConnection);
  const Department = getDepartmentModel(req.dbConnection);
  try {
    const { chatId, userId, department, agentId } = req.body;
    const user = await User.findByIdAndUpdate(userId, {
      departments: [department]
    }, {new: true}).populate("departments");
    // const agents = await User.find({departments: department, role: "agent"})
    // agentId = agents[Math.floor(Math.random() * agents.length)]?._id;
    const chat = await Chat.findByIdAndUpdate(chatId, {agent: agentId}, {new: true}).populate("user")
    .populate("agent");
    io.to(userSockets[agentId]?.id).emit(CHAT_CREATED, chat);
    return res.status(200).json({
      status: true,
      data: chat,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUserDepartment,
  getUserDetails,
  getUsers,
  blockUser,
  addUserToDepartment,
  changeUserDepartment,
  getAgentsWithDepartment
};
