import React, { useEffect, useMemo, useState } from "react";
import { Categories, SearchGamesContainer } from "./Games.styled";
import { Icon } from "@iconify/react";
import Input from "../../components/common/Input";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../api/generalApi";
import { useTranslation } from "react-i18next";

function SearchGame({ gamelist, onSelect, onSearch, query }) {
  const { t } = useTranslation();
  const {text_color, secondary_color} = useSelector(selectConfigData);
  const categories = useMemo(() => {
    if (!gamelist) return [];
    return [
      { key: "All", label: "All" },
      ...Array.from(
        new Set(
          gamelist.map((item) => item.category)
        )
      ).map(category=>({key: category, label: category})),
    ];
  }, [gamelist]);
  useEffect(() => {
    if (onSelect) {
      onSelect("All");
    }
  }, [gamelist, onSelect]);
  const handleSelect = (event) => {
    onSelect && onSelect(event.target.value);
  }
  const handleChange = (event) => {
    onSearch && onSearch(event.target.value);
  }
  return (
    <SearchGamesContainer>
      <div className="input-container">
        <input type="text" placeholder={t("Search Games")} onChange={handleChange} value={query}/>
        <div className="search-icon">
          <Icon icon="material-symbols:search" />
        </div>
      </div>
      {gamelist?.length && gamelist[0]?.baseProduct &&
      <Categories>
        <Input
          type="select"
          options={categories}
          $width="150px"
          $fontSize="12px"
          $padding="5px 10px"
          $background={secondary_color}
          $color={text_color}
          onChange={(e)=> {handleSelect}}
          placeholder={t('Categories')}
        />
      </Categories>
      }
    </SearchGamesContainer>
  );
}

export default React.memo(SearchGame);
