import React, { useState, useEffect } from 'react';
import { Button, Popconfirm } from 'antd';
import { useDispatch } from 'react-redux';
import { notification } from '../../features/modalSlice';
import { useUpdateGameAccountMutation } from '../../features/gameaccount/gameAccountApiSlices';
import { Icon } from '@iconify/react';

const ForceStopGameAccount = ({record, t}) => {
  const title = record && `${t("forcestopgameacc.Are you sure you want to force stop")}`
  const description = record && (
    <div style={{ whiteSpace: 'pre-line' }}>
      {`${t("common.Product")}: ${record.product.name}
      ${t("common.Login")}: ${record.login}`}
    </div>
  );

  const [ForceStop, { isLoading }] = useUpdateGameAccountMutation();
  const dispatch = useDispatch()
  const onForceStop = async () => {
    const values = { ...record };
    values.is_started = false;
    try {
      const data = await ForceStop(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t("common.Force stop game account")} ${values.product.name} - ${values.login} ${t("common.successfully")}`}));
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: `${t("common.Force stop game account")} ${values.product.name} ${t("common.failed")}`}));
    }
  };

  return (
    <>
      <Popconfirm 
        placement='left'
        title={title}
        description={description}
        onConfirm={onForceStop}
      >
        <Icon icon="zondicons:block"  style={{color: 'red'}} />
      </Popconfirm>
    </>
  );
};

export default ForceStopGameAccount;