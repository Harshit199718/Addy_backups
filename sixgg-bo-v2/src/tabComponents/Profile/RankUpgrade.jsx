import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Row, Switch } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch, useSelector } from 'react-redux';
import { notification, openModalTab, closeModalTab } from '../../features/modalSlice';
import { useUpdatePlayerMutation } from '../../features/player/playerApiSlices';
import ReferenceRankField from '../../customField/ReferenceRankField';
import { setPlayerActions } from '../../features/generalSlice';


const FormList = ({ onFormInstanceReady, apiErrors, player, t }) => {
  const [form] = Form.useForm();

  useEffect(() => {
      onFormInstanceReady(form);
  }, []);
  const initialValues = player && {
    ...player,
    rank: Number(player.rank),
  }

  return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues} size='larger'>
        <ReferenceRankField name="rank" label={t("common.Rank")} apiErrors={apiErrors && apiErrors.rank} mode=''/>
        <Form.Item 
          name="manual_rank_updated"
          label={t("common.Manual Rank Update")}
        >
            <Switch checkedChildren={t("common.Manual Rank Update")} unCheckedChildren={t("common.Not Rank Update")} />
        </Form.Item>
    </Form>
  );
};
const FormModal = ({ open, onCreate, onCancel, apiErrors, player, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
      open={open}
      title={player && <span>{t("common.Upgrade Rank for")} {player.username} </span>}
      okText={t("common.Upgrade Rank")}
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
      width={350}
    >
      <FormList
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
        apiErrors={apiErrors}
        player={player}
        t={t}
      />
    </Modal>
  );
};
const RankUpgrade = ({ t }) => {
  const [open, setOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState([])
  const [RankUpdate, { isLoading }] = useUpdatePlayerMutation();
  const player = useSelector((state) => state.general.player);
  const dispatch = useDispatch()

  useEffect(() => {
    if(open){
      dispatch(openModalTab());
    } else {
      dispatch(closeModalTab());
    }
  },[open])
  
  const onRankUpdate = async (values) => {
    values = {...player, ...values}

    setApiErrors([])
    try {
      const data = await RankUpdate(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Rank Updated Successfully')}`}));
      dispatch(setPlayerActions({ record: data }))
      setOpen(false);
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
      setApiErrors(errorField(error));
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        {t("common.Rank Upgrade")}
      </Button>
      <FormModal
        open={open}
        onCreate={onRankUpdate}
        onCancel={() => {
          setOpen(false)
          setApiErrors([])
        }}
        apiErrors={apiErrors}
        player={player}
        t={t}
      />
    </>
  );
};
export default RankUpgrade;