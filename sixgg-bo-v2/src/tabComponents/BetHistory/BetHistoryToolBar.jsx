import { Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { filtersTabActions } from '../../features/filtersTabSlice';
import FormToDatePicker from '../../customToolbar/FromToDatePicker';
import SelectGameAccount from '../../customToolbar/SelectGameAccount';
import SearchBar from '../../customToolbar/SearchBar';

const BetHistoryToolBar = ({ isLoading, fromDate, toDate, t }) => {
    const dispatch = useDispatch();

    return (
    <div>
      <Row gutter={[24,24]} justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} >
          <SearchBar
            onChange={(value) => dispatch(filtersTabActions({ value: value, type: 'input', event: 'q' }))}
            loading={isLoading} 
            placeholder={t("common.Search")}
            style={{ width: "100%" }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} >
          <SelectGameAccount event={'ga'} t={t} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} >
          <FormToDatePicker 
            isLoading={isLoading}
            onChangeFromDate={(value) => dispatch(filtersTabActions({ value: value, type: 'input', event: 'fromDate' }))}
            onChangeToDate={(value) => dispatch(filtersTabActions({ value: value, type: 'input', event: 'toDate' }))}
            fromDate={fromDate} 
            toDate={toDate}
          />
        </Col>
      </Row>
    </div>
  );
}

export default BetHistoryToolBar;
