import React from 'react'
import { Profile2Tab, Profile2TabsContainer } from './Profile2.styled'
import Image from '../../components/common/Image'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';
import { selectConfigData } from '../../api/generalApi';
import { useLocation, useNavigate } from 'react-router-dom';

function Profile2Tabs() {
    const {t} = useTranslation();
    const {side_menu_icon_11, side_menu_icon_9} = useSelector(selectConfigData);
    const location = useLocation();
    const navigate = useNavigate();
  return (
    <Profile2TabsContainer>
        <Profile2Tab $active={location.pathname==="/profile"?"#cf7300":""} onClick={() => navigate("/profile")}>
            <Image src={side_menu_icon_11} width="25px" height="25px" skeletonHeight={25} skeletonWidth={25} />
            {t("Profile")}
        </Profile2Tab>
        <Profile2Tab $active={location.pathname==="/change-password"?"#cf7300":""} onClick={() => navigate("/change-password")}>
            <Image src={side_menu_icon_9} width="25px" height="25px" skeletonHeight={25} skeletonWidth={25} />
            {t("Change_Password")}
        </Profile2Tab>
    </Profile2TabsContainer>
  )
}

export default Profile2Tabs