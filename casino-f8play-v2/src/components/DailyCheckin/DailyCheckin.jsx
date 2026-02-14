import React, { useContext } from "react";
// import { toast } from "react-toastify";
import "./DailyCheckin.css";
import userService from "../../services/user.service";
import ButtonWrapper from "../common/ButtonWrapper/ButtonWrapper";
import useToast from "../../useToast";
// import { ConfigContext } from "../ConfigContext";

const DailyCheckin = ({ checkin, fetchDailyCheckins, fetchTokens, getWalletInfo }) => {
  // const configData = useContext(ConfigContext);
  const toast = useToast();
  let credits = 0;
  try {
    if(!checkin.new_implement){
      credits = parseFloat(
        checkin.min_days_checkin_bonus_amount / checkin.min_checkin_days
      ).toFixed(2);
    }
  } catch (error) {
    console.log(error);
  }

  const isToday = (index) => {
    const checkIndex = checkin.claimed_today?(index + 1):index
    return checkIndex === checkin.checked_days
  };
  const isClaimed = (index) => index + 1 <= checkin.checked_days;

  const claimTodayCheckIn = async (today) => {
    try {
      if (today) {
        const { data } = await userService.claimTodayCheckin();
        toast.success(`${data ? data.success : 'Congratulations !'}`);
        fetchTokens();
        getWalletInfo();
        fetchDailyCheckins();
      }
    } catch (err) {
      if(err && err.response && err.response.data && err.response.data.error){
        toast.error(err.response.data.error);
      }else{
        toast.error("Failed to claim");
      }
    }
  };

  return (
    <div className="checkin-container">
      {toast.ToastContainer}
      <div className="day-container flex-wrap">
        {Array.from({ length: checkin.min_checkin_days }).map((item, index) => (
          <div
            className="day-box relative"
            key={index}
            style={{
              borderColor: "rgb(5, 94, 117)",
              // background: `url(
              //   ${index<=6?require("../../assets/images/DIAMOND.png"):(
              //     (index>6 && index<=13)?require("../../assets/images/TREE.png"):(
              //       (index>13 && index<=20)?require("../../assets/images/HEART.png"):(
              //         (index>20 && index<=30)?require("../../assets/images/SPADE.png"):""
              //       )
              //     )
              //   )}
              // )`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              // height: "140px",
              width: "calc((100% / 7) - 10px)",
              boxSizing: "border-box"
            }}
          >
            <div className="day-inner-box flex-col absolute" style={{top: "40%"}}>
              {isToday(index) ? (
                <p className="day" style={{fontWeight: "700", color: "#8C8C8C"}}>Today</p>
              ) : (
                <p className="day" style={{fontWeight: "700", color: "#8C8C8C"}}>
                  {index + 1}
                </p>
              )}
            </div>
            <img src={
              index<=6?require("../../assets/images/DIAMOND.png"):(
                (index>6 && index<=13)?require("../../assets/images/TREE.png"):(
                  (index>13 && index<=20)?require("../../assets/images/HEART.png"):(
                    (index>20 && index<=30)?require("../../assets/images/SPADE.png"):""
                  )
                )
              )
            } alt="" />
            <ButtonWrapper
              className="claim-btn"
              style={
                  isToday(index) && !isClaimed(index)
                  ? {
                      // backgroundColor: "rgb(6, 214, 250)",
                      cursor: checkin.claimed_today ? "default" : "pointer",
                      padding: "2px 15px",
                      minWidth: "88px"
                    }
                  : {
                      background: "gray",
                      cursor: "default",
                      padding: "2px 15px",
                      minWidth: "88px"
                    }
              }
              disabled={!isToday(index) || checkin.claimed_today}
              onClick={() => claimTodayCheckIn(isToday(index))}
            >
              {isClaimed(index) ? "✅" : "Claim"}
            </ButtonWrapper>
            {/* <img
              src={require("../images/Diggold_FPromo.png")}
              width="30px"
              height="auto"
              alt=""
            /> */}
            {/* <p>{checkin.new_implement?(parseFloat(checkin.min_days_checkin_bonus_amount)+(index*checkin.checkin_amount_interval)):credits} {checkin.checkin_amount_type !== "CA"?"Credits":configData && configData.currency}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyCheckin;
