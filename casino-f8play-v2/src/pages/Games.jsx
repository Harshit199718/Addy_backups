import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import userService from "../services/user.service";

const Games = () => {
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );
  const location = useLocation();
  const gameSrc = location.state ? location.state.gameSrc : null;
  const gameId = location.state ? location.state.gameId : null;
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const StopProduct = async () => {
    try {
      // await userService.stopProduct(gameId);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  if (gameSrc) {
    return (
      <div style={{position: "relative", zIndex: "1"}}>
        <div
          className="px-1 py-3 d-flex align-items-center text-white"
          style={{
            background: "transparent",
            position: "fixed",
            top: "0",
            left: "0",
            zIndex: "100",
          }}
        >
          <div className="bg-[#08317C] p-2 w-fit flex justify-center items-center" onClick={() => StopProduct()}>
            <Icon icon="uil:angle-left" style={{ fontSize: "30px" }} />
          </div>
        </div>
        <iframe
        title="myFrame"
          frameBorder="0"
          src={gameSrc}
          allowtransparency="true"
          frameborder="0"
          scrolling="no"
          class="wistia_embed"
          name="wistia_embed"
          allowfullscreen
          mozallowfullscreen
          webkitallowfullscreen
          oallowfullscreen
          msallowfullscreen
          width="100%"
          // style={{height: "100vh"}}
          className="game_iframe"
        ></iframe>
      </div>
    );
  } else {
    navigate("/");
  }
};

export default Games;
