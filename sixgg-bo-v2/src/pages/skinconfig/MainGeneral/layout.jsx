import { Col, Form, Row, Select, Switch } from "antd"
import ImageListingField from "../../../ListingField/ImageListingField"
import ImageField from "../../../customField/ImageField"
import { skinConfigFooterBackgroundType, skinConfigHeaderBackgroundType, skinConfigRootBackgroundType } from "../../../customField/customOption"
import ColorPickerField from "../../../customField/ColorPickerField"

export const Layout = ({ apiErrors, initialValues, watchValue, t }) => {

    return (
        <>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={6}>
                <Form.Item
                    name="root_bg_type"
                    label={t("skinconfig.Root Background Type")}
                    validateStatus={apiErrors?.root_bg_type ? 'error' : ''}
                    help={apiErrors?.root_bg_type}
                    hasFeedback
                >
                    <Select 
                        placeholder={t("skinconfig.Please select root background type")}
                        options={skinConfigRootBackgroundType(t)}
                    />
                </Form.Item>
            </Col>
            {/* <Col xs={24} sm={24} md={2}>
                <ImageListingField
                    width={'80px'}
                    height={'80px'}
                    image={initialValues.root_bg}
                />
            </Col> */}
            <Col xs={24} sm={24} md={6}>
                <ImageField
                    name="root_bg"
                    label={t("skinconfig.Root Background Image")}
                    apiErrors={apiErrors && apiErrors.root_bg}
                />
            </Col>
            <Col xs={24} sm={24} md={4}>
                <ColorPickerField
                    name="root_bg_color"
                    label={t("skinconfig.Root Background Color")}
                    apiErrors={apiErrors && apiErrors.root_bg_color}
                    size="medium"
                />
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={6}>
                <Form.Item
                    name="header_bg_type"
                    label={t("skinconfig.Header Background Type")}
                    validateStatus={apiErrors?.header_bg_type ? 'error' : ''}
                    help={apiErrors?.header_bg_type}
                    hasFeedback
                >
                    <Select 
                        placeholder={t("skinconfig.Please select header background type")}
                        options={skinConfigHeaderBackgroundType(t)}
                    />
                </Form.Item>
            </Col>
            {/* <Col xs={24} sm={24} md={2}>
                <ImageListingField
                    width={'80px'}
                    height={'80px'}
                    image={initialValues.header_bg}
                />
            </Col> */}
            <Col xs={24} sm={24} md={6}>
                <ImageField
                    name="header_bg"
                    label={t("skinconfig.Header Background Image")}
                    apiErrors={apiErrors && apiErrors.header_bg}
                />
            </Col>
            <Col xs={24} sm={24} md={4}>
                <ColorPickerField
                    name="header_bg_color"
                    label={t("skinconfig.Header Background Color")}
                    apiErrors={apiErrors && apiErrors.header_bg_color}
                    size="medium"
                />
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={6}>
                <Form.Item
                    name="footer_bg_type"
                    label={t("skinconfig.Footer Background Type")}
                    validateStatus={apiErrors?.footer_bg_type ? 'error' : ''}
                    help={apiErrors?.footer_bg_type}
                    hasFeedback
                >
                    <Select 
                        placeholder={t("skinconfig.Please select footer background type")}
                        options={skinConfigFooterBackgroundType(t)}
                    />
                </Form.Item>
            </Col>
            {/* <Col xs={24} sm={24} md={2}>
                <ImageListingField
                    width={'80px'}
                    height={'80px'}
                    image={initialValues.footer_bg}
                />
            </Col> */}
            <Col xs={24} sm={24} md={6}>
                <ImageField
                    name="footer_bg"
                    label={t("skinconfig.Footer Background Image")}
                    apiErrors={apiErrors && apiErrors.footer_bg}
                />
            </Col>
            <Col xs={24} sm={24} md={4}>
                <ColorPickerField
                    name="footer_bg_color"
                    label={t("skinconfig.Footer Background Color")}
                    apiErrors={apiErrors && apiErrors.footer_bg_color}
                    size="medium"
                />
            </Col>
            <Col xs={24} sm={24} md={4}>
                <ColorPickerField
                    name="footer_bg_active_color"
                    label={t("skinconfig.Footer Active Color")}
                    apiErrors={apiErrors && apiErrors.footer_bg_active_color}
                    size="medium"
                />
            </Col>
        </Row>
        </>

    )
}

