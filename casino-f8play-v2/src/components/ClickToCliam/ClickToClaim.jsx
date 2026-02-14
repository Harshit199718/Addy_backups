import React, { useContext, useEffect, useState } from "react";
// import { Modal } from "antd";
// import { ConfigContext } from "../ConfigContext";
// import DailyCheckin from "../components/DailyCheckin/DailyCheckin";
import PromotionDescription from "../PromotionDescription/PromotionDescription";
import userService from "../../services/user.service";
import authService from "../../services/auth.service";
import ButtonWrapper from "../common/ButtonWrapper/ButtonWrapper";
import CustomModal from "../common/CustomModal/CustomModal";
import { Icon } from "@iconify/react";
import useToast from "../../useToast";
import { ConditionMeetExcludeWalletBalance } from "./ConditionsMeet";

const ClickToClaim = ({ getWalletInfo, walletInfo }) => {
  const [promoModal, setPromoModal] = useState(null);
  const [promos, setPromos] = useState([]);
  const [groups, setGroups] = useState([]);
  // const configData = useContext(ConfigContext);
  const [checkinObject, setCheckinObject] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchCTCs();
  }, []);

  function fetchCTCs() {
    Promise.all([
      userService.getClickToClaims(),
      userService.getPromotionGroups(),
    ])
      .then((res) => {
        if (res[0].data.length) {
          setPromos(res[0].data);
        }
        if (res[1].data.length) {
          setGroups(
            res[1].data.map((group) => ({
              ...group,
              promos: res[0].data.filter((v) => v.group == group.id),
            }))
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      fetchDailyCheckins();
    }
  }, []);

  const fetchDailyCheckins = async () => {
    try {
      const { data } = await userService.getDailyCheckins();
      if (!data) {
        setCheckinObject(null);
      }
      setCheckinObject(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-h-[80vh] overflow-y-scroll ctc_container">
      {/* {configData &&
        configData.daily_checkin &&
        configData.checkin_appearance === "ctc" &&
        checkinObject && (
          <DailyCheckin
            checkin={checkinObject}
            fetchDailyCheckins={fetchDailyCheckins}
          />
        )} */}
        {toast.ToastContainer}
      <div className="flex flex-wrap" style={{gap: "5px", width: "80%", margin: "auto"}}>
        {groups.filter((grp, index) =>{
          return index < 4
        }).map((group, index) => {
          return (
            <div className="center_wrapper single-grp mt-2" style={index?{width: group.promos.length>1?"calc(66.67% - 5px)": "calc(33.33% - 5px)"}:{}}>
              <div className="packet-grp" style={{ width: index==0?"33%":(group.promos.length>1?"50%": "100%"), margin: "auto",marginBottom: "5px" }}>
                <img style={{margin: "auto",marginBottom: "5px" }} src={`${group.promo_image}`} alt="" />
              </div>
              <div
                className="flex flex-wrap me-0 ms-0 mb-0 justify-content-center max-w-full overflow-x-auto"
                style={{ gap: "10px", placeContent: "center" }}
              >
                {group.promos.length > 0
                  ? group.promos.map((promo) => {
                    const isWalletNotMatchOnly = (ConditionMeetExcludeWalletBalance(promo?.others?.message) || promo?.title?.toLowerCase()?.includes("coupon"))&&
                    (!promo?.can_claim_promo_group
                      ? !promo?.group_applied
                      : true)
                    return (
                      <div
                        className={`claim_box`}
                        onClick={() => {
                          setPromoModal(promo);
                        }}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          flexShrink: 0,
                          filter: !promo.others.applicable? !isWalletNotMatchOnly ? "grayscale(1)":"" :""
                        }}
                      >
                        {
                        promo.click_claim_layout && 
                        (
                        promo.click_claim_layout == "NYM" ? <img src={require("../../assets/images/chinese-new-year-money.gif")} alt="" style={{marginTop: "-10px"}}/>
                        :
                        promo.click_claim_layout == "BAG" ? <img src={require("../../assets/images/lucky-bag.gif")} alt="" style={{marginTop: "-10px"}}/>
                        :
                        null
                        )
                        }
                        <img src={`${promo.image}`} alt="" />
                      </div>
                    )})
                  : null}
              </div>
            </div>
          );
        })}
      </div>
      {promoModal ? (
        <CustomModal
          title={promoModal ? promoModal.title : "Promotion"}
          className="antd-promotion-modal"
          footer={[]}
          open={promoModal}
          onClose={() => setPromoModal(null)}
          style={{ 
            // textAlign: "center" 
            padding: '1em'
        }}
        >
          <div
            className="promo_modal max-h-[80vh]"
            style={{ overflowY: "auto" }}
          >
            { promoModal && ConditionMeetExcludeWalletBalance(promoModal?.others?.message) 
            && promoModal?.is_wallet_balance_check && (Number(walletInfo?.balance) > Number(promoModal?.max_wallet_balance_amount))?
                <div className="message-container">
                    <img
                      src={require("../../assets/images/full-money-min.png")}
                      alt=""
                      className="logo"
                    />
                  <div className="message">
                    { `Current Balance: ${walletInfo?.balance}`}
                    <br />
                    { `To claim this promotion, please ensure your balance meets the minimum requirement of ${promoModal?.max_wallet_balance_amount}`}
                  </div>
                  <ButtonWrapper
                    style={{fontSize: "1em", padding: "10px 20px"}} containerStyle={{height: "auto", marginTop:"10px"}}
                    onClick={() => setPromoModal(null)}
                  >
                    Close
                  </ButtonWrapper>
                </div>
            : 
            <p className="text-md font-medium mt-2">
              {promoModal && promoModal.description ? (
                <PromotionDescription
                  field={promoModal.description}
                  data={promoModal.others}
                />
              ) : null}
            </p>
            }
            <div>
              {promoModal.others.applicable &&
                (!promoModal.can_claim_promo_group
                  ? !promoModal.group_applied
                  : true) && (
                  <div className="flex gap-x-2 justify-center mt-5">
                    <ButtonWrapper
                      style={{fontSize: "1em", padding: "10px 20px"}} containerStyle={{height: "auto", marginTop:"10px"}}
                      // className={`btn btn-sm bg-red-dark rounded-xs text-uppercase
                      //                       font-700 btn-l mt-3 me-2 h-12`}
                      onClick={() => {
                        setPromoModal(null);
                      }}
                    >
                      Cancel
                    </ButtonWrapper>
                    <ButtonWrapper
                      style={{fontSize: "1em", padding: "10px 20px"}} containerStyle={{height: "auto", marginTop:"10px"}}
                      onClick={() => {
                        userService
                          .claimCTCPromotion(promoModal.id)
                          .then((res) => {
                            fetchCTCs();
                            // Refresh Wallet Balance
                            getWalletInfo();
                            // toast.success("Promotion claimed successfully!");
                            // Modal.success({
                            //   content: <p>Promotion claimed successfully!</p>,
                            // });
                            setPromoModal(null);
                          })
                          .catch((err) => {
                            toast.error(
                              `Failed to claim promotion! Please try again`
                            );
                          });
                      }}
                      // className={`btn btn-sm bg-green-dark rounded-xs text-uppercase
                      //                       font-700 btn-l mt-3 h-12`}
                    >
                      Claim
                    </ButtonWrapper>
                  </div>
                )}
            </div>
          </div>
        </CustomModal>
      ) : null}
      {/* {isLoading && <Loading />} */}
    </div>
  );
};

export default ClickToClaim;