import { Col, Divider, Form, InputNumber, Row, Tag } from "antd"
import ColorPickerField from "../../../../customField/ColorPickerField"

export const RTPSlot = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <>
        <Row gutter={[16, 16]}>
            <Divider>
                <Tag color="blue">{t("skinconfig.RTP Rate")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={12}>
                <Form.Item
                    name="min_rtp"
                    label={t("skinconfig.Min RTP")}
                    validateStatus={apiErrors?.min_rtp ? 'error' : ''}
                    help={apiErrors?.min_rtp}
                    hasFeedback
                    >
                        <InputNumber placeholder={t("skinconfig.Min RTP")} style={{ width: "100%" }} />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
                <Form.Item
                    name="max_rtp"
                    label={t("skinconfig.Max RTP")}
                    validateStatus={apiErrors?.max_rtp ? 'error' : ''}
                    help={apiErrors?.max_rtp}
                    hasFeedback
                    >
                        <InputNumber placeholder={t("skinconfig.Max RTP")} style={{ width: "100%" }} />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Divider>
                <Tag color="blue">{t("skinconfig.RTP Color")}</Tag>
            </Divider>
            {Array.from({ length: 10 }).map((_, index) => (
                <Col xs={24} sm={24} md={3} key={index}>
                    <ColorPickerField  
                        key={`rtp_${index + 1}_color`}
                        name={`rtp_${index + 1}_color`}
                        label={`${t("skinconfig.RTP Range")} ${index * 10 + 1}-${(index + 1) * 10}`}
                        apiErrors={apiErrors?.[`rtp_${index + 1}_color`]}
                    />
                </Col>
            ))}
        </Row>
        </>
    )
}

