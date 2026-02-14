import React, { Suspense, useEffect, useMemo } from "react";
const Slider = React.lazy(() => import("../../features/Slider/Slider"));
import Marquee from "../../components/common/Marquee/Marquee";
import PaymentBanner from "../../features/PaymentBanner";
import Promotions from "../../features/Promotions/Promotions";
const Banner = React.lazy(() => import("../../features/Banner/Banner"));
const General = React.lazy(() => import("../../features/General/General"));
const Games = React.lazy(() => import("../../features/Games/Games"));
import LayoutSpacing from "../../features/Layout/LayoutSpacing";
import { useDispatch, useSelector } from "react-redux";
import LiveTable from "../../features/LiveTable/LiveTable";
import { useGetNoticesQuery } from "../../api/hooks";
import { selectConfigData } from "../../api/generalApi";
import LazyInView from "../../components/common/LazyInView";
import Rewards from "../../features/Rewards/Rewards";
import { selectCurrentUser } from "../../app/slices/userSlice";
import { home_components } from "./home_components";
import Loading from "../../components/common/Loading";
import useImports from "../../hooks/useImports";
import { mobile_components } from "./mobile_components";
import Jackpot1 from "../../features/Jackpot/Jackpot1";
import FooterContent from "../../features/FooterContent/FooterContent";
import CTC1 from "../Promo/CTC1";
import { selectInnerWidth, setInnerWidth } from "../../app/slices/general";
import Link from "../../components/common/Link";
import BannerSlider from "../../features/Banner/BannerSlider";

function useComponents() {
  const {
    banner,
    banner2,
    general_buttons,
    desktop_layout_home,
    mobile_layout_home,
    live_table,
    promo_rewards,
    jackpot,
    footer_content_enabled,
    enable_ctc,
    enable_ctc_home,
    payment_banner,
    banner3,
    banner4,
    banner5,
    banner3_url,
    banner4_url,
    banner5_url,
    leaderboard_image,
    banner_style,
    show_referral_inside_first_banner
  } = useSelector(selectConfigData);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const innerWidth = useSelector(selectInnerWidth);
  const { data: notices } = useGetNoticesQuery();
  const { MemberAuth, Jackpot } = useImports();
  const components = useMemo(
    () => ({
      Notices:
        banner_style !== "2" ? (
          <Slider key="slider" slides={notices?.static} />
        ) : (
          <LayoutSpacing  key="slider">
            <BannerSlider key="BannerSlider" banners={notices?.static} />
          </LayoutSpacing>
        ),
      PaymentBanner: payment_banner ? (
        <PaymentBanner key="payment-banner" className="layout-padding" />
      ) : null,
      Jackpot: jackpot ? (
        <Suspense key="jackpot">
          <Jackpot />
        </Suspense>
      ) : null,
      Rewards: currentUser ? <Rewards key="rewards" /> : null,
      LiveTable: live_table ? (
        <LayoutSpacing key="live-table">
          <LiveTable />
        </LayoutSpacing>
      ) : null,
      Banner2: banner2 ? (
        <LayoutSpacing key="banner2">
          <Banner image={banner2} />
        </LayoutSpacing>
      ) : null,
      Promotions: promo_rewards ? (
        <LayoutSpacing key="promotions">
          <Promotions />
        </LayoutSpacing>
      ) : null,
      Banner: banner ? (
        <LayoutSpacing key="banner">
          <Banner image={banner} showReferralinBanner={show_referral_inside_first_banner}/>
        </LayoutSpacing>
      ) : null,
      Banner3: banner3 ? (
        <a href={banner3_url} target="_blank">
          <LayoutSpacing>
            <Banner image={banner3} />
          </LayoutSpacing>
        </a>
      ) : null,
      Banner4: banner4 ? (
        <a href={banner4_url} target="_blank">
          <LayoutSpacing>
            <Banner image={banner4} />
          </LayoutSpacing>
        </a>
      ) : null,
      Banner5: banner5 ? (
        <a href={banner5_url} target="_blank">
          <LayoutSpacing>
            <Banner image={banner5} />
          </LayoutSpacing>
        </a>
      ) : null,
      General: general_buttons ? (
        <LayoutSpacing key="general-buttons">
          <General />
        </LayoutSpacing>
      ) : null,
      Games: (
        <LayoutSpacing key="games">
          <Games />
        </LayoutSpacing>
      ),
      MemberAuth: (
        <LayoutSpacing key="member-auth">
          <Suspense fallback={<Loading isLoading />}>
            <MemberAuth />
          </Suspense>
        </LayoutSpacing>
      ),
      ClickToClaim:
        enable_ctc && enable_ctc_home ? (
          <LayoutSpacing key="ctc-claim">
            <CTC1 />
          </LayoutSpacing>
        ) : null,
      Leaderboard: leaderboard_image ? 
      <Link to="/leaderboard">
        <LayoutSpacing>
          <Banner image={leaderboard_image} />
        </LayoutSpacing>
      </Link>
      :null,
      FooterContent: footer_content_enabled ? (
        <FooterContent key="footer-content" />
      ) : null,
    }),
    [notices, banner, banner2, general_buttons, show_referral_inside_first_banner]
  );

  useEffect(() => {
    const handleResize = () => {
      dispatch(setInnerWidth(window.innerWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const componentsLayout = useMemo(() => {
    let layout = [];
    if (typeof window !== "undefined") {
      layout =
        innerWidth > 1200
          ? desktop_layout_home
            ? [
                ...JSON.parse(desktop_layout_home),
                // {
                //   componentName: "Leaderboard",
                //   column: 3,
                //   order: JSON.parse(desktop_layout_home)?.length + 1,
                // },
                // {
                //   componentName: "BannerSlider",
                //   column: 1,
                //   order: JSON.parse(desktop_layout_home)?.length + 1,
                // },
                {
                  componentName: "FooterContent",
                  column: 3,
                  order: JSON.parse(desktop_layout_home)?.length + 1,
                },
              ]
            : home_components
          : mobile_layout_home
          ? [
              ...JSON.parse(mobile_layout_home),
              // {
              //   componentName: "BannerSlider",
              //   column: 1,
              //   order: 5,
              // },
              // {
              //   componentName: "Leaderboard",
              //   column: 1,
              //   order: JSON.parse(mobile_layout_home)?.length + 1,
              // },
              {
                componentName: "FooterContent",
                column: 1,
                order: JSON.parse(mobile_layout_home)?.length + 1,
              },
            ]
          : mobile_components;
    }
    return layout; // Or mobile_layout_home based on your preference
  }, [desktop_layout_home, mobile_layout_home, innerWidth]);

  return { components, componentsLayout };
}

export default useComponents;
