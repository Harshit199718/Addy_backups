import { Row, Col, Space } from 'antd';
import CreateUnclaims from './CreateUnclaims';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../features/filtersSlice';
import SearchBar from '../../customToolbar/SearchBar';
import { unclaimType } from '../../customField/customOption';
import SelectOption from '../../customToolbar/SelectOption';
import PermissionsAuth from '../../components/permissionAuth';

const UnclaimsToolBar = ({ isLoading, t }) => {
    const dispatch = useDispatch();

  return (
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
          onChange={(value) => dispatch(filtersActions({value: value, type: 'select', event: 'claimed'}))} 
          placeholder={t('common.Type')}
          options={unclaimType(t)}
          defaultValue={[unclaimType(t)[0]]}
          allowClear
          width={"100%"}
        />
      </Col>
      {PermissionsAuth.checkPermissions('button', 'add_unclaim',
      <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8} align="right">
        <CreateUnclaims t={t} />
      </Col>
      )}
    </Row>
  );
}

export default UnclaimsToolBar;
