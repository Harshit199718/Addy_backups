import { Spin } from 'antd';
import { useGetCustomerBankAccountsListQuery } from "../features/customerbankaccounts/customerBankAccountsApiSlice";

const ReferenceCustomerBankListingField = ({ id }) => {
    const { 
        data: custBanklist,
        isLoading: custBankloading, 
    } = useGetCustomerBankAccountsListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 500
        },
        filters : {
        }
    });

    if (custBankloading) {
        return <Spin />;
    }

    const custBank = custBanklist?.list;
    const filteredCustomerBank = custBank?.filter(custBank => custBank.id === id);

    return (
        <div>
            {filteredCustomerBank.length > 0 ?
                <div key={filteredCustomerBank[0].id} style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={filteredCustomerBank[0].icon} alt="bank icon" width="30" height="30" style={{ marginRight: 10 }} />
                    <span>{`${filteredCustomerBank[0].name} (${filteredCustomerBank[0].number})`}</span>
                </div>
                :
                '-'
            }
        </div>
    );
}

export default ReferenceCustomerBankListingField