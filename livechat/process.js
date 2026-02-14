const cluster = require("cluster");
const os = require("os");
const PORT = process.env.PORT || 8080;

const createProcesses = (server) => {
  if (cluster.isMaster) {
    const NUM_WORKERS = os.cpus().length;
    console.log("Master Process", NUM_WORKERS);
    for (let i = 0; i < NUM_WORKERS; i++) {
      cluster.fork();
    }
  } else {
    console.log("Worker Process");
    server.listen(PORT);
  }
};

module.exports = {createProcesses}