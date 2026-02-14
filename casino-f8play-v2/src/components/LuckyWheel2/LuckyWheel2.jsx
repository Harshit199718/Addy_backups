import React, { useContext, useEffect, useRef, useState } from "react";
import "./LuckyWheel2.css"; // Make sure to create this CSS file to style your wheel
import { Wheel } from "react-custom-roulette";
import { Icon } from "@iconify/react";
import userService from "../../services/user.service";
import CustomModal from "../common/CustomModal/CustomModal";
import ButtonWrapper from "../common/ButtonWrapper/ButtonWrapper";

const LuckyWheel2 = ({ selectedIndex, getWalletInfo, fetchTokens, tokens, configData }) => {
  const canvasRef = useRef(null);
  const [angle, setAngle] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [segments, setSegments] = useState([]);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [prizeCongraz, setPrizeCongraz] = useState('');
  const [prizeCongrazOpen, setPrizeCongrazOpen] = useState(false);
  const [error, setError] = useState(null);
  const [informationOpen, setInformationOpen] = useState(false);

  const fetchSegments = async () => {
    try {
      const data = await userService.getLuckyWheelSlots();
      const API_URL = process.env.REACT_APP_APIURL;
      setLoading(true);
      if (data.data && data.data.length) {
        setSegments(
          data.data.map((v) => {
            return v.image
              ? {
                  option: `${v.description ? v.description : v.amount}`,
                  style: { backgroundColor: v.color, color: "#fff" },
                  image: {
                    uri: v.image ? `${API_URL}${v.image}` : "",
                    offsetY: 200,
                    sizeMultiplier: 0.5,
                  },
                  id: v.id,
                }
              : {
                  option: `${v.description ? v.description : v.amount}`,
                  style: { backgroundColor: v.color, color: "#fff" },
                  id: v.id,
                };
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
    fetchTokens();
  }, []);

  const handleSpinClick = async () => {
    setLoading(true);
    try {
      const data = await userService.spinLuckyWheel();
      getWalletInfo();
      fetchTokens();
      if (data.data.id) {
        const selectedSlot = segments.findIndex((v) => v.id == data.data.id);
        setPrizeNumber(selectedSlot);
        setMustSpin(true);
        // setPrizeCongraz(data.data.terms_condition);
        setPrizeCongraz(`Congratulations, You win ${configData && configData.currency_symbol} ${data.data.amount}`)
        setLoading(false);
        setError(null);
      } else {
        setError({ msg: "Something went wrong" });
      }
    } catch (error) {
      // console.log(error?.response)
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        setError({ msg: error.response.data.error });
      } else {
        setError({ msg: error.message });
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
        modalStyle={{ zIndex: 10000 }}
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
              style={{ fontSize: "1em", padding: "10px 20px" }}
              containerStyle={{ height: "auto", marginTop: "10px" }}
              onClick={() => setError(false)}
            >Ok</ButtonWrapper>
        </div>
      </CustomModal>
      <div
        style={{
          position: "relative",
          width: "90%",
          paddingTop: "90%",
          margin: "auto",
        }}
      >
        <div
          _ngcontent-bdv-c19=""
          class="wespin2-spin-wheel-div"
          style={{
            display: "flex",
            position: "absolute",
            background: `url(${require("../../assets/images/wheel/luckywheel_bg.jpg")})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        >
          <div _ngcontent-bdv-c19="" class="wespin2-spin-btn">
            {" "}
          </div>
          <div
            className="lucky-wheel_container2"
            style={{
              position: "absolute",
              width: "75%",
              height: "75%",
              top: "5%",
              left: "50%",
              transform: "translateX(-50%) rotate(-45deg)",
            }}
          >
            {segments.length && (
              <Wheel
                outerBorderWidth={1}
                outerBorderColor="#FFCA4A"
                radiusLineWidth={1}
                radiusLineColor="#FFCA4A"
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={segments}
                backgroundColors={["#3e3e3e", "#df3428"]}
                textColors={["#ffffff"]}
                onStopSpinning={() => {
                  setMustSpin(false);
                  setPrizeCongrazOpen(true);
                }}
                disableInitialAnimation={true}
                pointerProps={{
                  src: require("../../assets/images/wheel/pointer-img.png"),
                  style: {
                    width: "7%",
                    transform: "rotate(45deg)",
                    top: "14%",
                    right: "12%"
                  },
                }}
              />
            )}
          </div>
          <div
            className="flex mt-auto mb-5 md:mb-10 mx-auto justify-center"
            style={{ zIndex: "10" }}
          >
            <div className="tokens_container">
              Play({tokens})
            </div>
            <ButtonWrapper
              style={{ fontSize: "1em", padding: "5px 20px" }}
              containerStyle={{ height: "auto" }}
              onClick={() => !loading && handleSpinClick()}
            >
              {!loading ? (mustSpin ? "Spinning" : "Spin") : "Loading"}{" "}
            </ButtonWrapper>
            <Icon style={{ position: 'absolute', bottom: 20, right: 20 }} icon="mdi:information-outline" width={30} onClick={() => setInformationOpen(true)}/>
          </div>
        </div>
      </div>

      <CustomModal
        title={""}
        open={prizeCongrazOpen}
        style={{ textAlign: "center", padding: "1rem", borderRadius: "15px" }}
      >
        <div>
          <div className="flex flex-row justify-center">
            <Icon icon="mdi:success-circle-outline" color="#4CAF50" width={70} />
          </div>
          <p className="text-md font-medium my-3 text-white">
            {prizeCongraz}
          </p>
          <ButtonWrapper
          onClick={() => setPrizeCongrazOpen(null)}
          style={{ fontSize: "1em", padding: "10px 0" }}
          >
            {"Ok"}
          </ButtonWrapper>
        </div>
      </CustomModal>
      <CustomModal
        title={"Lucky Wheel T&C"}
        open={informationOpen}
        style={{ textAlign: "center", padding: "1rem", borderRadius: "15px" }}
      >
        <div>
          <img src={require("../../assets/images/wheel/information_luckywheel.jpg")} />
          <ButtonWrapper
          onClick={() => setInformationOpen(null)}
          style={{ fontSize: "1em", padding: "10px 0" }}
          >
            {"Ok"}
          </ButtonWrapper>
        </div>
      </CustomModal>

      {/* <CustomModal
        // title="Congratulation !"
        open={prizeCongrazOpen}
        onClose={() => setPrizeCongrazOpen(false)}
        containerStyle={{
          width: "60%",
          overflowY: "auto",
          maxWidth: "960px",
        }}
        style={{
          textAlign: "center",
          borderRadius: "15px",
        }}
      >
        <div
          className="sun-editor-editable"
          style={{
            padding: "10px",
          }}
          dangerouslySetInnerHTML={{
            __html: `${prizeCongraz}`,
          }}
        ></div>
      </CustomModal> */}
    </>
  );
};

export default LuckyWheel2;
