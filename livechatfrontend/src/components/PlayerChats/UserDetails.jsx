import React, { useEffect, useState } from "react";
import { HistoryContainer, UserDetailsContainer } from "./PlayerChats.styled";
import { useSelector } from "react-redux";
import { getSelectedChat } from "../../app/slices/chatSlice";
import { Table, Td, Th, Thead, Tr } from "../common/Table";
import { selectParentAuth } from "../../app/slices/userSlice";

function UserDetails() {
  const selectedChat = useSelector(getSelectedChat);
  const parentAuth = useSelector(selectParentAuth);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const fetchUserHistory = async () => {
      const userHistory = await fetch(
        `${parentAuth?.hostApi}/api/transactions/?_end=25&_order=DESC&_sort=updated_at&_start=0&filter=${JSON.stringify(
          { player: [selectedChat?.user?.username] }
        )}`,
        {
          headers: {
            Authorization: `Bearer ${parentAuth?.token}`,
          },
        }
      );
      if (userHistory?.ok) {
        setHistory(await userHistory.json());
      }
    };
    if (selectedChat) {
      fetchUserHistory();
    }
  }, [selectedChat]);
  console.log("parentAuth", parentAuth)

  return (
    <UserDetailsContainer>
      <h2 className="header">Details</h2>
      {selectedChat ? (
        <>
          <table>
            <tbody>
              <tr>
                <td className="key">Username: </td>
                <td>{selectedChat?.user?.username}</td>
              </tr>
              <tr>
                <td className="key">Email: </td>
                <td>{selectedChat?.user?.email}</td>
              </tr>
              <tr>
                <td className="key">Host: </td>
                <td>{selectedChat?.user?.host}</td>
              </tr>
            </tbody>
          </table>
            <h2 className="header">History</h2>
          <HistoryContainer>
            <Table $fontSize=".7em">
              <Thead>
                <Th>ID</Th>
                <Th>Type</Th>
                <Th>Amount</Th>
                <Th>Time</Th>
              </Thead>
              <tbody>
                {history?.map((data) => (
                  <Tr key={data._id}>
                    <Td>{data?.txid}</Td>
                    <Td>{data?.ttype_display}</Td>
                    <Td>{data?.amount}</Td>
                    <Td>{data?.created_at}</Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </HistoryContainer>
        </>
      ) : null}
    </UserDetailsContainer>
  );
}

export default UserDetails;
