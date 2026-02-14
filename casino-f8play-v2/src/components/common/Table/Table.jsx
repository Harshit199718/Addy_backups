import React from "react";
import "./Table.css";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";

function formatDate(dateString, format) {
  // Your date string in ISO 8601 format
  const dateStr = dateString;
  // Parse the date string using Day.js
  const date = dayjs(dateStr);
  // Format the date as "HH:mm" (24-hour time format)
  const time = date.format("HH:mm");
  // Format the date as "D MMM, YYYY" (e.g., 6 Sept, 2022)
  // Note: Using 'D MMM, YYYY' instead of 'D/M/YY' to match the example format
  const formattedDate = date.format(format ? format : "D MMM, YYYY");
  // Combine the formatted time and date
  const formattedDateTime = {
    time,
    formattedDate,
  };
  return formattedDateTime;
}

function Table({ betHistory, customeDate, handleDelete, selectedTab }) {
  return (
    <div className="history_table w-full mt-12">
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Type & No</th>
            <th>Amount</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        {betHistory && betHistory.length ? (
          <tbody>
            {betHistory &&
              betHistory.length > 0 &&
              betHistory
                .filter((item) => {
                  if (!customeDate) {
                    return true;
                  }
                  let filterDate
                  if (selectedTab == "rewards") {
                    filterDate = formatDate(item.from_date, "YYYY-MM-DD");
                  } else {
                    filterDate = formatDate(item.created_at, "YYYY-MM-DD");
                  }
                  return filterDate.formattedDate === customeDate;
                })
                .map((item, index) => {
                  const dateTime = formatDate(item.created_at);
                  const rewardDateTime = formatDate(item.from_date);
                  return (
                    <tr>
                      <td>
                        {index + 1}
                        {/* {item &&
                              `${item.product_name ? item.product_name : ""} ${
                                item && item.detail && item.detail.GameName
                                  ? item.detail.GameName
                                  : ""
                              }`} */}
                      </td>
                      <td>
                        {selectedTab == "rewards" ? "Reward" : item.ttype_display}
                        <br />
                        {item.txid}
                      </td>
                      {
                        selectedTab == "rewards" ? <td>
                          <span className={`${item.reward_amount <= 0 ? "text-red-500" : "text-green-500"}`}>
                            {item.reward_amount?item.reward_amount:item.amount}
                          </span>
                        </td> : <td>
                            <span className={`${item.amount <= 0 ? "text-red-500" : "text-green-500"}`}>
                              {item.amount ? item.amount : 0}
                            </span>
                          {/* <span className="flex justify-between">
                            <span
                              style={{
                                fontSize: "12px",
                                color: "gray",
                                textAlign: "left",
                              }}
                            >
                              Requested :
                            </span>{" "}
                            <span className={`${item.req_amount <= 0 ? "text-red-500" : "text-green-500"}`}>
                              {item.req_amount}
                            </span>
                          </span>
                          <span className="flex justify-between">
                            <span
                              style={{
                                fontSize: "12px",
                                color: "gray",
                                textAlign: "left",
                              }}
                            >
                              Actual :
                            </span>{" "}
                            <span className={`${item.amount <= 0 ? "text-red-500" : "text-green-500"}`}>
                              {item.amount}
                            </span>
                          </span> 
                          {item.forfeit > 0 ? (
                            <span className="flex justify-between">
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "gray",
                                  textAlign: "left",
                                }}
                              >
                                Forfeited :
                              </span>{" "}
                              <span className={`${item.forfeit <= 0 ? "text-red-500" : "text-green-500"}`}>
                                {item.forfeit}
                              </span>
                            </span>
                          ) : null}*/}
                        </td>}
                      <td>
                        {(selectedTab === "rewards") ? rewardDateTime.formattedDate : dateTime.formattedDate}
                        {/* {dateTime.formattedDate} */}
                        <br></br>
                        {(selectedTab === "rewards") ? null : dateTime.time}
                      </td>
                      <td>
                        <span className={`px-1 py-1 ${item.state === "approved"
                            ? "bg-green-500"
                            : item.state === "error"
                              ? "bg-red-500"
                              : item.state === "rejected"
                                ? "bg-purple-500"
                                : item.state === "deleted"
                                  ? "bg-red-500"
                                  : "bg-yellow-500"
                          }`}>

                          {item.state}
                        </span>
                        <span>

                          {item.state === "pending" &&
                            ["BT", "BM", "BC"].indexOf(item.ttype) === -1 ? (
                            <span
                              className="flex align-center justify-center"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Icon icon="ic:outline-delete" fontSize={22} className="bg-red-500 mt-1" />
                            </span>
                          ) : null}
                        </span>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        ) : null}
      </table>
      {betHistory &&
        !betHistory.filter((item) => {
          if (!customeDate) {
            return true;
          }
          let filterDate
          if (selectedTab == "rewards") {
            filterDate = formatDate(item.from_date, "YYYY-MM-DD");
          } else {
            filterDate = formatDate(item.created_at, "YYYY-MM-DD");
          }
          return filterDate.formattedDate === customeDate;
        }).length ? (
        <div className="bg-[#1F71C9] no_data_found w-full mt-7">
          <p>No data was found!</p>
        </div>
      ) : null}
    </div>
  );
}

export default Table;
