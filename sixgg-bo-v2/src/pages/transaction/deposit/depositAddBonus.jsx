import React, { useState, useEffect } from 'react';
import { Tag, Form, Input, Modal, Select, Divider, Progress, Spin } from 'antd';
import errorField from '../../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../../features/modalSlice';
import { dayjsDateTime, getCurrentTime } from '../../../components/convertDate';
import DateTimeField from '../../../customField/DateTimeField';
import ReferencePromotionField from '../../../customField/ReferencePromotionField';
import { useLazyGetPromotionBonusCalcualtionQuery } from '../../../features/promotion/promotionApiSlices';
import FormSpin from '../../../components/formSpin';
import { useAddBonusesMutation } from '../../../features/bonuses/bonusesApiSlices';
import { Icon } from '@iconify/react/dist/iconify.js';

const DepositAddBonusFormList = ({ onFormInstanceReady, apiErrors, record, t }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    const initialValues = record && {
        ...record,
        player: record.player,
        player_name: record.player_name,
        parent: record.id,
        parent_info: record.txid,
        ttime: dayjsDateTime(record.ttime),
        remark: '',
        amount: 0,
        ttype: 'BM',
    }

    const [promotion] = ['promotion',].map(field => Form.useWatch(field, form));
    const [isCalculatingBonusAmount, setisCalculatingBonusAmount] = useState(false);
    const [fetchBonusAmount, { loading, data }] = useLazyGetPromotionBonusCalcualtionQuery();
    const dispatch = useDispatch(); 

    useEffect(() => {
        if (promotion && record) {
            setisCalculatingBonusAmount(true);
            fetchBonusAmount({ filters: { promoid: promotion, deposit_id: record.id } })
            .unwrap()
            .then((payload) =>  {
                form.setFieldsValue({
                    amount: payload[0]?.amount
                });
            })
            .catch((error) => {
                form.setFieldsValue({
                    amount: 0 // Set amount to 0 if an error occurs
                });
                dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error) }));
            })
            .finally(() => {
                setisCalculatingBonusAmount(false);
            });
        }
    }, [promotion, record, fetchBonusAmount, dispatch, form]);
     
return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues}>
        <Form.Item
            name="player"
            label={t("common.Player")}
            validateStatus={apiErrors.player ? 'error' : ''}
            help={apiErrors.player}
            hidden
        >
            <Input disabled />
        </Form.Item>
        <Form.Item
            name="player_name"
            label={t("common.Player")}
            validateStatus={apiErrors.player_name ? 'error' : ''}
            help={apiErrors.player_name}
        >
            <Input disabled />
        </Form.Item>
        <Form.Item
            name="parent"
            label={t("common.Parent")}
            validateStatus={apiErrors.parent ? 'error' : ''}
            help={apiErrors.parent}
            hidden
        >
            <Input disabled />
        </Form.Item>
        <Form.Item
            name="parent_info"
            label={t("common.Parent")}
            validateStatus={apiErrors.parent ? 'error' : ''}
            help={apiErrors.parent}
        >
            <Input disabled />
        </Form.Item>
        <Form.Item
            name="ttype"
            label={t("common.Transfer Type")}
            validateStatus={apiErrors.ttype ? 'error' : ''}
            help={apiErrors.ttype}
            hasFeedback
        >
            <Select disabled >
                <Select.Option value="BM">{t("common.Bonus Manual")}</Select.Option>
            </Select>
        </Form.Item>
        <Divider>
            <Tag color="blue">{t("common.Info")}</Tag>
        </Divider>
        <DateTimeField name="ttime" label={t("common.Tx Time")} disabled/>
        <Form.Item
            name="state"
            label={t("common.State")}
            validateStatus={apiErrors.state ? 'error' : ''}
            help={apiErrors.state}
            hasFeedback
        >
            <Select disabled>
            <Select.Option value="approved">{t("common.Approved")}</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item
            name="remark"
            label={t("common.Remark")}
            validateStatus={apiErrors.remark ? 'error' : ''}
            help={apiErrors.remark}
            hasFeedback
        >
            <Input placeholder={t("common.Remark")} />
        </Form.Item>
        <Form.Item
            label={t("common.Bonus Amount")}
            name="amount"
            validateStatus={apiErrors.amount ? 'error' : ''}
            help={apiErrors.amount}
            hasFeedback
            rules={[{ 
                required: true, 
                message: t('requiredmessage.Please input bonus amount') }]}
        >
            <Input type="number" />
        </Form.Item>
        {isCalculatingBonusAmount && (
            <FormSpin />
        )}
        <ReferencePromotionField 
            name="promotion"
            label={t("common.Promotion")} 
            isRequired={false} 
            filterProp={{ is_active: true, bonus_type: "CA", promo_type: "DF", sites: record && record.sites }}
        />
    </Form>
  );
};

const FormModal = ({ open, onCreate, onCancel, apiErrors, record, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("common.Add Bonuses")}
        okText={t("common.Save")}
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
    >
    <DepositAddBonusFormList
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
        apiErrors={apiErrors}
        record={record}
        t={t}
      />
    </Modal>
  );
};

const DepositAddBonus = ({ record, t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [Create, { isLoading }] = useAddBonusesMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])
  
    const onCreates = async (values) => {
        values.player_id = values.player;
        values.ref = values.promotion;
        values.approved_at = getCurrentTime();
        values.wallet = record.wallet;
        setApiErrors([])
        
    try {
      values.id = record.id;
      const data = await Create(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: t('notisuccess.Manual Bonus Created Successfully')}));
      setOpen(false);
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
      setApiErrors(errorField(error));
    }
    };

  return (
    <>
        <Tag icon={<Icon icon="material-symbols:add" style={{marginRight: "5px"}} />} color="red" onClick={() => setOpen(true)} > 
          {t("common.Bonus")}
        </Tag>
        <FormModal
            open={open}
            onCreate={onCreates}
            onCancel={() => setOpen(false)}
            apiErrors={apiErrors}
            record={record && record}
            t={t}
      />
    </>
  );
};

export default DepositAddBonus;