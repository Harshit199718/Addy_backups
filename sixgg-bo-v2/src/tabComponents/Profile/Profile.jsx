import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Form, Input, InputNumber, Row, Switch, Tag } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from '../../features/modalSlice';
import ReferenceProductField from '../../customField/ReferenceProductField';
import { useGetPlayerIDQuery, useUpdatePlayerMutation } from '../../features/player/playerApiSlices';
import { setPlayerActions } from '../../features/generalSlice';
import DateTimeField from '../../customField/DateTimeField';
import { dayjsDateTime, formattedDateTime } from '../../components/convertDate';
import ReferenceRankField from '../../customField/ReferenceRankField';
import StealthLoginListingField from '../../ListingField/StealthLogin';
import ResetPassword from '../../pages/general/ResetPassword';
import RankUpgrade from './RankUpgrade';
import SendMessage from '../../pages/general/SendMessage';
import PermissionsAuth from '../../components/permissionAuth';

const FormList = ({ apiErrors, player, onUpdate, t }) => {
  const [form] = Form.useForm();
  const initialValues = player && {
    ...player,
    rank: Number(player.rank),
    last_login: dayjsDateTime(player.last_login),
    date_joined: dayjsDateTime(player.date_joined),
  }

  useEffect(() => {
    form.resetFields(); // Reset the form fields whenever initialValues changes
  }, [initialValues, form]);

  return (
    player &&
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues} onFinish={onUpdate} size='small'>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={7} xxl={6} style={{ border: '1px solid #ccc', borderRadius: '20px', padding: "0px 10px 0px 10px"}}>
          <Divider>
            <Tag color="blue">{t("common.Player Detail")}</Tag>
          </Divider>
          <Form.Item
            name="mobile"
            label={t("common.Mobile Number")}
          >
            <InputNumber style={{ width: '100%' }} readOnly/>
          </Form.Item>
          <Form.Item
            name="browser_fingerprint"
            label={t("common.Browser Fingerprint")}
          >
            <Input readOnly/>
          </Form.Item>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="referral_code"
                label={t("common.Referral")}
              >
                <Input readOnly/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="referrer_code"
                label={t("common.Referrer Upline")}
              >
                <Input readOnly/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <DateTimeField name="last_login" label={t("common.Last Login")} required={false} />
            </Col>
            <Col span={12}>
              <DateTimeField name="date_joined" label={t("common.Date Joined")} required={false} />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="deposit_rank"
                label={t("common.Deposit Rank")}
              >
                <Input readOnly/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                name="balance"
                label={t("common.Balance")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="second_slot_balance"
                label={t("common.Hold Wallet")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="checkin_token_available"
                label={t("common.Token")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="easypay_ranking"
                label={t("common.Easypay Ranking")}
              >
                <Input readOnly/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="easypay_client_balance"
                label={t("common.Easypay Client Balance")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col xs={0} sm={0} md={0} lg={0} xl={1} xxl={1} />
        <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={9} style={{ border: '1px solid #ccc', borderRadius: '20px', padding: "0px 10px 0px 10px"}}>
          <Divider>
            <Tag color="blue">{t("common.Player Transaction Detail")}</Tag>
          </Divider>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                name="min_deposit_amt"
                label={t("common.Min Deposit Amt")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="max_deposit_amt"
                label={t("common.Max Deposit Amt")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                name="min_withdrawal_amount"
                label={t("common.Min Withdrawal Amt")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="max_withdrawal_amt"
                label={t("common.Max Withdrawal Amt")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="max_daily_withdrawals"
                label={t("common.Max Daily Withdrawal Amt")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                name="total_deposit_amount"
                label={t("common.Total Deposit Amt")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="total_deposit_auto_amount"
                label={t("common.Deposit Auto Amt")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="total_deposit_manul_amount"
                label={t("common.Deposit Manual Amt")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                name="total_withdrawal_amount"
                label={t("common.Total withdrawal Amt")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="total_withdrawal_auto_amount"
                label={t("common.Withdrawal Auto Amt")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="total_withdrawal_manual_amount"
                label={t("common.Withdrawal Manual Amt")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                name="total_bonus_amount"
                label={t("common.Total Bonus Amt")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="total_bonus_auto_amount"
                label={t("common.Bonus Auto Amt")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="total_bonus_manual_amount"
                label={t("common.Bonus Manual Amt")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                name="total_forfeit_amount"
                label={t("common.Total Forfeit Amt")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="total_forfeit_auto_amount"
                label={t("common.Forfeit Auto Amt")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="total_forfeit_manual_amount"
                label={t("common.Forfeit Manual Amt")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                name="total_drop_transaction_deposit_amount"
                label={t("common.Drop Transaction Deposit Amt")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="total_drop_transaction_game_amount"
                label={t("common.Drop Transaction Game Amt")}
              >
                <InputNumber style={{ width: '100%' }} readOnly/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item 
                name="auto_transfer_credit_to_game"
                label={t("common.Transfer Credit To Game")}
              >
                <Switch checkedChildren={t("common.Auto")} unCheckedChildren={t("common.Manual")} />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col xs={0} sm={0} md={0} lg={0} xl={1} xxl={1} />
        <Col xs={24} sm={24} md={24} lg={24} xl={7} xxl={7} style={{ border: '1px solid #ccc', borderRadius: '20px', padding: "0px 10px 0px 10px"}}>
        <Divider>
          <Tag color="blue">{t("common.Player Info")}</Tag>
        </Divider>
        <Row>
          <Col span={8}>
            <ResetPassword />
          </Col>
          <Col span={8}>
            <SendMessage />
          </Col>
          <Col span={8}>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item 
                name="is_active"
                label={t("common.Is Active")}
            >
                <Switch checkedChildren={t("common.Active Player")} unCheckedChildren={t("common.Inactive Player")} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item 
                name="bypass_deposit_checking"
                label={t("common.Bypass Deposit")}
            >
              <Switch checkedChildren={t("common.Bypass Deposit Checking")} unCheckedChildren={t("common.No Deposit Checking")} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item 
                name="bypass_withdrawal_checking"
                label={t("common.Bypass Withdrawal")}
            >
              <Switch checkedChildren={t("common.Bypass Withdrawal Checking")} unCheckedChildren={t("common.No Withdrawal Checking")} />
            </Form.Item>
          </Col>
        </Row>
        <ReferenceProductField name="selected_product" label={t("common.Product")} apiErrors={apiErrors && apiErrors.selected_product} isRequired={false} mode="multiple" filterProp={{sites: player.sites}} isActive={false}/>
        <Row>
          <Col span={11}>
            <Form.Item
              name="gameaccount_change_id_count"
              label={t("common.App Game Change ID Count")}
              validateStatus={apiErrors.gameaccount_change_id_count ? 'error' : ''}
              help={apiErrors.gameaccount_change_id_count}
              hasFeedback
            >
              <InputNumber style={{ width: '100%' }}  placeholder={t("common.App Game Change ID Count")} min={0}/>
            </Form.Item>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <ReferenceRankField name="rank" label={t("common.Rank")} apiErrors={apiErrors && apiErrors.rank} disabled={true}/>
            <RankUpgrade t={t} />
          </Col>
        </Row>
        <Form.Item
          name="remarks"
          label={t("common.Remark")}
        >
           <Input.TextArea autoSize={{ minRows: 6, maxRows: 12 }} placeholder={t("common.Remark")} rows={3} />
        </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col xs={4} sm={3} md={2} lg={2} xl={1} xxl={1}>
          {PermissionsAuth.checkPermissions('button', 'change_player',
          <Button type="primary" htmlType="submit">
            {t("common.Save")}
          </Button>
          )}
        </Col>
        <Col xs={4} sm={3} md={2} lg={2} xl={1} xxl={1}>
          <StealthLoginListingField record={initialValues} label={t('common.Login As')}/> 
        </Col>
      </Row>
    </Form>
  );
};

const Profile = ({ t }) => {
  const [apiErrors, setApiErrors] = useState([])
  const [isReady, setIsReady] = useState(false)
  const [Update, { isLoading }] = useUpdatePlayerMutation();
  const playerRecord = useSelector((state) => state.general.player);

  const { 
    data: player,
    isLoading: playerLoading, 
  } = useGetPlayerIDQuery({
      id: playerRecord.id
  },{
      refetchOnFocus: true,
  });

  const dispatch = useDispatch()
  
  const onUpdate = async (values) => {
    values.date_joined = formattedDateTime(values.date_joined)
    values.last_login = formattedDateTime(values.last_login)
    values = { ...player, ...values };

    setApiErrors([])
    try {
      const data = await Update(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t("notisuccess.Player Updated Successfully")}`}));
      dispatch(setPlayerActions({ record: data }))
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
      setApiErrors(errorField(error));
    }
  };
  return (
    <FormList
      apiErrors={apiErrors}
      player={player}
      onUpdate={onUpdate}
      t={t}
    />
  )
};
export default Profile;