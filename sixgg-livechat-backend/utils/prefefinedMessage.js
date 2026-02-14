const SettingsGroup = require("../db/models/settingsModel");
const getMessage = async ({type, data, site, instance}) => {
    const predefinedMessages = await SettingsGroup.findOne({key: "predefinedMessages", site, instance});
    const message = predefinedMessages?.settings?.find(predefinedMessage=>predefinedMessage.key===type)
    return replacePlaceholders(message?.value, data);
}

const replacePlaceholders = (message, placeholders) => {
    let result = message;
    for (const placeholder in placeholders) {
      const re = new RegExp(`{${placeholder}}`, 'g');
      result = result?.replace(re, placeholders[placeholder]);
    }
    return result;
  };

module.exports = getMessage