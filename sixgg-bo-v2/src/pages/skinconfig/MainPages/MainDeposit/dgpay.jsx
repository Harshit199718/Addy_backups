import { Col, Divider, Form, Row, Select, Tag } from "antd"
import { skinConfigDGPayPGChoices, skinConfigDGpayEWChoices } from "../../../../customField/customOption"
import SelectOption from "../../../../customToolbar/SelectOption"
import ImageField from "../../../../customField/ImageField"

export const DepositDGPay= ({ apiErrors, initialValues, watchValue, t }) => {
    
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
                            name="deposit_dgpay"
                            label={t("skinconfig.DGPay")} 
                            apiErrors={apiErrors && apiErrors.deposit_dgpay}
                        />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Form.Item
                    name="dgpay_available_pg"
                    label={t("skinconfig.DGPay Available PG")}
                    validateStatus={apiErrors?.dgpay_available_pg ? 'error' : ''}
                    help={apiErrors?.dgpay_available_pg}
                    hasFeedback
                >
                    <SelectOption 
                        placeholder={t("skinconfig.Please select DGPay payment gateway")}
                        options={skinConfigDGPayPGChoices(t)}
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
                            name="deposit_dgpay_ewallet"
                            label={t("skinconfig.DGPay Ewallet")}
                            apiErrors={apiErrors && apiErrors.deposit_dgpay_ewallet}
                        />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Form.Item
                    name="dgpay_available_ewallet"
                    label={t("skinconfig.DGPay Available Ewallet")}
                    validateStatus={apiErrors?.dgpay_available_ewallet ? 'error' : ''}
                    help={apiErrors?.dgpay_available_ewallet}
                    hasFeedback
                >
                    <SelectOption 
                        placeholder={t("skinconfig.Please select DGPay ewallet")}
                        options={skinConfigDGpayEWChoices(t)}
                        mode="multiple"
                    />
                </Form.Item>
            </Col>
        </Row>

        {/* Not Applicable */}
        {/* <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={6}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                        name="deposit_dgpay_doitnow"
                        label="DGPay Duit Now" 
                        apiErrors={apiErrors && apiErrors.deposit_dgpay_doitnow}
                        />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                        name="deposit_dgpay_tng"
                        label="DGPay TNG" 
                        apiErrors={apiErrors && apiErrors.deposit_dgpay_tng}
                        />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                        name="deposit_dgpay_dana"
                        label="DGPay Dana" 
                        apiErrors={apiErrors && apiErrors.deposit_dgpay_dana}
                        />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                        name="deposit_dgpay_ovo"
                        label="DGPay OVO" 
                        apiErrors={apiErrors && apiErrors.deposit_dgpay_ovo}
                        />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                        name="deposit_dgpay_shopeepay"
                        label="DGPay Shopeepay" 
                        apiErrors={apiErrors && apiErrors.deposit_dgpay_shopeepay}
                        />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                        name="deposit_dgpay_qris"
                        label="DGPay QRIS" 
                        apiErrors={apiErrors && apiErrors.deposit_dgpay_qris}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>  */}
        </>
    )
}

