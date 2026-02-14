import { Col, ColorPicker, Form, InputNumber, Row, Switch } from "antd"
import ColorPickerField from "../../../customField/ColorPickerField"

export const Color = ({ apiErrors, watchValue, t }) => {
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={6}>
                    <ColorPickerField  
                        name="primary_color"
                        label={t("skinconfig.Primary Color")}
                        apiErrors={apiErrors?.primary_color }
                    />
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <ColorPickerField  
                        name="secondary_color"
                        label={t("skinconfig.Secondary Color")}
                        apiErrors={apiErrors?.secondary_color }
                    />
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <ColorPickerField  
                        name="tertiary_color"
                        label={t("skinconfig.Tertiary Color")}
                        apiErrors={apiErrors?.tertiary_color }
                    />
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <ColorPickerField  
                        name="progress_bar"
                        label={t("skinconfig.Progress Bar Color")}
                        apiErrors={apiErrors?.progress_bar }
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={6}>
                    <ColorPickerField  
                        name="border_color"
                        label={t("skinconfig.Border Primary Color")}
                        apiErrors={apiErrors?.border_color }
                    />
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <ColorPickerField  
                        name="border_color_secondary"
                        label={t("skinconfig.Border Secondary Color")}
                        apiErrors={apiErrors?.border_color_secondary }
                    />
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <ColorPickerField  
                        name="border_shadow_primary_color"
                        label={t("skinconfig.Border Shadow Primary Color")}
                        apiErrors={apiErrors?.border_shadow_primary_color }
                    />
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <ColorPickerField  
                        name="border_shadow_secondary_color"
                        label={t("skinconfig.Border Shadow Secondary Color")}
                        apiErrors={apiErrors?.border_shadow_secondary_color }
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={6}>
                    <ColorPickerField  
                        name="text_color"
                        label={t("skinconfig.Text Color")}
                        apiErrors={apiErrors?.text_color }
                    />
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <ColorPickerField  
                        name="text_color_secondary"
                        label={t("skinconfig.Text Secondary Color")}
                        apiErrors={apiErrors?.text_color_secondary }
                    />
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <ColorPickerField  
                        name="deposit_withdraw_title_bg"
                        label={t("skinconfig.Deposit & Withdraw Title Background")}
                        apiErrors={apiErrors?.deposit_withdraw_title_bg }
                    />
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <ColorPickerField  
                        name="inputs_bg"
                        label={t("skinconfig.Inputs Background Color")}
                        apiErrors={apiErrors?.inputs_bg }
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={6}>
                    <ColorPickerField  
                        name="layout_card_bg"
                        label={t("skinconfig.Layout Card Background Color")}
                        apiErrors={apiErrors?.layout_card_bg }
                    />
                </Col>
            </Row>
        </>
    );
};