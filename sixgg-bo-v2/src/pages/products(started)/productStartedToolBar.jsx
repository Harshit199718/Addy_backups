import { Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../features/filtersSlice';
import SelectOption from '../../customToolbar/SelectOption';
import { useGetProductsListQuery } from '../../features/products/productsApiSlices';

const ProductStartedToolBar = ({ isLoading, t }) => {
    const dispatch = useDispatch();
    const { 
      data: productList,
      isLoading: productLoading, 
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
    <div>
      <Row gutter={[24, 24]} justify="start" align="middle" style={{ marginBottom: "10px" }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <SelectOption
              onChange={(value) => dispatch(filtersActions({ value: value, type: 'array', event: 'product' }))}
              mode="multiple"
              loading={isLoading} 
              placeholder={t("common.Product")}
              options={productList && productList.list.map(item => ({
                value: item.id,
                label: `${item.name} (${item.category}) - ${item.sites_name}`
              }))}
              width={"100%"}
          />
        </Col>
      </Row>
    </div>
  );
}

export default ProductStartedToolBar;
