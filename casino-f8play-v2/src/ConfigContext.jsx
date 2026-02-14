import React, { createContext, useEffect, useState } from "react";
import { configurableData, configurableDataThai, configurableDataBND } from "./utils/configurable";
import userService from "./services/user.service";

export const ConfigContext = createContext()

const API_URL = process.env.REACT_APP_APIURL
const country = process.env.REACT_APP_COUNTRY;
// const country = 'th';

export const ConfigContextProvider = (props) => {
    const [configData, setConfigData] = useState(null)
    const getConfigData = async () => {
        try {
          let newRes
          switch(country){
            case 'th':
              newRes = configurableDataThai;
            break;
            case 'bnd':
              newRes = configurableDataBND;
            break;
            default:
              newRes = configurableData;
          }

        setConfigData(newRes)
        } catch (error) {
            console.log(error)
        }

  }
  useEffect(() => {

    getConfigData();
  }, [])

  return (
    <ConfigContext.Provider value={configData}>
      {props.children}
    </ConfigContext.Provider>
  )
}

