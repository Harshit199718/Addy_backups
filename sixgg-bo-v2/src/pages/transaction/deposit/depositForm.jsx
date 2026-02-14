import { Form, Input, InputNumber, Row, Col } from "antd"
import ReferenceMerchantBankAccountField from "../../../customField/ReferenceMerchantBankAccountField"
import SelectTransactionStateField from "../../../customField/SelectTransactionStateField"
import ImageField from "../../../customField/ImageField"
import ReferencePlayerField from "../../../customField/ReferencePlayerField"
import { useEffect } from "react"

const DepositForm = ({apiErrors, selectedSite, form, t}) => {
    const [amount, second_wallet_amount] = [
        'amount',
        'second_wallet_amount',
    ].map(field => Form.useWatch(field, form));

    useEffect(() => {
        const result = (Number(amount) || 0) - (Number(second_wallet_amount) || 0);
        form.setFieldValue('actual_wallet_amount', result || 0);
    }, [amount, second_wallet_amount]);

    return (
        <>
            <ReferencePlayerField name="player" label={t("common.Player")} apiErrors={apiErrors && apiErrors.player} filterProp={{sites: [selectedSite]}}/>
            <Form.Item
                name="amount"
                label={t("common.Deposit Amount")}
                validateStatus={apiErrors.amount ? 'error' : ''}
                help={apiErrors.amount}
                rules={[
                {
                    required: true,
                    message: t('requiredmessage.Please input the amount of the deposit'),
                },
                ]}
                hasFeedback
            >
                <InputNumber style={{ width: '100%' }} placeholder={t("common.Deposit Amount")} min={0}/>
            </Form.Item>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Form.Item
                        name="second_wallet_amount"
                        label={t("common.Hold Amount")}
                        validateStatus={apiErrors.second_wallet_amount ? 'error' : ''}
                        help={apiErrors.second_wallet_amount}
                        rules={[
                        {
                            required: true,
                            message: t('requiredmessage.Please input the hold amount of the deposit'),
                        },
                        ]}
                        hasFeedback
                    >
                        <InputNumber style={{ width: '100%' }} placeholder={t("common.Hold Amount")} min={0} max={(Number(amount) || 0)}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="actual_wallet_amount"
                        label={t("common.Actual Wallet Amount")}
                    >
                        <InputNumber style={{ width: '100%' }} placeholder={t("common.Actual Wallet Amount")} min={0} disabled/>
                    </Form.Item>
                </Col>
            </Row>
            <ImageField name="proof" label={t("common.Receipt")} apiErrors={apiErrors && apiErrors.proof} require/>
            <ReferenceMerchantBankAccountField 
                name="merchant_bank_account" 
                label={t("common.Merchant Bank Account")}
                placeholder={t("common.Merchant Bank Account")}
                apiErrors={apiErrors && apiErrors.merchant_bank_account} 
                filterProp={{sites: [selectedSite]}}
            />
            <SelectTransactionStateField name="state" label={t("common.State")} apiErrors={apiErrors && apiErrors.state}/>
            <Form.Item
                name="remark"
                label={t("common.Remark")}
                validateStatus={apiErrors.remark ? 'error' : ''}
                help={apiErrors.remark}
                rules={[
                    {
                        required: true,
                        message: t('requiredmessage.Please input the remark'),
                    },
                ]}
                hasFeedback
            >
                <Input placeholder={t("common.Remark")} />
            </Form.Item>
        </>
    )
}

export default DepositForm