import React, { useState, useEffect } from 'react';
import { Button, Col, Divider, Form, Input, InputNumber, Modal, Row, Select, Switch, Tag, Image } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import ImageField from '../../customField/ImageField';
import ConvertImage from '../../components/convertImage';
import { missionCategory, missionOfferType, missionTemplateChoices, productsCategory, recurrenceFrequencyChoices } from '../../customField/customOption';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import ReferenceProductTransferField from '../../customField/ReferenceProductTransferField';
import CustomRichTextField from '../../customField/CustomRichTextField';
import FormSpin from '../../components/formSpin';
import { useGetMissionsIDQuery, useUpdateMissionsMutation } from '../../features/missions/missionsApiSlices';
import ConditionChecking from './ConditionChecking';
import SelectOption from '../../customToolbar/SelectOption';
import ReferenceCouponTagField from '../../customField/ReferenceCouponTagField';

const FormList = ({ onFormInstanceReady, id, apiErrors, t }) => {
  const [form] = Form.useForm();
  const [sites, type_offer, category, mission_template, selected_product, description] = [
    'sites', 
    'type_offer',
    'category',
    'mission_template', 
    'selected_product',
    'description'
  ].map(field => Form.useWatch(field, form));

  useEffect(() => {
      onFormInstanceReady(form);
  }, []);

  const { 
    data: record,
    isLoading: recordLoading,
  } = useGetMissionsIDQuery({ id: id });

  if(recordLoading){
    return <FormSpin loading={recordLoading}/>
  }

  const initialValues = record && {
    ...record
    }
  
  return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8}>
          <Row gutter={[16, 16]} style={{...ConditionChecking(mission_template, 'title')}} >
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="title"
                label={t("common.Title")}
                validateStatus={apiErrors.title ? 'error' : ''}
                help={apiErrors.title}
                hasFeedback
              >
                  <Input placeholder={t("common.Title")} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} >
            <Col xs={24} sm={24} md={12} style={{...ConditionChecking(mission_template, 'sequence')}} >
              <Form.Item
                name="sequence"
                label={t("common.Sequence")}
                validateStatus={apiErrors.sequence ? 'error' : ''}
                help={apiErrors.sequence}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Sequence")} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} style={{...ConditionChecking(mission_template, 'sites')}} >
              <ReferenceSiteField name="sites" label={t("common.Sites")} apiErrors={apiErrors && apiErrors.sites} />
            </Col>
          </Row>
          <Row gutter={[16, 16]} >
            <Col xs={24} sm={24} md={12} style={{...ConditionChecking(mission_template, 'category')}}>
              <Form.Item
                name="category"
                label={t("common.Category")}
                validateStatus={apiErrors.category ? 'error' : ''}
                help={apiErrors.category}
                hasFeedback
              >
                <Select options={missionCategory(t)} defaultValue={'deposit'} />
              </Form.Item>
            </Col>
            {category &&
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="mission_template"
                  label={t("common.Choose Guideline Template")}
                  validateStatus={apiErrors.mission_template ? 'error' : ''}
                  help={apiErrors.mission_template}
                  hasFeedback
                >
                  <Select options={missionTemplateChoices(t)} allowClear/> 
                </Form.Item>
              </Col>
            }
          </Row>
            <ImageField name="image" label={t("common.Image")} apiErrors={apiErrors && apiErrors.image} />
          {/* <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} style={{...ConditionChecking(mission_template, 'require_approval')}} >
              <Form.Item 
                name="require_approval"
                label={t("common.Require Approval")}
              >
                <Switch checkedChildren={t("common.Yes")} unCheckedChildren={t("common.No")} />
              </Form.Item>
            </Col>
          </Row> */}
          <Row gutter={[16, 16]} >
            <Col xs={24} sm={24} md={12} style={{...ConditionChecking(mission_template, 'is_bankaccount_required')}} >
            <Divider>
              <Tag color="purple">{t("common.Is Bank Account Required")}</Tag>
            </Divider>
              <Form.Item 
                name="is_bankaccount_required"
                label={t("common.Is Bank Account Required")}
              >
                <Switch checkedChildren={t("common.Yes")} unCheckedChildren={t("common.No")} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} style={{...ConditionChecking(mission_template, 'active')}} >
            <Divider>
              <Tag color="purple">{t("common.Active")}</Tag>
            </Divider>
              <Form.Item 
                name="active"
                label={t("common.Active")}
              >
                <Switch checkedChildren={t("common.Active")} unCheckedChildren={t("common.Inactive")} defaultChecked />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} style={{...ConditionChecking(mission_template, 'type_offer')}} >
            <Divider>
              <Tag color="purple">{t("common.Offer Type")}</Tag>
            </Divider>
              <Form.Item
                name="type_offer"
                label={t("common.Offer Type")}
                validateStatus={apiErrors.type_offer ? 'error' : ''}
                help={apiErrors.type_offer}
                rules={[
                  {
                      required: true,
                      message: `${t('requiredmessage.Please select offer type')}`,
                  },
                ]}
                hasFeedback
              >
                <Select options={missionOfferType(t)} allowClear />
              </Form.Item>
            </Col>
          </Row>
          {type_offer === "token" && (
          <>
          <Row gutter={[16, 16]}>
            <Divider>
              <Tag color="purple">{t("common.Token")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={24} style={{...ConditionChecking(mission_template, 'quantity_offer')}} >
              <Form.Item
                name="quantity_offer"
                label={t("common.Quantity Offer")}
                validateStatus={apiErrors.quantity_offer ? 'error' : ''}
                help={apiErrors.quantity_offer}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Quantity Offer")} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} style={{...ConditionChecking(mission_template, 'max_token')}} >
              <Form.Item
                name="max_token"
                label={t("common.Max Token")}
                validateStatus={apiErrors.max_token ? 'error' : ''}
                help={apiErrors.max_token}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Max Token")} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} style={{...ConditionChecking(mission_template, 'token_expired_days')}} >
              <Form.Item
                name="token_expired_days"
                label={t("common.Token Expired Days")}
                validateStatus={apiErrors.token_expired_days ? 'error' : ''}
                help={apiErrors.token_expired_days}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Token Expired Days")} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          </>
          )}
          {/* {type_offer === "coupon" && (
          <Row gutter={[16, 16]}>
            <Divider>
              <Tag color="purple">{t("common.Coupon")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={12} style={{...ConditionChecking(mission_template, 'max_coupon')}} >
              <Form.Item
                name="max_coupon"
                label={t("common.Max Coupon")}
                validateStatus={apiErrors.max_coupon ? 'error' : ''}
                help={apiErrors.max_coupon}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Max Coupon")} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} style={{...ConditionChecking(mission_template, 'coupon_tag')}} >
              <ReferenceCouponTagField name="coupon_tag" />
            </Col>
          </Row>
          )}
          {type_offer === "bonus" && (
          <Row gutter={[16, 16]} >
            <Divider>
              <Tag color="purple">{t("common.Bonus")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={6}>
              <Form.Item 
                name="first_bonus"
                label={t("common.First Bonus")}
              >
                <Switch checkedChildren={t("common.Yes")} unCheckedChildren={t("common.No")} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={9} >
              <Form.Item
                name="min_bonus"
                label={t("common.Min Bonus")}
                validateStatus={apiErrors.min_bonus ? 'error' : ''}
                help={apiErrors.min_bonus}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Min Bonus")} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={9} >
              <Form.Item
                name="max_bonus_amount"
                label={t("common.Max Bonus Amount")}
                validateStatus={apiErrors.max_bonus_amount ? 'error' : ''}
                help={apiErrors.max_bonus_amount}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Max Bonus Amount")} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="x_count_bonus"
                label={t("common.X Count Bonus")}
                validateStatus={apiErrors.x_count_bonus ? 'error' : ''}
                help={apiErrors.x_count_bonus}
                hasFeedback
              >
                <InputNumber placeholder={t("common.X Count Bonus")} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} >
              <Form.Item
                name="x_amount_bonus"
                label={t("common.X Amount Bonus")}
                validateStatus={apiErrors.x_amount_bonus ? 'error' : ''}
                help={apiErrors.x_amount_bonus}
                hasFeedback
              >
                <InputNumber placeholder={t("common.X Amount Bonus")} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} >
              <Form.Item
                name="bonus_percent"
                label={t("common.Bonus Percent")}
                validateStatus={apiErrors.bonus_percent ? 'error' : ''}
                help={apiErrors.bonus_percent}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Bonus Percent")} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} >
              <Form.Item
                name="bonus_amount"
                label={t("common.Bonus Amount")}
                validateStatus={apiErrors.bonus_amount ? 'error' : ''}
                help={apiErrors.bonus_amount}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Bonus Amount")} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          )} */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} style={{...ConditionChecking(mission_template, 'recurrence_frequency')}} > 
              <Divider>
                <Tag color="purple">{t("common.Recurrence Frequency")}</Tag>
              </Divider>
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
            </Col>
            <Col xs={24} sm={24} md={12} style={{...ConditionChecking(mission_template, 'limit_per_user')}} >
              <Divider>
                <Tag color="purple">{t("common.Limit Per User")}</Tag>
              </Divider>
              <Form.Item
                name="limit_per_user"
                label={t("common.Limit Per User")}
                validateStatus={apiErrors.limit_per_user ? 'error' : ''}
                help={apiErrors.limit_per_user}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Limit Per User")} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      <Col xs={24} sm={24} md={8}>
        {category === 'deposit' && (
          <Row gutter={[16, 16]}>
            <Divider>
              <Tag color="purple">{t("common.Deposit")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={12} style={{ ...ConditionChecking(mission_template, 'first_deposit') }}>
              <Form.Item
                name="first_deposit"
                label={t("common.First Deposit")}
              >
                <Switch checkedChildren={t("common.Yes")} unCheckedChildren={t("common.No")} />
              </Form.Item>
            </Col>
            {/* <Col xs={24} sm={24} md={12} style={{ ...ConditionChecking(mission_template, 'min_deposit') }}>
              <Form.Item
                name="min_deposit"
                label={t("common.Min Deposit")}
                validateStatus={apiErrors.min_deposit ? 'error' : ''}
                help={apiErrors.min_deposit}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Min Deposit")} style={{ width: '100%' }} />
              </Form.Item>
            </Col> */}
            <Col xs={24} sm={24} md={12} style={{ ...ConditionChecking(mission_template, 'x_count_deposit') }}>
              <Form.Item
                name="x_count_deposit"
                label={t("common.X Count Deposit")}
                validateStatus={apiErrors.x_count_deposit ? 'error' : ''}
                help={apiErrors.x_count_deposit}
                hasFeedback
              >
                <InputNumber placeholder={t("common.X Count Deposit")} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} style={{ ...ConditionChecking(mission_template, 'x_amount_deposit') }}>
              <Form.Item
                name="x_amount_deposit"
                label={t("common.X Amount Deposit")}
                validateStatus={apiErrors.x_amount_deposit ? 'error' : ''}
                help={apiErrors.x_amount_deposit}
                hasFeedback
              >
                <InputNumber placeholder={t("common.X Amount Deposit")} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        )}
        {category === 'withdrawal' && (
          <Row gutter={[16, 16]}>
            <Divider>
              <Tag color="purple">{t("common.Withdrawal")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={12} style={{ ...ConditionChecking(mission_template, 'first_withdrawal') }}>
              <Form.Item
                name="first_withdrawal"
                label={t("common.First Withdrawal")}
              >
                <Switch checkedChildren={t("common.Yes")} unCheckedChildren={t("common.No")} />
              </Form.Item>
            </Col>
            {/* <Col xs={24} sm={24} md={12} style={{ ...ConditionChecking(mission_template, 'min_withdrawal') }}>
              <Form.Item
                name="min_withdrawal"
                label={t("common.Min Withdrawal")}
                validateStatus={apiErrors.min_withdrawal ? 'error' : ''}
                help={apiErrors.min_withdrawal}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Min Withdrawal")} style={{ width: '100%' }} />
              </Form.Item>
            </Col> */}
            <Col xs={24} sm={24} md={12} style={{ ...ConditionChecking(mission_template, 'x_count_withdrawal') }}>
              <Form.Item
                name="x_count_withdrawal"
                label={t("common.X Count Withdrawal")}
                validateStatus={apiErrors.x_count_withdrawal ? 'error' : ''}
                help={apiErrors.x_count_withdrawal}
                hasFeedback
              >
                <InputNumber placeholder={t("common.X Count Withdrawal")} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} style={{ ...ConditionChecking(mission_template, 'x_amount_withdrawal') }}>
              <Form.Item
                name="x_amount_withdrawal"
                label={t("common.X Amount Withdrawal")}
                validateStatus={apiErrors.x_amount_withdrawal ? 'error' : ''}
                help={apiErrors.x_amount_withdrawal}
                hasFeedback
              >
                <InputNumber placeholder={t("common.X Amount Withdrawal")} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        )}
        {category === 'turnover' && (
          <Row gutter={[16, 16]}>
            <Divider>
              <Tag color="purple">{t("common.Turnover")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={12} style={{ ...ConditionChecking(mission_template, 'x_turnover_amount') }}>
              <Form.Item
                name="x_turnover_amount"
                label={t("common.X Turnover Amount")}
                validateStatus={apiErrors.x_turnover_amount ? 'error' : ''}
                help={apiErrors.x_turnover_amount}
                hasFeedback
              >
                <InputNumber placeholder={t("common.X Turnover Amount")} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            {/* <Col xs={24} sm={24} md={12} style={{ ...ConditionChecking(mission_template, 'min_turnover_amount') }}>
              <Form.Item
                name="min_turnover_amount"
                label={t("common.Min Turnover Amount")}
                validateStatus={apiErrors.min_turnover_amount ? 'error' : ''}
                help={apiErrors.min_turnover_amount}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Min Turnover Amount")} style={{ width: '100%' }} />
              </Form.Item>
            </Col> */}
            <Col xs={24} sm={24} md={12}  style={{ ...ConditionChecking(mission_template, 'product_category') }}>
            <Form.Item
                name="product_category"
                label={t('common.Product Category')}
                validateStatus={apiErrors.product_category ? 'error' : ''}
                help={apiErrors.product_category}
                hasFeedback
              >
                <SelectOption options={productsCategory(t)} width={"100%"} />
              </Form.Item>
            </Col>
          </Row>
        )}
        {category === 'turnover' && (
          <Row gutter={[16, 16]}>
            <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} style={{ ...ConditionChecking(mission_template, 'selected_product') }}>
              <Divider>
                <Tag color="purple">{t("common.Select Product")}</Tag>
              </Divider>
              <ReferenceProductTransferField name="selected_product" label={null} apiErrors={apiErrors && apiErrors.product} filterProp={{ sites: sites }} targetKeys={selected_product && selected_product} />
            </Col>
            </Row>
          </Row>
        )}
      </Col>
          {/* <Row gutter={[16, 16]} >
            <Divider>
              <Tag color="purple">{t("common.Checkin")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={12} style={{...ConditionChecking(mission_template, 'x_count_checkin')}} >
              <Form.Item
                name="x_count_checkin"
                label={t("common.X Count Checkin")}
                validateStatus={apiErrors.x_count_checkin ? 'error' : ''}
                help={apiErrors.x_count_checkin}
                hasFeedback
              >
                <InputNumber placeholder={t("common.X Count Checkin")} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} style={{...ConditionChecking(mission_template, 'x_count_deposit_checkin')}} >
              <Form.Item
                name="x_count_deposit_checkin"
                label={t("common.X Count Deposit Checkin")}
                validateStatus={apiErrors.x_count_deposit_checkin ? 'error' : ''}
                help={apiErrors.x_count_deposit_checkin}
                hasFeedback
              >
                <InputNumber placeholder={t("common.X Count Deposit Checkin")} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} style={{...ConditionChecking(mission_template, 'x_amount_deposit_checkin')}} >
              <Form.Item
                name="x_amount_deposit_checkin"
                label={t("common.X Amount Deposit Checkin")}
                validateStatus={apiErrors.x_amount_deposit_checkin ? 'error' : ''}
                help={apiErrors.x_amount_deposit_checkin}
                hasFeedback
              >
                <InputNumber placeholder={t("common.X Amount Deposit Checkin")} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row> */}
        <Col xs={24} sm={24} md={24} style={{...ConditionChecking(mission_template, 'description')}}>
          <CustomRichTextField name="description" label={t("common.Description")} value={description}/>
        </Col>
      </Row>
    </Form>
  );
};

