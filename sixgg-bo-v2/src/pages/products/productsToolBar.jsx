import { Row, Col, Space } from 'antd';
import CreateProducts from './CreateProducts';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../features/filtersSlice';
import { activeInactive, productsLive, productsCategory, productsLaunchType } from '../../customField/customOption';
import SelectOption from '../../customToolbar/SelectOption';
import SearchBar from '../../customToolbar/SearchBar';
import PermissionsAuth from '../../components/permissionAuth';

const ProductsToolBar = ({ isLoading, t }) => {
  const dispatch = useDispatch();

  return (
      <Row gutter={[24, 24]} style={{ marginBottom: "10px" }}>
        <Col xs={24} sm={12} md={12} lg={8} xl={4} xxl={4} >
            <SearchBar
              onChange={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'q' }))}
              loading={isLoading}
              placeholder={t("common.Search")}
              width={"100%"}
            />
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={4} xxl={4} >
          <SelectOption
            onChange={(value) => dispatch(filtersActions({ value: value, type: 'select', event: 'active' }))}
            placeholder={t('common.Active / Inactive')}
            options={activeInactive(t)}
            width={"100%"}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={4} xxl={4} >
          <SelectOption
            onChange={(value) => dispatch(filtersActions({ value: value, type: 'select', event: 'is_live' }))}
            placeholder={t('common.Live')}
            options={productsLive(t)}
            width={"100%"}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={4} xxl={4} >
          <SelectOption
            onChange={(value) => dispatch(filtersActions({ value: value, type: 'array', event: 'category' }))}
            placeholder={t('common.Category')}
            options={productsCategory(t)}
            mode='multiple'
            allowClear
            width={"100%"}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={4} xxl={4} >
          <SelectOption
            onChange={(value) => dispatch(filtersActions({ value: value, type: 'array', event: 'ltype' }))}
            placeholder={t('common.Launch Type')}
            options={productsLaunchType(t)}
            mode='multiple'
            width={"100%"}
          />
        </Col>
        {PermissionsAuth.checkPermissions('button', 'add_promotion',
        <Col xs={24} sm={12} md={12} lg={8} xl={4} xxl={4} align="right">
          <CreateProducts t={t} />
        </Col>
          )}
      </Row>    
  );
}

export default ProductsToolBar;
