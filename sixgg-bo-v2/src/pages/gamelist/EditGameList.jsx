import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Switch, Select, Image } from 'antd';
import errorField from '../../features/error/errorField';
import { useGetGameListIDQuery, useUpdateGameListMutation } from '../../features/gamelist/gameListApiSlices';
import FormSpin from '../../components/formSpin';
import { useDispatch } from 'react-redux';
import { closeModal, notification, openModal } from '../../features/modalSlice';
import ImageField from '../../customField/ImageField';
import ConvertImage from '../../components/convertImage';
import ReferenceProductField from '../../customField/ReferenceProductField';

const GameListForm = ({ onFormInstanceReady, id, apiErrors, t }) => {
  const [form] = Form.useForm();
  useEffect(() => {
      onFormInstanceReady(form);
  }, []);

    const { data: record, isLoading: recordLoading,} = useGetGameListIDQuery({ id: id });
    if(recordLoading){
        return <FormSpin loading={recordLoading}/>
    }
    
return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={record && record} >
        <Form.Item
            name="name"
            label={t("common.Name")}
            validateStatus={apiErrors.name ? 'error' : ''}
            help={apiErrors.name}
            rules={[
            {
                required: true,
                message: `${t('requiredmessagePlease input the name')}`,
            },
            ]}
            hasFeedback
        >
            <Input placeholder={t("common.Name")} />
        </Form.Item>
        <Form.Item
            name="game_code"
            label={t("gamelist.Game Code")}
            validateStatus={apiErrors.game_code ? 'error' : ''}
            help={apiErrors.game_code}
            rules={[
            {
                required: true,
                message: `${t('Please input the game code')}`,
            },
            ]}
            hasFeedback
        >
            <Input placeholder={t("gamelist.Game Code")} />
        </Form.Item>
        <Form.Item
            name="game_category"
            label={t("gamelist.Game Category")}
            validateStatus={apiErrors.game_category ? 'error' : ''}
            help={apiErrors.game_category}
            rules={[
            {
                required: true,
                message: `${t('Please input the game category')}`,
            },
            ]}
            hasFeedback
        >
            <Input placeholder="Game Category" />
        </Form.Item>
        <ReferenceProductField name="product" label={t("referencefield.Product")} apiErrors={apiErrors && apiErrors.product} mode={'multiple'} />
        <ImageField name="image" label={t("common.Image")} apiErrors={apiErrors && apiErrors.image} />
    </Form>
  );
};

const GameListFormModal = ({ open, onUpdate, onCancel, apiErrors, id, t }) => {
    const [formInstance, setFormInstance] = useState();

return (
    <Modal
        open={open}
        title={t("gamelist.Update Game List")}
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
    >
      <GameListForm
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

const EditGameList = ({ id, t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [UpdateGameList, { isLoading }] = useUpdateGameListMutation();
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
      const data = await UpdateGameList(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Game List Updated Successfully')}`}));
      setOpen(false);
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
      setApiErrors(errorField(error));
    }
    };

  return (
    <>
        <Button type="primary" onClick={() => setOpen(true)}>
            {t("common.Edit")}
        </Button>
        <GameListFormModal
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

export default EditGameList;