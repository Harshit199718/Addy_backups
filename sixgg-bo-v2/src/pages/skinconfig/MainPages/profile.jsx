import { Col, Form, Row, Select, Divider, Tag, InputNumber, Switch, Input } from "antd"
import ImageField from "../../../customField/ImageField"
import ImageListingField from "../../../ListingField/ImageListingField"
import { skinConfigProfileStyle, skinConfigProfileTabRouteType } from "../../../customField/customOption"

export const Profile = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <>
        <Row gutter={[16, 16]}>
            <Divider>
                <Tag color="blue">{t("skinconfig.Profile Style")}</Tag>
            </Divider>
            {import.meta.env.VITE_MODULES_EXCLUDED_JQK &&
            <Col xs={24} sm={24} md={6}>
                <Form.Item
                    name="profile_style"
                    label={t("skinconfig.Profile Style")}
                    validateStatus={apiErrors?.profile_style ? 'error' : ''}
                    help={apiErrors?.profile_style}
                    hasFeedback
                >
                    <Select 
                        placeholder={t("skinconfig.Please select profile style")}
                        options={skinConfigProfileStyle(t)}
                    />
                </Form.Item>
            </Col>}
            <Col xs={24} sm={24} md={5}>
                <Form.Item 
                    name="show_bonus_winover_in_profile"
                    label={t("skinconfig.Bonus Winover in profile")}
                >
                    <Switch 
                        checkedChildren={t("skinconfig.Show bonus winover in profile")} 
                        unCheckedChildren={t("skinconfig.Hide bonus winover in profile")} 
                    />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Divider>
                <Tag color="blue">{t("skinconfig.Profile Route Configuration")}</Tag>
            </Divider>
            {Array.from({ length: 10 }).map((v, i) => (
                <Col xs={24} sm={24} md={8} key={i} 
                    style={{ 
                        border: "1px solid #ccc", 
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                        borderRadius: "8px", 
                    }} 
                    >
                    <Row gutter={[16, 16]}>
                        {/* <Col xs={24} sm={24} md={6}>
                            <ImageListingField
                                width={'80px'}
                                height={'80px'}
                                image={initialValues[`profile_tab_icon_${i + 1}`]}
                            />
                        </Col> */}
                        <Col xs={24} sm={24} md={18}>
                            <ImageField 
                                name={`profile_tab_icon_${i + 1}`} 
                                label={`${t("skinconfig.Profile Tab")} ${i + 1} ${t("skinconfig.Icon")}`} 
                                apiErrors={apiErrors && apiErrors[`profile_tab_icon_${i + 1}`]}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={12}>
                            <Form.Item
                                name={`profile_tab_route_${i + 1}`}
                                label={`${t("skinconfig.Profile Tab")} ${i + 1} ${t("skinconfig.Route")}`} 
                                validateStatus={apiErrors[`profile_tab_route_${i + 1}`] ? 'error' : ''}
                                help={apiErrors[`profile_tab_route_${i + 1}`]}
                                hasFeedback
                            >
                                <Select 
                                    allowClear
                                    placeholder={`${t("skinconfig.Label of profile tab")} ${i + 1}`}
                                    options={skinConfigProfileTabRouteType(t)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12}>
                            <Form.Item
                                name={`profile_tab_text_${i + 1}`}
                                label={`${t("skinconfig.Profile Tab")} ${i + 1} ${t("skinconfig.Label")}`} 
                                validateStatus={apiErrors[`profile_tab_text_${i + 1}`] ? 'error' : ''}
                                help={apiErrors[`profile_tab_text_${i + 1}`]}
                                hasFeedback
                            >
                                <Input placeholder={`${t("skinconfig.Label of profile tab")} ${i + 1}`}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            ))}
        </Row>
        </>
    )
}

