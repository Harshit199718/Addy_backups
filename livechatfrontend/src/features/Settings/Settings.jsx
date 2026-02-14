import React, { useCallback, useEffect, useState } from "react";
import { useGetSettingsQuery, useUpdateSettingMutation } from "../../api/hooks";
import {
  SettingInput,
  SettingsColorInput,
  SettingsTitle,
} from "./Settings.styled";

function Settings() {
  const { data: settings } = useGetSettingsQuery();
  const [updateSettings] = useUpdateSettingMutation();
  const [settingsValues, setSettingsValues] = useState({});
  // Initialize settingsValues state with fetched settings
  useEffect(() => {
    const initialSettingsValues = {};
    settings?.data?.forEach((group) => {
      group.settings.forEach((setting) => {
        const path = `${group.key}.${setting.key}`;
        initialSettingsValues[path] = setting.value;
      });
    });
    setSettingsValues(initialSettingsValues);
  }, [settings]);
  const handleInputChange = useCallback((path, value) => {
    setSettingsValues((prev) => ({ ...prev, [path]: value }));
  }, []);

  const renderSetting = useCallback(
    (setting, path) => {
      const value = settingsValues[path] || setting.value;
      switch (setting.field) {
        case "text":
          return (
            <SettingInput>
              {setting.title}
              <input type="text" value={value} onChange={(e) => handleInputChange(path, e.target.value)} />
            </SettingInput>
          );
        case "textarea":
          return (
            <SettingInput>
              {setting.title}
              <textarea value={value} onChange={(e) => handleInputChange(path, e.target.value)} />
            </SettingInput>
          );
        case "color":
          return (
            <SettingsColorInput>
              {setting.title}
              <input type="color" value={value} onChange={(e) => handleInputChange(path, e.target.value)} />
            </SettingsColorInput>
          );
        default:
          return null;
      }
    },
    [settingsValues]
  );

  const handleSubmit = () => {
    // Transform settingsValues into the format expected by the backend
    const updates = Object.entries(settingsValues).map(([path, value]) => {
      const [groupKey, settingKey] = path.split('.');
      return {
        key: groupKey, // Assuming top-level key for the settings group
        settingsPath: [settingKey], // This might need to be adjusted for deeper nesting
        value: value,
      };
    });
  
    console.log("Prepared updates for API:", updates);
    updateSettings(updates).then(() => {
      // Handle success (e.g., showing a notification, refetching settings, etc.)
    }).catch(error => {
      // Handle error (e.g., showing an error message)
      console.error("Failed to update settings:", error);
    });
  };
  

  return (
    <div>
      {settings?.data?.map((group) => (
        <div key={group.key}>
          <SettingsTitle>{group.title}</SettingsTitle>
          {group.settings.map((setting) => (
            <div key={setting.key}>
              {setting.settings && setting.settings?.length ? (
                <Settings settings={[setting]} />
              ) : (
                renderSetting(
                  setting,
                  `${group.key}.${setting.key}`
                )
              )}
            </div>
          ))}
        </div>
      ))}
      <button
        onClick={handleSubmit}
      >
        Save
      </button>
    </div>
  );
}

export default Settings;
