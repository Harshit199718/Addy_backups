import { Row, Col, Input, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { filtersTabActions } from '../../features/filtersTabSlice';
import SelectOption from '../../customToolbar/SelectOption';
import { isDiscarded } from '../../customField/customOption';
import SelectProduct from '../../customToolbar/SelectProduct';
import StartAppGameAccount from './StartAppGameAccount';

const GameAccountListToolBar = ({ isLoading, t }) => {
  const dispatch = useDispatch();

  return (
    <Row gutter={[24,24]} justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
      <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
        <SelectOption 
          onChange={(value) => dispatch(filtersTabActions({ value: value, type: 'select', event: 'discarded' }))}
          placeholder={t("common.Is Discarded")}
          options={isDiscarded(t)}
          defaultValue={false}
          width={"100%"}
        />
      </Col>
      <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
        <SelectProduct event={'product'} />
      </Col>
      <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8} align={"right"} >
        <StartAppGameAccount isCreateNew t={t} />
      </Col>
    </Row>
  );
}

export default GameAccountListToolBar;
