import { Col, Divider, Form, InputNumber, Row, Select, Switch, Tag } from "antd"
import ImageListingField from "../../../../ListingField/ImageListingField"
import ImageField from "../../../../customField/ImageField"
import { skinConfigLuckyWheelType } from "../../../../customField/customOption"
import CustomRichTextField from "../../../../customField/CustomRichTextField"

export const LuckyWheel = ({ apiErrors, initialValues, watchValue, t }) => {
    const [luckywheel_registration_banner] = ['luckywheel_registration_banner'].map(field => Form.useWatch(field, watchValue));

    return (
        <>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24}>
                <Form.Item
                    name="luckywheel_style"
                    label={t("skinconfig.Lucky Wheel Style")}
                    validateStatus={apiErrors?.luckywheel_style ? 'error' : ''}
                    help={apiErrors?.luckywheel_style}
                    hasFeedback
                >
                    <Select 
                        placeholder={t("skinconfig.Please select deposit page style")}
                        options={skinConfigLuckyWheelType(t)}
                    />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Divider>
                <Tag color="blue">{t("skinconfig.Lucky Wheel Images")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={8}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={18}>
                        <ImageField 
                            name="luckywheel_information_images"
                            label={t("skinconfig.Lucky Wheel Information Images")} 
                            apiErrors={apiErrors && apiErrors.luckywheel_information_images}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Divider>
                <Tag color="blue">{t("skinconfig.Lucky Wheel Registration Pop Up")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={6}>
                <Form.Item 
                    name="show_luckywheel_registration_wheel"
                    label={t("skinconfig.Show Luckywheel Registration Wheel")}
                >
                    <Switch 
                        checkedChildren={t("skinconfig.Enable Registration Pop Up")} 
                        unCheckedChildren={t("skinconfig.Disable Registration Pop Up")} />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <ImageField 
                    name="luckywheel_registration_wheel"
                    label={t("skinconfig.Frame (Before Spin)")} 
                    apiErrors={apiErrors && apiErrors.luckywheel_registration_wheel }
                />
            </Col>
            <Col xs={24} sm={24} md={6}>
                <ImageField 
                    name="luckywheel_registration_wheel_spin"
                    label={t("skinconfig.Spin (Gif)")} 
                    apiErrors={apiErrors && apiErrors.luckywheel_registration_wheel_spin }
                />
            </Col>
            <Col xs={24} sm={24} md={6}>
                <ImageField 
                    name="luckywheel_registration_wheel_win"
                    label={t("skinconfig.Frame (After Spin)")} 
                    apiErrors={apiErrors && apiErrors.luckywheel_registration_wheel_win }
                />
            </Col>
            <Col xs={24} sm={24} md={6}>
                <ImageField 
                    name="luckywheel_registration_wheel_win_popup"
                    label={t("skinconfig.Pop Up Congratulation")} 
                    apiErrors={apiErrors && apiErrors.luckywheel_registration_wheel_win_popup }
                />
            </Col>
            <CustomRichTextField name="luckywheel_registration_banner" label={t('skinconfig.Banner')} apiErrors={apiErrors && apiErrors.luckywheel_registration_banner } value={luckywheel_registration_banner }/>
        </Row>
        </>
    )
}

