import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { AppDialogContainer } from './Games.styled'
import Button from '../../components/common/Button'
import { useChangeIdMutation, useGetStartedGamesQuery, useWalletQuery } from '../../api/hooks'
import { t } from 'i18next'

function AppDialog({gameData}) {
  const { data: wallet } = useWalletQuery();
  //   Get Started games
  const { data: startedGames } = useGetStartedGamesQuery(wallet?.user?.id, {
    skip: !wallet?.user?.id,
  });
  const [changeId, {isLoading, data: updatedCreds}] = useChangeIdMutation();
  const [updatedGameData, setUpdatedGameData] = useState({});

  useEffect(() => {
    setUpdatedGameData(gameData);
  }, [gameData]);

  useEffect(() => {
    setUpdatedGameData(prevGameData=>{
      const data={...prevGameData};
      if (updatedCreds) {
        data["username"] = updatedCreds?.login;
        data["password"] = updatedCreds?.password;
      }
      if (startedGames) {
        data["startedId"] = startedGames[0]?.id;
      }
      return data
    })
  }, [updatedCreds, startedGames])
  
  return (
    <AppDialogContainer>
      <h3 className="balance-ingame">{t("Balance")} {t("In_Game")}: {updatedGameData?.credit}</h3>
      <div className="user-detail">
        <label htmlFor="">{t("Username")}:</label>
        <div className="username">
          {updatedGameData?.username}
          <Icon icon="bxs:copy" width={20} />
        </div>
      </div>
      <div className="user-detail">
        <label htmlFor="">{t("Password")}:</label>
        <div className="username">
          {updatedGameData?.password}
          <Icon icon="bxs:copy" width={20} />
        </div>
      </div>
      <div className="device-buttons">
        <a href={updatedGameData?.url?.android[0]} target='_blank'>{t("Android")} {t("Download")} <Icon icon="uil:android" width={20} /></a>
        <a href={updatedGameData?.url?.ios[0]} target='_blank'>{t("iOS")} {t("Download")} <Icon icon="ic:baseline-apple" width={20} /></a>
      </div>
      <div className="modal-buttons">
        <a href={updatedGameData?.androidUrl} target='_blank'><Button $padding="10px" $background="#8cc152" $fontSize="15px" $color="#fff" $transform="none">{t("Play_Now")}</Button></a>
        <Button $width="50%" $padding="10px" $background="#8cc152" $fontSize="15px" $color="#fff" $transform="none" onClick={() => changeId(updatedGameData?.startedId)}>{!isLoading? t("Change_Game_Id"):t("Fetching")}</Button>
      </div>
    </AppDialogContainer>
  )
}

export default AppDialog