import SelectOption from "./SelectOption";
import { useGetSitesListQuery } from "../features/sites/sitesApiSlices";

const SelectSiteForm = ({ placeholder='Select Site', mode="multiple", onChange = () => {} }) => {
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
      onChange={onChange}
      placeholder={placeholder}
      options={sitesOption}
      isLoading={isLoading}
      mode={mode}
      width={'100%'}
    />
  );
}

export default SelectSiteForm;
