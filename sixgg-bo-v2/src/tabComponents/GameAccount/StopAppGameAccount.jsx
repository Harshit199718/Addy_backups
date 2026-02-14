import React, { useState, useEffect } from 'react';
import { Button, Popconfirm } from 'antd';
import { useDispatch } from 'react-redux';
import { notification } from '../../features/modalSlice';
import { useStopAppGameAccountMutation } from '../../features/gameaccount/gameAccountApiSlices';
import { Icon } from '@iconify/react';

const StopAppGameAccount = ({record, t}) => {
  const title = record && `${t("stopappgameacc.Are you sure you want to stop")}`
  const description = record && (
    <div style={{ whiteSpace: 'pre-line' }}>
      {`${t("common.Product")}: ${record.product.name}
      ${t("common.Login")}: ${record.login}`}
    </div>
  );

  const [StopAppGame, { isLoading }] = useStopAppGameAccountMutation();
  const dispatch = useDispatch()
  const onForceStop = async () => {
    const values = { ...record };
    values.is_started = false;
    try {
      const data = await StopAppGame(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t("stopappgameacc.Stop game")} ${values.product.name} - ${values.login} ${t("common.successfully")}`}));
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: `${t("stopappgameacc.Stop game")} ${values.product.name} ${t("common.failed")}`}));
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
        <Button 
          danger
          icon={
            <Icon icon="carbon:stop-filled"  style={{color: 'red'}} />
          }
        >
          {t("stopappgameacc.Stop Game")}
        </Button>
      </Popconfirm>
    </>
  );
};

export default StopAppGameAccount;