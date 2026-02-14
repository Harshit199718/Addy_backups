import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Row, message } from 'antd';
import errorField from '../../../features/error/errorField';
import { useDispatch, useSelector } from 'react-redux';
import { notification, openModalTab, closeModalTab } from '../../../features/modalSlice';
import FormSpin from '../../../components/formSpin';
import { useGetUserGroupsIDQuery } from '../../../features/usergroups/usergroupsApiSlices';
import { useUpdateUserGroupsMutation } from '../../../features/usergroups/usergroupsApiSlices';
import PermissionTransferField from '../permissionTransferField';

const PermissionTransferFormList = ({ onFormInstanceReady, apiErrors, id, t }) => {
  const [form] = Form.useForm();
  const [permissions, name] = [
    'permissions',
    'name' 
  ].map(field => Form.useWatch(field, form));
  const { data: record, isLoading: recordLoading, isFetching: recordFetching} = useGetUserGroupsIDQuery({ id: id });
  useEffect(() => {
    onFormInstanceReady(form);
    }, []);

    if (recordLoading) {
      return <FormSpin loading={recordFetching} />;
    }

  return (
    <Form layout="vertical" form={form} name={`form_in_modal`} initialValues={record && record} >
        <PermissionTransferField 
          name="permissions" 
          apiErrors={apiErrors && apiErrors.permissions}
          label={null}
          targetKeys={permissions && permissions}
        />
    </Form>
  );
};

const PermissionTransferFormModal = ({ open, onUpdate, onCancel, apiErrors, id, record, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
      open={open}
      title={`${t("common.Usergroup")} ${record?.name}`}
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
          onUpdate(values);

        } catch (error) {
        }
      }}
      width={'fit-content'}
    >
      <PermissionTransferFormList
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

const PermissionTransferTemplate = ({ id, t }) => {
  const [open, setOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState([])
  const [UpdatePermissionTransfer, { isLoading }] = useUpdateUserGroupsMutation();
  const dispatch = useDispatch()
  const { data: record, isLoading: recordLoading } = useGetUserGroupsIDQuery({ id: id });

  useEffect(() => {
    if(open){
        dispatch(openModalTab());
    } else {
        dispatch(closeModalTab());
    }
    },[open])

  const onUpdate = async (values) => {
    setApiErrors([])

  try {
    values.id = id;
    values.name = record.name;
    const data = await UpdatePermissionTransfer(values).unwrap();
    dispatch(notification({notification_status: 'success', notification_message: `${t("common.Permission")} ${record?.name} ${t("common.Update Successfully")}`}));
    setOpen(false);
    }
  catch (error) {
    dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
    setApiErrors(errorField(error));
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        {t("common.View / Change Permission")}
      </Button>
      <PermissionTransferFormModal
        open={open}
        onUpdate={onUpdate}
        onCancel={() => {
          setOpen(false)
          setApiErrors([])
        }}
        apiErrors={apiErrors}
        id={id && id}
        record={record}
        t={t}
      />
    </>
  );
};
export default PermissionTransferTemplate;