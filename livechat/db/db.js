const mongoose = require("mongoose");

const MONGO_URI=process.env.MONGO_URI;
const dbConnections = {};

async function connectDatabase(req, res, next) {
  const siteName = req.headers['site-name'];
  if (!siteName) {
    return res.status(400).send('Site name required');
  }

  if (!dbConnections[siteName]) {
    const dbConnection = mongoose.createConnection(`${MONGO_URI}/${siteName}_livechat`);
    dbConnections[siteName] = dbConnection;
    // Further initialization like attaching models can be done here
  }

  req.dbConnection = dbConnections[siteName];
  next();
}

module.exports = {dbConnections, connectDatabase};