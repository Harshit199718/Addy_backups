const getSettingsGroupModel = require("../db/models/settingsModel");
const defaultSettings = require("../settings.json")

const initializeDefaultSettings = async (req, res, next) => {
  const SettingsGroup = getSettingsGroupModel(req.dbConnection); // Assuming getSettingsModel is your factory function
  try {
    // Check for each settings group
    for (const settingGroup of defaultSettings) {
      const setting = await SettingsGroup.findOne({ key: settingGroup.key });
  
      if (!setting) {
        // Insert the setting group if it doesn't exist
        await new SettingsGroup(settingGroup).save();
      } else if (settingGroup?.settings?.length) {
        const newSettings = settingGroup?.settings?.map(sett=> {
          const currentSetting = setting?.settings.find(sett2 => sett.key === sett2.key)
          return currentSetting || sett;
        })
        setting.settings = newSettings;
        setting.save();
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

const getSettings = async (req, res, next) => {
  const SettingsGroup = getSettingsGroupModel(req.dbConnection); // Assuming getSettingsModel is your factory function

  try {
    const settings = await SettingsGroup.find();
    res.status(200).json({
      status: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

const updateSetting = async (req, res, next) => {
  const SettingsGroup = getSettingsGroupModel(req.dbConnection); // Assuming getSettingsModel is your factory function

  try {
    const updates = req.body;
    for (const update of updates) {
      let { key, settingsPath, value } = update;
      let updatePath = `settings.$[elem].value`;
      let arrayFilters = [{ "elem.key": { $eq: settingsPath[settingsPath.length - 1] } }];

      // Build the update path and arrayFilters for nested documents
      for (let i = settingsPath.length - 2; i >= 0; i--) {
        updatePath = `settings.$[elem${i}].` + updatePath;
        let filter = {};
        filter[`elem${i}.key`] = { $eq: settingsPath[i] };
        arrayFilters.unshift(filter);
      }

      await SettingsGroup.updateOne(
        { key: key },
        { $set: { [updatePath]: value } },
        { arrayFilters: arrayFilters }
      );
    }
    res.send("Updated successfully.");
  } catch (error) {
    next(error)
  }
}

module.exports = { getSettings, initializeDefaultSettings, updateSetting };
