import { DatePicker, Form } from "antd";

const DateField = ({ name, apiErrors, label="Transaction Time", disabled = false }) => {

    return (
        <Form.Item
            name={name}
            label={label}
            validateStatus={apiErrors ? 'error' : ''}
            help={apiErrors}
            hasFeedback
        >
            <DatePicker 
            style={{ width: '100%' }}
            disabled = {disabled}
            />
        </Form.Item>
    )
}

export default DateField;