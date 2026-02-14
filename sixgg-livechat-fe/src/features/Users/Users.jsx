import React, { useEffect, useState } from "react";
import { Table, Td, Th, Thead, Tr } from "../../components/common/Table";
import { Icon } from "@iconify/react";
import { useAddToDepartmentMutation, useBlockUserMutation, useGetDepartmentsQuery, useGetUsersMutation } from "../../api/hooks";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, selectUserAuth, updateUser } from "../../app/slices/userSlice";
import { WhiteBox } from "../../components/common/WhiteBox";
import { UsersContainer } from "./Users.styled";
import { selectDepartments } from "../../app/slices/departmentsSlice";
import { Box } from "../../components/common/Box";
import Select from "../../components/common/Select";

function Users() {
  useGetDepartmentsQuery();
  const departments = useSelector(selectDepartments);
  const userAuth = useSelector(selectUserAuth);
  const [getAllUsers] = useGetUsersMutation();
  const [addToDepartment, { data }] = useAddToDepartmentMutation();
  const users = useSelector(getUsers);
  const [blockUser] = useBlockUserMutation();
  const [updatedDept, setUpdatedDept] = useState({})
  const dispatch = useDispatch();

  useEffect(() => {
    if(userAuth?.access) {
      getAllUsers({token: userAuth?.access});
    }
  }, [userAuth])
  
  useEffect(() => {
    if (data?.data) {
      dispatch(updateUser(data?.data))
      setUpdatedDept({})
    }
  }, [data])

  return (
      <UsersContainer onScroll={event => {
        if (event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight) {
          console.log('Scrolled to bottom!');
          getAllUsers({token: userAuth?.access, lastUserId: users[users?.length - 1]?._id});
        }}}>
    <WhiteBox>
        <Table>
          <Thead>
            <Th>S.No</Th>
            <Th>Username</Th>
            <Th>Role</Th>
            <Th>Departments</Th>
            <Th $textAlign="center">Add To</Th>
            <Th>Actions</Th>
          </Thead>
          <tbody>
            {
              users?.map((user, index) => {
                const depts = departments?.filter(dept =>
                  !user.departments.some(userDept => userDept._id === dept._id)
                )
                return (
                  <Tr key={user._id}>
                    <Td>{index + 1}</Td>
                    <Td>{user?.username}</Td>
                    <Td>{user?.role}</Td>
                    <Td>{user?.departments?.map(department => `${department.name}, `)}</Td>
                    <Td>
                      <Box $spacingX="0" $gap="5px">
                        {depts?.length ?
                          <>
                            <Select $fontSize="1em" name="departments" options={depts?.map(department => ({
                              label: department?.name,
                              value: department?._id,
                            }))} onChange={(e) => {
                              setUpdatedDept(prevUpdatedDept => ({
                                ...prevUpdatedDept,
                                [user?._id]: e.target.value
                              }))
                            }} />
                            {/* <select name="" id="" onChange={(e) => {
                              setUpdatedDept(prevUpdatedDept => ({
                                ...prevUpdatedDept,
                                [user?._id]: e.target.value
                              }))
                            }}>
                              {
                                depts?.map(department => (
                                  <option key={department?._id} value={department?._id}>{department?.name}</option>
                                ))
                              }
                            </select> */}
                            <Icon icon="carbon:add-filled" onClick={() => addToDepartment({ userId: user?._id, department: updatedDept[user?._id] ? updatedDept[user?._id] : depts[0]?._id })} />
                          </>
                          : "No other departments"}
                      </Box>
                    </Td>
                    <Td $textAlign="center">
                      <Icon icon={user.block ? "gg:unblock" : "material-symbols:block"} color="red" fontSize={24} onClick={() => blockUser({ id: user._id, block: !user?.block, token: userAuth?.access })} />
                    </Td>
                  </Tr>
                )
              })
            }
          </tbody>
        </Table>
    </WhiteBox>
      </UsersContainer>
  );
}

export default Users;
