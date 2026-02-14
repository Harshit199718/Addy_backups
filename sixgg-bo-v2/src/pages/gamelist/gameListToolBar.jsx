import { Row, Col, Space } from 'antd';
import CreateGameList from './CreateGameList';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../features/filtersSlice';
import SearchBar from '../../customToolbar/SearchBar';
import BatchCreateGameList from './BatchCreateGameList';
import PermissionsAuth from '../../components/permissionAuth';

const GameListToolBar = ({ isLoading, t }) => {
    const dispatch = useDispatch();

  return (
    <div>
      <Row gutter={[24, 24]} justify={"space-between"} style={{ marginBottom: "10px" }}>
        <Col xs={13} sm={12} md={12} lg={12} xl={12} xxl={12} align={"left"}>
          <SearchBar
            onChange={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'q' }))}
            loading={isLoading} 
            placeholder="Search"
            width="100%"
          />
        </Col>
        {PermissionsAuth.checkPermissions('button', 'add_gamelist',
        <Col align={"right"}>
          <Space>
            <CreateGameList t={t} />
            <BatchCreateGameList t={t} />
          </Space>
        </Col>
        )} 
      </Row>
    </div>
  );
}

export default GameListToolBar;
