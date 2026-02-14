import { Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../../features/filtersSlice';
import SearchBar from '../../../customToolbar/SearchBar';
import { filterMultiBonusesType, transactionStateListing } from '../../../customField/customOption';
import SelectOption from '../../../customToolbar/SelectOption';
import { convertTtypeOption } from '../../../components/generalConversion';

const MultiBonusesToolBar = ({ isLoading, t }) => {
    const dispatch = useDispatch();

  return (
    <div>
      <Row gutter={[24, 24]} justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
          <SearchBar
            onChange={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'q' }))}
            loading={isLoading} 
            placeholder={t("common.Search")}
            width={"100%"}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
          <SelectOption
            onChange={(value) => dispatch(filtersActions({value: value, type: 'input', event: 'state'}))} 
            placeholder={'State'}
            options={transactionStateListing(t)}
            defaultValue={[transactionStateListing(t)[1]]}
            allowClear
            width={"100%"}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
          <SelectOption 
            mode='multiple'
            onChange={(value) => dispatch(filtersActions({ value: convertTtypeOption(value), type: 'array', event: 'ttype' }))}
            placeholder={t("common.Type")}
            options={filterMultiBonusesType(t)}
            style={{ width: 300 }}
            defaultValue={[filterMultiBonusesType(t)[0], filterMultiBonusesType(t)[1]]}
            width={"100%"}
          />
        </Col>
      </Row>
    </div>
  );
}

export default MultiBonusesToolBar;
