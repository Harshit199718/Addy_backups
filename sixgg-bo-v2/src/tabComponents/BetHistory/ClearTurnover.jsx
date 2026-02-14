import React, { useState, useEffect } from 'react';
import { Button, Popconfirm } from 'antd';
import { useDispatch } from 'react-redux';
import { notification } from '../../features/modalSlice';
import { useUpdateWalletsMutation } from '../../features/wallets/walletsApiSlices';
import { playerAdjustmentOptions } from '../../customField/customOption';
import { CustomOptionLabel } from '../../ListingField/CustomOptionField';

const ClearTurnover = ({ action, playerid, walletid, t }) => {
  const [Clear, { isLoading }] = useUpdateWalletsMutation();
  const dispatch = useDispatch()
  const onDiscard = async () => {
    let values = { 
      id: walletid,
      user: playerid,
    };
    values[action] = 0;

    try {
      const data = await Clear(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${CustomOptionLabel(playerAdjustmentOptions(t), action)} ${t("notisuccess.has been cleared successfully")}`}));
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: `${t("notierror.Clear Withdrawal failed")}`}));
    }
  };

  return (
    <>
      <Popconfirm 
        placement='left'
        title={`${t("clearturnover.Are you sure you want to clear for")} ${CustomOptionLabel(playerAdjustmentOptions(t), action)} ?`}
        onConfirm={onDiscard}
      >
        <Button danger style={{ width: '300px', display: 'flex', justifyContent: 'center' }}>
          {t("common.Clear")} {CustomOptionLabel(playerAdjustmentOptions(t), action)}
        </Button>
      </Popconfirm>
    </>
  );
};
export default ClearTurnover;