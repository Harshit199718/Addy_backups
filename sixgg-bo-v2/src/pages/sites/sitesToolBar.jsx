import { Row, Col, Space, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../features/filtersSlice';
import SearchBar from '../../customToolbar/SearchBar';
import PermissionsAuth from '../../components/permissionAuth';

const SitesToolBar = ({ isLoading, handleAddNewRow, t }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Row gutter={[24, 24]} justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} >
          <SearchBar
            onChange={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'q' }))}
            loading={isLoading} 
            placeholder={t("common.Search")}
            style={{ width: 300 }}
          />
        </Col>
        {PermissionsAuth.checkPermissions('button', 'add_site',
        <Col xs={15} sm={8} md={8} lg={8} xl={8} xxl={8} align="right" >
          <Button type="primary" onClick={handleAddNewRow}>{t("common.Create")}</Button>
        </Col>
        )}
      </Row>
    </div>
  );
}

export default SitesToolBar;
