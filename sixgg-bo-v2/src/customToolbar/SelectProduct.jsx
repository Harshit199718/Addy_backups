import { useDispatch, useSelector } from "react-redux";
import { filtersTabActions } from "../features/filtersTabSlice";
import SelectOption from "./SelectOption";
import { useGetProductOptionsQuery } from "../features/products/productsApiSlices";
import { useTranslation } from "react-i18next";

const SelectProduct = ({ event }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const player = useSelector((state) => state.general.player);
  const filters = {
    sites: player.sites,
    active: true
   }

  const { 
    data: list,
    isFetching: isLoading, 
    isSuccess, 
    isError, 
    error
  } = useGetProductOptionsQuery({
    filters
  });
  const productOption = list && list.map(item => ({ value: item.id, label: `${item.name} (${item.category}) - ${item.ltype}` }));

  return (
    <SelectOption
      onChange={(value) => dispatch(filtersTabActions({value: value, type: 'input', event: event}))} 
      placeholder={t('common.Product')}
      options={productOption}
      isLoading={isLoading}
      mode="multiple"
      width={"100%"}
    />
  );
}

export default SelectProduct;
