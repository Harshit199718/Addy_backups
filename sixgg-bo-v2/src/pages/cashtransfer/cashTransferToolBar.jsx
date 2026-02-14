import { Row, Col, Button, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { filtersActions } from '../../features/filtersSlice';
import FormToDatePicker from '../../customToolbar/FromToDatePicker';
import { useGetMerchantBankIDQuery, useGetMerchantBankListQuery } from '../../features/merchantbankaccounts/merchantBankAccountsApiSlices';
import SelectOption from '../../customToolbar/SelectOption';
import { cashtransferType } from '../../customField/customOption';
import MerchantBankAccountOptionField from '../../ListingField/MerchantBankAccountOptionField';
import NumberListingField from '../../ListingField/NumberListingField';
import PermissionsAuth from '../../components/permissionAuth';
import { setCashTransferSelectedData } from '../../features/generalSlice';

const CashTransferToolBar = ({ isLoading, t }) => {
  const dispatch = useDispatch();
  const sites = useSelector((state) => state.filters.sites);
  const selectedItemID = useSelector((state) => state.general.cashtTransferSelectedData.selectedBankID);

  const { 
    data: list,
    isLoading: merchantbankloading, 
    isFetching: merchantbankfetching,
  } = useGetMerchantBankListQuery({
      pagination: {
          startPageRow: 0,
          endPageRow: 100
      },
      filters : {
          active: true,
          sites: sites
      },
      sorting : {
        name: 'bank_type', 
        order: 'ASC'
      }
  });

  const { 
    data: record,
    isLoading: recordLoading,
    isSuccess: recordSuccess,
  } = useGetMerchantBankIDQuery({ 
    id: selectedItemID 
  }, { 
    skip: !selectedItemID,
    refetchOnFocus: true,
  });

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: "5px" }}>
        <Col xs={24} sm={4}>
          <FormToDatePicker 
            isLoading={isLoading}
            onChangeFromDate={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'fromDate' }))}
            onChangeToDate={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'toDate' }))}
            defaultToday={true}
          />
          <SelectOption
            onChange={(value) => dispatch(filtersActions({value: [value], type: 'input', event: 'ttype'}))} 
            placeholder={t('common.Transfer Type')}
            options={cashtransferType(t)}
            width={'100%'}
            allowClear
          />
        </Col>
        <Col xs={24} sm={19}>
          <Row gutter={[4, 4]}>
            {merchantbankfetching ? (
              <Spin />
            ) : (
              list?.list?.map((item, index) => (
                <Col key={index} xs={24} sm={4}>
                  <Button 
                    type={selectedItemID === item.id ? 'primary' : 'default'} 
                    onClick={() => {
                      if(selectedItemID === item.id ){
                        dispatch(setCashTransferSelectedData({selectedBankID: '', sites: '', isEdit: false}))
                        dispatch(filtersActions({value: null, type: 'input', event: 'bank'}))
                      } else {
                        dispatch(setCashTransferSelectedData({selectedBankID: item.id, sites: item.sites, isEdit: false}))
                        dispatch(filtersActions({value: item.id, type: 'input', event: 'bank'}))
                      }
                    }}
                    style={{ width: "100%", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', justifyContent: 'left', display: 'block' }}
                    disabled={PermissionsAuth.checkPermissions('button', 'add_cashtransfer', false)}
                  >
                    <MerchantBankAccountOptionField item={item}/>
                  </Button>
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
      {selectedItemID && record && recordSuccess &&
        <Row gutter={[16, 16]} style={{ border: '1px solid #d9d9d9', borderRadius: '2px', padding: '2px', marginBottom: "5px" }}>
          <Col span={1} style={{ borderBottom: '1px solid #d9d9d9', padding: '8px' }}>
            <span style={{ fontWeight: 'bold' }}>{t('bank.Bank')}</span>
          </Col>
          <Col span={5} style={{ borderBottom: '1px solid #d9d9d9', padding: '8px' }}>
            <MerchantBankAccountOptionField item={record}/>
          </Col>
          <Col span={2} style={{ borderBottom: '1px solid #d9d9d9', padding: '8px' }}>
            <span style={{ fontWeight: 'bold' }}>{t('common.Opening')}</span>
          </Col>
          <Col span={4} style={{ borderBottom: '1px solid #d9d9d9', padding: '8px' }}>
            <NumberListingField value={record?.today_opening_balance}/>
          </Col>
          <Col span={2} style={{ borderBottom: '1px solid #d9d9d9', padding: '8px' }}>
            <span style={{ fontWeight: 'bold' }}>{t('common.Total')}</span>
          </Col>
          <Col span={4} style={{ borderBottom: '1px solid #d9d9d9', padding: '8px' }}>
            <NumberListingField value={Number(record?.today_closing_balance) - Number(record?.today_opening_balance)}/>
          </Col>
          <Col span={2} style={{ borderBottom: '1px solid #d9d9d9', padding: '8px' }}>
            <span style={{ fontWeight: 'bold' }}>{t('common.Closing')}</span>
          </Col>
          <Col span={4} style={{ borderBottom: '1px solid #d9d9d9', padding: '8px' }}>
            <NumberListingField value={record?.today_closing_balance}/>
          </Col>
        </Row>
      }
    </div>
  );
}

export default CashTransferToolBar;
