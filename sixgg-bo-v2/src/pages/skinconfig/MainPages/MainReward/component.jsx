import { Col, Divider, Form, Row, Select, Tag } from "antd"
import { skinConfigRewardChoices } from "../../../../customField/customOption"
import SelectOption from "../../../../customToolbar/SelectOption"
import ImageListingField from "../../../../ListingField/ImageListingField"
import ImageField from "../../../../customField/ImageField"

export const Component = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24}>
                <Form.Item
                    name="available_rewards"
                    label={t("skinconfig.Reward Components")}
                    validateStatus={apiErrors?.available_rewards ? 'error' : ''}
                    help={apiErrors?.available_rewards}
                    hasFeedback
                >
                    <SelectOption 
                        placeholder={t("skinconfig.Please select components that show in home page")}
                        options={skinConfigRewardChoices(t)}
                        mode="multiple"
                        width={450}
                    />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Row gutter={[16, 16]}>
                <Divider>
                    <Tag color="blue">{t("skinconfig.Components Icon")}</Tag>
                </Divider>
                <Col xs={24} sm={24} md={8}>
                    <Row gutter={[16, 16]}>
                        {/* <Col xs={24} sm={24} md={6}>
                            <ImageListingField
                                width={'80px'}
                                height={'80px'}
                                image={initialValues?.level_reward}
                            />
                        </Col> */}
                        <Col xs={24} sm={24} md={18}>
                            <ImageField 
                                name="level_reward"
                                label={t("skinconfig.Ranking Icon")} 
                                apiErrors={apiErrors && apiErrors.level_reward}
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
                                image={initialValues?.checkin_reward}
                            />
                        </Col> */}
                        <Col xs={24} sm={24} md={18}>
                            <ImageField 
                                name="checkin_reward"
                                label={t("skinconfig.Check In Icon")} 
                                apiErrors={apiErrors && apiErrors.checkin_reward}
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
                                image={initialValues?.spin_reward}
                            />
                        </Col> */}
                        <Col xs={24} sm={24} md={18}>
                            <ImageField 
                                name="spin_reward"
                                label={t("skinconfig.Lucky Wheel Icon")} 
                                apiErrors={apiErrors && apiErrors.spin_reward}
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
                                image={initialValues?.redeem_reward}
                            />
                        </Col> */}
                        <Col xs={24} sm={24} md={18}>
                            <ImageField 
                                name="redeem_reward"
                                label={t("skinconfig.Rewards Icon")} 
                                apiErrors={apiErrors && apiErrors.redeem_reward}
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
                                image={initialValues?.message_reward}
                            />
                        </Col> */}
                        <Col xs={24} sm={24} md={18}>
                            <ImageField 
                                name="message_reward"
                                label={t("skinconfig.Mailbox Icon")} 
                                apiErrors={apiErrors && apiErrors.message_reward}
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
                                image={initialValues?.message_reward}
                            />
                        </Col> */}
                        <Col xs={24} sm={24} md={18}>
                            <ImageField 
                                name="mission_reward"
                                label={t("skinconfig.Mission Icon")} 
                                apiErrors={apiErrors && apiErrors.mission_reward}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Row>
        </>
    )
}

