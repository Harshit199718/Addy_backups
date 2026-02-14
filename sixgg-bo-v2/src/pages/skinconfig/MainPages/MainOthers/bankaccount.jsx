import { Col, Form, Row, Select, Switch } from "antd"
import { skinConfigBankAccountStyle } from "../../../../customField/customOption"

export const BankAccount = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <>
        <Row gutter={[16, 16]}>
            <Form.Item
                name="bank_accounts_style"
                label={t("skinconfig.Bank Account Style")}
                validateStatus={apiErrors?.bank_accounts_style ? 'error' : ''}
                help={apiErrors?.bank_accounts_style}
                hasFeedback
            >
                <Select 
                    placeholder={t("skinconfig.Please select bank account style")}
                    options={skinConfigBankAccountStyle(t)}
                />
            </Form.Item>
        </Row>
        </>
    )
}

