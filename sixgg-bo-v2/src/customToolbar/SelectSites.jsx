import { useDispatch } from "react-redux";
import { filtersActions, sitesActions } from "../features/filtersSlice";
import SelectOption from "./SelectOption";
import { useGetSitesListQuery } from "../features/sites/sitesApiSlices";
import { useTranslation } from "react-i18next";

const SelectSite = ({ event }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { 
    data: list,
    isLoading: isLoading, 
  } = useGetSitesListQuery({
      pagination: {
          startPageRow: 0,
          endPageRow: 100
      },
      filters : {
          active: true
      }
  });

  const sitesOption = list?.list.map(item => ({ value: item.id, label: `${item.name}`}));

  return (
    <SelectOption
    onChange={(value) => {
      dispatch(sitesActions({sites: value}))
      dispatch(filtersActions({value: value, type: 'input', event: event}))
    }}
    placeholder={t('common.Select Site')}
    options={sitesOption}
    isLoading={isLoading}
    mode="multiple"
    width={"100%"}
    />
  );
}

export default SelectSite;
