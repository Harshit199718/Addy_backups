import React, { useState } from 'react'
import { Reward, RewardText, RewardsContainer } from './Rewards.styled'
import Image from '../../components/common/Image'
import { useSelector } from 'react-redux'
import { selectConfigData } from '../../api/generalApi'
import Modal from '../../components/common/Modal'
import DailyCheckin from './DailyCheckin'
import LuckyWheel from './LuckyWheel/LuckyWheel1'
import Mailbox from './Mailbox'
import Rebate from './Rebate'
import useImports from '../../hooks/useImports'
import { useNavigate } from 'react-router-dom'
import { useGetMailsQuery, useWalletQuery } from '../../api/hooks'
import { useTranslation } from "react-i18next";
import RankingConverter from '../General/RankingConverter'
import Mission from '../../pages/Mission/Mission'
import Button from '../../components/common/Button'

function Rewards() {
  const {available_rewards, ...configData} = useSelector(selectConfigData);
  const { data: wallet } = useWalletQuery();
  const {data: mails, isLoading} = useGetMailsQuery();
  const [openReward, setOpenReward] = useState("");
  const {LuckyWheel} = useImports();
  const navigate = useNavigate();
  const { t } = useTranslation();

  let unreadCount = 0;
  mails?.length > 0 && mails?.forEach(message => {
    if (!message?.is_read) {
      unreadCount++;
    }
  });

  return (
    <RewardsContainer>
      {
        available_rewards?.split(',')?.map(reward=>(
          <Reward key={reward} onClick={() => {
            switch(reward) {
              case "redeem":
                navigate("/rewards")
              break;
              case "mission":
                navigate("/missions")
              break;
              default:
                setOpenReward(reward)
              break;
            }
          }}>
            {/* <RewardText>{t(reward === "level" ?  `${wallet && wallet?.rank?.split(" ")[1]}` : reward)}</RewardText> */}
            <RewardText>{t(reward === "level" ?  RankingConverter(wallet && wallet?.rank) : reward)}</RewardText>
            <div className='mailbox'>
              <Image src={configData[`${reward}_reward`]} width="50px" height="50px" skeletonHeight="50px" skeletonWidth="50px" />
              {reward === "message" && unreadCount > 0 &&
              <div className='notification-badge'>
                {unreadCount}
              </div>
              }
            </div>
          </Reward>
        ))
      }
      <Modal title={t("checkin")} isOpen={openReward==="checkin"} onClose={() => setOpenReward("")}>
        <DailyCheckin />
      </Modal>
      <Modal title={t("LuckyWheel")} isOpen={openReward==="spin"} onClose={() => setOpenReward("")}>
        <LuckyWheel />
      </Modal>
      <Modal title={t("Mailbox")} isOpen={openReward==="message"} onClose={() => setOpenReward("")}>
        <Mailbox mails={mails} isLoading={isLoading}/>
      </Modal>
      <Modal title={t("DailyRebate")} isOpen={openReward==="redeem"} onClose={() => setOpenReward("")}>
        <Rebate />
      </Modal>
      <Modal 
        style={{ backgroundColor: "transparent", padding: "0px", border: "0px" }} 
        isOpen={openReward==="mission"}
        onClose={() => setOpenReward("")}
        footer={<Button onClick={() => setOpenReward("")}>{t("Cancel")}</Button>}
       >
        <Mission />
      </Modal>
    </RewardsContainer>
  )
}

export default Rewards