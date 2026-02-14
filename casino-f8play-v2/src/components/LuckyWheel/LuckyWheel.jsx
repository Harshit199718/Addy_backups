import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "./LuckyWheel.css"; // Make sure to create this CSS file to style your wheel
import { Wheel } from "react-custom-roulette";
import userService from "../../services/user.service";
import ButtonWrapper from "../common/ButtonWrapper/ButtonWrapper";
import CustomModal from "../common/CustomModal/CustomModal";
import { Icon } from "@iconify/react";
import "../../suneditor.min.css"

const LuckyWheel = ({ selectedIndex, getWalletInfo, fetchTokens, tokens }) => {
  const canvasRef = useRef(null);
  const [angle, setAngle] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [segments, setSegments] = useState([]);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [prizeCongraz, setPrizeCongraz] = useState(false);
  const [prizeCongrazOpen, setPrizeCongrazOpen] = useState(false);
  const [error, setError] = useState(null);
  const [prizeWon, setPrizeWon] = useState(false);

  const fetchSegments = async () => {
    try {
      const data = await userService.getLuckyWheelSlots();
      const API_URL = process.env.REACT_APP_APIURL;
      setLoading(true);
      if (data.data && data.data.length) {
        setSegments(
          data.data.map((v) => {
            return v.image?{
              option: `${v.amount}`,
              style: { backgroundColor: v.color, color: "#fff" },
              image: { uri: v.image?`${API_URL}${v.image}`:'', offsetY: 200},
              id: v.id,
            }:{
              option: `${v.amount}`,
              style: { backgroundColor: v.color, color: "#fff" },
              id: v.id,
            }
          })
        );
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSegments();
  }, []);

  const handleSpinClick = async () => {
    setLoading(true);
    setPrizeWon(false);
    try {
      const data = await userService.spinLuckyWheel();
      getWalletInfo();
      fetchTokens();
      if (data.data.id) {
        const selectedSlot = segments.findIndex((v) => v.id == data.data.id);
        setPrizeNumber(selectedSlot);
        setMustSpin(true);
        setPrizeCongraz(data.data.terms_condition)
        setLoading(false);
        setError(null);
      } else {
        setError({ msg: "Something went wrong" });
      }
    } catch (error) {
      console.log(error?.response)
      if (error?.response?.data?.error) {
        setError({ msg: error?.response?.data?.error });
      }
      setLoading(false);
    }
  };

  return (
    <>
    <CustomModal
        title={"Error"}
        open={error ? true : false}
        onClose={() => setError(false)}
        style={{ textAlign: "center", padding: "1rem", borderRadius: "15px" }}
        modalStyle={{zIndex:10000}}
        container={() => document.getElementById("root")}
      >
        <div>
          <div className="flex flex-row justify-center">
            <Icon icon="codicon:error" color="#F27474" width={70} />
          </div>
          <p className="text-md font-medium my-3 text-white">
            {error && error.msg ? error.msg : null}
          </p>
          <ButtonWrapper
            onClick={() => setError(false)}
            style={{ fontSize: "1em", padding: "10px 0" }}
          >
            {"Ok"}
          </ButtonWrapper>
        </div>
      </CustomModal>
    <div
      style={{
        position: "relative",
        width: "80%",
        paddingTop: "80%",
        margin: "auto",
      }}
    >
      <div
        _ngcontent-bdv-c19=""
        class="wespin-spin-wheel-div"
        style={{ position: "absolute" }}
      >
        {
          prizeWon &&
          <>
            <div _ngcontent-bdv-c19="" class="wespin-spin-win absolute top-0 left-0" style={{width: "50%", height: "50%"}}>
              <img className="w-full h-full" src={require("../../assets/images/firework.gif")} alt="" style={{filter: "saturate(100%)" }} />
            </div>
            <div _ngcontent-bdv-c19="" class="wespin-spin-win absolute top-0 right-0" style={{width: "50%", height: "50%"}}>
              <img className="w-full h-full" src={require("../../assets/images/firework.gif")} alt="" style={{filter: "saturate(100%)" }} />
            </div>
            <div _ngcontent-bdv-c19="" class="wespin-spin-win absolute bottom-0 left-0" style={{width: "50%", height: "50%"}}>
              <img className="w-full h-full" src={require("../../assets/images/firework.gif")} alt="" style={{filter: "saturate(100%)" }} />
            </div>
            <div _ngcontent-bdv-c19="" class="wespin-spin-win absolute bottom-0 right-0" style={{width: "50%", height: "50%"}}>
              <img className="w-full h-full" src={require("../../assets/images/firework.gif")} alt="" style={{filter: "saturate(100%)" }} />
            </div>
          </>
        }
        <div _ngcontent-bdv-c19="" class="wespin-spin-float-t"></div>
        <div _ngcontent-bdv-c19="" class="wespin-spin-float-b">
          <div class="token">
            <span class="token-text">
              <Icon icon="ps:token" /> Tokens: {tokens}
            </span>
          </div>          
        </div>
        <div _ngcontent-bdv-c19="" class="wespin-spin-float-tr"></div>
        <div _ngcontent-bdv-c19="" class="wespin-spin-float-bl"></div>
        <div _ngcontent-bdv-c19="" class="wespin-spin-wheel-bg"></div>
        <div _ngcontent-bdv-c19="" class="wespin-spin-wheel"></div>
        <div
          _ngcontent-bdv-c19=""
          class="wespin-spin-btn"
          onClick={() => !loading && handleSpinClick()}
        >
          {" "}
          {!loading ? (mustSpin ? "Spinning" : "Spin") : "Loading"}{" "}
        </div>
        <div
          className="lucky-wheel_container"
          style={{
            position: "absolute",
            width: "75%",
            height: "75%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-45deg)",
          }}
        >
          {segments.length && (
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={segments}
              backgroundColors={["#3e3e3e", "#df3428"]}
              textColors={["#ffffff"]}
              onStopSpinning={() => {
                setMustSpin(false);
                setPrizeCongrazOpen(true)
                setPrizeWon(true);
              }}
              disableInitialAnimation={true}
            />
          )}
        </div>
      </div>
    </div>
    <CustomModal
        // title="Congratulation !"
        open={prizeCongrazOpen}
        onClose={() => setPrizeCongrazOpen(false)}
        containerStyle={{
          width: "60%", 
          overflowY: "auto", 
          maxWidth: "960px"
        }}
        style={{
          textAlign: "center",
          borderRadius: "15px",
        }}
      >
        <div
            className="sun-editor-editable"
            style={{
              padding: "10px"
            }}
            dangerouslySetInnerHTML={{
            __html: `${prizeCongraz}`,
            }}
        ></div>
      </CustomModal>
    </>
  );
};

export default LuckyWheel;
