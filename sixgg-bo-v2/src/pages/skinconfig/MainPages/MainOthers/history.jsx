import { Col, Form, Row, Select, Switch } from "antd"
import { skinConfigHistoryStyle } from "../../../../customField/customOption"

export const History = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <>
        <Row gutter={[16, 16]}>
            <Form.Item
                name="history_tabs_style"
                label={t("skinconfig.Transaction History Style")}
                validateStatus={apiErrors?.history_tabs_style ? 'error' : ''}
                help={apiErrors?.history_tabs_style}
                hasFeedback
            >
                <Select 
                    placeholder={t("skinconfig.Please select transaction history style")}
                    options={skinConfigHistoryStyle(t)}
                    style={{ width: "200px" }}
                />
            </Form.Item>
        </Row>
        </>
    )
}

