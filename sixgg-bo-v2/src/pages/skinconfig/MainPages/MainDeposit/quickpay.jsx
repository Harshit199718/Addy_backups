import { Col, Divider, Form, Row, Select, Tag } from "antd"
import { skinConfigQuickpayEWChoices, skinConfigQuickpayPGChoices } from "../../../../customField/customOption"
import SelectOption from "../../../../customToolbar/SelectOption"
import ImageField from "../../../../customField/ImageField"

export const DepositQuickpay = ({ apiErrors, initialValues, watchValue, t }) => {
    
    return (
        <>
        <Divider>
            <Tag color="blue">{t("skinconfig.Payment Gateway")}</Tag>
        </Divider>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={6}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                            name="deposit_quickpay"
                            label={t("skinconfig.Quickpay")} 
                            apiErrors={apiErrors && apiErrors.deposit_quickpay}
                        />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Form.Item
                    name="quickpay_available_pg"
                    label={t("skinconfig.Quickpay Available PG")}
                    validateStatus={apiErrors?.quickpay_available_pg ? 'error' : ''}
                    help={apiErrors?.quickpay_available_pg}
                    hasFeedback
                >
                    <SelectOption 
                        placeholder={t("skinconfig.Please select quickpay pg")}
                        options={skinConfigQuickpayPGChoices(t)}
                        mode="multiple"
                    />
                </Form.Item>
            </Col>
        </Row>
        <Divider>
            <Tag color="blue">{t("skinconfig.Ewallet")}</Tag>
        </Divider>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={6}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                            name="deposit_quickpay_ewallet"
                            label={t("skinconfig.Quickpay Ewallet" )}
                            apiErrors={apiErrors && apiErrors.deposit_quickpay_ewallet}
                        />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Form.Item
                    name="quickpay_available_ewallet"
                    label={t("skinconfig.Quickpay Available Ewallet")}
                    validateStatus={apiErrors?.quickpay_available_ewallet ? 'error' : ''}
                    help={apiErrors?.quickpay_available_ewallet}
                    hasFeedback
                >
                    <SelectOption 
                        placeholder={t("skinconfig.Please select quickpay ewallet")}
                        options={skinConfigQuickpayEWChoices(t)}
                        mode="multiple"
                    />
                </Form.Item>
            </Col>
        </Row>
        </>
    )
}

