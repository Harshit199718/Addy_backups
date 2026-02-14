import { Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../features/filtersSlice';
import FormToDatePicker from '../../customToolbar/FromToDatePicker';
import SelectProductMessage from '../../customToolbar/SelectProductMessage';

const ProductMessageToolBar = ({ isLoading }) => {
    const dispatch = useDispatch();

  return (
    <Row gutter={[24, 24]} justify="start" align="middle" style={{ marginBottom: "10px" }}>
      <Col xs={24} sm={24} md={12} lg={10} xl={8} xxl={8}>
        <FormToDatePicker 
          isLoading={isLoading}
          onChangeFromDate={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'fromDate' }))}
          onChangeToDate={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'toDate' }))}
          defaultToday={true}
        />
      </Col>
      <Col xs={24} sm={24} md={12} lg={10} xl={8} xxl={8} align={"left"} >
        <SelectProductMessage event="product" />
      </Col>
    </Row>
  );
}

export default ProductMessageToolBar;
