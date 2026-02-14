import React from "react";
import { Table, Td, Th, Thead, Tr } from "../../components/common/Table";
import { Icon } from "@iconify/react";
import { useBlockUserMutation, useGetUsersQuery } from "../../api/hooks";
import { useSelector } from "react-redux";
import { getUsers, selectUserAuth } from "../../app/slices/userSlice";
import { WhiteBox } from "../../components/common/WhiteBox";
import { UsersContainer } from "./Users.styled";

function Users() {
    const userAuth = useSelector(selectUserAuth);
    useGetUsersQuery(userAuth?.access);
    const users = useSelector(getUsers);
    const [blockUser] = useBlockUserMutation();

  return (
    <WhiteBox>
      <UsersContainer>
          <Table>
            <Thead>
              <Th>S.No</Th>
              <Th>Username</Th>
              <Th>Role</Th>
              <Th>Actions</Th>
            </Thead>
            <tbody>
                {
                    users?.map((user, index)=>(
                        <Tr key={user._id}>
                            <Td>{index+1}</Td>
                            <Td>{user?.username}</Td>
                            <Td>{user?.role}</Td>
                            <Td $textAlign="center">
                            <Icon icon={user.block?"gg:unblock":"material-symbols:block"} color="red" fontSize={24} onClick={() => blockUser({id: user._id, block: !user?.block, token: userAuth?.access})} />
                            </Td>
                        </Tr>
                    ))
                }
            </tbody>
          </Table>
      </UsersContainer>
    </WhiteBox>
  );
}

export default Users;
