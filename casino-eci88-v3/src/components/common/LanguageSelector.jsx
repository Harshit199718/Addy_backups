import React from "react";
import styled from "styled-components";
import Image from "./Image";
import { countries } from "../../i18n/countries";
import {
  changeLanguage,
  selectCurrentCountry,
  selectCurrentLang,
} from "../../app/slices/general";
import { useDispatch, useSelector } from "react-redux";
import { selectConfigData } from "../../api/generalApi";

const LanguageSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Country = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px;
  border-bottom: 1px solid rgb(204, 204, 204);

  .flag-img {
    width: 30px;
  }
`;

const LanguagesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Language = styled.h3`
  font-weight: 400;
  line-height: 1.5;
  padding: 8px;
  font-size: 20px;
  color: ${(props) =>
    props.$selected
      ? props.theme.text_color_secondary
      : props.theme.text_color};
  cursor: pointer;
`;
function LanguageSelector() {
  const currentCountry = useSelector(selectCurrentCountry);
  const currentLang = useSelector(selectCurrentLang);
  const { available_languages } = useSelector(selectConfigData);
  const dispatch = useDispatch();

  return (
    <>
      {Object.keys(countries)
        .filter((country) => {
          const filteredLanguages = available_languages.split(",");
          const languages = Object.keys(countries[country]?.languages);
          return languages.every((item) => filteredLanguages.includes(item));
        })
        .map((country) => {
          const languages = countries[country]?.languages;
          return (
            <Country key={country}>
              {/* <Image
                src={countries[country]?.flag}
                className="flag-img"
                width="30px"
                skeletonHeight={30}
                circle
              /> */}
              <LanguagesContainer>
                {Object.keys(languages).map((language) => {
                  let selected = false;
                  if (currentCountry === country && currentLang === language) {
                    selected = true;
                  }
                  return (
                    <Language
                      key={language}
                      $selected={selected}
                      onClick={() =>
                        dispatch(changeLanguage({ country, language }))
                      }
                    >
                      {languages[language]}
                    </Language>
                  );
                })}
              </LanguagesContainer>
            </Country>
          );
        })}
    </>
  );
}

export default LanguageSelector;
