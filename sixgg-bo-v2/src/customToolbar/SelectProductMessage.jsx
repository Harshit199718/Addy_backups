import { useDispatch, useSelector } from "react-redux";
import { filtersActions } from "../features/filtersSlice";
import { Select } from "antd";
import { useGetProductsListQuery } from "../features/products/productsApiSlices";
import { useTranslation } from "react-i18next";

const SelectProductMessage = ({ event }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { 
    data: productList,
    isFetching: isLoading, 
} = useGetProductsListQuery({
    pagination: {
        startPageRow: 0,
        endPageRow: 500
    },
    filters : {
        active: true,
    }
});

  return (
    <Select
      allowClear
      onChange={(value) => dispatch(filtersActions({ value: value, type: 'array', event: event }))}
      mode="multiple"
      loading={isLoading} 
      placeholder={t("common.Product")}
      style={{ width: '100%' }}
      options={productList && productList.list.map(item => ({
        value: item.id,
        label: `${item.name} (${item.category}) - ${item.sites_name}`
    }))}
    />
  );
}

export default SelectProductMessage;
