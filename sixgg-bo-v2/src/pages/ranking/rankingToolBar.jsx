import { Row, Col, Space, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../features/filtersSlice';
import SearchBar from '../../customToolbar/SearchBar';
import PermissionsAuth from '../../components/permissionAuth';

const RankingToolBar = ({ isLoading, handleAddNewRow, t }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        <Col span={14}>
          <Space>
            <SearchBar
              onChange={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'q' }))}
              loading={isLoading} 
              placeholder={t("common.Search")}
              style={{ width: 300 }}
            />
          </Space>
        </Col>
        {PermissionsAuth.checkPermissions('button', 'add_rank',
        <Col>
          <Button type="primary" onClick={handleAddNewRow}>{t("common.Create")}</Button>
        </Col>
        )}
      </Row>
    </div>
  );
}

export default RankingToolBar;
