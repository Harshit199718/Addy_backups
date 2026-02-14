import { Col, Divider, Form, Row, Select, Tag } from "antd"
import { skinConfigDepositType, skinConfigEwalletProviderChoices, skinConfigManualDepositType, skinConfigPGProviderChoices, skinConfigQuickpayPGChoices } from "../../../../customField/customOption"
import SelectOption from "../../../../customToolbar/SelectOption"
import ImageField from "../../../../customField/ImageField"
import SelectOptionAllowAdd from "../../../../customToolbar/SelectOptionAllowAdd"

export const DepositConfig = ({ apiErrors, initialValues, watchValue, t }) => {
    const [deposit_amount_list] = [
        'deposit_amount_list',
    ].map(field => Form.useWatch(field, watchValue));
    
    return (
        <>
        <Row gutter={[16, 16]}>
            {import.meta.env.VITE_MODULES_EXCLUDED_JQK &&
            <Col xs={24} sm={24} md={8}>
                <Form.Item
                    name="deposit_style"
                    label={t("skinconfig.Deposit Page Style" )}
                    validateStatus={apiErrors?.deposit_style ? 'error' : ''}
                    help={apiErrors?.deposit_style}
                    hasFeedback
                >
                    <Select 
                        placeholder={t("skinconfig.Please select deposit page style")}
                        options={skinConfigDepositType(t)}
                    />
                </Form.Item>
            </Col>}
            <Col xs={24} sm={24} md={8}>
                <Form.Item
                    name="available_paymentgateway_providers"
                    label={t("skinconfig.PG Provider")}
                    validateStatus={apiErrors?.available_paymentgateway_providers ? 'error' : ''}
                    help={apiErrors?.available_paymentgateway_providers}
                    hasFeedback
                >
                    <SelectOption 
                        width={"100%"}
                        placeholder={t("skinconfig.Please select payment gateway provider")}
                        options={skinConfigPGProviderChoices(t)}
                        mode="multiple"
                    />
                </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
                <Form.Item
                    name="available_ewallets"
                    label={t("skinconfig.Ewallet Provider")}
                    validateStatus={apiErrors?.available_ewallets ? 'error' : ''}
                    help={apiErrors?.available_ewallets}
                    hasFeedback
                >
                    <SelectOption 
                        placeholder={t("skinconfig.Please select ewallet provider")}
                        options={skinConfigEwalletProviderChoices(t)}
                        mode="multiple"
                    />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Divider>
                <Tag color="blue">{t("skinconfig.Manual Deposit")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={8}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                            name="deposit_manual_deposit"
                            label={t("skinconfig.Manual Deposit" )}
                            apiErrors={apiErrors && apiErrors.deposit_manual_deposit}
                        />
                    </Col>
                </Row>
            </Col>
            {import.meta.env.VITE_MODULES_EXCLUDED_JQK &&
            <Col xs={24} sm={24} md={8}>
                <Form.Item
                    name="manual_deposit_style"
                    label={t("skinconfig.Manual Deposit Page Style")}
                    validateStatus={apiErrors?.manual_deposit_style ? 'error' : ''}
                    help={apiErrors?.manual_deposit_style}
                    hasFeedback
                >
                    <Select 
                        placeholder={t("skinconfig.Manual Deposit Page Style")}
                        options={skinConfigManualDepositType(t)}
                    />
                </Form.Item>
            </Col>}
            <Col xs={24} sm={24} md={8}>
                <Form.Item
                    name="deposit_amount_list"
                    label={t("skinconfig.Amount List")}
                    validateStatus={apiErrors?.deposit_amount_list ? 'error' : ''}
                    help={apiErrors?.deposit_amount_list}
                    hasFeedback
                >
                    <SelectOptionAllowAdd 
                        width={"100%"}
                        placeholder={t("skinconfig.Please select amount list")}
                        options={deposit_amount_list}
                        mode="multiple"
                        filterNumberic
                    />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Divider>
                <Tag color="blue">{t("skinconfig.Payment Gateway")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={6}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                            name="deposit_easypay_manual_deposit"
                            label={t("skinconfig.Easypay Manual Deposit")} 
                            apiErrors={apiErrors && apiErrors.deposit_easypay_manual_deposit}
                        />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                            name="deposit_easypay"
                            label={t("skinconfig.Easypay")} 
                            apiErrors={apiErrors && apiErrors.deposit_easypay}
                        />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                            name="deposit_sun2pay"
                            label={t("skinconfig.Sun2Pay")} 
                            apiErrors={apiErrors && apiErrors.deposit_sun2pay}
                        />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                            name="deposit_gspay"
                            label={t("skinconfig.GSPay")} 
                            apiErrors={apiErrors && apiErrors.deposit_gspay}
                        />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={6}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24}>
                        <ImageField 
                            name="deposit_telcopay"
                            label={t("skinconfig.Telcopay")} 
                            apiErrors={apiErrors && apiErrors.deposit_telcopay}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
        </>
    )
}

