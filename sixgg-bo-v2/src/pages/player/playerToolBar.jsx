import { Row, Col, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../features/filtersSlice';
import { activeInactive } from '../../customField/customOption';
import SelectOption from '../../customToolbar/SelectOption';
import SearchBar from '../../customToolbar/SearchBar';
import CreatePlayer from './CreatePlayer'
import PermissionsAuth from '../../components/permissionAuth';

const PlayerToolBar = ({ isLoading, t }) => {
  const dispatch = useDispatch();

  return (
      <Row gutter={[24, 24]} justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8} >
          <SearchBar
            onChange={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'q' }))}
            loading={isLoading} 
            placeholder={t("common.Search")}
            width={"100%"}
          />
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8} >
          <SelectOption
          onChange={(value) => dispatch(filtersActions({value: value, type: 'select', event: 'is_active'}))}
          placeholder={t('common.Active / Inactive')}
          options={activeInactive(t)}
          width={"100%"}
          />
        </Col>
        {PermissionsAuth.checkPermissions('button', 'add_player',
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8} align="right">
          <CreatePlayer t={t} />
        </Col>
        )}
      </Row>
  );
}

export default PlayerToolBar;
