import { Form, Select } from "antd";
import { useGetMerchantBankListQuery } from "../features/merchantbankaccounts/merchantBankAccountsApiSlices";
import MerchantBankAccountOptionField from "../ListingField/MerchantBankAccountOptionField";
import { useTranslation } from "react-i18next";

const ReferenceMerchantBankAccountField = ({ name, label="Merchant Bank Acc", apiErrors, disabled=false, required=true, placeholder="Please select Merchant Bank", onChange = () => {}, filterProp={}, ...props }) => {
    const { t } = useTranslation();
    const { 
        data: list,
        isLoading: loading, 
    } = useGetMerchantBankListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 100
        },
        filters : {
            active: true,
            ...filterProp
        }
    });

    return (
        <Form.Item 
            name={name}
            label={label}
            rules={[
            {
                required: required,
                message: `${t('referencefield.Please select bank!')}`,
            },
            ]}
            validateStatus={apiErrors ? 'error' : ''}
            help={apiErrors}
            hasFeedback
            {...props}
        >
            <Select
                loading={loading}
                showSearch
                allowClear
                style={{
                    width: '100%',
                }}
                placeholder={placeholder}
                filterOption={(input, option) => {
                    try {
                        return (
                            JSON.stringify(option?.label?.props?.item ||  '')?.toLowerCase()?.includes(input?.toLowerCase())
                        )
                    } catch (error) {
                        return false
                    }
                }}
                options={list && list.list.map(item => ({
                    value: item.id,
                    label: 
                    <MerchantBankAccountOptionField item={item}/>
                }))}
                onChange={(value) => onChange(value)}
                disabled={disabled}
            />
        </Form.Item>
    )
}

export default ReferenceMerchantBankAccountField