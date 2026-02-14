import { Form, Input, InputNumber, Select } from "antd"
import React, { useState, useEffect } from 'react';
import ReferenceMerchantBankAccountField from "../../../customField/ReferenceMerchantBankAccountField"
import SelectTransactionStateField from "../../../customField/SelectTransactionStateField"
import ImageField from "../../../customField/ImageField"
import ReferencePlayerField from "../../../customField/ReferencePlayerField"
import { convertIDToArray } from "../../../components/generalConversion";
import ReferenceDropTransactionDepositParentField from "../../../customField/ReferenceDropTransactionDepositParentField ";

const DropTransactionDepositForm = ({apiErrors, selectedSite, selectedPlayer, form, t}) => {
    const [parent] = [
        'parent',
      ].map(field => Form.useWatch(field, form));

    const [playerid, setPlayerID] = useState(null)
    useEffect(() => {
        if(selectedPlayer) {
            const [player, wallet] = convertIDToArray(selectedPlayer)
            setPlayerID(player)
        }
    }, [selectedPlayer])

    useEffect(() => {
        if(parent) {
            const [id, amount] = convertIDToArray(parent)
            form.setFieldsValue({
                amount: amount,
              });
        }
    }, [parent])

    return (
        <>
            <ReferencePlayerField name="player" label={t("common.Player")} apiErrors={apiErrors && apiErrors.player} filterProp={{sites: [selectedSite]}} />
            {playerid &&
                <ReferenceDropTransactionDepositParentField
                    name="parent" 
                    isRequired={true}
                    filterProp={{ actor: [playerid], is_show_pg_pending: true }}
                />
            }
            <Form.Item
                name="amount"
                label={t("common.Drop Transaction Deposit Amount")}
                validateStatus={apiErrors.amount ? 'error' : ''}
                help={apiErrors.amount}
                hasFeedback
            >
                <InputNumber style={{ width: '100%' }} placeholder={t("common.Drop Transaction Deposit Amount")} disabled/>
            </Form.Item>
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
                        message: t('requiredmessage.Please input the remark of the drop transaction deposit'),
                    },
                ]}
                hasFeedback
            >
                <Input placeholder={t("common.Remark")} />
            </Form.Item>
        </>
    )
}

export default DropTransactionDepositForm