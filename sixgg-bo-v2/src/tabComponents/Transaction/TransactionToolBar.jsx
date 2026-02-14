import { Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { filtersTabActions } from '../../features/filtersTabSlice';
import FormToDatePicker from '../../customToolbar/FromToDatePicker';
import SelectOption from '../../customToolbar/SelectOption';
import { transactionType } from '../../customField/customOption';
import SearchBar from '../../customToolbar/SearchBar';
import { convertTtypeOption } from '../../components/generalConversion';

const TransactionToolBar = ({ isLoading, t }) => {
    const dispatch = useDispatch();
    const transactionTypeOption = transactionType(t);

    return (
    <div>
      <Row gutter={[24, 24]} justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} >
          <SearchBar
            onChange={(value) => dispatch(filtersTabActions({ value: value, type: 'input', event: 'q' }))}
            loading={isLoading} 
            placeholder={t("common.Search")}
            style={{ width: "100%" }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} >
          <SelectOption 
            mode='multiple'
            onChange={(value) => dispatch(filtersTabActions({ value: convertTtypeOption(value), type: 'array', event: 'ttype' }))}
            placeholder={t("common.Transaction Type")}
            options={transactionTypeOption}
            width={"100%"}
            filterNumberic
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} >
          <FormToDatePicker 
            isLoading={isLoading}
            onChangeFromDate={(value) => dispatch(filtersTabActions({ value: value, type: 'input', event: 'fromDate' }))}
            onChangeToDate={(value) => dispatch(filtersTabActions({ value: value, type: 'input', event: 'toDate' }))}
            defaultToday={true}
          />
        </Col>

      </Row>
    </div>
  );
}

export default TransactionToolBar;
