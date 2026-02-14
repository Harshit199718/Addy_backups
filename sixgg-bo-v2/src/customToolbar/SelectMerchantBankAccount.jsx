import { useDispatch, useSelector } from "react-redux";
import { filtersTabActions } from "../features/filtersTabSlice";
import SelectOption from "./SelectOption";
import { useGetMerchantBankListQuery } from "../features/merchantbankaccounts/merchantBankAccountsApiSlices";
import { filtersActions } from "../features/filtersSlice";
import MerchantBankAccountOptionField from "../ListingField/MerchantBankAccountOptionField";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

const SelectMerchantBankAccount = ({ event }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { 
    data: list,
    isFetching: isLoading, 
  } = useGetMerchantBankListQuery({
      pagination: {
          startPageRow: 0,
          endPageRow: 100
      },
      filters : {
          active: true,
      }
  });

  return (
    <Select
    allowClear
    onChange={(value) => dispatch(filtersActions({value: value ? value : value, type: 'input', event: event}))} 
    placeholder={t('common.Merchant Bank Account')}
    filterOption={(input, option) => {
      return (
        (option.label.props.children[1].props.children || '').toString().toLowerCase().includes(input.toLowerCase())
      )
    }}
    options={list && list.list.map(item => ({
      value: item.id,
      label: 
      <MerchantBankAccountOptionField item={item}/>
    }))}
    loading={isLoading}
    style={{
      width: '100%',
    }}
    />
  );
}

export default SelectMerchantBankAccount;
