import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Row, Tag } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from '../../features/modalSlice';
import { useGetPlayerIDQuery, useUpdatePlayerMutation } from '../../features/player/playerApiSlices';
import { setPlayerActions } from '../../features/generalSlice';
import PermissionsAuth from '../../components/permissionAuth';

const FormList = ({ player, onUpdate, t }) => {
  const [form] = Form.useForm();
  const initialValues = player && { 
    ...player,
    withdrawal_fee: Number(player.withdrawal_fee)
   };

  useEffect(() => {
    form.resetFields(); // Reset the form fields whenever initialValues changes
  }, [initialValues, form]);
  

  return (
    player &&
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues} onFinish={onUpdate} size='small'>
        <Form.Item
          name="max_daily_withdrawals"
          label={t("common.Max Withdrawal")}
        >
          <InputNumber style={{ width: '100%' }} placeholder={t("common.Max Withdrawal")} min={0}/>
        </Form.Item>
        <Form.Item
          name="withdrawal_fee"
          label={t("common.Withdrawal Fee (%)")}
          rules={[
            {
              type: 'number',
              min: 0,
              max: 100,
              message: t("common.Withdrawal Fee must be between 0 and 100")
            }
          ]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      <Row style={{ marginTop: '20px' }}>
          {PermissionsAuth.checkPermissions('button', 'change_player',
          <Button type="primary" htmlType="submit" >
              {t("common.Save")}
          </Button>
          )}
      </Row>
    </Form>
  );
};

const Setting = ({ t }) => {
  const [apiErrors, setApiErrors] = useState([])
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
    const updatedValues = { ...player, ...values }; // Combine player data with updated form values
    setApiErrors([]);
    try {
      const data = await Update(updatedValues).unwrap();
      dispatch(notification({ notification_status: 'success', notification_message: `${t('notisuccess.Setting Updated Successfully')}`}));
      dispatch(setPlayerActions({ record: data }));
    } catch (error) {
      dispatch(notification({ notification_status: 'error', notification_message: JSON.stringify(error) }));
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
export default Setting;