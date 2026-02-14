import { Row, Col, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../features/filtersSlice';
import SearchBar from '../../customToolbar/SearchBar';
import PermissionsAuth from '../../components/permissionAuth';

const CurrenciesToolBar = ({ isLoading, handleAddNewRow, t }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Row gutter={[24, 24]} justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} >
          <SearchBar
            onChange={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'q' }))}
            loading={isLoading} 
            placeholder="Search"
            width={"100px"}
          />
        </Col>
        {PermissionsAuth.checkPermissions('button', 'add_currency',
        <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12} align={"right"}>
          <Button 
            type="primary" 
            onClick={handleAddNewRow}
          >
            {t('common.Create')}
          </Button>
        </Col>
        )}
      </Row>
    </div>
  );
}

export default CurrenciesToolBar;
