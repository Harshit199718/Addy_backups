import { Col, Form, Row, Select, Divider, Tag, Input, InputNumber, Switch } from "antd"
import { skinConfigJackpotType } from "../../../../customField/customOption"
import ColorPickerField from "../../../../customField/ColorPickerField"
import ImageListingField from "../../../../ListingField/ImageListingField"
import ImageField from "../../../../customField/ImageField"

export const Jackpot = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={4}>
                <Form.Item 
                    name="jackpot"
                    label={t("skinconfig.Jackpot")}
                >
                    <Switch checkedChildren={t("skinconfig.Show Jackpot")} unCheckedChildren={t("skinconfig.Hide Jackpot")} />
                </Form.Item>
            </Col>
            {import.meta.env.VITE_MODULES_EXCLUDED_JQK &&
            <Col xs={24} sm={24} md={5}>
            <Form.Item
                name="jackpot_style"
                label={t("skinconfig.Jackpot Type")}
                validateStatus={apiErrors?.jackpot_style ? 'error' : ''}
                help={apiErrors?.jackpot_style}
                hasFeedback
                >
                    <Select 
                        placeholder={t("skinconfig.Please select jackpot type")}
                        options={skinConfigJackpotType(t)}
                    />
                </Form.Item>
            </Col>}
            <Col xs={24} sm={24} md={5}>
                <Form.Item
                    name="jackpot_number"
                    label={t("skinconfig.Jackpot Initial Number")}
                    validateStatus={apiErrors?.jackpot_number ? 'error' : ''}
                    help={apiErrors?.jackpot_number}
                    hasFeedback
                >
                    <InputNumber placeholder={t("skinconfig.Jackpot Initial Number")} style={{ width: "100%" }} />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={5}>
                <Form.Item
                    name="jackpot_number_min_increment"
                    label={t("skinconfig.Jackpot Min Increment")}
                    validateStatus={apiErrors?.jackpot_number_min_increment ? 'error' : ''}
                    help={apiErrors?.jackpot_number_min_increment}
                    hasFeedback
                >
                    <InputNumber placeholder={t("skinconfig.Jackpot Min Increment")} style={{ width: "100%" }} />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={5}>
                <Form.Item
                    name="jackpot_number_max_increment"
                    label={t("skinconfig.Jackpot Max Increment")}
                    validateStatus={apiErrors?.jackpot_number_max_increment ? 'error' : ''}
                    help={apiErrors?.jackpot_number_max_increment}
                    hasFeedback
                >
                    <InputNumber placeholder={t("skinconfig.Jackpot Max Increment")} style={{ width: "100%" }} />
                </Form.Item>
            </Col>
        </Row>

        <Row gutter={[16, 16]}>
            <Divider>
                <Tag color="blue">{t("skinconfig.Jackpot Style 2 / 3 Configuration")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={6}>
                {/* <ImageListingField
                    width={'80px'}
                    height={'80px'}
                    image={initialValues?.jackpot_image}
                /> */}
                <ImageField name="jackpot_image" label={t("skinconfig.Jackpot Style 2 / 3 Background")} apiErrors={apiErrors && apiErrors.jackpot_image} />
            </Col>
        </Row>
    </>
    )
}

