import { Row, Col } from 'antd';
import CreatePartnerships from './CreatePartnerships';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../features/filtersSlice';
import SearchBar from '../../customToolbar/SearchBar';
import PermissionsAuth from '../../components/permissionAuth';

const PartnershipsToolBar = ({ isLoading, t }) => {
    const dispatch = useDispatch();

  return (
    <div>
      <Row gutter={[24, 24]} justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <SearchBar
            onChange={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'q' }))}
            loading={isLoading} 
            placeholder={t("common.Search")}
            width={"100%"}
          />
        </Col>
        {PermissionsAuth.checkPermissions('button', 'add_partnership',
        <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12} align={"right"}>
          <CreatePartnerships t={t} />
        </Col>
        )}
      </Row>
    </div>
  );
}

export default PartnershipsToolBar;
