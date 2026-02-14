import { Alert, Col, Divider, Form, Row, Select, Switch, Tag } from "antd"
import ImageField from "../../../customField/ImageField"
import ImageListingField from "../../../ListingField/ImageListingField"
import { Link } from "react-router-dom"
import { mainSocials } from "../../socials/mainSocials"
import { skinConfigSublineType } from "../../../customField/customOption"

export const Subline = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <>
        <Col xs={24} sm={24} md={24}>
            <Divider>
                <Tag color="blue">{t("skinconfig.Subline Configuration")}</Tag>
            </Divider>
            <Alert
                message={t("skinconfig.Subline Listing")}
                description={(
                    <span>
                        {t("skinconfig.Please go to this page for subline listing configuration.")} <Link to={mainSocials.url}>{t("skinconfig.Click me")}</Link>
                    </span>
                )}
                type="info"
                style={{ marginBottom: 16 }}
            />
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={5}>
                    <Form.Item 
                        name="sub_line"
                        label={t("skinconfig.Header Subline")}
                    >
                        <Switch 
                            checkedChildren={t("skinconfig.Show subline in header")} 
                            unCheckedChildren={t("skinconfig.Hide subline in header")} 
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={5}>
                    <Form.Item 
                        name="sub_line_fix"
                        label={t("skinconfig.Subline fix on left bottom in home")}
                    >
                        <Switch 
                            checkedChildren={t("skinconfig.Show subline on left bottom in home")} 
                            unCheckedChildren={t("skinconfig.Hide subline on left bottom in home")} 
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <Form.Item
                        name="subline_style"
                        label={t("skinconfig.Subline Page Style")}
                        validateStatus={apiErrors?.subline_style ? 'error' : ''}
                        help={apiErrors?.subline_style}
                        hasFeedback
                        >
                            <Select 
                                placeholder={t("skinconfig.Please select deposit page style")}
                                options={skinConfigSublineType(t)}
                            />
                    </Form.Item>
                </Col>
                {/* <Col xs={24} sm={24} md={2}>
                    <ImageListingField
                        width={'80px'}
                        height={'80px'}
                        image={initialValues.subline_icon}
                    />
                </Col> */}
                <Col xs={24} sm={24} md={6}>
                    <ImageField 
                        name="subline_icon"
                        label={t("skinconfig.Subline Icon on Header")}
                        apiErrors={apiErrors && apiErrors.subline_icon}
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                
            </Row>
        </Col>
        </>
    )
}

