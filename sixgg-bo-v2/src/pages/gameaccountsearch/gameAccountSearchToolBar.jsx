import { Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../features/filtersSlice';
import SearchBar from '../../customToolbar/SearchBar';

const GameAccountSearchToolBar = ({ isLoading, t }) => {
    const dispatch = useDispatch();

  return (
    <div>
      <Row gutter={[24, 24]} justify="start" align="middle" style={{ marginBottom: "10px" }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <SearchBar
            onChange={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'gameaccount' }))}
            loading={isLoading} 
            placeholder={t("common.Game Account")}
            width={"100%"}
          />
        </Col>
      </Row>
    </div>
  );
}

export default GameAccountSearchToolBar;
