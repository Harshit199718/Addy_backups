import React, { useState, useEffect } from 'react';
import { Alert, Button, Col, Form, Input, Modal, Row, Select, Switch } from 'antd';
import errorField from '../../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../../features/modalSlice';
import { useLazyGetPromotionEligibleQuery } from '../../../features/promotion/promotionApiSlices';
import ReferencePlayerField from '../../../customField/ReferencePlayerField';
import ReferencePromotionField from '../../../customField/ReferencePromotionField';
import { convertIDToArray } from '../../../components/generalConversion';
import ReferenceSiteField from '../../../customField/ReferenceSiteField';

const FormList = ({ onFormInstanceReady, apiErrors, promotionMessage, t }) => {

    const [form] = Form.useForm();
    const [sites] = [
        'sites',
    ].map(field => Form.useWatch(field, form));

    form.user
    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    const promotionMessageMappings = {
        limit_per_user: t("common.Limit Per User"),
        is_product_launch: t("common.Is Product Launch"),
        group_applied_can_claim_promo_group: t("common.Group Promotion Can Claim Together"),
        group_applied: t("common.Group Promotion Applied"),
        is_bankaccount_required: t("common.Is Bank Account Required"),
        new_member: t("common.New Member"),
        first_deposit: t("common.First Deposit"),
        amount_in_x_days: t("common.Amount in X Days"),
        min_x_deposit_min_y_amount: t("common.Min X Deposit Min Y Amount"),
        is_daily_x_deposit: t("common.Is Daily Deposit"),
        start_date: t("common.Start Date"),
        start_time: t("common.Start Time"),
        end_date: t("common.End Date"),
        end_time: t("common.End Time"),
        not_deposit_yet: t("common.Not_Deposited_Yet"),
        num_deposits_required: t("common.Num Deposits Required"),
        limit: t("common.Limit"),
        active: t("common.Active"),
        min_deposit: t("common.Min Deposit"),
        total_deposit_required: t("common.Total Deposit Required"),
        deposit_not_needed: t("common.Deposit Not Needed"),
        bonus_amount: t("common.Bonus Amount"),
        promotion_day: t("common.Promotion Day"),
        referral_check: t("common.Referral Check"),
        referral_deposit_check: t("common.Referral Deposit Check"),
        min_x_deposit_min_y_amount_z_downline: t("common.Min X Deposit Min Y Amount Z Downline"),
        sites: t("common.Sites"),
        first_deposit_CA: t("common.First Deposit CA"),
        first_deposit_CH: t("common.First Deposit CH"),
        recurrence_frequency: t("common.Recurrence Frequency"),
        reward_type_deposit: t("common.Reward Type Deposit"),
        reward_type: t("common.Reward Type"),
        check_promotion_applied_deposit_date: t("common.Check Promotion Applied Deposit Date")
    };

    return (
        <Form layout="vertical" form={form} name="form_in_modal" >
            <ReferenceSiteField name="sites" mode={null} apiErrors={apiErrors && apiErrors.sites}/>
            {sites &&
            <>
                <ReferencePlayerField name="player" label={t("referencefield.Player")} apiErrors={apiErrors && apiErrors.player} filterProp={{ sites: [sites] }} />
                <ReferencePromotionField name="promotion" label={t("common.Promotion")} apiErrors={apiErrors && apiErrors.promotion} filterProp={{ sites: [sites] }}/>
                {promotionMessage && Object.keys(promotionMessage).length > 0 && (
                    <div className="promotion-message">
                        {promotionMessage?.can_apply ? (
                            <Alert type="success" message={`✅ ${t("common.Pass and bonus amount is")} ${promotionMessage.amount}`} />
                        ) : (
                            <Alert type="error" message={`❌ ${t("common.Failed to claim and please find following conditions")} `}/>
                        )
                        }
                        {promotionMessage?.message?.map((item, index) => (
                            <div className="condition" key={index}>
                                {Object.keys(item).map((key) => (
                                    <Row gutter={16} key={key}>
                                        <Col span={9}>
                                            <span className="condition-key">{promotionMessageMappings[key]}</span>
                                        </Col>
                                        <Col span={1}>
                                            :
                                        </Col>
                                        <Col span={14}>
                                            <span className={`condition-status ${item[key] === "Pass" ? "pass" : "fail"}`}>
                                                {item[key] === "Pass" ? <span> ✅ {t("common.Pass")}</span> : 
                                                    item[key] === "no_checking" ? 
                                                        `❌ ${t('common.' + item[key])}`
                                                    :
                                                        `⛔ ${item[key]}`
                                                }
                                            </span>
                                        </Col>
                                    </Row>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </>
            }
        </Form>
    );
};

const FormModal = ({ open, onCreate, onCancel, apiErrors, isFetching, promotionMessage, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("feature.Check Promotion Eligible")}
        okText={t("common.Check")}
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
        confirmLoading={isFetching}
    >
      <FormList
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
        apiErrors={apiErrors}
        promotionMessage={promotionMessage}
        t={t}
      />
    </Modal>
  );
};
const CheckPromotionEligible = ({ t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [promotionMessage, setPromotionMessage] = useState([])
    const dispatch = useDispatch()
    const [CheckEligible, { isFetching }] = useLazyGetPromotionEligibleQuery()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])
  
    const onCreate = async (values) => {
        const [player, wallet] = convertIDToArray(values.player)
        setApiErrors([])
        try {
            CheckEligible({
                filters: { 
                    player: player,
                    promotion: values.promotion,
                }
            })
            .unwrap()
            .then((payload) =>  {
                setPromotionMessage(payload)
                payload?.can_apply ?
                    dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Can Apply!')}`}))
                :
                    dispatch(notification({notification_status: 'error', notification_message: `${t('notierror.Cannot Apply!')}`}))
            })
            .catch((error) => {
                dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error) }));
            })
        } catch (error) {
            dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error) }));
            setApiErrors(errorField(error));
        }
    };

    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)} style={{ width: "100%", height: 120, whiteSpace: 'wrap' }}>
                {t("feature.Check Promotion Eligible")}
            </Button>
            <FormModal
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false)
                    setApiErrors([])
                }}
                apiErrors={apiErrors}
                isFetching={isFetching}
                promotionMessage={promotionMessage}
                t={t}
            />
        </>
    );
};
export default CheckPromotionEligible;