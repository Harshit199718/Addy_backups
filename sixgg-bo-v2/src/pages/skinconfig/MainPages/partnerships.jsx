import { Alert, Col, Divider, Form, Input, Row, Switch, Tag } from "antd"
import ImageField from "../../../customField/ImageField"
import ImageListingField from "../../../ListingField/ImageListingField"
import { Link } from "react-router-dom"

export const Partnership = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <>
        <Col xs={24} sm={24} md={24}>
            <Divider>
                <Tag color="blue">{t("skinconfig.Partnership Configuration")}</Tag>
            </Divider>
            <Alert
                message={t("skinconfig.Partnership Listing")}
                description={(
                    <span>
                        {t("skinconfig.Please go to this page for partnership listing configuration.")} 
                        <Link to="/partnerships">{t("skinconfig.Click me")}</Link>
                    </span>
                )}
                type="info"
            />
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24}>
                    <Form.Item 
                        name="enabled_partner_section"
                        label={t("skinconfig.Header Partnership")}
                    >
                        <Switch 
                            checkedChildren={t("skinconfig.Show partnership in header")} 
                            unCheckedChildren={t("skinconfig.Hide partnership in header")} 
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={8}>
                    <Form.Item
                        name="partnership_title"
                        label={t("skinconfig.Partnership Title")}
                        validateStatus={apiErrors?.partnership_title ? 'error' : ''}
                        help={apiErrors?.partnership_title}
                        hasFeedback
                    >
                        <Input placeholder={t("skinconfig.Partnership Title")} style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <ImageField 
                        name="partner_icon"
                        label={t("skinconfig.Partnership Icon on Header")}
                        apiErrors={apiErrors && apiErrors.partner_icon}
                    />
                </Col>
            </Row>

        </Col>
        </>
    )
}

