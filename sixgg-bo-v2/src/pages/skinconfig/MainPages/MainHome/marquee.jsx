import { Col, ColorPicker, Form, InputNumber, Row, Image } from "antd"
import ImageField from "../../../../customField/ImageField"
import ImageListingField from "../../../../ListingField/ImageListingField"
import ColorPickerField from "../../../../customField/ColorPickerField"

export const Marquee = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={4}>
                <Form.Item
                    name="marquee_height"
                    label={t("skinconfig.Marquee Height")}
                    validateStatus={apiErrors?.marquee_height ? 'error' : ''}
                    help={apiErrors?.marquee_height}
                    hasFeedback
                    >
                     <InputNumber placement="Please input the marquee height" />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={4}>
                <ColorPickerField
                name="marquee_text_color"
                label={t("skinconfig.Marquee Text Color")}
                apiErrors={apiErrors?.marquee_text_color}
                size="medium"
                />
            </Col>
            <Col xs={24} sm={24} md={5}>
                {/* <ImageListingField
                    width={'230px'}
                    height={'30px'}
                    image={initialValues?.marquee_bg}
                /> */}
                <ImageField 
                    name="marquee_bg" 
                    label={t("skinconfig.Marquee Background")} 
                    apiErrors={apiErrors && apiErrors.marquee_bg} 
                />
            </Col>
        </Row>
    )
}

