import { Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../features/filtersSlice';
import { activeInactive, missionCategory } from '../../customField/customOption';
import SelectOption from '../../customToolbar/SelectOption';
import SearchBar from '../../customToolbar/SearchBar';
import PermissionsAuth from '../../components/permissionAuth';
import CreateMissions from './CreateMissions';

const MissionsToolBar = ({ isLoading, t }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Row gutter={[24, 24]} justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <SearchBar
            onChange={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'q' }))}
            loading={isLoading} 
            placeholder={t("common.Search")}
            style={{ width: "100%" }}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <SelectOption
            onChange={(value) => dispatch(filtersActions({value: value, type: 'select', event: 'is_active'}))} 
            placeholder={t('common.Active / Inactive')}
            options={activeInactive(t)}
            defaultValue={true}
            width={"100%"}
          />
        </Col>
        {PermissionsAuth.checkPermissions('button', 'add_mission',
        <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8} align="right" >
          <CreateMissions t={t} />
        </Col>
        )}
      </Row>
    </div>
  );
}

export default MissionsToolBar;
