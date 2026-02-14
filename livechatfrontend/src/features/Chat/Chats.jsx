import PlayerChats from '../../components/PlayerChats/PlayerChats'
import { ChatsContainer } from './Chats.styled'
import Department from '../../components/PlayerChats/Department'
import Messages from '../../components/PlayerChats/Messages'
import UserDetails from '../../components/PlayerChats/UserDetails'

function Chats() {
  return (
    <ChatsContainer>
      {/* <Department /> */}
      <PlayerChats />
      <Messages />
      <UserDetails />
    </ChatsContainer>
  )
}

export default Chats