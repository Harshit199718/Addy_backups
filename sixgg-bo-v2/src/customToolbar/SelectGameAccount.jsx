import { useDispatch, useSelector } from "react-redux";
import { filtersTabActions } from "../features/filtersTabSlice";
import SelectOption from "./SelectOption";
import { useGetGameAccountByPlayerListQuery } from "../features/gameaccount/gameAccountApiSlices";

const SelectGameAccount = ({ event, t }) => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.general.player);

  const { 
    data: list,
    isFetching: isLoading, 
    isSuccess, 
    isError, 
    error
  } = useGetGameAccountByPlayerListQuery({
    pagination: {
      startPageRow: 0,
      endPageRow: 10
    },
    filters : {
        user: [player.id],
        discarded: false
    }
  });

  return (
    <SelectOption
    onChange={(value) => dispatch(filtersTabActions({value: value, type: 'select', event: event}))} 
    placeholder={t('common.Game Account')}
    options={list && list.list.map(item => ({
      value: item.id,
      label: `${item.product.name} (${item.product.category}) - ${item.login}`
  }))}
    isLoading={isLoading}
    width={"100%"}
    />
  );
}

export default SelectGameAccount;
