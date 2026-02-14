import React, { useEffect, useState } from "react";
import { BlockMsg, HistoryContainer, UserDetailsContainer } from "./PlayerChats.styled";
import { useSelector } from "react-redux";
import { getSelectedChat } from "../../app/slices/chatSlice";
import { Table, Td, Th, Thead, Tr } from "../common/Table";
import { selectParentUser } from "../../app/slices/userSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import Loader from "../common/Loader";
import { Box } from "../common/Box";
import { formatMessageDate } from "../../utlis";

function UserDetails({hide}) {
  const selectedChat = useSelector(getSelectedChat);
  const [history, setHistory] = useState([]);
  const parentUser = useSelector(selectParentUser);
  const [loading, setLoading] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  const username = selectedChat?.user?.username?.split("_")
  const fetchUserHistory = async () => {
    setShowHistory(true);
    const { hostApi, token } = parentUser;
    setLoading(true);
    const userHistory = await fetch(
      `${hostApi}jqk/transactions/?_end=25&_order=DESC&_sort=updated_at&_start=0&filter=${JSON.stringify(
        { player: [username[0]] }
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (userHistory?.ok) {
      setHistory(await userHistory.json());
    }
    setLoading(false)
  };

  const getStateStyle = (state) => {
    switch (state) {
      case "approved":
        return {
          color: "green"
        }
        break;
      case "pending":
        return {
          color: "rgb(234 179 8)"
        }
        break;
      case "error":
      case "deleted":
      case "rejected":
        return {
          color: "red"
        }
        break;
    
      default:
        break;
    }
  }
  return (
    <UserDetailsContainer hide={hide}>
      <h2 className="header">Details</h2>
      {selectedChat ? (
        <>
          <table>
            <tbody>
              <tr>
                <td className="key">Username: </td>
                <td>
                  <span className="user" title={selectedChat?.user?.username}>
                    {selectedChat?.user?.username}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="key">Email: </td>
                <td>
                  <span className="user" title={selectedChat?.user?.email}>
                    {selectedChat?.user?.email}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="key">Host: </td>
                <td>{selectedChat?.user?.host}</td>
              </tr>
            </tbody>
          </table>
          <h2 className="header">
            History <Icon className="refresh-history" icon="material-symbols:refresh" onClick={fetchUserHistory} />
          </h2>
          {
            showHistory &&
            <HistoryContainer>
              {
                loading?
                <Loader />
                :
                selectedChat?.user?.role==="user"?
                <Table $fontSize=".7em">
                  <Thead>
                    <Th>ID</Th>
                    <Th>Type</Th>
                    <Th>Amount</Th>
                    <Th>State</Th>
                    <Th>Time</Th>
                  </Thead>
                  <tbody>
                    {history?.map((data) => (
                      <Tr key={data._id}>
                        <Td>{data?.txid}</Td>
                        <Td>{data?.ttype_display}</Td>
                        <Td>{data?.amount}</Td>
                        <Td><span style={getStateStyle(data?.state)}>{data?.state}</span></Td>
                        <Td>{data?.created_at?.replace("T"," ").substring(0, 19)}</Td>
                      </Tr>
                    ))}
                  </tbody>
                </Table>
                :
                <Box>
                  <BlockMsg>No Details Available</BlockMsg>
                </Box>
              }
            </HistoryContainer>
          }
        </>
      ) : null}
    </UserDetailsContainer>
  );
}

export default UserDetails;
