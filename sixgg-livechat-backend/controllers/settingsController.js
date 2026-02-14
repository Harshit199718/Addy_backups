const SettingsGroup = require("../db/models/settingsModel");
const defaultSettings = require("../settings.json")

const initializeDefaultSettings = async (req, res, next) => {
  try {
    // Array to hold bulk write operations
    const bulkOps = [];

    // Iterate over each site in req.sites
    for (const site of req.sites) {
      // Iterate over each settings group
      for (const settingGroup of defaultSettings) {
        // Check if the setting already exists for the site
        const settingExists = await SettingsGroup.findOne({
          key: settingGroup.key,
          instance: req.instance,
          site: site
        });

        if (!settingExists) {
          // If the setting doesn't exist, create a bulk insert operation
          bulkOps.push({
            insertOne: {
              document: {
                ...settingGroup,
                instance: req.instance,
                site: site
              }
            }
          });
        }
      }
    }

    // Execute the bulk write operation if there are any operations to perform
    if (bulkOps.length > 0) {
      await SettingsGroup.bulkWrite(bulkOps);
    }

    next();
  } catch (error) {
    next(error);
  }
};

const getSettings = async (req, res, next) => {
  try {
    let allSettings = [];

    for (const site of req.user.sites) {
      const settings = await SettingsGroup.find({ instance: req.instance, site: site });
      allSettings = allSettings.concat(settings);
    }

    res.status(200).json({
      status: true,
      data: allSettings,
    });
  } catch (error) {
    next(error);
  }
};

const updateSetting = async (req, res, next) => {
  try {
    const siteUpdates = req.body; // Expecting an array of updates with site information
    let updatedDocuments = [];

    for (const siteUpdate of siteUpdates) {
      const { site, updates } = siteUpdate;

      for (const update of updates) {
        let { key, settingsPath, value, title, field } = update;
        const settingKey = settingsPath[settingsPath.length - 1];

        // Check if the subdocument already exists
        const existingSetting = await SettingsGroup.findOne({
          key: key,
          'settings.key': settingKey,
          instance: req.instance,
          site: site
        });

        if (existingSetting) {
          // Update existing subdocument
          let updatePath = `settings.$[elem].value`;
          let arrayFilters = [{ "elem.key": settingKey }];

          // Build the update path and arrayFilters for nested documents
          for (let i = settingsPath.length - 2; i >= 0; i--) {
            updatePath = `settings.$[elem${i}].` + updatePath;
            let filter = {};
            filter[`elem${i}.key`] = settingsPath[i];
            arrayFilters.unshift(filter);
          }

          const result = await SettingsGroup.findOneAndUpdate(
            { key: key, instance: req.instance, site: site },
            { $set: { [updatePath]: value } },
            {
              arrayFilters: arrayFilters,
              new: true // Return the updated document
            }
          );

          updatedDocuments.push(result);
        } else {
          // Add new subdocument
          const newSetting = {
            key: settingKey,
            value: value,
            title: title, // Ensure title is included
            field: field  // Ensure field is included
          };

          const result = await SettingsGroup.findOneAndUpdate(
            { key: key, instance: req.instance, site: site },
            { $push: { settings: newSetting } },
            {
              new: true // Return the updated document
            }
          );

          updatedDocuments.push(result);
        }
      }
    }

    res.status(200).json({ status: true, message: "Updated successfully.", updatedDocuments });
  } catch (error) {
    console.error("Error updating settings:", error);
    next(error);
  }
};


module.exports = { getSettings, initializeDefaultSettings, updateSetting };