const FormModal = ({ open, onUpdate, onCancel, apiErrors, id, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
      open={open}
      title={t("common.Update Mission")}
      okText={t("common.Update")}
      cancelText={t("common.Cancel")}
      okButtonProps={{
        autoFocus: true,
      }}
      onCancel={onCancel}
      destroyOnClose
      onOk={async () => {
        try {
          const values = await formInstance?.validateFields();
          onUpdate(values);
        } catch (error) {
        }
      }}
      width={1600}
      style={{ top: 5 }}
    >
      <FormList
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
        id={id}
        apiErrors={apiErrors}
        t={t}
      />
    </Modal>
  );
};

const EditMissions = ({ id, t }) => {
  const [open, setOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState([])
  const [Update, { isLoading }] = useUpdateMissionsMutation();
  
  const dispatch = useDispatch()

  useEffect(() => {
    if(open){
      dispatch(openModal());
    } else {
      dispatch(closeModal());
    }
  },[open])

  const onUpdate = async (values) => {

    if (Array.isArray(values.image)) {
      values.image = await ConvertImage(values.image)
    } else {
      delete values.image
    }
    
    setApiErrors([])
    try {
      values.id = id;
      const data = await Update(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Mission Updated Successfully')}`}));

      setOpen(false);
    } catch (error) {
      setApiErrors(errorField(error));
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        {t("common.Edit")}
      </Button>
      <FormModal
        open={open}
        onUpdate={onUpdate}
        onCancel={() => {
          setOpen(false)
          setApiErrors([])
        }}
        apiErrors={apiErrors}
        id={id && id}
        t={t}
      />
    </>
  );
};
export default EditMissions;