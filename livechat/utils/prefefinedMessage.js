const { dbConnections } = require("../db/db");
const getSettingsGroupModel = require("../db/models/settingsModel");
const getMessage = async ({type, data, siteName}) => {
    const Settings = getSettingsGroupModel(dbConnections[siteName]);
    const predefinedMessages = await Settings.findOne({key: "predefinedMessages"});
    const message = predefinedMessages.settings.find(predefinedMessage=>predefinedMessage.key===type)
    return replacePlaceholders(message.value, data);
}

const replacePlaceholders = (message, placeholders) => {
    let result = message;
    for (const placeholder in placeholders) {
      const re = new RegExp(`{${placeholder}}`, 'g');
      result = result.replace(re, placeholders[placeholder]);
    }
    return result;
  };

module.exports = getMessage