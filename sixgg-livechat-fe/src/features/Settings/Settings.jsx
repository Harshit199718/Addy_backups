import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  useGetSettingsMutation,
  useUpdateSettingMutation,
  useUpdateBackofficeColorsMutation,
} from "../../api/hooks";
import {
  SettingInput,
  SettingsColorInput,
  SettingsTitle,
} from "./Settings.styled";
import RichText from "../../components/common/RichText";
import { Button } from "../../components/common/Button";
import Toast from "../../components/common/Toast";
import { useSelector } from "react-redux";
import {
  selectBackofficeColors,
  selectSettings,
} from "../../app/slices/generalSlice";
import { Box } from "../../components/common/Box";
import { getFilterStyles } from "../../utlis";
import RenderSettings from "./RenderSettings";
import { selectUser } from "../../app/slices/userSlice";

function Settings() {
  const [getSettings] = useGetSettingsMutation();
  const settings = useSelector(selectSettings);
  const user = useSelector(selectUser);
  const backofficeColors = useSelector(selectBackofficeColors);
  const [updateSettings] = useUpdateSettingMutation();
  const [updateBackofficeColors] = useUpdateBackofficeColorsMutation();
  const [settingsValues, setSettingsValues] = useState({});
  const [toastProps, setToastProps] = useState(null);
  const [newQuickMessage, setNewQuickMessage] = useState({});
  const [selectedSite, setSelectedSite] = useState("");
  const [updatedBOColors, setUpdatedBOColors] = useState(backofficeColors);

  // Fetch settings on component mount
  useEffect(() => {
    if (user) {
      getSettings(user?.role);
    }
  }, [getSettings, user]);

  // Extract all unique sites from settings and set the default selected site
  const allSites = useMemo(() => {
    const sites = Array.from(new Set(settings.map((setting) => setting.site)));
    if (!selectedSite && sites.length > 0) {
      setSelectedSite(sites[0]);
    }
    return sites;
  }, [settings, selectedSite]);

  // Update settingsValues state when settings or selectedSite changes
  useEffect(() => {
    const initialSettingsValues = {};
    settings.forEach((group) => {
      group.settings.forEach((setting) => {
        const path = `${group.key}.${setting.key}`;
        initialSettingsValues[`${group.site}.${path}`] = setting.value;
      });
    });
    setSettingsValues(initialSettingsValues);
  }, [settings]);

  const handleInputChange = useCallback(
    (path, value) => {
      setSettingsValues((prev) => ({
        ...prev,
        [`${selectedSite}.${path}`]: value,
      }));
    },
    [selectedSite]
  );

  const handleColorChange = useCallback((key, value) => {
    setUpdatedBOColors((prevColors) => ({
      ...prevColors,
      [key]: value,
    }));
  }, []);

  const handleSubmit = async () => {
    try {
      if (selectedSite === "Backoffice Theme") {
        updateBackofficeColors(updatedBOColors)
      } else {
        const siteUpdates = allSites
          .map((site) => {
            const updates = Object.entries(settingsValues)
              .filter(([key]) => key.startsWith(`${site}.`))
              .map(([key, value]) => {
                const path = key.split(".").slice(1).join(".");
                const [groupKey, settingKey] = path.split(".");
                return {
                  key: groupKey,
                  settingsPath: [settingKey],
                  value: value,
                };
              });

            if (newQuickMessage[site]) {
              const quickMessagesGroup = settings.find(
                (group) => group.site === site && group.key === "quickMessages"
              );
              if (quickMessagesGroup) {
                updates.push({
                  key: "quickMessages",
                  settingsPath: [
                    `quickmessage${quickMessagesGroup.settings.length + 1}`,
                  ],
                  value: newQuickMessage[site],
                  title: `Quick Message ${
                    quickMessagesGroup.settings.length + 1
                  }`,
                  field: "richtext",
                });
              }
            }

            return { site, updates };
          })
          .filter((update) => update.updates.length > 0);

        const result = await updateSettings(siteUpdates).unwrap();
        if (result.status) {
          setToastProps({
            type: "success",
            message: "Settings Updated Successfully",
          });
          setNewQuickMessage({}); // Clear the new quick message state after successful update
          getSettings(user?.role);
        }
      }
    } catch (error) {
      setToastProps({
        type: "error",
        message: "Something went wrong",
      });
      console.log("Error: ", error);
    }
  };

  const onToastClose = () => {
    setToastProps(null);
  };
  return (
    <div>
      {toastProps ? <Toast {...toastProps} onClose={onToastClose} /> : null}
      <Box $spacingX="0" $spacingY="0" $justifyContent="flex-start" $gap="10px">
        {[...allSites, "Backoffice Theme"]?.map((filter) => (
          <Button
            key={filter}
            $fontSize="1em"
            {...getFilterStyles(selectedSite, filter)}
            onClick={() => setSelectedSite(filter)}
          >
            {filter}
          </Button>
        ))}
      </Box>
      {selectedSite === "Backoffice Theme" ? (
        <div>
          <SettingsTitle>Backoffice Colors</SettingsTitle>
          <SettingsColorInput>
            Primary Color
            <input
              type="color"
              value={updatedBOColors?.primary || backofficeColors?.primary}
              onChange={(e) => handleColorChange("primary", e.target.value)}
            />
          </SettingsColorInput>
          <SettingsColorInput>
            Secondary Color
            <input
              type="color"
              value={updatedBOColors?.secondary || backofficeColors?.secondary}
              onChange={(e) => handleColorChange("secondary", e.target.value)}
            />
          </SettingsColorInput>
          <SettingsColorInput>
            Tertiary Color
            <input
              type="color"
              value={updatedBOColors?.tertiary || backofficeColors?.tertiary}
              onChange={(e) => handleColorChange("tertiary", e.target.value)}
            />
          </SettingsColorInput>
        </div>
      ) : (
        settings
          .filter((group) => group.site === selectedSite)
          .filter((group) => user?.role==="agent"?group.key==="predefinedMessages":true)
          .map((group) => (
            <div key={group.key}>
              <SettingsTitle>
                {group.title} ({group.site})
              </SettingsTitle>
              {group.settings.map((setting) => (
                <div key={setting.key}>
                  {setting.settings && setting.settings?.length ? (
                    <Settings settings={[setting]} />
                  ) : (
                    <RenderSettings
                      setting={setting}
                      path={`${group.key}.${setting.key}`}
                      selectedSite={selectedSite}
                      handleInputChange={handleInputChange}
                      settingsValues={settingsValues}
                    />
                  )}
                </div>
              ))}
              {group.key === "quickMessages" ? (
                <SettingInput key={`quickMessage${group.settings?.length + 1}`}>
                  Quick Message {group.settings?.length + 1}
                  <RichText
                    placeholder={`Add Quick Message ${
                      group.settings?.length + 1
                    }`}
                    content={newQuickMessage[selectedSite] || ""}
                    onChange={(val) =>
                      setNewQuickMessage((prev) => ({
                        ...prev,
                        [selectedSite]: val,
                      }))
                    }
                  />
                </SettingInput>
              ) : null}
            </div>
          ))
      )}
      <Button onClick={handleSubmit}>Save</Button>
    </div>
  );
}

export default Settings;
