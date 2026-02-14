import React, { useEffect, useState } from 'react'
import CTC1 from '../Promo/CTC1'
import Modal from '../../components/common/Modal'
import { FakeWheelContainer, WheelImg } from '../../features/FakeWheel/FakeWheel.styled';
import { useSelector } from 'react-redux';
import { selectConfigData } from '../../api/generalApi';

function Reward() {
  const [congratulationsModal, setCongratulationsModal] = useState(false);
  const {
    luckywheel_registration_wheel_win_popup,
    show_luckywheel_registration_wheel
  } = useSelector(selectConfigData);
  useEffect(() => {
    if (localStorage.getItem("isNewUser")) {
      if(show_luckywheel_registration_wheel){
        setCongratulationsModal(true);
      } else {
        localStorage.removeItem("isNewUser")
      }
    }
  }, [show_luckywheel_registration_wheel])
  
  return (
    <>
      <CTC1 isReward />
      <Modal title="Congratulations" $bodyHeight="90%" isOpen={congratulationsModal} onClose={() => {
        localStorage.removeItem("isNewUser")
        setCongratulationsModal(false);
      }} $width="100%">
        <FakeWheelContainer $width="100%" $height="100%">
          <WheelImg src={luckywheel_registration_wheel_win_popup} $width="auto" />
        </FakeWheelContainer>
      </Modal>
    </>
  )
}

export default Reward