import { Col, Form, Row, Select } from "antd"
import ImageListingField from "../../../ListingField/ImageListingField"
import ImageField from "../../../customField/ImageField"
import ColorPickerField from "../../../customField/ColorPickerField"
import { skinConfigWithdrawalType } from "../../../customField/customOption"

export const Withdraw = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={8}>
                <Form.Item
                    name="withdraw_style"
                    label={t("skinconfig.Withdraw Style")}
                    validateStatus={apiErrors?.withdraw_style ? 'error' : ''}
                    help={apiErrors?.withdraw_style}
                    hasFeedback
                >
                    <Select 
                        placeholder={t("skinconfig.Please select withdrawal type")}
                        options={skinConfigWithdrawalType(t)}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Row gutter={[16, 16]}>
                    {/* <Col xs={24} sm={24} md={6}>
                        <ImageListingField
                            width={'80px'}
                            height={'80px'}
                            image={initialValues?.withdraw_title}
                        />
                    </Col> */}
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                            name="withdraw_title"
                            label={t("skinconfig.Withdrawal Title Image" )}
                            apiErrors={apiErrors && apiErrors.withdraw_title}
                        />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={8}>
                <ColorPickerField
                    name="withdraw_chip_bg"
                    label={t("skinconfig.Chip Background Color")}
                    apiErrors={apiErrors?.withdraw_chip_bg}
                    size="medium"
                />
            </Col>
        </Row>
    )
}

