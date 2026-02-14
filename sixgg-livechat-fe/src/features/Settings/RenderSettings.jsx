import React from 'react'
import { SettingInput, SettingsColorInput, SettingsImageInput } from './Settings.styled';
import RichText from '../../components/common/RichText';

const hints = {
  welcome: "{username}, {sitename}",
  deposit: "{username}, {amount}, {depositId}, {remark}",
  depositPending: "{username}, {amount}",
  depositFailure: "{username}, {amount}, {status}, {remark}",
  withdraw: "{username}, {amount}, {forfeit}",
  withdrawPending: "{username}, {amount}",
  withdrawFailure: "{username}, {amount}, {status}, {remark}",
}
function RenderSettings({setting, path, selectedSite, handleInputChange, settingsValues}) {
    console.log("setting.key: ", setting.key)
    const value = settingsValues[[`${selectedSite}.${path}`]];
    switch (setting.field) {
      case "text":
        return (
          <SettingInput key={`${path}-${selectedSite}`}>
            {setting.title} {hints[setting.key]?hints[setting.key]:""}
            <input type="text" value={value} onChange={(e) => handleInputChange(path, e.target.value)} />
          </SettingInput>
        );
      case "richtext":
        console.log("value passed", selectedSite, setting)
        return (
          <SettingInput key={`${path}-${selectedSite}`}>
            {setting.title} ({selectedSite}) [<span className='allowed-variables'>Allowed variables: </span>{hints[setting.key]?hints[setting.key]:""}]
            <textarea value={value} onChange={(e) => handleInputChange(path, e.target.value)} />
          </SettingInput>
        );
      case "textarea":
        return (
          <SettingInput key={`${path}-${selectedSite}`}>
            {setting.title}
            <textarea value={value} onChange={(e) => handleInputChange(path, e.target.value)} />
          </SettingInput>
        );
      case "color":
        return (
          <SettingsColorInput key={`${path}-${selectedSite}`}>
            {setting.title}
            <input type="color" value={value} onChange={(e) => handleInputChange(path, e.target.value)} />
          </SettingsColorInput>
        );
      case "image":
        return (
          <SettingsImageInput key={`${path}-${selectedSite}`} image={value} onChange={(filepath) => handleInputChange(path, filepath)} />
        );
      default:
        return null;
    }
}

export default RenderSettings