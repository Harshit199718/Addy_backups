import { Form, Select } from "antd";
import { useGetBanksListQuery } from "../features/bank/banksApiSlices";
import { useTranslation } from "react-i18next";

const ReferenceBankField = ({ name, apiErrors, label="Bank Name", isRequired=true }) => {
    const { t } = useTranslation();
    const { 
        data: bankList,
        isLoading: bankLoading, 
    } = useGetBanksListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 100
        },
        filters : {
            active: true
        }
    });

    return (
        <Form.Item 
            name={name}
            label={label}
            rules={[
            {
                required: isRequired,
                message: `${t('referencefield.Please select bank!')}`,
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
                placeholder={t('referencefield.Please select bank!')}
                filterOption={(input, option) => {
                    return (
                        (option.label.props.children[1].props.children || '').toString().toLowerCase().includes(input.toLowerCase())
                    )
                }}
                options={bankList && bankList.list.map(bank => ({
                    value: bank.id,
                    label: 
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={bank.icon} alt="bank icon" width="20" height="20" style={{ marginRight: 10 }} />
                        <span>{bank.code} - {bank.name}</span>
                    </div>
                }))}
            />
        </Form.Item>
    )
}

export default ReferenceBankField