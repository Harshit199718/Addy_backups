const { defineChatEvents } = require("./chatEvents");
const { defineMessageEvents } = require("./messageEvents");
const { defineUserEvents } = require("./userEvents");

function defineSockets({ io, userSockets, socket, siteName }) {

  defineUserEvents(io, socket, siteName, userSockets);
  defineChatEvents(io, socket, siteName, userSockets);
  defineMessageEvents(io, socket, siteName, userSockets);
}

module.exports = { defineSockets };
