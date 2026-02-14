import { Col, Form, Row, Switch } from "antd"
import CustomRichTextField from "../../../../customField/CustomRichTextField"

export const Footer = ({ apiErrors, initialValues, watchValue, t }) => {
    const [footer_content] = ['footer_content'].map(field => Form.useWatch(field, watchValue));

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24}>
                <Form.Item 
                    name="footer_content_enabled"
                    label={t("skinconfig.Enable Footer")}
                >
                    <Switch checkedChildren={t("skinconfig.Enable Footer in Home")} unCheckedChildren={t("skinconfig.Disable Footer in Home")} />
                </Form.Item>
            </Col>
            <CustomRichTextField name="footer_content" label={t('skinconfig.Footer Content')} apiErrors={apiErrors && apiErrors.footer_content} value={footer_content}/>
        </Row>
    )
}

