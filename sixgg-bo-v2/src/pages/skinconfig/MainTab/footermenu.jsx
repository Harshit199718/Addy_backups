import { Col, Form, Row, Select, Divider, Tag, Input, Switch } from "antd"
import ImageField from "../../../customField/ImageField"
import ImageListingField from "../../../ListingField/ImageListingField"
import { skinConfigFooterMenuRouteChoices } from "../../../customField/customOption"

const menuPrefixes = ['menu_home', 'menu_promo', 'menu_deposit', 'menu_history', 'menu_contact_us'];

export const FooterMenu = ({ apiErrors, initialValues, watchValue, t }) => {

    return (
        <Row gutter={[16, 16]}>
            <Row gutter={[16, 16]}>
                <Divider>
                    <Tag color="blue">{t("skinconfig.Footer Menu Configuration")}</Tag>
                </Divider>
                {menuPrefixes.map((menuPrefix, i) => (
                    <Col xs={24} sm={24} md={24} key={i}                     
                        style={{ 
                            border: "1px solid #ccc", 
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                            borderRadius: "8px", 
                        }}  
                    >
                        <Row gutter={[16, 16]}>
                            {/* <Col xs={24} sm={24} md={3}>
                                <ImageListingField
                                    width={'80px'}
                                    height={'80px'}
                                    image={initialValues[menuPrefix]}
                                />
                            </Col> */}
                            <Col xs={24} sm={24} md={8}>
                                <ImageField 
                                    name={menuPrefix} 
                                    label={`${t("skinconfig.Menu")} ${i + 1} ${t("skinconfig.Image")}`} 
                                    apiErrors={apiErrors && apiErrors[menuPrefix]}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={8}>
                                <Form.Item
                                    name={`${menuPrefix}_route`}
                                    label={`${t("skinconfig.Menu")} ${i + 1} ${t("skinconfig.Route")}`}
                                    validateStatus={apiErrors[`${menuPrefix}_route`] ? 'error' : ''}
                                    help={apiErrors[`${menuPrefix}_route`]}
                                    hasFeedback
                                >
                                    <Select 
                                        allowClear
                                        placeholder={`${t("skinconfig.Menu")} ${i + 1} ${t("skinconfig.Route")}`}
                                        options={skinConfigFooterMenuRouteChoices(t)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8}>
                                <Form.Item 
                                    name={`${menuPrefix}_default`}
                                    label={`${t("skinconfig.Menu")} ${i + 1} ${t("skinconfig.Default")}`}
                                >
                                    <Switch checkedChildren={`${t("skinconfig.Default Menu")} ${i + 1}`}  unCheckedChildren={`${t("skinconfig.Not Default Menu")} ${i + 1}`} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            {/* <Col xs={24} sm={24} md={3}>
                                <ImageListingField
                                    width={'80px'}
                                    height={'80px'}
                                    image={initialValues[`${menuPrefix}_text`]}
                                />
                            </Col> */}
                            <Col xs={24} sm={24} md={8}>
                                <ImageField 
                                    name={`${menuPrefix}_text`} 
                                    label={`${t("skinconfig.Menu")} ${i + 1} ${t("skinconfig.Text Image")}`} 
                                    apiErrors={apiErrors && apiErrors[`${menuPrefix}_text`]}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={8}>
                                <Form.Item
                                    name={`${menuPrefix}_text_type`}
                                    label={`${t("skinconfig.Menu")} ${i + 1} ${t("skinconfig.Text / Image")}`} 
                                    validateStatus={apiErrors[`${menuPrefix}_text_type`] ? 'error' : ''}
                                    help={apiErrors[`${menuPrefix}_text_type`]}
                                    hasFeedback
                                    >
                                        <Select 
                                            allowClear
                                            placeholder={`${t("skinconfig.Select Menu")} ${i + 1} ${t("skinconfig.Text / Image")}`}
                                            options={[
                                                { value: `${menuPrefix}_text`, label: "Image" },
                                                { value: `${menuPrefix}_text_color`, label: "Text" },
                                            ]}
                                        />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8}>
                                <Form.Item
                                    name={`${menuPrefix}_text_color`}
                                    label={`${t("skinconfig.Menu")} ${i + 1} ${t("skinconfig.Text")}`} 
                                    validateStatus={apiErrors[`${menuPrefix}_text_color`] ? 'error' : ''}
                                    help={apiErrors[`${menuPrefix}_text_color`]}
                                    hasFeedback
                                >
                                    <Input placeholder={`${t("skinconfig.Menu")} ${i + 1} ${t("skinconfig.Text")}`} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                ))}
            </Row>
        </Row>
    )
}

