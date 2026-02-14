import { Spin } from 'antd';
import { useGetMerchantBankListQuery } from '../features/merchantbankaccounts/merchantBankAccountsApiSlices';

const ReferenceMerchantBankListingField = ({ id }) => {
    const { 
        data: merchantBankData,
        isLoading: loading, 
    } = useGetMerchantBankListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 100
        },
        filters: {
            // Add filters if needed
        }
    });

    if (loading) {
        return <Spin />;
    }

    const merchantBank = merchantBankData?.list;
    const filteredMerchantBank = merchantBank?.filter(merchantBank => merchantBank.id === id);

    return (
        <div>
            {filteredMerchantBank.length > 0 ?
                <div key={filteredMerchantBank[0].id} style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={filteredMerchantBank[0].icon} alt="bank icon" width="30" height="30" style={{ marginRight: 10 }} />
                    <span>{`${filteredMerchantBank[0].name} (${filteredMerchantBank[0].number}) - ${filteredMerchantBank[0].sites_name}`}</span>
                </div>
                :
                '-'
            }
        </div>
    );
}

export default ReferenceMerchantBankListingField;
