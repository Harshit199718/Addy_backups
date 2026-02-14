import { Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../../features/filtersSlice';
import SearchBar from '../../../customToolbar/SearchBar';
import { filterChipsRebateType, transactionStateListing } from '../../../customField/customOption';
import SelectOption from '../../../customToolbar/SelectOption';
import { convertTtypeOption } from '../../../components/generalConversion';

const ChipsRebateToolBar = ({ isLoading, t }) => {
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
            placeholder={t('common.State')}
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
            options={filterChipsRebateType(t)}
            defaultValue={[filterChipsRebateType(t)[0], filterChipsRebateType(t)[1]]}
            width={"100%"}   
            allowClear   
          />
        </Col>
      </Row>
    </div>
  );
}

export default ChipsRebateToolBar;
