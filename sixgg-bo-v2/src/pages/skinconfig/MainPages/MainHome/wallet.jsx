import { Col, Form, Row, Select, Divider, Tag } from "antd"
import ImageField from "../../../../customField/ImageField"
import { skinConfigContainerBGType, skinConfigMemberAuthStyle, skinConfigWelcomeBGType } from "../../../../customField/customOption"
import ImageListingField from "../../../../ListingField/ImageListingField"
import ColorPickerField from "../../../../customField/ColorPickerField"

export const Wallet = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <>
        {import.meta.env.VITE_MODULES_EXCLUDED_JQK &&
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24}>
                <Divider>
                    <Tag color="blue">{t("skinconfig.Member Auth Style")}</Tag>
                </Divider>
                <Form.Item
                    name="member_auth_style"
                    label={t("skinconfig.Member Auth Style")}
                    validateStatus={apiErrors?.member_auth_style ? 'error' : ''}
                    help={apiErrors?.member_auth_style}
                    hasFeedback
                    >
                        <Select 
                            placeholder={t("skinconfig.Please select member auth style")}
                            options={skinConfigMemberAuthStyle(t)}
                        />
                </Form.Item>
            </Col>
        </Row>}
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12}>
                <Row gutter={[16, 16]}>
                    <Divider>
                        <Tag color="blue">{t("skinconfig.Member Auth Before Sign In")}</Tag>
                    </Divider>
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item
                            name="wallet_welcome_bg_type"
                            label={t("skinconfig.Welcome Background Type")}
                            validateStatus={apiErrors?.wallet_welcome_bg_type ? 'error' : ''}
                            help={apiErrors?.wallet_welcome_bg_type}
                            hasFeedback
                            >
                                <Select 
                                    allowClear
                                    placeholder={t("skinconfig.Please select welcome background type")}
                                    options={skinConfigWelcomeBGType(t)}
                                />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                        <ColorPickerField  
                            name="wallet_welcome_bg_color"
                            label={t("skinconfig.Welcome Background Color")}
                            apiErrors={apiErrors?.wallet_welcome_bg_color }
                            size="medium"
                        />
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                        <Row gutter={[16, 16]}>
                            {/* <Col xs={24} sm={24} md={6}>
                                <ImageListingField
                                    width={'80px'}
                                    height={'80px'}
                                    image={initialValues?.wallet_welcome_bg}
                                />
                            </Col> */}
                            <Col xs={24} sm={24} md={12}>
                                <ImageField name="wallet_welcome_bg" label={t("skinconfig.Welcome Background")} apiErrors={apiErrors && apiErrors.wallet_welcome_bg} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={12}>
                <Row gutter={[16, 16]}>
                    <Divider>
                        <Tag color="blue">{t("skinconfig.Member Auth After Sign In")}</Tag>
                    </Divider>
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item
                            name="wallet_container_bg_type"
                            label={t("skinconfig.Container Background Type")}
                            validateStatus={apiErrors?.wallet_container_bg_type ? 'error' : ''}
                            help={apiErrors?.wallet_container_bg_type}
                            hasFeedback
                            >
                                <Select 
                                    placeholder={t("skinconfig.Please select container background type")}
                                    options={skinConfigContainerBGType(t)}
                                />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                        <ColorPickerField  
                        name="wallet_container_bg_color"
                        label={t("skinconfig.Container Background Color")}
                        apiErrors={apiErrors?.wallet_container_bg_color }
                        size="medium"
                        />
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                        <Row gutter={[16, 16]}>
                            {/* <Col xs={24} sm={24} md={6}>
                                <ImageListingField
                                    width={'80px'}
                                    height={'80px'}
                                    image={initialValues?.wallet_container_bg}
                                />
                            </Col> */}
                            <Col xs={24} sm={24} md={12}>
                                <ImageField name="wallet_container_bg" label={t("skinconfig.Container Background Image")} apiErrors={apiErrors && apiErrors.wallet_container_bg} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
                <Divider>
                    <Tag color="blue">{t("skinconfig.Wallet Button Image")}</Tag>
                </Divider>
                <Col xs={24} sm={24} md={6}>
                    {/* <ImageListingField
                        width={'80px'}
                        height={'30px'}
                        image={initialValues?.wallet_deposit}
                    /> */}
                    <ImageField name="wallet_deposit" label={t("skinconfig.Deposit Button Image")} apiErrors={apiErrors && apiErrors.wallet_deposit} />
                </Col>
                <Col xs={24} sm={24} md={6}>
                    {/* <ImageListingField
                        width={'80px'}
                        height={'30px'}
                        image={initialValues?.wallet_withdraw}
                    /> */}
                    <ImageField name="wallet_withdraw" label={t("skinconfig.Withdrawal Button Image")} apiErrors={apiErrors && apiErrors.wallet_withdraw} />
                </Col>
                <Col xs={24} sm={24} md={6}>
                    {/* <ImageListingField
                        width={'80px'}
                        height={'30px'}
                        image={initialValues?.wallet_profile}
                    /> */}
                    <ImageField name="wallet_profile" label={t("skinconfig.Profile Button Image")} apiErrors={apiErrors && apiErrors.wallet_profile} />
                </Col>
                <Col xs={24} sm={24} md={6}>
                    {/* <ImageListingField
                        width={'80px'}
                        height={'30px'}
                        image={initialValues?.wallet_refresh}
                    /> */}
                    <ImageField name="wallet_refresh" label={t("skinconfig.Refresh Button Image")} apiErrors={apiErrors && apiErrors.wallet_refresh} />
                </Col>
                <Col xs={24} sm={24} md={6}>
                    {/* <ImageListingField
                        width={'80px'}
                        height={'30px'}
                        image={initialValues?.home_login_btn}
                    /> */}
                    <ImageField name="home_login_btn" label={t("skinconfig.Login Button Image")} apiErrors={apiErrors && apiErrors.home_login_btn} />
                </Col>
                <Col xs={24} sm={24} md={6}>
                    {/* <ImageListingField
                        width={'80px'}
                        height={'30px'}
                        image={initialValues?.home_register_btn}
                    /> */}
                    <ImageField name="home_register_btn" label={t("skinconfig.Register Button Image")} apiErrors={apiErrors && apiErrors.home_register_btn} />
                </Col>
        </Row>
    </>
    )
}

