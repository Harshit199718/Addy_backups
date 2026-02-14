import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useClaimCTCCouponMutation, useClaimCTCMutation, useGetCPCQuery, useGetPromoGroupsQuery, useWalletQuery } from "../../api/hooks";
import { CTCContainer, CTCGroup, CardsContainer, GroupPromo } from "./Promo.styled";
import Image from "../../components/common/Image";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../api/generalApi";
import LayoutSpacing from "../../features/Layout/LayoutSpacing";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import ConditionsMeet, { ConditionMeetExcludeWalletBalance } from "./ConditionsMeet";
import Rebate from "../../features/Rewards/Rebate";
import Input from "../../components/common/Input";
import { t } from "i18next";
import { formatPromotionMessage } from "./promo.utils";
import "../../pages/Promo/suneditor.min.css";
import Card from "../../components/common/Card";
import Loading from "../../components/common/Loading";
import { useNavigate } from "react-router-dom";
import { MessageContainer } from "../../features/Rewards/Rebate.styled";
import { addThousandSeparator } from "../../components/common/NumberConvertion";
import VerifyV3 from "../Auth/SignUp/VerifyV3";

function CTC2({isReward}) {
  const { data: ctcPromos } = useGetCPCQuery();
  const { data: promoGroups } = useGetPromoGroupsQuery();
  const [claimCTC, {isSuccess}] = useClaimCTCMutation();
  const [claimCTCCoupon, {data: isCouponMessage, error: isCouponError}] = useClaimCTCCouponMutation();
  const { ctc_bg, currency_symbol, enable_ctc_condition, primary_color, country } = useSelector(selectConfigData);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [couponInput, setCouponInput] = useState("null");
  const [isClaimed, setIsClaimed] = useState(false);
  const [isCouponClaim, setIsCouponClaim] = useState(null);
  const [isCouponClaimError, setIsCouponError] = useState(null);
  const {promo_style, promo_joinnow = "", promo_moredetails = "", signup_version} = useSelector(selectConfigData);
  const navigate = useNavigate();
  const {data: wallet} = useWalletQuery();
  const [openVerifyAccount, setOpenVerifyAccount] = useState(false);

  // const allGroups = useMemo(() => {
  //   if (ctcPromos && promoGroups) {
  //     const ctcWithGroups = ctcPromos.reduce((groupObject, promo) => {
  //       if (!(promo.group in groupObject)) {
  //         groupObject[promo.group] = [];
  //       }
  //       groupObject[promo.group].push(promo);
  //       return groupObject;
  //     }, {});

  //     return promoGroups.map((group) => ({
  //       ...group,
  //       promotions: ctcWithGroups[group.id],
  //     }));
  //   }
  //   return [];
  // }, [ctcPromos, promoGroups]);

  // Normal CTC error
  useEffect(() => {
    if (isSuccess) {
        setIsClaimed(true);
        setSelectedPromo(null);
    }
  }, [isSuccess])
  
  // check for coupon error
  useEffect(() => {
    if (isCouponMessage) {
      setIsCouponClaim({
        message: isCouponMessage?.message
      });
      setSelectedPromo(null);
    }
    if (isCouponError) {
      let message = "";
      if(isCouponError?.data?.non_field_errors?.length > 0) {
        if(isCouponError?.data?.non_field_errors?.length > 1){
          isCouponError?.data?.non_field_errors?.map(condition => {
            const formattedMessage = formatPromotionMessage(condition, t);
            if (formattedMessage !== undefined) {
              message += `${formattedMessage}\n`;
            }
          });
        } else {
          message = isCouponError?.data?.non_field_errors[0]
        }
      } else {
        message = "Failed to claim coupon because you had claimed before"
      }
      setIsCouponError({
        message: message
      });
    }
  }, [isCouponMessage, isCouponError])

  return (
    <LayoutSpacing>
      <CTCContainer>
        {/* {allGroups?.map((group) => (
          group?.promotions &&
          <CTCGroup>
            <Image
              className="promo-group-title"
              src={group?.promo_image}
              skeletonHeight={30}
              skeletonWidth="100%"
            /> */}
            <div className="cpcpromos">
              <CardsContainer>
                {/* {group?.promotions?.map((promotion) => { */}
                {ctcPromos?.map((promotion) => {
                  const isActive = (promotion?.others?.applicable || promotion?.title?.toLowerCase()==="coupon")&&
                  (!promotion?.can_claim_promo_group
                    ? !promotion?.group_applied
                    : true)
                  return (
                      <Card
                        key={promotion.id}
                        id={promotion.id}
                        title={promo_style!=="2"?promotion.title:""}
                        image={promotion.image}
                        content={
                          <Suspense fallback={<Loading isLoading />}>
                              <div className="buttons_container">
                                <Image
                                  src={promo_moredetails}
                                  alt=""
                                  onClick={() => setSelectedPromo({...promotion, isActive})}
                                />
                                <Image
                                  src={promo_joinnow}
                                  alt=""
                                  onClick={() => navigate("/deposit")}
                                />
                            </div>
                          </Suspense>
                        }
                        $border={promo_style!=="2"?"2px solid rgb(245, 237, 149)":""}
                        $background={promo_style==="2"?"#0F0F0F":""}
                        $borderRadius={promo_style==="2"?"5px":""}
                      />
                  );
                })}
              </CardsContainer>
            </div>
          {/* </CTCGroup>
        ))} */}
      </CTCContainer>
      {openVerifyAccount ? (
        <Modal
          title={t("Verify Account")}
          isOpen={true}
          onClose={() => {
            setOpenVerifyAccount(false);
          }}
          $minWidth="60%"
        >
          <VerifyV3 setOpenVerifyAccount={setOpenVerifyAccount} />
        </Modal>
      ) : null}
      <Modal
        isOpen={selectedPromo}
        // title={selectedPromo?.title || "Promotion"}
        title={null}
        onClose={() => setSelectedPromo(null)}
        footer={
          (selectedPromo?.others?.applicable || selectedPromo?.title?.toLowerCase()==="coupon") &&
          (!selectedPromo?.can_claim_promo_group
            ? !selectedPromo?.group_applied
            : true) ? (
            selectedPromo?.title?.toLowerCase() != "reward" &&
            <>
              <Button $width="auto" onClick={() => setSelectedPromo(null)} style={{ backgroundColor: "#F44336"}}>{t("Cancel")}</Button>
              <Button $width="auto" onClick={() => {
                if (signup_version === "V5") {
                  if (wallet?.registration_stage==="signup" || wallet?.registration_stage==="verify") {
                    return setOpenVerifyAccount(true);
                  }
                }
                selectedPromo?.title?.toLowerCase()==="coupon" ? 
                claimCTCCoupon({
                  id: selectedPromo?.id, 
                  coupon: couponInput,
                  errorTitle: "Coupon"
                })
                :
                claimCTC({id: selectedPromo?.id, errorTitle: "Promotion"})
              }
              }
              style={{ backgroundColor: "#4CAF50"}}
              >
                {t("Claim")}
              </Button>
            </>
          ) :  <Button $width="auto" onClick={() => setSelectedPromo(null)} style={{ backgroundColor: "#F44336"}}>{t("Cancel")}</Button>
        }
        footerOutside
        $padding={"2px"}
      >
        {
          selectedPromo?.title?.toLowerCase()==="reward"?
          <Rebate />
          :
          <>
            { selectedPromo?.header_description && <div className='sun-editor-editable' dangerouslySetInnerHTML={{__html: selectedPromo?.header_description}} />}
            { selectedPromo?.title?.toLowerCase()==="coupon" && <Input type="text" placeholder={t("key_in_your_coupon")} onChange={(e)=> setCouponInput(e.target.value)} /> }
            { selectedPromo && ConditionMeetExcludeWalletBalance(selectedPromo?.others?.message) 
            && selectedPromo?.is_wallet_balance_check && (Number(wallet?.balance) > Number(selectedPromo?.max_wallet_balance_amount))?
                <MessageContainer>
                  <div className="logo">
                    <img
                      src={require("../../assets/images/full-money-min.png")}
                      alt=""
                    />
                  </div>
                  <div className="message">
                    { `${t("Current_Wallet_Balance")}: ${addThousandSeparator(wallet?.balance, country)}`}
                    <br />
                    { `${t("Min_Wallet_Balance_CTC")} ${addThousandSeparator(selectedPromo?.max_wallet_balance_amount, country)}`}
                  </div>
                  <Button
                  $width="auto" 
                  $backgroundImage={`linear-gradient(to left, ${primary_color}, hsl(38, 100%, 50%))`}
                  onClick={() => navigate('/')}
                  >
                    {t("Play_Now")}
                  </Button>
                </MessageContainer>
              : 
              <div className='sun-editor-editable' dangerouslySetInnerHTML={{__html: selectedPromo?.description}} />
            }
            { (enable_ctc_condition && selectedPromo?.title?.toLowerCase()!="coupon") && <ConditionsMeet conditions={selectedPromo?.others} /> }
          </>
        }
      </Modal>
      <Modal
        title={t("Promotions")}
        isOpen={isClaimed}
        onClose={() => setIsClaimed(false)}
        success={{ message: `Promotion claimed successfully!` }}
      />
      <Modal title={t("Coupon")}
        isOpen={isCouponClaim || isCouponClaimError} 
        onClose={() => {
          setIsCouponClaim(false)
          setIsCouponError(null)
        }}
        success={isCouponClaim} 
        error={isCouponClaimError}
      />
    </LayoutSpacing>
  );
}

export default CTC2;
