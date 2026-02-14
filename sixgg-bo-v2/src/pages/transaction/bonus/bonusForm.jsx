import { Form, Input, InputNumber } from "antd"
import SelectTransactionStateField from "../../../customField/SelectTransactionStateField"
import ReferencePlayerField from "../../../customField/ReferencePlayerField"

const BonusForm = ({apiErrors, selectedSite, t}) => {
    return (
        <>
            <ReferencePlayerField 
                name="player"
                label={t("common.Player")}
                apiErrors={apiErrors && apiErrors.player} 
                filterProp={{sites: [selectedSite]}}
            />
            <Form.Item
                name="amount"
                label={t("common.Bonus Amount")}
                validateStatus={apiErrors.amount ? 'error' : ''}
                help={apiErrors.amount}
                rules={[
                {
                    required: true,
                    message: t('requiredmessage.Please input the amount of the bonus'),
                },
                ]}
                hasFeedback
            >
                <InputNumber style={{ width: '100%' }} placeholder={t("common.Bonus Amount")} min={0}/>
            </Form.Item>
            <SelectTransactionStateField name="state" label={t("common.State")} apiErrors={apiErrors && apiErrors.state} />
            <Form.Item
                name="remark"
                label={t("common.Remark")}
                validateStatus={apiErrors.remark ? 'error' : ''}
                help={apiErrors.remark}
                rules={[
                    {
                        required: true,
                        message: t('requiredmessage.Please input the remark of the bonus'),
                    },
                ]}
                hasFeedback
            >
                <Input placeholder={t("common.Remark")} />
            </Form.Item>
        </>
    )
}

export default BonusForm