import { Col, Form, Row,  Select, Divider, Tag, Switch } from "antd"
import ImageField from "../../../../customField/ImageField"
import ImageListingField from "../../../../ListingField/ImageListingField"
import { skinConfigReferralRowsChoices } from "../../../../customField/customOption"

export const Referral = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <>
        <Row gutter={[16, 16]}>
                <Divider>
                    <Tag color="blue">{t("skinconfig.Referral Configuration")}</Tag>
                </Divider>
                <Col xs={24} sm={24} md={12}>
                    <Form.Item 
                        name="general_buttons"
                        label={t("skinconfig.Show Referral in home")}
                    >
                        <Switch checkedChildren={t("skinconfig.Show Referral in home")} unCheckedChildren={t("skinconfig.Hide Referral in home")} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                    <Form.Item
                        name="general_buttons_rows"
                        label={t("skinconfig.Referral Layout")}
                        validateStatus={apiErrors?.general_buttons_rows ? 'error' : ''}
                        help={apiErrors?.general_buttons_rows}
                        hasFeedback
                        >
                            <Select 
                                placeholder={t("skinconfig.Please select referral layout")}
                                options={skinConfigReferralRowsChoices(t)}
                            />
                    </Form.Item>
                </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Divider>
                <Tag color="blue">{t("skinconfig.Referral Button Image")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={6}>
                {/* <ImageListingField
                    width={'200px'}
                    height={'30px'}
                    image={initialValues?.general_share}
                /> */}
                <ImageField name="general_share" label={t("skinconfig.Share Button")} apiErrors={apiErrors && apiErrors.general_share} />
            </Col>
            <Col xs={24} sm={24} md={6}>
                {/* <ImageListingField
                    width={'120px'}
                    height={'30px'}
                    image={initialValues?.general_copy_link}
                /> */}
                <ImageField name="general_copy_link" label={t("skinconfig.Copy Button")} apiErrors={apiErrors && apiErrors.general_copy_link} />
            </Col>
            <Col xs={24} sm={24} md={6}>
                {/* <ImageListingField
                    width={'120px'}
                    height={'30px'}
                    image={initialValues?.general_downline}
                /> */}
                <ImageField name="general_downline" label={t("skinconfig.Downline Button")} apiErrors={apiErrors && apiErrors.general_downline} />
            </Col>
            <Col xs={24} sm={24} md={6}>
                {/* <ImageListingField
                    width={'120px'}
                    height={'30px'}
                    image={initialValues?.general_more_info}
                /> */}
                <ImageField name="general_more_info" label={t("skinconfig.More Info Button")} apiErrors={apiErrors && apiErrors.general_more_info} />
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Divider>
                <Tag color="blue">{t("skinconfig.More Info Images")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={6}>
                {/* <ImageListingField
                    width={'80px'}
                    height={'80px'}
                    image={initialValues?.more_info_modal}
                /> */}
                <ImageField 
                    name="more_info_modal" 
                    label={t("skinconfig.More Info Image")} 
                    apiErrors={apiErrors && apiErrors.more_info_modal} 
                />
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Divider>
                <Tag color="blue">{t("skinconfig.Referral Share Images")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={6}>
                {/* <ImageListingField
                    width={'80px'}
                    height={'80px'}
                    image={initialValues.whatsapp}
                /> */}
                <ImageField 
                    name="whatsapp"
                    label={t("skinconfig.WhatsApp")}
                    apiErrors={apiErrors && apiErrors.whatsapp}
                />
            </Col>
            <Col xs={24} sm={24} md={6}>
                {/* <ImageListingField
                    width={'80px'}
                    height={'80px'}
                    image={initialValues.telegram}
                /> */}
                <ImageField 
                    name="telegram"
                    label={t("skinconfig.Telegram")}
                    apiErrors={apiErrors && apiErrors.telegram}
                />
            </Col>
            <Col xs={24} sm={24} md={6}>
                {/* <ImageListingField
                    width={'80px'}
                    height={'80px'}
                    image={initialValues.livechat}
                /> */}
                <ImageField 
                    name="livechat"
                    label={t("skinconfig.Live Chat")}
                    apiErrors={apiErrors && apiErrors.livechat}
                />
            </Col>
            <Col xs={24} sm={24} md={6}>
                {/* <ImageListingField
                    width={'80px'}
                    height={'80px'}
                    image={initialValues.qrcode}
                /> */}
                <ImageField 
                    name="qrcode"
                    label={t("skinconfig.QR Code")}
                    apiErrors={apiErrors && apiErrors.qrcode}
                />
            </Col>
        </Row>
    </>
    )
}

