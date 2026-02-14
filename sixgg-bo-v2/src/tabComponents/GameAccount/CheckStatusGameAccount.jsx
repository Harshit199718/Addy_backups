import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { notification } from '../../features/modalSlice';
import { useCheckStatusGameAccountMutation } from '../../features/gameaccount/gameAccountApiSlices';

const CheckStatusGameAccount = ({record, t}) => {
  const [Check, { isLoading }] = useCheckStatusGameAccountMutation();
  const dispatch = useDispatch()
  const onCheck = async () => {
    const values = { ...record };
    values.discarded = !values.discarded;
    try {
      const data = await Check(record).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t("notisuccess.Game Status is ok and credit")}: ${data.credit}`}));
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: `${t("notierror.Check Game Status failed")}`}));
    }
  };

  return (
    <>
      <Button type="primary" onClick={onCheck}>
        {t("common.Check Status")}
      </Button>
    </>
  );
};

export default CheckStatusGameAccount;