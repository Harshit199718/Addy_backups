import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { useGetPromotionListQuery } from "../features/promotion/promotionApiSlices";
import { CustomOptionLabel } from "../ListingField/CustomOptionField";
import { promotionType } from "../customField/customOption";
import { useDebounce } from "./SearchBar";
import { filtersActions } from "../features/filtersSlice";
import { useTranslation } from "react-i18next";

const SelectPromotion = ({ event }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const sites = useSelector((state) => state.filters.sites);
  const [promotionSearch, setPromotionSearch] = useState({ title: '' });
  
  const {
    data: promotionList,
    isFetching: isLoading,aa
  } = useGetPromotionListQuery(
    {
      pagination: {
        startPageRow: 0,
        endPageRow: 500,
      },
      filters: {
        active: true,
        sites: sites,
        title: promotionSearch.title,
      },
    },
  );

  return (
    <Select
      allowClear
      showSearch
      onSearch={(value) => setPromotionSearch({ title: value })}
      onChange={(value) =>
        dispatch(filtersActions({ value: value, type: 'input', event: event }))
      }
      mode="single"
      loading={isLoading}
      placeholder={t("common.Promotion")}
      style={{ width: '100%' }}
      optionFilterProp="label"
      options={
        promotionList &&
        promotionList.list.map((item) => ({
          value: item.id,
          label: `${item.title} (${CustomOptionLabel(
            promotionType(t),
            item.promo_type
          )}) - ${item.sites_name}`,
        }))
      }
    />
  );
};

export default SelectPromotion;
