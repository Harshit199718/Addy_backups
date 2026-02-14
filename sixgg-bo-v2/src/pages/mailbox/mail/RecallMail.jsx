import React, { useState, useEffect } from 'react';
import { Button, Popconfirm } from 'antd';
import errorField from '../../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { notification } from '../../../features/modalSlice';
import { useUpdateMailMutation } from '../../../features/mailbox/mailApiSlices';

const RecallMail = ({ record, t }) => {
    const [RecallMail, { isLoading }] = useUpdateMailMutation();
    const dispatch = useDispatch()
  
    const onRecall = async (values) => {
        const newValues = {id: null, receiver_ids: null, mail_template: null, recalled: true};

        newValues.id = values.id;
        newValues.receiver_ids = [values.receiver];
        newValues.mail_template = values.mail_template;

        try {
            const data = await RecallMail(newValues).unwrap();
            dispatch(notification({notification_status: 'success', notification_message: t('notisuccess.Recall Mail Successfully')}));
        } catch (error) {
            dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
        }
    };

    return (
        <Popconfirm
            title={`${t("common.Recall")}`}
            ok
            okText={t("common.Yes")}
            cancelText={t("common.No")}
            onConfirm={() => onRecall(record)}
        >
            <Button danger>{t("common.Recall")}</Button>
        </Popconfirm>
    );
};

export default RecallMail;

