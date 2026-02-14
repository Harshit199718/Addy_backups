import { Row, Col, Space } from 'antd';
import CreateSupport from './CreateSupport';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../features/filtersSlice';
import SearchBar from '../../customToolbar/SearchBar';
import SelectOption from '../../customToolbar/SelectOption';
import { activeInactive } from '../../customField/customOption';
import PermissionsAuth from '../../components/permissionAuth';

const SupportToolBar = ({ isLoading, t }) => {
    const dispatch = useDispatch();

  return (
    <div>
      <Row gutter={[24, 24]} justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <SearchBar
            onChange={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'q' }))}
            loading={isLoading} 
            placeholder={t("common.Search")}
            width={"100%"}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <SelectOption
            onChange={(value) => dispatch(filtersActions({value: value, type: 'select', event: 'is_active'}))}            
            placeholder={t('common.Active / Inactive')}
            options={activeInactive(t)}
            width={"100%"}
          />
        </Col>
        {PermissionsAuth.checkPermissions('button', 'add_user',
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8} align="right" >
          <CreateSupport t={t} />
        </Col>
        )}
      </Row>
    </div>
  );
}

export default SupportToolBar;
