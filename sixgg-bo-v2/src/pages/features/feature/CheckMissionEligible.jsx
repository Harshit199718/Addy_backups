import React, { useState, useEffect } from 'react';
import { Alert, Button, Col, Form, Input, Modal, Row, Select, Switch } from 'antd';
import errorField from '../../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../../features/modalSlice';
import ReferencePlayerField from '../../../customField/ReferencePlayerField';
import { convertIDToArray } from '../../../components/generalConversion';
import ReferenceSiteField from '../../../customField/ReferenceSiteField';
import ReferenceMissionField from '../../../customField/ReferenceMissionField';
import { missionCategory, recurrenceFrequencyChoices } from '../../../customField/customOption';
import { useLazyGetMissionEligibleQuery } from '../../../features/missions/missionsApiSlices';

const FormList = ({ onFormInstanceReady, apiErrors, missionMessage, t }) => {

    const [form] = Form.useForm();
    const [sites, category, recurrence_frequency] = [
        'sites',
        'category',
        'recurrence_frequency'
    ].map(field => Form.useWatch(field, form));

    form.user
    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    const missionMessageMappings = {
        limit_per_user: t("common.Limit Per User"),
        is_bankaccount_required: t("common.Is Bank Account Required"),
        active: t("common.Active"),
        type_offer: t('common.Offer Type'),
        quantity_offer: t('common.Quantity Offer'),
        max_token: t('common.Max Token'),
        token_expired_days: t("common.Token Expired"),
        recurrence_frequency: t("common.Recurrence Frequency"),
        first_deposit: t("common.First Deposit"),
        x_count_deposit: t("common.X Count Deposit"),
        x_amount_deposit: t("common.X Amount Deposit"),
        x_count_checkin: t("common.X Count Checkin"),
        coupon_tag: t("common.Coupon Tag"),
        limit: t("common.Limit"),
        sites: t("common.Sites"),
        x_amount_deposit___x_count_deposit: t("common.X Amount Deposit & X Count Deposit"),
        first_withdrawal: t("common.First Withdrawal"),
        x_count_withdrawal: t("common.X Count Withdrawal"),
        x_amount_withdrawal: t("common.X Amount Withdrawal"),
        min_withdrawal: t("common.Min Withdrawal"),
        x_amount_withdrawal___x_count_withdrawal: t("common.X Amount Withdrawal & X Count Withdrawal"),
    };

    return (
        <Form layout="vertical" form={form} name="form_in_modal" >
            <ReferenceSiteField name="sites" mode={null} apiErrors={apiErrors && apiErrors.sites}/>
            {sites &&
            <>
                <ReferencePlayerField name="player" label={t("referencefield.Player")} apiErrors={apiErrors && apiErrors.player} filterProp={{ sites: [sites] }} />
                <Form.Item
                    name="category"
                    label={t("common.Category")}
                    validateStatus={apiErrors.category ? 'error' : ''}
                    help={apiErrors.category}
                    hasFeedback
                >
                    <Select options={missionCategory(t)} />
                </Form.Item>
                <Form.Item
                    name="recurrence_frequency"
                    label={t("common.Recurrence Frequency")}
                    validateStatus={apiErrors.recurrence_frequency ? 'error' : ''}
                    help={apiErrors.recurrence_frequency}
                    rules={[
                    {
                        required: true,
                        message: `${t('requiredmessage.Please select recurrence frequency')}`,
                    },
                    ]}
                    hasFeedback
                >
                    <Select allowClear options={recurrenceFrequencyChoices(t)}/>
                </Form.Item>
                <ReferenceMissionField name="mission" label={t("common.Mission")} apiErrors={apiErrors && apiErrors.mission} filterProp={{ sites: [sites], category: category, recurrence_frequency: recurrence_frequency }}/>
                {missionMessage && Object.keys(missionMessage).length > 0 && (
                    <div className="mission-message">
                        {missionMessage?.can_apply ? (
                            <Alert type="success" message={`✅ ${t("common.Pass - the user is eligible for this mission and the Passed Count is")} ${missionMessage.passed_count}`} />
                        ) : (
                            <Alert type="error" message={`❌ ${t("common.Failed to claim and please find following conditions")} `}/>
                        )
                        }
                        {missionMessage?.message?.map((item, index) => (
                            <div className="condition" key={index}>
                                {Object.keys(item).map((key) => (
                                    <Row gutter={16} key={key}>
                                        <Col span={9}>
                                            <span className="condition-key">{missionMessageMappings[key]}</span>
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

const FormModal = ({ open, onCreate, onCancel, apiErrors, isFetching, missionMessage, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("feature.Check Mission Eligible")}
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
        missionMessage={missionMessage}
        t={t}
      />
    </Modal>
  );
};
const CheckMissionEligible = ({ t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [missionMessage, setMissionMessage] = useState([])
    const dispatch = useDispatch()
    const [CheckEligible, { isFetching }] = useLazyGetMissionEligibleQuery()

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
                    mission: values.mission,
                }
            })
            .unwrap()
            .then((payload) =>  {
                setMissionMessage(payload)
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
                {t("feature.Check Mission Eligible")}
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
                missionMessage={missionMessage}
                t={t}
            />
        </>
    );
};
export default CheckMissionEligible;