import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, Radio, Row, Select, Switch } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import ReferenceBankField from '../../customField/ReferenceBankField';
import ReferenceRankField from '../../customField/ReferenceRankField';
import errorField from '../../features/error/errorField';
import { useAddMerchantBankMutation } from '../../features/merchantbankaccounts/merchantBankAccountsApiSlices';
import { useDispatch, useSelector } from 'react-redux';
import { notification, openModalTab, closeModalTab } from '../../features/modalSlice';
import ReferenceProductField from '../../customField/ReferenceProductField';
import ReferencePlayerIDField from '../../customField/ReferencePlayerIDField';
import { creditType } from '../../customField/customOption';
import { formattedDateTime, getCurrentTime } from '../../components/convertDate';
import { useStartAppGameAccountMutation } from '../../features/gameaccount/gameAccountApiSlices';
import ImageField from '../../customField/ImageField';
import ReferenceMerchantBankAccountField from '../../customField/ReferenceMerchantBankAccountField';
import SelectTransactionStateField from '../../customField/SelectTransactionStateField';
import ConvertImage from '../../components/convertImage';
import DateTimeField from '../../customField/DateTimeField';
import { useTranslation } from 'react-i18next';


const FormList = ({ onFormInstanceReady, apiErrors, record, player, t }) => {
    const [requiredDeposit, setRequiredDeposit] = useState(false);

    const defaultInitialValues = record ? {
      product: record.product.id,
    } : {}
    const initialValues = {
        player: player.id,
        credit_type: 'CA',
        amount_transfer: 0,
        ttime: getCurrentTime(),
        is_deposit_required: false,
        second_wallet_amount: 0,
        state: 'approved',
        remark: 'Wish you win big big, thanks you !!!',
        ...defaultInitialValues
    }
    const [form] = Form.useForm();

    const [amount, bonus, second_wallet_amount] = [
      'amount',
      'bonus',
      'second_wallet_amount',
    ].map(field => Form.useWatch(field, form));

    useEffect(() => {
      const result = (Number(amount) || 0) + (Number(bonus) || 0) - (Number(second_wallet_amount) || 0);
      form.setFieldValue('actual_wallet_amount', result || 0);
    }, [amount, bonus, second_wallet_amount]);

    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

  return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues} >
      <Row gutter={[16, 16]}>
        <Col span={requiredDeposit ? 12 : 24}>
          <ReferenceProductField name="product" label={t("common.Product")} apiErrors={apiErrors && apiErrors.product} disabled={record} filterProp={{ ltype: ['app'], sites: player.sites }}/>
          <ReferencePlayerIDField name="player" label={t("common.Player")} apiErrors={apiErrors && apiErrors.player} playerID={player.id} disabled={record}/>
          <Form.Item
            name="credit_type"
            label={t("common.Credit Type")}
            validateStatus={apiErrors.credit_type ? 'error' : ''}
            help={apiErrors.credit_type}
            rules={[
              {
                  required: true,
                  message: `${t('requiredmessage.Please select the credit type!')}`,
              },
            ]}
            hasFeedback
          >
            <Select options={creditType(t)} defaultValue={'CA'}/>
          </Form.Item>
          <Form.Item
            name="amount_transfer"
            label={t("common.Amount Transfer")}
            validateStatus={apiErrors.amount_transfer ? 'error' : ''}
            help={apiErrors.amount_transfer}
            rules={[
            {
                required: true,
                message: `${t('requiredmessage.Please input the amount transfer to the game')}`,
            },
            ]}
            hasFeedback
          >
            <InputNumber style={{ width: '100%' }} placeholder={t("common.Amount Transfer")} min={0}/>
          </Form.Item>
          <DateTimeField name="ttime" label={t("common.Transaction Time")} apiErrors={apiErrors && apiErrors.ttime}/>
          <Form.Item 
            name="is_deposit_required"
            label={t("common.Is Deposit Required")}
          >
            <Switch checkedChildren={t("common.Required Deposit")} unCheckedChildren={t("common.Not Require Deposit")} onChange={() => setRequiredDeposit(!requiredDeposit)}/>
          </Form.Item>
        </Col>
        {requiredDeposit && 
          <>
          <Col span={12}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="amount"
                  label={t("common.Deposit Amount")}
                  validateStatus={apiErrors.amount ? 'error' : ''}
                  help={apiErrors.amount}
                  rules={[
                  {
                      required: requiredDeposit,
                      message: `${t('requiredmessage.Please input the amount of the deposit')}`,
                  },
                  ]}
                  hasFeedback
                >
                  <InputNumber style={{ width: '100%' }} placeholder={t("common.Deposit Amount")} min={0}/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="bonus"
                  label={t("common.Bonus Amount")}
                  validateStatus={apiErrors.bonus ? 'error' : ''}
                  help={apiErrors.bonus}
                  hasFeedback
                >
                  <InputNumber style={{ width: '100%' }} type="number" placeholder={t("common.Bonus Amount")} min={0}/>
                </Form.Item>
              </Col>
            </Row>
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
                        message: `${t('requiredmessage.Please input the hold amount of the deposit')}`,
                    },
                    ]}
                    hasFeedback
                  >
                    <InputNumber style={{ width: '100%' }} placeholder={t("common.Hold Amount")} min={0} max={((Number(amount) || 0) + (Number(bonus) || 0))}/>
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
            <ImageField name="proof" label={t("common.Receipt")} apiErrors={apiErrors && apiErrors.proof} require={requiredDeposit}/>
            <ReferenceMerchantBankAccountField 
              name="merchant_bank_account" 
              label={t("common.Merchant Bank A/C" )}
              placeholder={t("common.Merchant Bank A/C" )}
              apiErrors={apiErrors && apiErrors.merchant_bank_account} 
              filterProp={{sites: player.sites}}
            />
            <SelectTransactionStateField name="state" label={t("common.State")} apiErrors={apiErrors && apiErrors.state}/>
            <Form.Item
              name="remark"
              label={t("common.Remark")}
              validateStatus={apiErrors.remark ? 'error' : ''}
              help={apiErrors.remark}
              rules={[
                {
                    required: requiredDeposit,
                    message: `${t('requiredmessage.Please input the remark')}`,
                },
              ]}
              hasFeedback
            >
              <Input placeholder={t("common.Remark")} />
            </Form.Item>
          </Col>
          </>
        }
        </Row>
    </Form>
  );
};

