import React, { useState, useEffect } from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import Popover from "../Popover/Popover";
import CustomModal from "../CustomModal/CustomModal";
import userService from "../../../services/user.service";
import GameCategories from "../../GameList2/GameCategories";
import PromotionDescription from "../../PromotionDescription/PromotionDescription";
import ButtonWrapper from "../ButtonWrapper/ButtonWrapper";
// import { toast } from "react-toastify";
import ClickToClaim from "../../ClickToCliam/ClickToClaim";
import ChangePassword from "../../../pages/ChangePassword";
import History from "../../../pages/History";
import LuckyWheel from "../../LuckyWheel/LuckyWheel";
import useToast from "../../../useToast";
import TopWinnings from "../../TopWinning/TopWinnings";
import LuckyWheel2 from "../../LuckyWheel2/LuckyWheel2";
import Withdraw from "../../../pages/Withdraw";
import { Icon } from "@iconify/react/dist/iconify.js";

function Footer({ezSelect, setEzSelect, selecedCategory, setSelecedCategory,isLoggedIn, getWalletInfo, walletInfo, tokens, setTokens, configData, toggleLiveChat, unreadMessages}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [openMail, setOpenMail] = useState(false);
  const [openTopWinnings, setOpenTopWinnings] = useState(false);
  const [messageBox, setMessageBox] = useState(false);
  const [message, setMessage] = useState("");
  const [mails, setMails] = useState([]);
  const [unreadMails, setUnreadMails] = useState(0);
  const [openCTC, setOpenCTC] = useState(false);
  const [openChangePswd, setOpenChangePswd] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [groups, setGroups] = useState([]);
  const [promoModal, setPromoModal] = useState(null);
  const [promos, setPromos] = useState([]);
  const [openLuckyWheelTNC, setOpenLuckyWheelTNC] = useState(false);
  const [openLuckyWheel, setOpenLuckyWheel] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  // const [tokens, setTokens] = useState(0);
  const toast = useToast();

  const navigate = useNavigate();

  const getMail = async () => {
    try {
      // const walletResponse = await userService.getBalance();
      // const userId = walletResponse.data.user.id;

      const mailResponse = await userService.getMail();
      let filteredMails = (mailResponse.data && mailResponse.data.length ? 
        mailResponse.data.filter((mail) =>{
          return mail.is_read === false;
        }
        ):[])
      setMails(mailResponse.data);
      setUnreadMails(filteredMails.length);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMail();
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

  const fetchTokens = async () => {
    try {
      const response  = await userService.getTokens();
      setTokens(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchTokens()
    }
  }, [isLoggedIn, openLuckyWheel]);
  
  return (
    <div id="footer">
      {toast.ToastContainer}
      <div className="menu_container flex">
        <div className="menu-item_container menu_container_first flex items-center justify-center">
          <div className="menu-btn_container relative">
            {menuOpen && (
              <Popover>
                <div className="flex flex-col gap-y-2 mb-6">
                  <button
                    className="menu-btn-open text-uppercase flex items-center justify-center gap-x-1"
                    onClick={() => {
                      setOpenMail(true)
                    }}
                  >
                    Mailbox
                    <span className="mail_badge mr-2 rounded-full bg-red-500 text-white">
                      {unreadMails}
                    </span>
                  </button>
                  <button
                    className="menu-btn-open text-uppercase"
                    onClick={() => {
                      setMenuOpen(!menuOpen)
                      setOpenHistory(!openHistory)
                    }}
                  >
                    TRANSACTIONS
                  </button>
                  <button
                    className="menu-btn-open text-uppercase"
                    onClick={() => {
                      setMenuOpen(!menuOpen);
                      setOpenChangePswd(!openChangePswd)
                    }}
                  >
                    CHANGE PASSWORD
                  </button>
                  <button
                    className="menu-btn-open text-uppercase"
                    onClick={() => {
                      setMenuOpen(!menuOpen);
                      setOpenWithdraw(true)
                    }}
                  >
                    Withdraw
                  </button>
                  {/* <button
                    className="menu-btn-open text-uppercase"
                    onClick={() => setOpenLuckyWheel(true)}
                  >
                    LUCKY WHEEL
                  </button> */}
                </div>
              </Popover>
            )}
            <button
              className="menu-btn uppercase"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {" "}
              <span>Menu</span>
            </button>
          </div>
        </div>
        <div className="menu-item_container flex items-center justify-center">
          <div
            className="menu-history uppercase flex items-center justify-center"
            onClick={() => setOpenCTC(!openCTC)}
          >
            <img
              src={require("../../../assets/images/ctc_promo.png")}
              alt=""
            />
            Bonus
          </div>
        </div>
        <div className="menu-item_container flex items-center justify-center">
          <div
            className="menu-suggestions uppercase flex items-center justify-center relative"
            onClick={(e) => {
              setOpenTopWinnings(true)
            }}
          >
            <img
              src={require("../../../assets/images/money-bag.png")}
              alt=""
            />
            Top Winnings
          </div>
        </div>
      </div>
      <div className="livechat" 
        style={{ 
          position: "relative",
          width: "15em", 
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img
          src={require("../../../assets/images/livechat/lobbylivechat.jpg")}
          alt=""
          style={{height: "100%", width: "15em", transform: "translateY(-10%)"}}
          onClick={() => toggleLiveChat()}
        ></img>
        <span className={"unreadMessage"} style={{ color: "white" }}> {unreadMessages}</span>
      </div>
      <div className="lucky-wheel" 
      style={{ 
        width: "15em", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
        }}
      >
        <img
          src={require("../../../assets/images/lucky-wheel-icon.gif")}
          alt=""
          style={{height: "150%", width: "15em", transform: "translateY(-20%)"}}
          onClick={() => setOpenLuckyWheelTNC(true)}
        />
      </div>
      {/* <div className="special-bonus">
        <SpecialBonus />
      </div> */}
      <div className="flex items-center justify-center mr-2 game-categories_container">
        <div className="flex flex-col gap-y-2" style={{minWidth: "30em", maxWidth: "52em"}}>
          {configData && <GameCategories setEzSelect={setEzSelect} selecedCategory={selecedCategory} setSelecedCategory={setSelecedCategory} configData={configData} />}
        </div>
      </div>
      {/* <div style={{width:"30%"}}>
        <GameCategories />
      </div> */}
      {
        openLuckyWheelTNC && 
        <CustomModal
          open={true}
          onClose={() => {
            setOpenLuckyWheelTNC(false)
          }}
          containerStyle={{
            width: "50%"
          }}
          style={{
            textAlign: "center",
            textAlign: "-webkit-center",
            borderRadius: "15px",
            padding: "1.5rem 1rem",
            color: "white",
          }}>
            <img
              src={require("../../../assets/images/luckywheel/luckywheeltnc.png")}
              style={{
                width: "80%"
              }}
              alt=""
            />
            <ButtonWrapper onClick={() => {
              setOpenLuckyWheel(true)
              setOpenLuckyWheelTNC(false)
            }}>Agree</ButtonWrapper>
        </CustomModal>
      }
      {
        openLuckyWheel && 
        <CustomModal
          open={true}
          onClose={() => setOpenLuckyWheel(false)}
          containerStyle={{
            width: "50%"
          }}
          style={{
            textAlign: "center",
            borderRadius: "15px",
            padding: "1.5rem 1rem",
            color: "white",
          }}>
          <LuckyWheel2 selectedIndex={4} getWalletInfo={getWalletInfo} fetchTokens={fetchTokens} tokens={tokens?tokens:0} configData={configData} />
        </CustomModal>
      }
      {openMail && (
        <CustomModal
          title={"Mailbox"}
          titleStyle={{
            fontSize: "21px",
            textTransform:"uppercase"
          }}
          open={true}
          onClose={() => setOpenMail(false)}
          style={{
            textAlign: "center",
            borderRadius: "15px",
            padding: "1.5rem 1rem",
            color: "white",
          }}
        >
          <div className="mail_container text-left">
            {mails && mails.length
              ? mails.map((mail) => (
                  <div
                    className="single-mail flex justify-between items-center cursor-pointer mb-2"
                    onClick={async () => {
                      setMessageBox(true);
                      setMessage(mail.message);
                      await userService.updateIsRead(mail.id, {
                        id: mail.id,
                        created_at: mail.created_at,
                        receiver: mail.receiver,
                        mail_template: mail.mail_template,
                        is_read: true,
                      });
                    }}
                  >
                    <p className="mail-title">
                      <span className="text-uppercase text-[#F2CF52] font-bold">
                        TITLE:{" "}
                      </span>
                      {mail.title}
                    </p>
                    <p className="mail-title ml-auto mr-3">
                      <span className="text-uppercase text-[#F2CF52] font-bold">
                        FROM:{" "}
                      </span>
                      {mail.sender}
                    </p>
                    {
                      !mail.is_read &&
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    }
                  </div>
                ))
              : <p className="w-full text-center">No Messages</p>}
          </div>
        </CustomModal>
      )}
      {
        openTopWinnings?
        <CustomModal open={true}
        title="Top Winnings"
        onClose={() => setOpenTopWinnings(false)}
        style={{
          textAlign: "center",
          borderRadius: "15px",
          padding: "1.5rem 1rem",
          color: "white",
        }}
        containerStyle={{width:"750px", maxWidth:"95%"}}
        >
          <TopWinnings />
        </CustomModal>
        :null
      }
      {messageBox && (
        <CustomModal
          title={"Mailbox"}
          titleStyle={{
            fontSize: "21px",
            textTransform:"uppercase",
          }}
          open={true}
          onClose={() => setMessageBox(false)}
          style={{
            textAlign: "center",
            borderRadius: "15px",
            padding: "1.5rem 1rem",
            color: "white",
            maxHeight: "50vh",
            overflowY:"scroll",
          }}
        >
          <div className="text-left">
            {message ? (
              <div className="flex justify-between cursor-pointer">
                <p className="mail-title w-full">
                  <span className="text-[#F2CF52] font-bold">MESSAGE: </span>
                  <span className="flex flex-col justify-center items-center" dangerouslySetInnerHTML={{ __html: message }} />
                </p>
              </div>
            ) : (
              <p className="w-full text-center">No Message</p>
            )}
          </div>
        </CustomModal>
      )}
      {openCTC &&
      <CustomModal
      // title={"CTC Promotions"}
      titleStyle={{
        fontSize: "21px",
        textTransform:"uppercase"
      }}
      open={true}
      onClose={() => setOpenCTC(false)}
      style={{
        textAlign: "center",
        borderRadius: "15px",
        padding: "1.5rem 1rem",
        color: "white", 
      }}
      containerStyle={{width:"55%", maxWidth:"95%", maxHeight:"98%"}}
    >
      <ClickToClaim getWalletInfo={getWalletInfo} walletInfo={walletInfo}/>
    </CustomModal>
      }
        {openChangePswd &&
      <CustomModal
      title={"Change Password"}
      titleStyle={{
        fontSize: "21px",
        textTransform:"uppercase"
      }}
      open={true}
      onClose={() => setOpenChangePswd(false)}
      style={{
        textAlign: "center",
        borderRadius: "15px",
        padding: "1.5rem 1rem",
        color: "white", 
      }}
      containerStyle={{width:"750px", maxWidth:"95%"}}
    >
      {/* <ClickToClaim /> */}
      <ChangePassword isLoggedIn={isLoggedIn} setOpenChangePswd={setOpenChangePswd}/>
    </CustomModal>
      }
        {openHistory &&
      <CustomModal
      title={"History"}
      titleStyle={{
        fontSize: "21px",
        textTransform:"uppercase"
      }}
      open={true}
      onClose={() => setOpenHistory(false)}
      style={{
        textAlign: "center",
        borderRadius: "15px",
        padding: "1.5rem 1rem",
        color: "white", 
      }}
      containerStyle={{width:"880px", maxWidth:"95%"}}
    >
      <History setOpenHistory={setOpenHistory}/>
    </CustomModal>
      }
      {promoModal ? (
        <CustomModal
          title={promoModal ? promoModal.title : "Promotion"}
          className="antd-promotion-modal"
          footer={[]}
          open={promoModal}
          onClose={() => setPromoModal(null)}
          style={{ textAlign: "center" }}
        >
          <div
            className="promo_modal"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            <p className="text-md font-medium mt-2">
              {promoModal && promoModal.description ? (
                <PromotionDescription
                  field={promoModal.description}
                  data={promoModal.others}
                />
              ) : null}
            </p>
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

{openWithdraw &&
      <CustomModal
      title={"Withdraw"}
      titleStyle={{
        fontSize: "21px",
        textTransform:"uppercase"
      }}
      open={true}
      onClose={() => setOpenWithdraw(false)}
      style={{
        textAlign: "center",
        borderRadius: "15px",
        padding: "1.5rem 1rem",
        color: "white", 
      }}
      containerStyle={{width:"750px", maxWidth:"95%"}}
    >
      {/* <ClickToClaim /> */}
      <Withdraw isLoggedIn={isLoggedIn} setOpenWithdraw={setOpenWithdraw}/>
    </CustomModal>
      }
    </div>
  );
}

export default Footer;