import React from "react";
import CustomModal from "./CustomModal/CustomModal";
import ButtonWrapper from "./ButtonWrapper/ButtonWrapper";
import { Icon } from "@iconify/react";

function Toast({ type, message, setToast }) {
  return (
    <CustomModal
      title={""}
      open={true}
      //   onClose={() => setGameError(false)}
      style={{ textAlign: "center", padding: "1rem", borderRadius: "15px" }}
    >
      <div>
        <div className="flex flex-row justify-center">
            {
                type === "success"?
                <Icon icon="mdi:success-circle-outline" color="#4CAF50" width={70} />
                :
                <Icon icon="codicon:error" color="#f27474" width={70} />
            }
          {/* <img
                src={selectedGame.image_mobile}
                alt={selectedGame.name}
                style={{ width: "150px", borderRadius: "1rem" }}
              /> */}
        </div>
        <p className="text-md font-medium my-3 text-white">
          {message}
        </p>
        <ButtonWrapper
          onClick={() => setToast(null)}
          style={{ fontSize: "1em", padding: "10px 0" }}
        >
          {"Ok"}
        </ButtonWrapper>
        {/* <button
              onClick={() => setGameError(false)}
              className={`btn btn-sm bg-blue-dark rounded-xs text-uppercase
            font-700 w-100 btn-l mt-3 h-12`}
            >
              {"OK"}
            </button> */}
      </div>
    </CustomModal>
  );
}

export default Toast;
