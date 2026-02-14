import { Form, Select } from "antd";
import { useGetMerchantBankListQuery } from "../features/merchantbankaccounts/merchantBankAccountsApiSlices";
import { transactionState } from "./customOption";
import { useTranslation } from "react-i18next";

const SelectTransactionStateField = ({ name, label="State", apiErrors, disable=false }) => {
    const { t } = useTranslation();

    return (
        <Form.Item 
            name={name}
            label={label}
            rules={[
            {
                required: true,
                message: `${t('referencefield.Please select state!')}`,
            },
            ]}
            validateStatus={apiErrors ? 'error' : ''}
            help={apiErrors}
            hasFeedback
        >
            <Select
                showSearch
                allowClear
                style={{
                    width: '100%',
                }}
                placeholder={t('referencefield.Please select state!')}
                filterOption={(input, option) => {
                    return (
                        (option.label.props.children[1].props.children || '').toString().toLowerCase().includes(input.toLowerCase())
                    )
                }}
                options={transactionState(t)}
                disabled={disable}
            />
        </Form.Item>
    )
}

export default SelectTransactionStateField