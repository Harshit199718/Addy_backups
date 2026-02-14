import { Col, Form, InputNumber, Row, Select, Switch } from "antd"
import ImageListingField from "../../../ListingField/ImageListingField"
import ImageField from "../../../customField/ImageField"
import { skinConfigClearSelectedProductModule } from "../../../customField/customOption"

export const Others = ({ apiErrors, initialValues, watchValue, t }) => {

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={4}>
                <ImageField
                    name="logo"
                    label={t("skinconfig.Logo")}
                    apiErrors={apiErrors && apiErrors.logo}
                />
            </Col>
            <Col xs={24} sm={24} md={4}>
                <Form.Item
                    name="header_logo_height"
                    label={t("skinconfig.Header Logo Height")}
                    validateStatus={apiErrors?.header_logo_height ? 'error' : ''}
                    help={apiErrors?.header_logo_height}
                    hasFeedback
                >
                    <InputNumber placeholder={t("skinconfig.Header Logo Height")} style={{ width: "100%" }} min={30} max={60}/>
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={4}>
                <Form.Item 
                    name="enable_chips"
                    label={t("skinconfig.Enable Chips")}
                >
                    <Switch checkedChildren={t("skinconfig.Show Chips")} unCheckedChildren={t("skinconfig.Hide Chips")} />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={4}>
                <Form.Item 
                    name="show_pwa_download"
                    label={t("skinconfig.Show PWA Download")}
                >
                    <Switch checkedChildren={t("skinconfig.Show PWA Download")} unCheckedChildren={t("skinconfig.Hide PWA Download")} />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Form.Item
                    name="clear_selected_product_module"
                    label={t("skinconfig.Clear Selected Product Module")} 
                    validateStatus={apiErrors?.clear_selected_product_module ? 'error' : ''}
                    help={apiErrors?.clear_selected_product_module}
                    hasFeedback
                >
                    <Select 
                        placeholder={t("skinconfig.Please select clear selected product module")}
                        options={skinConfigClearSelectedProductModule(t)}
                    />
                </Form.Item>
            </Col>
        </Row>
    )
}

