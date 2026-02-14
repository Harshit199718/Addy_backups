import { TimePicker, Form } from "antd";

const TimeField = ({ name, apiErrors, label="Transaction Time" }) => {

    return (
        <Form.Item
            name={name}
            label={label}
            validateStatus={apiErrors ? 'error' : ''}
            help={apiErrors}
            hasFeedback
        >
            <TimePicker 
            style={{ width: '100%' }}
            />
        </Form.Item>
    )
}

export default TimeField;