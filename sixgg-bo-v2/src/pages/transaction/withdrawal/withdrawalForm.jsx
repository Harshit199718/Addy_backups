import { Form, Input, InputNumber } from "antd"
import SelectTransactionStateField from "../../../customField/SelectTransactionStateField"
import ReferencePlayerField from "../../../customField/ReferencePlayerField"
import ReferenceCustomerBankAccountField from "../../../customField/ReferenceCustomerBankAccountField"
import { useEffect, useState } from "react"
import { convertIDToArray } from "../../../components/generalConversion"

const WithdrawalForm = ({apiErrors, selectedSite, t}) => {
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    useEffect(() => {
        setSelectedPlayer(null)
    },[selectedSite])

    return (
        <>
            <ReferencePlayerField 
                name="player"
                label={t("common.Player")} 
                apiErrors={apiErrors && apiErrors.player} 
                filterProp={{sites: [selectedSite]}}
                onChange={(value) => setSelectedPlayer(value)}
            />
            <Form.Item
                name="req_amount"
                label={t("common.Withdrawal Amount")}
                validateStatus={apiErrors.amount ? 'error' : ''}
                help={apiErrors.amount}
                rules={[
                {
                    required: true,
                    message: t('requiredmessage.Please input the amount of the withdrawal'),
                },
                ]}
                hasFeedback
            >
                <InputNumber style={{ width: '100%' }} placeholder={t("common.Withdrawal Amount")} min={0}/>
            </Form.Item>
            {selectedPlayer && 
                <ReferenceCustomerBankAccountField
                    name="customer_bank_account" 
                    label={t("common.Customer Bank Account")} 
                    apiErrors={apiErrors && apiErrors.customer_bank_account} 
                    filterProp={{
                        sites: [selectedSite],
                        user: [convertIDToArray(selectedPlayer)[0]]
                    }}
                />
            }
            <SelectTransactionStateField name="state" label={t("common.State")} apiErrors={apiErrors && apiErrors.state} disable={true}/>
            <Form.Item
                name="remark"
                label={t("common.Remark")}
                validateStatus={apiErrors.remark ? 'error' : ''}
                help={apiErrors.remark}
                rules={[
                    {
                        required: true,
                        message: t('requiredmessage.Please input the remark of the withdrawal'),
                    },
                ]}
                hasFeedback
            >
                <Input placeholder={t("common.Remark")} />
            </Form.Item>
        </>
    )
}

export default WithdrawalForm