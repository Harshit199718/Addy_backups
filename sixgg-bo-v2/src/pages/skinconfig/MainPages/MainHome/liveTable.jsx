import { Col, Form, Row, Select, Divider, Tag, Input, InputNumber, Switch } from "antd"
import { skinConfigLiveTableType } from "../../../../customField/customOption"
import ColorPickerField from "../../../../customField/ColorPickerField"

export const LiveTable = ({ apiErrors, initialValues, watchValue, t }) => {
    return (
        <>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={6}>
                <Form.Item 
                    name="live_table"
                    label={t("skinconfig.Show Live Table")}
                >
                    <Switch checkedChildren={t("skinconfig.Enable Live Table")} unCheckedChildren={t("skinconfig.Disable Live Table")} />
                </Form.Item>
            </Col>
            {import.meta.env.VITE_MODULES_EXCLUDED_JQK &&
            <Col xs={24} sm={24} md={6}>
                <Form.Item
                    name="live_table_style"
                    label={t("skinconfig.Live Table Type")}
                    validateStatus={apiErrors?.live_table_style ? 'error' : ''}
                    help={apiErrors?.live_table_style}
                    hasFeedback
                    >
                        <Select 
                            placeholder={t("skinconfig.Please select live table type")}
                            options={skinConfigLiveTableType(t)}
                        />
                </Form.Item>
            </Col>}
        </Row>

        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12}>
                <Divider>
                    <Tag color="blue">{t("skinconfig.Live Table Style 1 Configuration")}</Tag>
                </Divider>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12}>
                        <ColorPickerField  
                            name="live_transaction_bg"
                            label={t("skinconfig.Live Table Container Color")}
                            apiErrors={apiErrors?.live_transaction_bg }
                        />
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                        <ColorPickerField  
                            name="live_deposit_bg"
                            label={t("skinconfig.Live Table Deposit Color")}
                            apiErrors={apiErrors?.live_deposit_bg }
                        />
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                        <ColorPickerField  
                            name="live_withdraw_bg"
                            label={t("skinconfig.Live Table Withdrawal Color")}
                            apiErrors={apiErrors?.live_withdraw_bg }
                        />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} sm={24} md={12}>
                <Divider>
                    <Tag color="blue">{t("skinconfig.Live Table Style 2 Configuration")}</Tag>
                </Divider>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item
                            name="deposit_title"
                            label={t("skinconfig.Live Table Deposit Title")}
                            validateStatus={apiErrors?.deposit_title ? 'error' : ''}
                            help={apiErrors?.deposit_title}
                            hasFeedback
                            >
                                <Input placeholder={t("skinconfig.Live Table Title")} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item
                            name="min_deposit_mock_amount"
                            label={t("skinconfig.Min Mock Amount")}
                            validateStatus={apiErrors?.min_deposit_mock_amount ? 'error' : ''}
                            help={apiErrors?.min_deposit_mock_amount}
                            hasFeedback
                            >
                                <InputNumber placeholder={t("skinconfig.Min Mock Amount")} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item
                            name="max_deposit_mock_amount"
                            label={t("skinconfig.Max Mock Amount")}
                            validateStatus={apiErrors?.max_deposit_mock_amount ? 'error' : ''}
                            help={apiErrors?.max_deposit_mock_amount}
                            hasFeedback
                            >
                                <InputNumber placeholder={t("skinconfig.Max Mock Amount")} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item
                            name="top_x_amount"
                            label={t("skinconfig.Live Table Top X Amount")}
                            validateStatus={apiErrors?.top_x_amount ? 'error' : ''}
                            help={apiErrors?.top_x_amount}
                            hasFeedback
                            >
                                <InputNumber placeholder={t("skinconfig.Top X Amount")} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item
                            name="top_y_amount"
                            label={t("skinconfig.Live Table Top Y Amount")}
                            validateStatus={apiErrors?.top_y_amount ? 'error' : ''}
                            help={apiErrors?.top_y_amount}
                            hasFeedback
                            >
                                <InputNumber placeholder={t("skinconfig.Top Y Amount")} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item
                            name="top_z_amount"
                            label={t("skinconfig.Live Table Top Z Amount")}
                            validateStatus={apiErrors?.top_z_amount ? 'error' : ''}
                            help={apiErrors?.top_z_amount}
                            hasFeedback
                            >
                                <InputNumber placeholder={t("skinconfig.Top Z Amount")} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
        </Row>
    </>
    )
}

