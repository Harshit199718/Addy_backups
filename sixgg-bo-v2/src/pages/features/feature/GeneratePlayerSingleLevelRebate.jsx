import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Select, Switch } from 'antd';
import errorField from '../../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../../features/modalSlice';
import DateField from '../../../customField/DateField';
import { formattedDate, getCurrentTime } from '../../../components/convertDate';
import { useLazyGeneratePlayerSingleLevelRebateQuery } from '../../../features/rewards/rewardsApiSlices';

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    const initialValues = { 
        fromDate: getCurrentTime()
    };

    return (
        <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues} >
            <DateField name="fromDate" label={t("feature.Date")} apiErrors={apiErrors && apiErrors.fromDate} />
        </Form>
    );
};

const FormModal = ({ open, onCreate, onCancel, apiErrors, isFetching, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("feature.Generate Player Rebate")}
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
        confirmLoading={isFetching}
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
const GeneratePlayerSingleLevelRebate = ({ t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const dispatch = useDispatch()
    const [GeneratePlayer, { isFetching }] = useLazyGeneratePlayerSingleLevelRebateQuery()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])
  
    const onCreate = async (values) => {
        values.fromDate = formattedDate(values.fromDate)
        
        setApiErrors([])
        try {
            GeneratePlayer({
                filters: { fromDate: values.fromDate }
            })
            .unwrap()
            .then((payload) =>  {
                dispatch(notification({notification_status: 'success', notification_message: payload?.list?.length > 0 && 
                    `${t("feature.Message")}: ${payload?.list[0]?.message} \n
                    ${t("feature.Output")}: ${payload?.list[0]?.output}
                    `
                }));
                setOpen(false);
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
            <Button type='primary' onClick={() => setOpen(true)} size={'large'} style={{ width: "100%", height: 120, whiteSpace: 'wrap' }} >
                {t("feature.Generate Player Single Level Rebate")}
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
                t={t}
            />
        </>
    );
};
export default GeneratePlayerSingleLevelRebate;