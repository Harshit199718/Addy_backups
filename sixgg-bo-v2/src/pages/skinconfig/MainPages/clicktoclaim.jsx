import { Col, Form, Input, Row, Select, Switch } from "antd"
import ImageListingField from "../../../ListingField/ImageListingField"
import ImageField from "../../../customField/ImageField"
import ColorPickerField from "../../../customField/ColorPickerField"
import { skinConfigClickToClaimType } from "../../../customField/customOption"

export const ClickToClaim = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <Col>
            <Row gutter={[16, 16]}>
                {import.meta.env.VITE_MODULES_EXCLUDED_JQK &&
                <Col xs={24} sm={24} md={6}>
                    <Form.Item
                        name="ctc_style"
                        label={t("skinconfig.CTC Page Style")}
                        validateStatus={apiErrors?.ctc_style ? 'error' : ''}
                        help={apiErrors?.ctc_style}
                        hasFeedback
                    >
                        <Select 
                            placeholder={t("skinconfig.Please select click to claim page style")}
                            options={skinConfigClickToClaimType(t)}
                        />
                    </Form.Item>
                </Col>}
                <Col xs={24} sm={24} md={6}>
                    <Form.Item 
                        name="enable_ctc"
                        label={t("skinconfig.Enable Click To Claim")}
                    >
                        <Switch checkedChildren={t("skinconfig.Enable Click To Claim")} unCheckedChildren={t("skinconfig.Disable Click To Claim")} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <Form.Item 
                        name="enable_ctc_home"
                        label={t("skinconfig.Enable Click To Claim Home")}
                    >
                        <Switch checkedChildren={t("skinconfig.Enable Click To Claim Home")} unCheckedChildren={t("skinconfig.Disable Click To Claim Home")} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <Form.Item 
                        name="enable_ctc_condition"
                        label={t("skinconfig.Enable Click To Claim Condition")}
                    >
                        <Switch checkedChildren={t("skinconfig.Enable Click To Claim Condition")} unCheckedChildren={t("skinconfig.Disable Click To Claim Condition")} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={6}>
                    <Form.Item
                        name="ctc_title_font_style"
                        label={t("skinconfig.CTC Title Font Style")}
                        validateStatus={apiErrors.ctc_title_font_style ? 'error' : ''}
                        help={apiErrors.ctc_title_font_style}
                        hasFeedback
                    >
                        <Input placeholder={t("skinconfig.Please input the title font of the ctc")} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <Form.Item
                        name="ctc_title_desktop_size"
                        label={t("skinconfig.CTC Title Desktop Size")}
                        validateStatus={apiErrors.ctc_title_desktop_size ? 'error' : ''}
                        help={apiErrors.ctc_title_desktop_size}
                        hasFeedback
                    >
                        <Input type="number" placeholder={t("skinconfig.Please input the title desktop size of the ctc")} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <Form.Item
                        name="ctc_title_mobile_size"
                        label={t("skinconfig.CTC Title Mobile Size")}
                        validateStatus={apiErrors.ctc_title_mobile_size ? 'error' : ''}
                        help={apiErrors.ctc_title_mobile_size}
                        hasFeedback
                    >
                        <Input type="number" placeholder={t("skinconfig.Please input the title mobile size of the ctc")} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <ColorPickerField
                        name="ctc_title_color"
                        label={t("skinconfig.CTC Title Color")}
                        apiErrors={apiErrors?.ctc_title_color}
                        size="medium"
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={6}>
                    <Form.Item
                        name="ctc_reward_font_style"
                        label={t("skinconfig.CTC Reward Font Style")}
                        validateStatus={apiErrors.ctc_reward_font_style ? 'error' : ''}
                        help={apiErrors.ctc_reward_font_style}
                        hasFeedback
                    >
                        <Input placeholder={t("skinconfig.Please input the reward font of the ctc")} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <Form.Item
                        name="ctc_reward_desktop_size"
                        label={t("skinconfig.CTC Reward Desktop Size")}
                        validateStatus={apiErrors.ctc_reward_desktop_size ? 'error' : ''}
                        help={apiErrors.ctc_reward_desktop_size}
                        hasFeedback
                    >
                        <Input type="number" placeholder={t("skinconfig.Please input the reward desktop size of the ctc")} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <Form.Item
                        name="ctc_reward_mobile_size"
                        label={t("skinconfig.CTC Reward Mobile Size")}
                        validateStatus={apiErrors.ctc_reward_mobile_size ? 'error' : ''}
                        help={apiErrors.ctc_reward_mobile_size}
                        hasFeedback
                    >
                        <Input type="number" placeholder={t("skinconfig.Please input the reward mobile size of the ctc")} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <ColorPickerField
                        name="ctc_reward_color"
                        label={t("skinconfig.CTC Reward Color")}
                        apiErrors={apiErrors?.ctc_reward_color}
                        size="medium"
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                {/* <Col xs={24} sm={24} md={6}>
                    <ImageListingField
                        width={'80px'}
                        height={'80px'}
                        image={initialValues?.ctc_bg}
                    />
                </Col> */}
                <Col xs={24} sm={24} md={6}>
                    <ImageField 
                        name="ctc_bg"
                        label={t("skinconfig.Default CTC Background" )}
                        apiErrors={apiErrors && apiErrors.ctc_bg}
                    />
                </Col>
            </Row>
        </Col>
    )
}

