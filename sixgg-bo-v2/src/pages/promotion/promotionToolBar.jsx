import { Row, Col, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../features/filtersSlice';
import { activeInactive, promotionType } from '../../customField/customOption';
import SelectOption from '../../customToolbar/SelectOption';
import SearchBar from '../../customToolbar/SearchBar';
import CreatePromotion from './CreatePromotion';
import PermissionsAuth from '../../components/permissionAuth';

const PromotionToolBar = ({ isLoading, t }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Row gutter={[24, 24]} justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
          <SearchBar
            onChange={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'q' }))}
            loading={isLoading} 
            placeholder={t("common.Search")}
            style={{ width: "100%" }}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
          <SelectOption
            onChange={(value) => dispatch(filtersActions({value: value, type: 'select', event: 'is_active'}))} 
            placeholder={t('common.Active / Inactive')}
            options={activeInactive(t)}
            defaultValue={true}
            width={"100%"}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
          <SelectOption
            allowClear
            onChange={(value) => dispatch(filtersActions({value: value, type: 'input', event: 'promo_type'}))} 
            placeholder={t('common.Promotion Type')}
            options={promotionType(t)}
            width={"100%"}
          />
        </Col>
        {PermissionsAuth.checkPermissions('button', 'add_promotion',
        <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6} align="right" >
          <CreatePromotion t={t} />
        </Col>
        )}
      </Row>
    </div>
  );
}

export default PromotionToolBar;
