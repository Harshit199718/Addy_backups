import React, { useState, useEffect } from 'react';
import { Button, Popconfirm } from 'antd';
import { useDispatch } from 'react-redux';
import { notification } from '../../features/modalSlice';
import { useUpdateGameAccountMutation } from '../../features/gameaccount/gameAccountApiSlices';

const DiscardGameAccount = ({ record, t }) => {
  const discardWord = record && record.discarded ? t('common.Undiscard') : t('common.Discard');
  const title = record && `${t("discardgameaccount.Are you sure you want to")} ${discardWord}`
  const description = record && (
    <div style={{ whiteSpace: 'pre-line' }}>
      {`${t("common.Product")}: ${record.product.name}
      ${t("common.Login")}: ${record.login}`}
    </div>
  );

  const [Discard, { isLoading }] = useUpdateGameAccountMutation();
  const dispatch = useDispatch()
  const onDiscard = async () => {
    const values = { ...record };
    values.discarded = !values.discarded;
    try {
      const data = await Discard(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${discardWord} ${t("common.game account")} ${values.product.name} - ${values.login} ${t("common.successfully")}`}));
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: `${discardWord} ${t("common.game account")} ${values.product.name} ${t("common.failed")}`}));
    }
  };

  return (
    <>
      <Popconfirm 
        placement='left'
        title={title}
        description={description}
        onConfirm={onDiscard}
      >
        <Button danger>
          {discardWord}
        </Button>
      </Popconfirm>
    </>
  );
};

export default DiscardGameAccount;