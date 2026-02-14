import PlayerChats from '../../components/PlayerChats/PlayerChats'
import { ChatsContainer } from './Chats.styled'
import Messages from '../../components/PlayerChats/Messages'
import UserDetails from '../../components/PlayerChats/UserDetails'
import Modal from '../../components/common/Modal'
import { useState } from 'react'

function Chats() {
  const [openUserDetails, setOpenUserDetails] = useState(false)

  return (
    <ChatsContainer>
      <PlayerChats />
      <Messages setOpenUserDetails={setOpenUserDetails} />
      <UserDetails hide />
      <Modal isOpen={openUserDetails} onClose={() => setOpenUserDetails(false)}>
        <UserDetails />
      </Modal>
    </ChatsContainer>
  )
}

export default Chats