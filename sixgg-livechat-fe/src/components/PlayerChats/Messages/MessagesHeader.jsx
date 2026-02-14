import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react'
import { MessagesHeaderContainer, SearchInput } from './Messages.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../app/slices/userSlice';
import { getSelectedChat, selectMessages, setIsSearched, setSelectedChat } from '../../../app/slices/chatSlice';
import ChangeDepartment from '../ChangeDepartment';
import { useGetMessagesMutation } from '../../../api/hooks';
import { selectSettings } from '../../../app/slices/generalSlice';

const LIVECHAT_API_URL = process.env.REACT_APP_LIVECHAT_API_URL;

function MessagesHeader({setOpenUserDetails}) {
    const user = useSelector(selectUser);
    const selectedChat = useSelector(getSelectedChat);
    const [query, setQuery] = useState("");
    const dispatch = useDispatch()
    const settings = useSelector(selectSettings);
    const agentProfile = settings?.find(setting => setting.key==="agentProfile")
    console.log("agentProfile", agentProfile?.settings[0]?.value)
    return (
        <MessagesHeaderContainer>
            {/* <Icon className='user-icon' icon="carbon:user-avatar-filled" color="#fff" fontSize={40} onClick={() => user?.role==="agent" && setOpenUserDetails(true)} /> */}
            <div className="user-img">
                <img src={`${LIVECHAT_API_URL}/uploads/${agentProfile?.settings[0]?.value}`} alt="" />
            </div>
            {
                user?.role === "agent" ?
                    <h2 className="username">
                        <span className="user" title={selectedChat?.user?.username || "Agent"}>
                            {selectedChat?.user?.username || "Agent"}
                        </span>
                        {selectedChat?.actives?.includes(selectedChat?.user?._id) ? (
                            <div className="online" />
                        ) : null}
                    </h2>
                    :
                    <h2 className="username">
                        {agentProfile?.settings[1]?.value || "Agent"}
                        {selectedChat?.actives?.includes(selectedChat?.agent?._id) ? (
                            <div className="online" />
                        ) : null}
                    </h2>
            }
            {selectedChat?.typing?.isTyping ? <span>typing...</span> : null}
            {
                user?.role === "agent" ?
                    <ChangeDepartment />
                    : null
            }
            <SearchInput>
                <input type="text" onChange={(e) => setQuery(e.target.value)} onKeyDown={(event) => {
                  if (event.key === 'Enter' && (query?.length)) {
                    dispatch(setIsSearched(query))
                  }
                }} />
                <Icon icon="mdi:search" fontSize={24} onClick={() => dispatch(setIsSearched(query))} />
            </SearchInput>
        </MessagesHeaderContainer>
    )
}

export default MessagesHeader