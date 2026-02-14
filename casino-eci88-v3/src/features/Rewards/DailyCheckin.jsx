import React, { useEffect, useState } from 'react'
import { DailyCheckinContainer, Day, DaysBG, DaysBGBottom, DaysBGContainer, DaysBGMiddle, DaysContainer } from './Rewards.styled'
import { selectConfigData } from '../../api/generalApi';
import { useSelector } from 'react-redux';
import { useClaimCheckinMutation, useGetCheckinsQuery } from '../../api/hooks';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import Modal from '../../components/common/Modal';

const getDayImg = (day) => {
    if (day<=7) {
        return require("../../assets/images/DIAMOND.png")
    } else if (day<=14) {
        return require("../../assets/images/TREE.png")
    } else if (day<=21) {
        return require("../../assets/images/HEART2.png")
    } else {
        return require("../../assets/images/SPADE.png")
    }
}
function DailyCheckin() {
  const {data: checkin, isLoading} = useGetCheckinsQuery();
  const [claimCheckin, {data, error}] = useClaimCheckinMutation();
  const [success, setSuccess] = useState(null);
  const [dailyCheckInError, setDailyCheckInError] = useState(null);

  useEffect(() => {
    if (data) {
        setSuccess({
            message: data.success
        });
    }
    if(error){
        setDailyCheckInError({
            message: error.data.error
        })
    }
  }, [data, error])

  return (
    <DailyCheckinContainer>
      <Loading isLoading={isLoading} fullscreen={false} />
      {
        !isLoading && checkin?
        <>
            <DaysContainer>
                <DaysBGContainer>
                    <DaysBG />
                    <DaysBGMiddle />
                    <DaysBGMiddle />
                    <DaysBGBottom />
                </DaysBGContainer>
                {
                    Array.from({length: 31}).map((_, index)=>(
                        <Day key={index} $isClaimed={((index + 1) <= checkin.checked_days)}>
                            <img className='day-image' src={getDayImg(index+1)} alt="" />
                            <p className="text">
                                {index + 1}
                            </p>
                            <p className="text text-checked" style={{fontWeight: "700", color: "#000"}}>
                                {((index + 1) <= checkin.checked_days) && "✅"}
                            </p>
                        </Day>
                    ))
                }
            </DaysContainer>
            <Button className='claim-btn' $width="max-content" $borderRadius="10px" $padding="10px 20px" disabled={checkin?.claimed_today} onClick={() => claimCheckin()}>
                {!checkin?.claimed_today && <img className='claim-btn-img' src={require("../../assets/icons/checkin_icon.png")} alt="" />}{checkin?.claimed_today?"✅ Claimed":"Claim"}
            </Button>
        </>
        :null
      }
      <Modal title="Daily Checkin" isOpen={success || dailyCheckInError} 
        onClose={() => {
            setSuccess(null)
            setDailyCheckInError(null)
        }} 
        success={success} 
        error={dailyCheckInError}/>
    </DailyCheckinContainer>
  )
}

export default DailyCheckin