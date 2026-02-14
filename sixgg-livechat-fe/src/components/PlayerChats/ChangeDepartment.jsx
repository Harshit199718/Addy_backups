import React, { useEffect, useMemo, useState } from 'react'
import Modal from '../common/Modal';
import Select from '../common/Select';
import { useDispatch, useSelector } from 'react-redux';
import { selectDepartments } from '../../app/slices/departmentsSlice';
import { useChangeUserDepartmentMutation, useGetAgentsMutation, useGetDepartmentsQuery } from '../../api/hooks';
import { selectAgents } from '../../app/slices/userSlice';
import { getSelectedChat, setSelectedChat } from '../../app/slices/chatSlice';
import { Icon } from '@iconify/react';
import { Box } from '../common/Box';
import { Button } from '../common/Button';

function ChangeDepartment() {
    useGetDepartmentsQuery();
    const [getAgents] = useGetAgentsMutation();
    const [changeUserDepartment, { isSuccess: isAssigned }] =
        useChangeUserDepartmentMutation();
    const selectedChat = useSelector(getSelectedChat);
    const departments = useSelector(selectDepartments);
    const agents = useSelector(selectAgents);
    const [departmentPayload, setDepartmentPayload] = useState(null);
    const [openDepartmentModal, setOpenDepartmentModal] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedChat) {
            if (agents) {
                setDepartmentPayload({
                    chatId: selectedChat?._id,
                    userId: selectedChat?.user?._id,
                    agentId: agents[0]?._id,
                    department: agents[0]?.departments[0]?._id,
                });
            }
        }
    }, [selectedChat, agents]);

    useEffect(() => {
        if (isAssigned) {
            dispatch(setSelectedChat(null));
        }
    }, [isAssigned]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "departments") {
            getAgents(event.target.value);
        } else if (name === "agents") {
            setDepartmentPayload({
                chatId: selectedChat?._id,
                userId: selectedChat?.user?._id,
                agentId: value,
                department: agents[0]?.departments[0]?._id,
            });
        }
    };

    useEffect(() => {
        if (departments?.length) {
            getAgents(departments[0]?._id);
        }
    }, [departments])

    const filteredAgent = useMemo(() => {
        if (departmentPayload) {
            return agents.find(agent => agent._id === departmentPayload?.agentId)
        }
    }, [departmentPayload])

    const departmentOptions = useMemo(() => {
        return departments?.map(department => ({
            label: department?.name,
            value: department?._id,
        }))
    }, [departments]);
    const agentOptions = useMemo(() => {
        return agents?.map(agent => ({
            label: agent?.username,
            value: agent?._id,
        }))
    }, [agents]);
    return (
        <>
            <button className='assign-to-btn' onClick={() => setOpenDepartmentModal(true)}>Assign to</button>
            <Modal title="Change Department" isOpen={openDepartmentModal} onClose={() => setOpenDepartmentModal(false)}>
                <Box $direction="column" $alignItems="flex-start" $gap="10px">
                    <Select $fontSize="1em" name="departments" options={departmentOptions} onChange={handleChange} />
                    {
                        agentOptions?.length ?
                            <Select $fontSize="1em" name="agents" options={agentOptions} onChange={handleChange} />
                            : "No Agents to select"
                    }
                    <Button onClick={() => {
                        changeUserDepartment(departmentPayload);
                    }}>
                        Assign To {filteredAgent?.username}
                        <Icon
                            icon="material-symbols-light:assignment-return-sharp"
                            fontSize={30}

                        />
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

export default ChangeDepartment