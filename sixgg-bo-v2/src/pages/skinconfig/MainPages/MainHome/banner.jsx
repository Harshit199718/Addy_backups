import { Col, ColorPicker, Form, Row, Image, Select, Divider, Tag, Input } from "antd"
import ImageField from "../../../../customField/ImageField"
import ImageListingField from "../../../../ListingField/ImageListingField"
import { skinConfigBannerStyle } from "../../../../customField/customOption"

export const Banner = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <>
        <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={24}>
                <Row gutter={[24, 24]}>
                <Divider>
                    <Tag color="blue">{t("skinconfig.Banner Style")}</Tag>
                </Divider>
                <Form.Item
                    name="banner_style"
                    label={t("skinconfig.Banner Style")}
                    validateStatus={apiErrors?.banner_style ? 'error' : ''}
                    help={apiErrors?.banner_style}
                    hasFeedback
                    >
                        <Select 
                            placeholder={t("skinconfig.Please select banner style")}
                            options={skinConfigBannerStyle(t)}
                        />
                </Form.Item>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={12}
                style={{ 
                    border: "1px solid #ccc", 
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px", 
                }} 
            >
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={24} md={24}>
                        <ImageField name="payment_banner" label={t("skinconfig.Payment Banner")} apiErrors={apiErrors && apiErrors.payment_banner} />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={12}
                style={{ 
                    border: "1px solid #ccc", 
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px", 
                }} 
            >
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={24} md={24}>
                        <ImageField name="banner" label={t("skinconfig.First Banner")} apiErrors={apiErrors && apiErrors.banner} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={12}
                style={{ 
                    border: "1px solid #ccc", 
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px", 
                }} 
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item
                            name="banner2_url "
                            label={t("skinconfig.Second Banner URL")}
                            validateStatus={apiErrors?.banner2_url    ? 'error' : ''}
                            help={apiErrors?.banner2_url  }
                            hasFeedback
                        >
                            <Input placeholder={t("skinconfig.Second Banner URL")} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                        <ImageField name="banner2" label={t("skinconfig.Second Banner")} apiErrors={apiErrors && apiErrors.banner2} />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={12}
                style={{ 
                    border: "1px solid #ccc", 
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px", 
                }} 
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item
                            name="banner3_url"
                            label={t("skinconfig.Third Banner URL")}
                            validateStatus={apiErrors?.banner3_url   ? 'error' : ''}
                            help={apiErrors?.banner3_url }
                            hasFeedback
                        >
                            <Input placeholder={t("skinconfig.Third Banner URL")} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                        <ImageField name="banner3" label={t("skinconfig.Third Banner")} apiErrors={apiErrors && apiErrors.banner3} />                        
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={12}
                style={{ 
                    border: "1px solid #ccc", 
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px", 
                }} 
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item
                            name="banner4_url"
                            label={t("skinconfig.Fourth Banner URL")}
                            validateStatus={apiErrors?.banner4_url  ? 'error' : ''}
                            help={apiErrors?.banner4_url }
                            hasFeedback
                        >
                            <Input placeholder={t("skinconfig.Fourth Banner URL")} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                        <ImageField name="banner4" label={t("skinconfig.Fourth Banner")} apiErrors={apiErrors && apiErrors.banner4} />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={12}
                style={{ 
                    border: "1px solid #ccc", 
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px", 
                }} 
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item
                            name="floating_icon_url"
                            label={t("skinconfig.Floating Icon URL")}
                            validateStatus={apiErrors?.floating_icon_url ? 'error' : ''}
                            help={apiErrors?.floating_icon_url}
                            hasFeedback
                        >
                            <Input placeholder={t("skinconfig.Floating Icon URL")} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                        <ImageField name="floating_icon" label={t("skinconfig.Floating Icon")} apiErrors={apiErrors && apiErrors.floating_icon} />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={12}
                style={{ 
                    border: "1px solid #ccc", 
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px", 
                }} 
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item
                            name="sticky_button1_url"
                            label={t("skinconfig.First Sticky Button URL")}
                            validateStatus={apiErrors?.sticky_button1_url ? 'error' : ''}
                            help={apiErrors?.sticky_button1_url}
                            hasFeedback
                        >
                            <Input placeholder={t("skinconfig.First Sticky Button URL")} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                        <ImageField name="sticky_button1" label={t("skinconfig.First Sticky Button")} apiErrors={apiErrors && apiErrors.sticky_button1} />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={12}
                style={{ 
                    border: "1px solid #ccc", 
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px", 
                }} 
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item
                            name="sticky_button2_url"
                            label={t("skinconfig.Second Sticky Button URL")}
                            validateStatus={apiErrors?.sticky_button2_url ? 'error' : ''}
                            help={apiErrors?.sticky_button2_url}
                            hasFeedback
                        >
                            <Input placeholder={t("skinconfig.Second Sticky Button URL")} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                        <ImageField name="sticky_button2" label={t("skinconfig.Second Sticky Button")} apiErrors={apiErrors && apiErrors.sticky_button2} />
                    </Col>
                </Row>
            </Col>
        </Row>
    </>
    )
}

