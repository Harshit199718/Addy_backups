import React, { useEffect, useState } from "react";
import TelcoPay from "./TelcoPay";
import SurepayDeposit from "./surepay";
import ManualDeposit from "./ManualDeposit";
import SurepayEwallet from "./SurepayEwallet";
import Loading from "../common/Loading/Loading";

const country = process.env.REACT_APP_COUNTRY;

const DepositContainer = ({ setOpenDeposit, isLoggedIn }) => {
    const [showDepositSelection, setShowDepositSelection] = useState(country === "my" ? 'surepay' : 'manual');
    const [depositLoading, setDepositLoading] = useState(false);

    function renderButton(value, label) {
      return (
        <button
          className={`filter-button px-4 py-2 rounded-lg max-w-xs ${
            showDepositSelection === value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setShowDepositSelection(value)}
        >
          {label}
        </button>
      );
    }

    return (
      <div className="p-4 rounded-lg shadow-lg">
        <div className="flex items-center">
          <div className="flex flex-col space-y-4">
            {country === "my" && renderButton('surepay', 'SUREPAY')}
            {country === "my" && renderButton('surepay-ewallet', 'SUREPAY EWALLET')}
            {renderButton('manual', 'MANUAL DEPOSIT')}
            {country === "my" && renderButton('telcopay', 'TELCOPAY')}
          </div>
          <div className="w-full overflow-y-scroll history_container p-2 max-h-[650px] show-scrollbar">
            {showDepositSelection === 'surepay' && (
              <SurepayDeposit setOpenDeposit={setOpenDeposit} setDepositLoading={setDepositLoading} depositLoading={depositLoading}/>
            )}
            {showDepositSelection === 'surepay-ewallet' && (
              <SurepayEwallet setOpenDeposit={setOpenDeposit} setDepositLoading={setDepositLoading} depositLoading={depositLoading}/>
            )}
            {showDepositSelection === 'manual' && (
              <ManualDeposit setOpenDeposit={setOpenDeposit} setDepositLoading={setDepositLoading} depositLoading={depositLoading}/>
            )}
            {showDepositSelection === 'telcopay' && (
              <TelcoPay setOpenDeposit={setOpenDeposit} setDepositLoading={setDepositLoading} depositLoading={depositLoading}/>
            )}
          </div>
          {depositLoading && <Loading fullscreen />}
        </div>
      </div>
    )
}

export default DepositContainer;