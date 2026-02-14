const { defineChatEvents } = require("./chatEvents");
const { defineMessageEvents } = require("./messageEvents");
const { defineUserEvents } = require("./userEvents");

function defineSockets({ io, userSockets, socket, siteName, instance }) {

  defineUserEvents(io, socket, siteName, userSockets, instance);
  defineChatEvents(io, socket, siteName, userSockets, instance);
  defineMessageEvents(io, socket, siteName, userSockets, instance);
}

module.exports = { defineSockets };
