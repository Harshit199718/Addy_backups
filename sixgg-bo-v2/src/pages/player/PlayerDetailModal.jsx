import React, { useEffect } from 'react';
import { Modal, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal, selectedTab, notification } from '../../features/modalSlice';
import TransactionList from '../../tabComponents/Transaction/Transaction';
import BetHistoryList from '../../tabComponents/BetHistory/BetHistory';
import { resetPlayerActions, resetSelectedPlayer, setGlobalLoading, setPlayerActions, setSelectedPlayer } from '../../features/generalSlice';
import GameAccountList from '../../tabComponents/GameAccount/GameAccount';
import CustomerBankAccountList from '../../tabComponents/CustomerBankAccount/CustomerBankAccount';
import Profile from '../../tabComponents/Profile/Profile';
import Setting from '../../tabComponents/Setting/Setting';
import { RiskAssessment } from '../../tabComponents/RiskAssessment/RiskAssessmentTab/riskAssessmentTab';
import ReferredPlayerList from '../../tabComponents/ReferredPlayer/ReferredPlayer';
import { useTranslation } from 'react-i18next';
import { useLazyGetPlayerIDQuery } from '../../features/player/playerApiSlices';
import TokenList from '../../tabComponents/Token/Token';

const FormModal = ({ player, onCancel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeKey = useSelector(state => state.modal.selectedTab);

  return (
    player && activeKey &&
    <Modal
      open={player}
      title={`${t("common.Player Detail")} - ${player.username}`}
      destroyOnClose
      onCancel={onCancel}
      footer={[]}
      style={{ top: 20 }}
      width={1800}
      zIndex={10}
    >
      <Tabs
        onChange={(key) => dispatch(selectedTab({key: key}))}
        type="card"
        items={[
          {
            label: t(`common.Transaction History`),
            key: 'transactionhistory',
            children: (activeKey === 'transactionhistory' || !activeKey) && <TransactionList t={t} />
          },
          {
            label: t(`common.Token History`),
            key: 'tokenhistory',
            children: (activeKey === 'tokenhistory' || !activeKey) && <TokenList t={t} />
          },
          {
            label: t(`common.Bet History`),
            key: 'bethistory',
            children: activeKey === 'bethistory' && <BetHistoryList playerid={player && player.id} walletid={player && player.wallet_id} t={t} />
          },
          {
            label: t(`common.Game Account`),
            key: 'gameaccount',
            children: activeKey === 'gameaccount' && <GameAccountList t={t} />
          },
          {
            label: t(`common.Bank Account`),
            key: 'bankaccount',
            children: activeKey === 'bankaccount' && <CustomerBankAccountList t={t} />
          },
          {
            label:t(`common.Profile`),
            key: 'profile',
            children: activeKey === 'profile' && <Profile t={t} />
          },
          {
            label: t(`common.Setting`),
            key: 'setting',
            children: activeKey === 'setting' && <Setting t={t} />
          },
          {
            label: t(`common.Risk Assessment`),
            key: 'riskaccessment',
            children: activeKey === 'riskaccessment' && <RiskAssessment playerName={player && player.username} playerID={player && player.id} />
          },
          {
            label: t(`common.Referred Player`),
            key: 'referredplayer',
            children: activeKey === 'referredplayer' && <ReferredPlayerList playerID={player && player.id} t={t} />
          },
        ]}
      />
    </Modal>
  );
};

const PlayerDetailModal = () => {
  const dispatch = useDispatch()
  const { selectedPlayer, player } = useSelector(state => state.general)
  const [getPlayerDetail, {isFetching, data}] = useLazyGetPlayerIDQuery()
  useEffect(() => {
    const fetchPlayer = async () => {
      if (selectedPlayer) {
          try {
            dispatch(setGlobalLoading({isLoading: true}))
            const playerDetail = await getPlayerDetail({ id: selectedPlayer });
            dispatch(openModal())
            dispatch(setPlayerActions(playerDetail?.data))
            dispatch(setGlobalLoading({isLoading: false}))
          } catch (error) {
            dispatch(setPlayerActions(null))
            dispatch(setGlobalLoading({isLoading: false}))
            dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
          }
      }
    };
    fetchPlayer();
  }, [selectedPlayer]);

  return (
    <>
      <FormModal
        player={player}
        onCancel={() => {
          dispatch(resetPlayerActions());
          dispatch(resetSelectedPlayer())
          dispatch(selectedTab({key: 'transactionhistory'}))
          dispatch(closeModal());
        }}
      />
    </>
  );
};

export default PlayerDetailModal;