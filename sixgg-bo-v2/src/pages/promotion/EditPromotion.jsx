import React, { useState, useEffect } from 'react';
import { Button, Col, Divider, Form, Input, InputNumber, Modal, Row, Select, Switch, Tag, Image } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import ImageField from '../../customField/ImageField';
import ConvertImage from '../../components/convertImage';
import { ctcTemplateChoices, dayChoices, promotionBonusType, promotionCategoryChoices, promotionRewardType, promotionType, recurrenceFrequencyChoices, turnoverRolloverType } from '../../customField/customOption';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import ReferenceProductTransferField from '../../customField/ReferenceProductTransferField';
import DateField from '../../customField/DateField';
import TimeField from '../../customField/TimeField';
import CustomRichTextField from '../../customField/CustomRichTextField';
import { useUpdatePromotionMutation, useGetPromotionIDQuery } from '../../features/promotion/promotionApiSlices';
import { dayjsDateTime, dayjsTime, formattedDate, formattedTime } from '../../components/convertDate';
import FormSpin from '../../components/formSpin';
import ReferencePromotionGroupField from '../../customField/ReferencePromotionGroupField';
import CTCConditionChecking from './CTCConditionChecking';

const FormList = ({ onFormInstanceReady, id, apiErrors, t }) => {
  const [form] = Form.useForm();
  const [sites, promo_type, selected_product, description, header_description, promo_template, reward_type, rebate_product] = [
    'sites', 
    'promo_type', 
    'selected_product',
    'description',
    'header_description',
    'promo_template',
    'reward_type',
    'rebate_product'
  ].map(field => Form.useWatch(field, form));

  useEffect(() => {
      onFormInstanceReady(form);
  }, []);

  const { 
    data: record,
    isLoading: recordLoading,
  } = useGetPromotionIDQuery({ id: id });

  const initialValues = record && {
    ...record,
    start_date: dayjsDateTime(record.start_date),
    end_date: dayjsDateTime(record.end_date),
    start_time: dayjsTime(record.start_time),
    end_time: dayjsTime(record.end_time),
  }

  if(recordLoading){
    return <FormSpin loading={recordLoading}/>
  }
  
  return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={promo_type === 'DF' ? 12 : 8}>
          <Row gutter={[16, 16]} style={{...CTCConditionChecking(promo_template, 'title')}}>
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
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} style={{...CTCConditionChecking(promo_template, 'sequence')}}>
              <Form.Item
                name="sequence"
                label={t("common.Sequence")}
                validateStatus={apiErrors.sequence ? 'error' : ''}
                help={apiErrors.sequence}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Sequence")} style={{ width: '100%' }} min={0}/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} style={{...CTCConditionChecking(promo_template, 'sites')}}>
              <ReferenceSiteField name="sites" label={t("common.Sites")} apiErrors={apiErrors && apiErrors.sites} />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} style={{...CTCConditionChecking(promo_template, 'promo_type')}}>
              <Form.Item
                name="promo_type"
                label={t("common.Promotion Type")}
                validateStatus={apiErrors.promo_type ? 'error' : ''}
                help={apiErrors.promo_type}
                hasFeedback
              >
                <Select options={promotionType(t)} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              {promo_type === "DF" ?
                <Form.Item
                  name="category"
                  label={t("common.Promotion Category")}
                  validateStatus={apiErrors.category ? 'error' : ''}
                  help={apiErrors.category}
                  hasFeedback
                >
                  <Select options={promotionCategoryChoices(t)} />
                </Form.Item>
              :
                <Form.Item
                  name="promo_template"
                  label={t("common.Select Template here for Guideline")}
                  validateStatus={apiErrors.promo_template ? 'error' : ''}
                  help={apiErrors.promo_template}
                  hasFeedback
                >
                  <Select options={ctcTemplateChoices(t)} allowClear/>
                </Form.Item>
            }
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            {sites?.length > 0 &&
            <Col xs={24} sm={24} md={promo_type === 'DF' ? 0 : 12} style={{...CTCConditionChecking(promo_template, 'group')}}>
              <ReferencePromotionGroupField name="group" label={t("common.Promotion Group")} apiErrors={apiErrors && apiErrors.promotion_group} filterProp={{ sites: sites }}/>
            </Col>
            }
            <Col xs={24} sm={24} md={promo_type === 'DF' ? 24 : 12} style={{...CTCConditionChecking(promo_template, 'bonus_type')}}>
              <Form.Item
                name="bonus_type"
                label={t("common.Bonus Type")}
                validateStatus={apiErrors.bonus_type ? 'error' : ''}
                help={apiErrors.bonus_type}
                hasFeedback
              >
                <Select options={promotionBonusType(t)} disabled/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} style={{...CTCConditionChecking(promo_template, 'bonus_percent')}}>
              <Form.Item
                name="bonus_percent"
                label={t("common.Bonus Percent")}
                validateStatus={apiErrors.bonus_percent ? 'error' : ''}
                help={apiErrors.bonus_percent}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Bonus Percent")} style={{ width: '100%' }} min={0}/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} style={{...CTCConditionChecking(promo_template, 'bonus_amount')}}>
              <Form.Item
                name="bonus_amount"
                label={t("common.Bonus Amount")}
                validateStatus={apiErrors.bonus_amount ? 'error' : ''}
                help={apiErrors.bonus_amount}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Bonus Amount")} style={{ width: '100%' }} min={0}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} style={{...CTCConditionChecking(promo_template, 'max_bonus_amount')}}>
              <Form.Item
                name="max_bonus_amount"
                label={t("common.Max Bonus Amount")}
                validateStatus={apiErrors.max_bonus_amount ? 'error' : ''}
                help={apiErrors.max_bonus_amount}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Max Bonus Amount")} style={{ width: '100%' }} min={0}/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} style={{...CTCConditionChecking(promo_template, 'max_payout_amount')}}>
              <Form.Item
                name="max_payout_amount"
                label={t("common.Max Payout Amount")}
                validateStatus={apiErrors.max_payout_amount ? 'error' : ''}
                help={apiErrors.max_payout_amount}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Max Payout Amount")} style={{ width: '100%' }} min={0}/>
              </Form.Item>
            </Col>
          </Row>
          <ImageField name="image" label={t("common.Promotion Image")} apiErrors={apiErrors && apiErrors.image} />
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} style={{...CTCConditionChecking(promo_template, 'ctc_background_overwrite_enabled')}}>
              <Form.Item 
                name="ctc_background_overwrite_enabled"
                label={t("common.Overwrite CTC Background")}
              >
                <Switch checkedChildren={t("common.Overwrite CTC Background")} unCheckedChildren={t("common.Not Overwrite CTC Background")} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} style={{...CTCConditionChecking(promo_template, 'active')}}>
              <Form.Item 
                name="active"
                label={t("common.Active Promotion")}
              >
                <Switch checkedChildren={t("common.Active")} unCheckedChildren={t("common.Inactive")} defaultChecked />
              </Form.Item>
            </Col>
          </Row>
          {sites?.length > 0 &&
          <Row style={{...CTCConditionChecking(promo_template, 'selected_product')}}>
            <Divider>
              <Tag color="purple">{t("common.Only Allowed To play")}</Tag>
            </Divider>
            <ReferenceProductTransferField name="selected_product" label={null} apiErrors={apiErrors && apiErrors.product} filterProp={{ sites: sites }} targetKeys={selected_product && selected_product}/>
          </Row>
          }
        </Col>
        <Col xs={24} sm={24} md={promo_type === 'DF' ? 12 : 8}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} style={{...CTCConditionChecking(promo_template, 'limit')}}>
              <Divider>
                <Tag color="purple">{t("common.Limit Per Promotion")}</Tag>
              </Divider>
              <Form.Item
                name="limit"
                label={t("common.Limit Per Promotion")}
                validateStatus={apiErrors.limit ? 'error' : ''}
                help={apiErrors.limit}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Limit Per Promotion")} style={{ width: '100%' }} min={0}/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} style={{...CTCConditionChecking(promo_template, 'limit_per_user')}}>
              <Divider>
                <Tag color="purple">{t("common.Limit Per Player Can Redeem")}</Tag>
              </Divider>
              <Form.Item
                name="limit_per_user"
                label={t("common.Limit Per Player")}
                validateStatus={apiErrors.limit_per_user ? 'error' : ''}
                help={apiErrors.limit_per_user}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Limit Per Player")} style={{ width: '100%' }} min={0}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{...CTCConditionChecking(promo_template, 'min_x_deposit_min_y_amount')}}>
            <Divider>
              <Tag color="purple">{t("common.Min (Qty) Deposit Min ($) Amount")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={6}>
              <Form.Item 
                name="min_x_deposit_min_y_amount"
                label={t("common.Enable Check")}
              >
                <Switch checkedChildren={t("common.Enable")} unCheckedChildren={t("common.Disable" )}/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={9}>
              <Form.Item
                name="num_deposits_required"
                label={t("common.Min (Qty) Deposit")}
                validateStatus={apiErrors.num_deposits_required ? 'error' : ''}
                help={apiErrors.num_deposits_required}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Min (Qty) Deposit")} style={{ width: '100%' }} min={0}/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={9}>
              <Form.Item
                name="min_deposit"
                label={t("common.Min ($) Amount")}
                validateStatus={apiErrors.min_deposit ? 'error' : ''}
                help={apiErrors.min_deposit}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Min ($) Amount")} style={{ width: '100%' }} min={0}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16]} style={{...CTCConditionChecking(promo_template, 'promotion_day')}}>
            <Divider>
              <Tag color="purple">{t("common.Promotion Date Time Settings")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={12}>
                <DateField name="start_date" label={t("common.Start Date")} apiErrors={apiErrors && apiErrors.start_date}/>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <TimeField name="start_time" label={t("common.Start Time")}  apiErrors={apiErrors && apiErrors.start_time}/>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <DateField name="end_date" label={t("common.End Date")} apiErrors={apiErrors && apiErrors.end_date}/>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <TimeField name="end_time" label={t("common.End Time")}  apiErrors={apiErrors && apiErrors.end_time}/>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="promotion_day"
                label={t("common.Promotion Day")}
                validateStatus={apiErrors.promotion_day ? 'error' : ''}
                help={apiErrors.promotion_day}
                hasFeedback
              >
                <Select options={dayChoices(t)} mode='multiple'/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Divider>
                <Tag color="purple">{t("common.Recurrence Frequency")}</Tag>
              </Divider>
              <Form.Item
                name="recurrence_frequency"
                label={t("common.Recurrence Frequency")}
                validateStatus={apiErrors.recurrence_frequency ? 'error' : ''}
                help={apiErrors.recurrence_frequency}
                hasFeedback
              >
                <Select allowClear options={recurrenceFrequencyChoices(t)}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{...CTCConditionChecking(promo_template, 'withdrawal_condition')}}>
            <Divider>
              <Tag color="purple">{t("common.Turnover / Rollover")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="withdrawal_condition"
                label={t("common.Turnover/Rollover?")}
                validateStatus={apiErrors.withdrawal_condition ? 'error' : ''}
                help={apiErrors.withdrawal_condition}
                hasFeedback
              >
                <Select options={turnoverRolloverType(t)} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="withdrawal_term"
                label={t("common.Turnover/Rollover Multiply")}
                validateStatus={apiErrors.withdrawal_term ? 'error' : ''}
                help={apiErrors.withdrawal_term}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Turnover/Rollover Multiply")} style={{ width: '100%' }} min={1} step={0.5}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{...CTCConditionChecking(promo_template, 'daily_deposit')}}>
            <Divider>
              <Tag color="purple">{t("common.Daily deposit")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={6}>
              <Form.Item 
                name="daily_deposit"
                label={t("common.Enable Check")}
              >
                <Switch checkedChildren={t("common.Enable")} unCheckedChildren={t("common.Disable")} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={18}>
              <Form.Item
                name="is_daily_x_deposit"
                label={t("common.Daily X Deposit")}
                validateStatus={apiErrors.is_daily_x_deposit ? 'error' : ''}
                help={apiErrors.is_daily_x_deposit}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Daily X Deposit")} style={{ width: '100%' }} min={0} step={1}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={8} style={{ textAlignLast: 'center', ...CTCConditionChecking(promo_template, 'is_bankaccount_required') }}>
              <Divider>
                <Tag color="purple">{t("common.Bank Account Required")}</Tag>
              </Divider>
              <Form.Item 
                name="is_bankaccount_required"
                label={t("common.Bank Acc Required")}
              >
                <Switch checkedChildren={t("common.Enable")} unCheckedChildren={t("common.Disable")} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8} style={{textAlignLast: 'center' , ...CTCConditionChecking(promo_template, 'require_approval')}}>
              <Divider>
                <Tag color="purple">{t("common.Approval Required")}</Tag>
              </Divider>
              <Form.Item 
                name="require_approval"
                label={t("common.Approval Required")}
              >
                <Switch checkedChildren={t("common.Enable")} unCheckedChildren={t("common.Disable")} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{...CTCConditionChecking(promo_template, 'is_lucky_wheel')}}>
              <Divider>
                <Tag color="purple">{t("common.Is Lucky Wheel")}</Tag>
              </Divider>
              <Col xs={24} sm={24} md={24}>
                <Form.Item 
                  name="is_lucky_wheel"
                  label={t("common.Lucky Wheel Checking")}
                >
                  <Switch checkedChildren={t("common.Enable")} unCheckedChildren={t("common.Disable")} />
                </Form.Item>
              </Col>
          </Row>
        </Col>
        {promo_type != 'DF' &&
        <Col xs={24} sm={24} md={promo_type === 'DF' ? 0 : 8}>
          <Row gutter={[16, 16]} style={{...CTCConditionChecking(promo_template, 'new_member')}}>
            <Divider>
              <Tag color="purple">{t("common.New Member")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={6}>
              <Form.Item 
                name="new_member"
                label={t("common.New Member")}
              >
                <Switch checkedChildren={t("common.Enable")} unCheckedChildren={t("common.Disable")} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={18}>
              <Form.Item
                name="new_member_back_date"
                label={t("common.New Member Back Date (Check Date Joined Differences)")}
                validateStatus={apiErrors.new_member_back_date ? 'error' : ''}
                help={apiErrors.new_member_back_date}
                hasFeedback
              >
                <InputNumber placeholder={t("common.New Member Back Date")} style={{ width: '100%' }} min={0} step={1}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={8} style={{textAlignLast: 'center' , ...CTCConditionChecking(promo_template, 'first_deposit')}}>
              <Divider>
                <Tag color="purple">{t("common.First Deposit")}</Tag>
              </Divider>
              <Form.Item 
                name="first_deposit"
                label={t("common.First Deposit")}
              >
                <Switch checkedChildren={t("common.Enable")} unCheckedChildren={t("common.Disable")} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8} style={{textAlignLast: 'center' , ...CTCConditionChecking(promo_template, 'yesterday_deposit')}}>
              <Divider>
                <Tag color="purple">{t("common.Yesterday Deposit")}</Tag>
              </Divider>
              <Form.Item 
                name="yesterday_deposit"
                label={t("common.Yesterday Deposit")}
              >
                <Switch checkedChildren={t("common.Enable")} unCheckedChildren={t("common.Disable")} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={8} style={{textAlignLast: 'center' , ...CTCConditionChecking(promo_template, 'can_claim_promo_group')}}>
              <Divider>
                <Tag color="purple">{t("common.CTC Group Claimable")}</Tag>
              </Divider>
              <Form.Item 
                name="can_claim_promo_group"
                label={t("common.CTC Group Claimable")}
              >
                <Switch checkedChildren={t("common.Enable")} unCheckedChildren={t("common.Disable")} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={16} style={{textAlignLast: 'center' , ...CTCConditionChecking(promo_template, 'check_promotion_applied_deposit_date')}}>
              <Divider>
                <Tag color="purple">{`${t("common.Promo > Deposit Date")}`}</Tag>
              </Divider>
              <Form.Item 
                name="check_promotion_applied_deposit_date"
                label={t("common.Promo > Deposit Date (For Unlimited Claim use)")}
              >
                <Switch checkedChildren={t("common.Enable")} unCheckedChildren={t("common.Disable")} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{...CTCConditionChecking(promo_template, 'amount_in_x_days')}}>
            <Divider>
              <Tag color="purple">{t("common.($) Amount in (Qty) days")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={6}>
              <Form.Item 
                name="amount_in_x_days"
                label={t("common.Enable Check")}
              >
                <Switch checkedChildren={t("common.Enable")} unCheckedChildren={t("common.Disable")} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={9}>
              <Form.Item
                name="min_amount_in_x_days"
                label={t("common.Min ($) Amount")}
                validateStatus={apiErrors.min_amount_in_x_days ? 'error' : ''}
                help={apiErrors.min_amount_in_x_days}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Min ($) Amount")} style={{ width: '100%' }} min={0}/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={9}>
              <Form.Item
                name="last_x_days"
                label={t("common.Last (Qty) Days")}
                validateStatus={apiErrors.last_x_days ? 'error' : ''}
                help={apiErrors.last_x_days}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Last (Qty) Days")} style={{ width: '100%' }} min={0}/>
              </Form.Item>
            </Col>
          </Row>
          <Row style={{...CTCConditionChecking(promo_template, 'total_deposit_required')}}>
            <Col xs={24} sm={24} md={24}>
            <Divider>
              <Tag color="purple">{t("common.Total Deposit Required")}</Tag>
            </Divider>
            <Form.Item
                name="total_deposit_required"
                label={t("common.Total Deposit Required")}
                validateStatus={apiErrors.total_deposit_required ? 'error' : ''}
                help={apiErrors.total_deposit_required}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Total Deposit Required")} style={{ width: '100%' }} min={0} step={1}/>
              </Form.Item>
              </Col>
          </Row>
          <Row gutter={[16, 16]} style={{...CTCConditionChecking(promo_template, 'referral_check')}}>
            <Divider>
              <Tag color="purple">{t("common.Referral Checking")}</Tag>
            </Divider>
            <Col xs={24} sm={24} md={5}>
              <Form.Item 
                name="referral_check"
                label={t("common.Referral Check")}
              >
                <Switch checkedChildren={t("common.Enable")} unCheckedChildren={t("common.Disable" )}/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item 
                name="min_x_deposit_min_y_amount_z_downline"
                label={t("common.Min X Deposit Min Y Amount Z Downline")}
              >
                <Switch checkedChildren={t("common.Enable")} unCheckedChildren={t("common.Disable" )} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={7}>
              <Form.Item 
                name="referral_deposit_check"
                label={t("common.Referral Deposit Check")}
              >
                <Switch checkedChildren={t("common.Enable")} unCheckedChildren={t("common.Disable" )} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item
                name="min_downline"
                label={t("common.Min Downline")}
                validateStatus={apiErrors.min_downline ? 'error' : ''}
                help={apiErrors.min_downline}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Min Downline")} style={{ width: '100%' }} min={0}/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item
                name="subquence_downline"
                label={t("common.Subquence Downline")}
                validateStatus={apiErrors.subquence_downline ? 'error' : ''}
                help={apiErrors.subquence_downline}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Subquence Downline")} style={{ width: '100%' }} min={0}/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item
                name="num_deposits_required"
                label={t("common.Min (Qty) Deposit")}
                validateStatus={apiErrors.num_deposits_required ? 'error' : ''}
                help={apiErrors.num_deposits_required}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Min (Qty) Deposit")} style={{ width: '100%' }} min={0}/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item
                name="min_deposit"
                label={t("common.Min ($) Amount")}
                validateStatus={apiErrors.min_deposit ? 'error' : ''}
                help={apiErrors.min_deposit}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Min ($) Amount")} style={{ width: '100%' }} min={0}/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={16}>
              <Form.Item
                name="referral_deposit_min_amount_check"
                label={t("common.Referral Deposit Min Amount Required")}
                validateStatus={apiErrors.referral_deposit_min_amount_check ? 'error' : ''}
                help={apiErrors.referral_deposit_min_amount_check}
                hasFeedback
              >
                <InputNumber placeholder={t("common.Referral Deposit Min Amount Required")} style={{ width: '100%' }} min={0}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{...CTCConditionChecking(promo_template, 'is_reward')}}>
              <Divider>
                <Tag color="purple">{t("common.Reward Type")}</Tag>
              </Divider>
              <Col xs={24} sm={24} md={6}>
                <Form.Item 
                  name="is_reward"
                  label={t("common.Enable Check")}
                >
                  <Switch checkedChildren={t("common.Enable")} unCheckedChildren={t("common.Disable")} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={18}>
                <Form.Item
                  name="reward_type"
                  label={t("common.Reward Type")}
                  validateStatus={apiErrors.reward_type ? 'error' : ''}
                  help={apiErrors.reward_type}
                  hasFeedback
                >
                  <Select placeholder={t("common.Reward Type")} options={promotionRewardType(t)}/>
                </Form.Item>
              </Col>
              {sites?.length > 0 && reward_type === "RBT" &&
              <Col span={24}>
                <Divider>
                  <Tag color="purple">{t("common.Rebate for Product")}</Tag>
                </Divider>
                <ReferenceProductTransferField 
                  name="rebate_product" 
                  label={null} 
                  apiErrors={apiErrors && apiErrors.rebate_product} 
                  filterProp={{ sites: sites }} targetKeys={rebate_product && rebate_product}
                />
              </Col>
              }
          </Row>
          <Row gutter={[16, 16]} style={{...CTCConditionChecking(promo_template, 'is_wallet_balance_check')}}>
              <Divider>
                <Tag color="purple">{t("common.Is Wallet Balance Check")}</Tag>
              </Divider>
              <Col xs={24} sm={24} md={6}>
                <Form.Item 
                  name="is_wallet_balance_check"
                  label={t("common.Enable Check")}
                >
                  <Switch checkedChildren={t("common.Enable")} unCheckedChildren={t("common.Disable")} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={18}>
                <Form.Item
                  name="max_wallet_balance_amount"
                  label={t("common.Max Wallet Balance Amount")}
                  validateStatus={apiErrors.max_wallet_balance_amount ? 'error' : ''}
                  help={apiErrors.max_wallet_balance_amount}
                  hasFeedback
                >
                  <InputNumber placeholder={t("common.Max Wallet Balance Amount")} min={0} style={{ width: '100%'}}/>
                </Form.Item>
              </Col>
          </Row>
        </Col>
        }
        <Col xs={24} sm={24} md={24}>
          <CustomRichTextField name="description" label={t("common.Description")} value={description}/>
        </Col>
        <Col xs={24} sm={24} md={24}>
          <CustomRichTextField name="header_description" label={t("common.Header Description")} value={header_description ? header_description : undefined}/>
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
      title={t("common.Update Promotion")}
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
      style={{ top: 20 }}
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

const EditPromotion = ({ id, t }) => {
  const [open, setOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState([])
  const [Update, { isLoading }] = useUpdatePromotionMutation();
  
  const dispatch = useDispatch()

  useEffect(() => {
    if(open){
      dispatch(openModal());
    } else {
      dispatch(closeModal());
    }
  },[open])

  const onUpdate = async (values) => {
    values.start_date = formattedDate(values.start_date)
    values.start_time = formattedTime(values.start_time)
    values.end_date = formattedDate(values.end_date)
    values.end_time = formattedTime(values.end_time)

    if (Array.isArray(values.image)) {
      values.image = await ConvertImage(values.image)
    } else {
      delete values.image
    }
    
    setApiErrors([])
    try {
      values.id = id;
      const data = await Update(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Promotion Updated Successfully')}`}));

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
export default EditPromotion;