import { Col, Divider, Form, InputNumber, Row, Tag } from "antd"
import ImageListingField from "../../../../ListingField/ImageListingField"
import ImageField from "../../../../customField/ImageField"

export const Rebate = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={6}>
                <Form.Item
                    name="reward_total_rebates"
                    label={t("skinconfig.Reward Total Boxes Show")}
                    validateStatus={apiErrors?.reward_total_rebates ? 'error' : ''}
                    help={apiErrors?.reward_total_rebates}
                    hasFeedback
                >
                    <InputNumber
                        placeholder={t("skinconfig.Total boxes show in reward")}
                        style={{ width: '100%' }}
                    />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Divider>
                <Tag color="blue">{t("skinconfig.Rewards Images")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={8}>
                <Row gutter={[16, 16]}>
                    {/* <Col xs={24} sm={24} md={6}>
                        <ImageListingField
                            width={'80px'}
                            height={'80px'}
                            image={initialValues?.reward_rebates_bg}
                        />
                    </Col> */}
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                            name="reward_rebates_bg"
                            label={t("skinconfig.Reward Background Image")} 
                            apiErrors={apiErrors && apiErrors.reward_rebates_bg}
                        />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={8}>
                <Row gutter={[16, 16]}>
                    {/* <Col xs={24} sm={24} md={6}>
                        <ImageListingField
                            width={'80px'}
                            height={'80px'}
                            image={initialValues?.reward_open_box}
                        />
                    </Col> */}
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                            name="reward_open_box"
                            label={t("skinconfig.Reward Box Open Image")} 
                            apiErrors={apiErrors && apiErrors.reward_open_box}
                        />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={8}>
                <Row gutter={[16, 16]}>
                    {/* <Col xs={24} sm={24} md={6}>
                        <ImageListingField
                            width={'80px'}
                            height={'80px'}
                            image={initialValues?.reward_close_box}
                        />
                    </Col> */}
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                            name="reward_close_box"
                            label={t("skinconfig.Reward Box Close Image")} 
                            apiErrors={apiErrors && apiErrors.reward_close_box}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
        </>
    )
}

