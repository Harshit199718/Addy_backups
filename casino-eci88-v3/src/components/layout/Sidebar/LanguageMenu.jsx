import React from "react";
import { Item } from "./Sidebar";
import { countries } from "../../../i18n/countries";
import { useDispatch, useSelector } from "react-redux";
import { selectConfigData } from "../../../api/generalApi";
import { changeLanguage, selectCurrentCountry, selectCurrentLang } from "../../../app/slices/general";
import { LanguageMenuContainer, LanguageTitle } from "./Sidebar.styled";

function LanguageMenu({ languageOpen }) {
  const { available_languages, country } = useSelector(selectConfigData);
  const dispatch = useDispatch();
  return (
    <LanguageMenuContainer $isOpen={languageOpen}>
      {Object.keys(countries)
        .filter((country) => {
          const filteredLanguages = available_languages?.split(",");
          const languages = Object.keys(countries[country]?.languages);
          return languages.every((item) => filteredLanguages?.includes(item));
        })
        .map((country) => {
          const languages = countries[country]?.languages;
          const language = Object.keys(languages)[0];
            return (
                <div key={country} onClick={() => {
                    dispatch(changeLanguage({ country, language }))
                }}>
                    <Item
                      isLanguageLabel
                      key={country}
                      item={{
                        title: <LanguageTitle>{countries[country]?.name}<span>{languages[language]}</span></LanguageTitle>,
                        // image: countries[country]?.flag,
                      }}
                      itemStyles={{
                        paddingLeft: "20%",
                      }}
                    />
                </div>
            );
        })}
    </LanguageMenuContainer>
  );
}

export default LanguageMenu;
