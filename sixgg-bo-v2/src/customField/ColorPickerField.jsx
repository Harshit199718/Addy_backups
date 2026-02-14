import { ColorPicker, Form } from "antd";

const ColorPickerField = ({ name, label, apiErrors, size="large" }) => {
    
    return(
        <Form.Item
        name={name}
        label={label}
        validateStatus={apiErrors ? 'error' : ''}
        help={apiErrors}
        hasFeedback
        getValueFromEvent={(color) => {
            return "#" + color.toHex();
        }}
        >
            <ColorPicker allowClear size={size} showText />
        </Form.Item>
    )
}

export default ColorPickerField;