import { Col, Form, Input, Row, Switch } from "antd"
import ImageField from "../../../../customField/ImageField"

export const Notification = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={6}>
                <Form.Item 
                    name="show_notification_accept"
                    label={t("skinconfig.Show Notification")}
                >
                    <Switch 
                        checkedChildren={t("skinconfig.Show Notification")} 
                        unCheckedChildren={t("skinconfig.Show Notification")} 
                    />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Form.Item
                    name="notification_accept_title"
                    label={t("skinconfig.Notification Title")}
                    validateStatus={apiErrors?.notification_accept_title ? 'error' : ''}
                    help={apiErrors?.notification_accept_title}
                    hasFeedback
                >
                    <Input placeholder={t("skinconfig.Notification Title")} style={{ width: "100%" }} />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Form.Item
                    name="notification_accept_description"
                    label={t("skinconfig.Notification Description")}
                    validateStatus={apiErrors?.notification_accept_description ? 'error' : ''}
                    help={apiErrors?.notification_accept_description}
                    hasFeedback
                >
                    <Input placeholder={t("skinconfig.Notification Description")} style={{ width: "100%" }} />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Form.Item
                    name="notification_accept_button_text"
                    label={t("skinconfig.Notification Button Text")}
                    validateStatus={apiErrors?.notification_accept_button_text ? 'error' : ''}
                    help={apiErrors?.notification_accept_button_text}
                    hasFeedback
                >
                    <Input placeholder={t("skinconfig.Notification Button Text")} style={{ width: "100%" }} />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <ImageField 
                    name="notification_accept_images"
                    label={t("skinconfig.Notification Images")}
                    apiErrors={apiErrors && apiErrors.notification_accept_images}
                />
            </Col>
        </Row>
        </>
    )
}

