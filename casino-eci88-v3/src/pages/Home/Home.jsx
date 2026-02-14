import React, { useEffect, useMemo, useState } from "react";
import { Column, HomeContainer } from "./Home.styled";
import useComponents from "./useComponents";
import LazyInView from "../../components/common/LazyInView";
import Marquee from "../../components/common/Marquee/Marquee";
import { useGetNewsFeedsQuery, useStopAllProductsMutation } from "../../api/hooks";
import Notices from "../../features/Notices/Notices";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../app/slices/userSlice";
import { selectConfigData } from "../../api/generalApi";
import Subline1 from "../Subline/Subline1";
import Modal from "../../components/common/Modal";
import FakeWheel from "../../features/FakeWheel/FakeWheel";
import { useTranslation } from "react-i18next";

function Home2() {
  const {components, componentsLayout} = useComponents();
  const {data: newsFeeds} = useGetNewsFeedsQuery();
  const [stopAllProducts] = useStopAllProductsMutation();
  const currentUser = useSelector(selectCurrentUser);
  const {sub_line_fix, show_luckywheel_registration_wheel} = useSelector(selectConfigData);
  const [fakeWheelOpen, setFakeWheelOpen] = useState(false)
  const { t } = useTranslation(); 
  
  const columns = useMemo(() => {
    const initialColumns = {
      1: [<Marquee key="marquee" text={newsFeeds && newsFeeds.map(feed=>({id: feed.id, text: feed.text}))} />],
      2: [],
      3: [],
    }; // Three columns
    const sortedComponents = componentsLayout.sort((a, b) => a.order - b.order);
    sortedComponents.forEach((item) => {
      const Component = components[item.componentName];
      if (Component) {
        initialColumns[item.column].push(Component);
      }
    });
    return initialColumns
  },[componentsLayout, newsFeeds, components])

  useEffect(() => {
    if (currentUser) {
      stopAllProducts();
    }
  }, [currentUser]);

  useEffect(() => {
    if (localStorage.getItem("isNewUser")) {
      if(show_luckywheel_registration_wheel){
        setFakeWheelOpen(true);
      } else {
        localStorage.removeItem("isNewUser")
      }
    }
  }, [show_luckywheel_registration_wheel])
  
  
  return (
    <HomeContainer>
      {Object.values(columns).map((columnItems, index) => (
        <Column key={index}>
          <LazyInView key={index}>{columnItems}</LazyInView>
        </Column>
      ))}
      <Notices />
      {
        sub_line_fix?
        <Subline1 />
        :null
      }
      <Modal title={t("SPIN THE WHEEL")} isOpen={fakeWheelOpen} onClose={() => {
        localStorage.removeItem("isNewUser")
        setFakeWheelOpen(false)
      }} $width="100%" $height="100%">
        <FakeWheel />
      </Modal>
    </HomeContainer>
  );
}

export default Home2;
