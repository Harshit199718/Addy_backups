import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import userService from "../services/user.service";
import "./History.css";
import { useNavigate } from "react-router-dom";
import CustomDatePicker from "../components/common/CustomDatePicker/CustomDatePicker";
import Table from "../components/common/Table/Table";

function History() {
  const [betHistory, setBetHistory] = useState([]);
  const [luckywheelRewards, setLuckywheelRewards] = useState([]);
  const [customeDate, setCustomeDate] = useState();
  const [selectedTab, setSelectedTab] = useState("orders");
  const navigate = useNavigate();

  const getBetHistory = async () => {
    try {
      const betHistoryResponse = await userService.getOrders(selectedTab);
      if (selectedTab === "rewards"){
        const luckywheelRewardsResponse = await userService.getLuckyWheelRewards();
        setLuckywheelRewards(luckywheelRewardsResponse.data)
      }else {
        setLuckywheelRewards([])
      }
      setBetHistory(betHistoryResponse.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBetHistory();
  }, [selectedTab]);
  
  const handleDelete = async (txnId) => {
    try {
        await userService.deleteOrder(txnId);
    getBetHistory();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-[#2256B2] w-full overflow-y-scroll history_container p-2 h-[650px] show-scrollbar">
      <div className="history_header md:items-center flex w-full bg-[#06D6FA] justify-between">
       <div className="flex flex-row justify-between items-center w-full">
       {/* <p className="history-gaming">Gaming</p> */}
        <div className="history-tabs_container flex items-center mx-auto gap-x-4 w-full">
          <p className={`history-tab p-2 ${selectedTab==="orders"?"active":""}`}
          onClick={() => setSelectedTab("orders")}
          >Orders & Bonuses</p>
          <p className={`history-tab p-2 ${selectedTab==="rewards"?"active":""}`}
          onClick={() => setSelectedTab("rewards")}
          >Rewards</p>
          <p className={`history-tab p-2 ${selectedTab==="transfers"?"active":""}`}
          onClick={() => setSelectedTab("transfers")}
          >Transfers</p>
        </div>
       </div>
        {/* <span
          className="rounded-full h-fit mt-4 mr-4 sm:mt-0 sm:mr-8"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <Icon
            icon="oi:x"
            className="sm:text-4xl text-2xl"
            style={{ color: "#3C3339", fontWeight: 800 }}
          />
        </span> */}

      </div>
      <div className="flex items-center flex-col mt-3">
        <div className="history_date flex items-center justify-start w-full">
          <span>Date</span>
          <CustomDatePicker
            format="YYYY-MM-DD"
            className="customDatePicker"
            onChange={(value) => {
              if (!value) {
                setCustomeDate(null)
                return
              }
              setCustomeDate(
                value["$y"] +
                  "-" +
                  (((value["$M"] + 1)<10)?("0"+(value["$M"] + 1)):(value["$M"] + 1) )+
                  "-" +
                  (value["$D"] < 10 ? "0" + value["$D"] : value["$D"])
              );
            }}
          />
        </div>
        <Table betHistory={betHistory.concat(luckywheelRewards)} customeDate={customeDate} handleDelete={handleDelete} selectedTab={selectedTab} />
      </div>
    </div>
  );
}

export default History;