const FormModal = ({ open, onCreate, onCancel, apiErrors, record, player, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
      open={open}
      title={record ? <span>{t("common.Start")} {record.product.name} ({record.product.category}) </span> : t('common.Start App Game')}
      okText={t("common.Start")}
      cancelText={t("common.Cancel")}
      okButtonProps={{
        autoFocus: true,
      }}
      onCancel={onCancel}
      destroyOnClose
      onOk={async () => {
        try {
          const values = await formInstance?.validateFields();

          onCreate(values);
        } catch (error) {
        }
      }}
      width={1000}
    >
      <FormList
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
        apiErrors={apiErrors}
        record={record}
        player={player}
        t={t}
      />
    </Modal>
  );
};
const StartAppGameAccount = ({isCreateNew=false, record=null, t}) => {
  const [open, setOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState([])
  const [StartAppGame, { isLoading }] = useStartAppGameAccountMutation();
  const player = useSelector((state) => state.general.player);

  const dispatch = useDispatch()

  useEffect(() => {
    if(open){
      dispatch(openModalTab());
    } else {
      dispatch(closeModalTab());
    }
  },[open])
  
  const onStart = async (values) => {
    values.ttime = formattedDateTime(values.ttime)
    if(values.is_deposit_required){
      values.proof = await ConvertImage(values.proof)
      values.wallet = player.wallet_id
    }
    setApiErrors([])
    try {
      const data = await StartAppGame(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Start App Game Successfully')}`}));
      setOpen(false);
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
      setApiErrors(errorField(error));
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        {isCreateNew ? t('common.Create') : t('common.Start Game')}
      </Button>
      <FormModal
        open={open}
        onCreate={onStart}
        onCancel={() => {
          setOpen(false)
          setApiErrors([])
        }}
        apiErrors={apiErrors}
        record={record}
        player={player}
        t={t}
      />
    </>
  );
};
export default StartAppGameAccount;