const mongoose = require("mongoose");
const { initializeDefaultSettings } = require("../controllers/settingsController");

const MONGO_URI = process.env.MONGO_URI;
// const MONGO_URI_OPTION = process.env.MONGO_URI_OPTION;
const dbConnections = {};

async function connectDatabase() {
    // Construct the database-specific URI
    // const dbURI = `${MONGO_URI}/${siteName}_livechat?${MONGO_URI_OPTION}`;
    const dbURI = `${MONGO_URI}/livechat_db?readPreference=primary&tls=false&retryWrites=false`;
    
    // Create a promise that resolves on connect or rejects on error
    try {
      await mongoose.connect(dbURI);
    } catch (error) {
      console.log("Database connection failed", error)
    }
}

module.exports = { dbConnections, connectDatabase };
