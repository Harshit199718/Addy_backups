import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Select, Switch } from 'antd';
import errorField from '../../features/error/errorField';
import { useAddGameListMutation } from '../../features/gamelist/gameListApiSlices';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import ImageField from '../../customField/ImageField';
import ConvertImage from '../../components/convertImage';
import ReferenceProductField from '../../customField/ReferenceProductField';

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
    const [form] = Form.useForm();
    
    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

return (
    <Form layout="vertical" form={form} name="form_in_modal" >
        <Form.Item
            name="name"
            label={t("common.Name")}
            validateStatus={apiErrors.name ? 'error' : ''}
            help={apiErrors.name}
            rules={[
            {
                required: true,
                message: `${t('requiredmessage.Please input the name')}`,
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
                message: `${t('requiredmessage.Please input the game code')}`,
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
                message: `${t('requiredmessage.Please input the game category')}`,
            },
            ]}
            hasFeedback
        >
            <Input placeholder={t("gamelist.Game Category")} />
        </Form.Item>
        <ReferenceProductField name="product" label={t("referencefield.Product")} apiErrors={apiErrors && apiErrors.product} mode={'multiple'} />
        <ImageField name="image" label={t("common.Image")} apiErrors={apiErrors && apiErrors.image}/>
    </Form>
  );
};

const FormModal = ({ open, onCreate, onCancel, apiErrors, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("gamelist.Create Game List")}
        okText={t("common.Create")}
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
      <FormList
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
        apiErrors={apiErrors}
        t={t}
      />
    </Modal>
  );
};

const CreateGameList = ({ t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [CreateGameList, { isLoading }] = useAddGameListMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])
  
    const onCreate = async (values) => {
    values.image = await ConvertImage(values.image)

    setApiErrors([])
    try {
      const data = await CreateGameList(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Game List Created Successfully')}`}));
      setOpen(false);
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
      setApiErrors(errorField(error));
    }
    };

  return (
    <>
        <Button type="primary" onClick={() => setOpen(true)} style={{ width: "100%" }}>
            {t("common.Create")}
        </Button>
        <FormModal
            open={open}
            onCreate={onCreate}
            onCancel={() => {
                setOpen(false)
                setApiErrors([])
            }}
            apiErrors={apiErrors}
            t={t}
        />
    </>
    );
};

export default CreateGameList;