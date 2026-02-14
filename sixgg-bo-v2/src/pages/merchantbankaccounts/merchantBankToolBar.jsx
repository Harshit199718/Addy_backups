import { Row, Col } from 'antd';
import CreateMerchantBankAccount from './CreateMerchantBankAccounts';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../features/filtersSlice';
import { activeInactive } from '../../customField/customOption';
import SelectOption from '../../customToolbar/SelectOption';
import SearchBar from '../../customToolbar/SearchBar';
import PermissionsAuth from '../../components/permissionAuth';

const MerchantBankAccountsToolBar = ({ isLoading, t }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Row gutter={[24, 24]} justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
        <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <SearchBar
            onChange={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'q' }))}
            loading={isLoading} 
            placeholder={t("common.Search")}
            width={"100%"}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <SelectOption
            onChange={(value) => dispatch(filtersActions({value: value, type: 'select', event: 'active'}))}            
            placeholder={t('common.Active / Inactive')}
            options={activeInactive(t)}
            width={"100%"}
          />
        </Col>
        {PermissionsAuth.checkPermissions('button', 'add_merchantbankaccount',
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8} align="right" > 
          <CreateMerchantBankAccount t={t} />
        </Col>
        )}
      </Row>
    </div>
  );
}

export default MerchantBankAccountsToolBar;
