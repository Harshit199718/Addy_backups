import { Row, Col, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../features/filtersSlice';
import SearchBar from '../../customToolbar/SearchBar';

const RegistrationsToolBar = ({ isLoading, t }) => {
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
      </Row>
    </div>
  );
}

export default RegistrationsToolBar;
