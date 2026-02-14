import { Col, Form, Row, Select, Switch } from "antd"
import ImageListingField from "../../../ListingField/ImageListingField"
import ImageField from "../../../customField/ImageField"
import { skinConfigPromoType } from "../../../customField/customOption"

export const Promotion = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <Row gutter={[16, 16]}>
            {import.meta.env.VITE_MODULES_EXCLUDED_JQK &&
            <Col xs={24} sm={24} md={12}>
                <Form.Item 
                    name="promo_rewards"
                    label={t("skinconfig.Promotion Card in Home")}
                >
                    <Switch checkedChildren={t("skinconfig.Enable Promotion Card in Home")} unCheckedChildren={t("skinconfig.Disable Promotion Card in Home")} />
                </Form.Item>
            </Col>
            }
            {import.meta.env.VITE_MODULES_EXCLUDED_JQK &&
            <Col xs={24} sm={24} md={12}>
                <Form.Item
                    name="promo_style"
                    label={t("skinconfig.Promotion Style")}
                    validateStatus={apiErrors?.promo_style ? 'error' : ''}
                    help={apiErrors?.promo_style}
                    hasFeedback
                >
                    <Select 
                        placeholder={t("skinconfig.Please select promotion type")}
                        options={skinConfigPromoType(t)}
                    />
                </Form.Item>
            </Col>}
            <Col xs={24} sm={24} md={6}>
                <Row gutter={[16, 16]}>
                    {/* <Col xs={24} sm={24} md={6}>
                        <ImageListingField
                            width={'80px'}
                            height={'80px'}
                            image={initialValues?.promo_moredetails}
                        />
                    </Col> */}
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                            name="promo_moredetails"
                            label={t("skinconfig.Promotion More Detail" )}
                            apiErrors={apiErrors && apiErrors.promo_moredetails}
                        />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Row gutter={[16, 16]}>
                    {/* <Col xs={24} sm={24} md={6}>
                        <ImageListingField
                            width={'80px'}
                            height={'80px'}
                            image={initialValues?.promo_joinnow}
                        />
                    </Col> */}
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                            name="promo_joinnow"
                            label={t("skinconfig.Promotion Join Now" )}
                            apiErrors={apiErrors && apiErrors.promo_joinnow}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

