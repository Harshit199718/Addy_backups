import { Row, Col } from 'antd';
import CreateLuckyWheelSlots from './CreateLuckyWheelSlots';
import PermissionsAuth from '../../components/permissionAuth';

const LuckyWheelToolBar = ({ t }) => {

  return (
    <div>
      <Row gutter={[24, 24]} justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        {PermissionsAuth.checkPermissions('button', 'add_luckywheelslots',
        <Col xs={24} sm={24} md={24} lg={24} xl={24} align={"right"}>
          <CreateLuckyWheelSlots t={t} />
        </Col>
        )}
      </Row>
    </div>
  );
}

export default LuckyWheelToolBar;
