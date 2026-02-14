import React, { useEffect, useState } from 'react'
import { Department, DepartmentsContainer } from './Departments.styled'
import { SettingsTitle } from '../Settings/Settings.styled'
import { ChatInput } from '../../components/common/Input'
import { Box } from '../../components/common/Box'
import { Icon } from '@iconify/react'
import { useCreateDepartmentMutation, useGetDepartmentsQuery } from '../../api/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { addDepartment, selectDepartments } from '../../app/slices/departmentsSlice'

function Departments() {
    useGetDepartmentsQuery();
    const [createDepartment, {data, isSuccess}] = useCreateDepartmentMutation();
    const departments = useSelector(selectDepartments);
    const [name, setName] = useState("")
    const dispatch = useDispatch();
    
    useEffect(() => {
      if (isSuccess && data) {
        dispatch(addDepartment(data?.data))
        setName("")
      }
    }, [isSuccess, data])
    
  return (
    <>
        <SettingsTitle>Available Departments</SettingsTitle>
        <DepartmentsContainer>
            {
                departments?.map(department => (
                    <Department key={department?._id}>{department.name}</Department>
                ))
            }
        </DepartmentsContainer>
        <SettingsTitle>Create Department</SettingsTitle>
        <Box $justifyContent="flex-start">
            <ChatInput type='text' value={name} placeholder='Department Name' onChange={(e) => setName(e.target.value)} />
            <Icon icon="material-symbols:save-outline" fontSize={40} color='#6993ff' onClick={() => createDepartment(name)} />
        </Box>
    </>
  )
}

export default Departments