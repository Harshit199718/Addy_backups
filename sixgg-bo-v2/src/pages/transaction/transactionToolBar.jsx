import { Row, Col, Space, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { filtersActions, sortingAction } from '../../features/filtersSlice';
import { bonusType, depositType, promotionType, transactionStateListing, transactionType, withdrawalType } from '../../customField/customOption';
import SelectOption from '../../customToolbar/SelectOption';
import SearchBar from '../../customToolbar/SearchBar';
import { convertTtypeOption } from '../../components/generalConversion';
import FormToDatePicker from '../../customToolbar/FromToDatePicker';
import CreateTransaction from './CreateTransaction.jsx';
import PermissionsAuth from '../../components/permissionAuth.jsx';
import SelectMerchantBankAccount from '../../customToolbar/SelectMerchantBankAccount.jsx';
import SelectPromotion from '../../customToolbar/SelectPromotion.jsx';

const TransactionToolBar = ({ t, isLoading, isSummaryView, setIsSummaryView, sorting }) => {
  const dispatch = useDispatch();
  const transactionTypeOption = transactionType(t);

  return (
    <>
      <Row gutter={[8, 8]} justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6} >
          <SearchBar
            onChange={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'q' }))}
            loading={isLoading} 
            placeholder={t("common.Search")}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6} >
          <SelectOption 
            mode='multiple'
            onChange={(value) => dispatch(filtersActions({ value: convertTtypeOption(value), type: 'array', event: 'ttype' }))}
            placeholder={t("common.Transaction Type")}
            options={transactionTypeOption}
            width={'100%'}
            defaultValue={[
                  PermissionsAuth.checkPermissions('undefined', 'view_deposit', depositType(t)),
                  PermissionsAuth.checkPermissions('undefined', 'view_withdrawal', withdrawalType(t)),
                  PermissionsAuth.checkPermissions('undefined', 'view_bonus', bonusType(t)),
            ].filter(Boolean)}
            filterNumberic
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6} >
          <SelectOption
            onChange={(value) => dispatch(filtersActions({value: value ? [value] : value, type: 'input', event: 'state'}))} 
            placeholder={t('common.Transaction State')}
            options={[
              { value: '', label: t('customoption.All (State)') },
              ...transactionStateListing(t)
            ]}
            width={'100%'}
            defaultValue={[transactionStateListing(t)[1]]}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6} >
          <SelectPromotion event={"promotion"} onSearch={(value) => onSearch(value)} />
        </Col>
      </Row>  
      <Row gutter={[8, 8]} justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6} >
          <SelectMerchantBankAccount event={"merchant_bank_account"} />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={10} xxl={8} >
          <FormToDatePicker 
            isLoading={isLoading}
            onChangeFromDate={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'fromDate' }))}
            onChangeToDate={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'toDate' }))}
            defaultToday={true}
          />
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={4} xxl={6} align="right">
          <Button type='primary' onClick={() => {
            dispatch(sortingAction({ field: 'updated_at', name: 'updated_at', order: sorting?.order === "ASC" ? "descend" : "ascend" }))
          }}>
              {t("common.Date")} {t(`common.${sorting?.order}`)}
          </Button>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={2} xxl={2} align="right">
          <Button type="primary" onClick={() => setIsSummaryView(!isSummaryView)} style={{ width: "100%" }}>
            {isSummaryView ? t("common.Summary View") : t("common.Detail View")}
          </Button>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={2} xxl={2} align="right">
          <CreateTransaction t={t} />
        </Col>
      </Row>        
    </>
  );
}

export default TransactionToolBar;
