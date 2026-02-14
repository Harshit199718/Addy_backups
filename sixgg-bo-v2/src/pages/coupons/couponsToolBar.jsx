import { Row, Col, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../features/filtersSlice';
import SearchBar from '../../customToolbar/SearchBar';
import { couponIsClaimed } from '../../customField/customOption';
import SelectOption from '../../customToolbar/SelectOption';
import { useGetCouponBatchsListQuery } from '../../features/couponbatchs/couponBatchsApiSlices';
import { t } from 'i18next';

const CouponsToolBar = ({ isLoading }) => {
    const dispatch = useDispatch();

    const { 
      data: couponList,
      isLoading: couponLoading, 
  } = useGetCouponBatchsListQuery({
      pagination: {
          startPageRow: 0,
          endPageRow: 500
      },
      filters : {}
  });

  return (
    <div>
      <Row gutter={[24, 24]} justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <SearchBar
            onChange={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'q' }))}
            loading={isLoading} 
            placeholder={t('common.Search')}
            width={"100%"}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <SelectOption
            onChange={(value) => dispatch(filtersActions({ value: value, type: 'array', event: 'name' }))}
            mode="multiple"
            loading={isLoading} 
            placeholder={t('coupon.Batch Name')}
            options={couponList && couponList.list.map(item => ({
              value: item.name,
              label: `${item.name}`
              }))}
            width={"100%"}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <SelectOption
            onChange={(value) => dispatch(filtersActions({value: value, type: 'select', event: 'is_claimed'}))}            
            placeholder={t('coupon.Is Claimed')}
            options={couponIsClaimed(t)}
            width={"100%"}
          />
        </Col>
      </Row>
    </div>
  );
}

export default CouponsToolBar;
