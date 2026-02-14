import { Row, Col } from 'antd';
import PermissionsAuth from '../../components/permissionAuth';
import CreateRankRate from './CreateRankRate';

const RankingRateToolBar = ({ record, t }) => {
  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        {PermissionsAuth.checkPermissions('button', 'add_rankrate', 
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} align="left" >
          <CreateRankRate record={record} t={t} />
        </Col>
        )}
      </Row>
    </div>
  );
}

export default RankingRateToolBar;
