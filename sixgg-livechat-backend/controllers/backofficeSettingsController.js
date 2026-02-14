const backofficeSettings = require("../backofficeSettings.json");
const BackofficeColors = require("../db/models/backofficeSettingsModel");
const BackofficeSettingsGroup = require("../db/models/backofficeSettingsModel");

const initializeBackofficeColors = async (req, res, next) => {
  try {
    const query = { instance: req.instance };
    const settingExists = await BackofficeColors.findOne(query);
    if (!settingExists) {
      await new BackofficeColors(query).save();
    }
    next();
  } catch (error) {
    next(error);
  }
};
const getBackofficeColors = async (req, res, next) => {
  try {
    const colors = await BackofficeColors.find({
      instance: req.instance,
    });
    res.status(200).json({
      status: true,
      data: colors,
    });
  } catch (error) {
    next(error);
  }
};

const updateBackofficeColors = async (req, res, next) => {
  try {
    const {_id, ...rest} = req.body; // An array of settings to update

    const updatedColors = await BackofficeColors.findByIdAndUpdate(_id, rest, {new: true})

    res.status(200).json({
      status: true,
      message: "Settings updated successfully",
      data: updatedColors,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { initializeBackofficeColors, getBackofficeColors, updateBackofficeColors };
