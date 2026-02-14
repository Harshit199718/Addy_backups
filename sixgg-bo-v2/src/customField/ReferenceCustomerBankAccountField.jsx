import { Form, Select } from "antd";
import { useGetCustomerBankAccountsListQuery } from "../features/customerbankaccounts/customerBankAccountsApiSlice";
import { useTranslation } from "react-i18next";

const ReferenceCustomerBankAccountField = ({ name, label="Merchant Bank Acc", apiErrors, onChange = () => {}, filterProp={}, ...props }) => {
    const { t } = useTranslation();
    const { 
        data: list,
        isLoading: loading, 
    } = useGetCustomerBankAccountsListQuery({
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
                required: true,
                message: t('referencefield.Please select bank!'),
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
                placeholder={t("referencefield.Please select Customer Bank")}
                filterOption={(input, option) => {
                    try {
                        return (
                            (option.label.props.children[1].props.children || '').toString().toLowerCase().includes(input.toLowerCase())
                        )
                    } catch (error) {
                        return false
                    }
                }}
                options={list && list.list.map(item => ({
                    value: item.id,
                    label: 
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={item.icon} alt="bank icon" width="20" height="20" style={{ marginRight: 10 }} />
                        <span>{item.name} ({item.number})</span>
                    </div>
                }))}
                onChange={(value) => onChange(value)}
            />
        </Form.Item>
    )
}

export default ReferenceCustomerBankAccountField