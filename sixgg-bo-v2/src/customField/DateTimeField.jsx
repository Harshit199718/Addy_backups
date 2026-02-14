import { DatePicker, Form } from "antd";
import { useTranslation } from "react-i18next";

const DateTimeField = ({ name, apiErrors, label="Transaction Time", required=true }) => {
    const { t } = useTranslation();

    return (
        <Form.Item
            name={name}
            label={label}
            validateStatus={apiErrors ? 'error' : ''}
            help={apiErrors}
            rules={[
                {
                    required: required,
                    message: `${t('referencefield.Please select the transaction time')}`,
                },
            ]}
            hasFeedback
        >
            <DatePicker 
                style={{ width: '100%' }}
                showTime 
                disabled
            />
        </Form.Item>
    )
}

export default DateTimeField;