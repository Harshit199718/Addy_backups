import { ChatDashboardContainer, ChatDetails, Detail } from './ChatDashboard.styled'

function ChatDashboard() {
  return (
    <ChatDashboardContainer $direction="column">
      <ChatDetails>
        <Detail>
          <h1 className="count">1</h1>
          <p className="progress">Departments</p>
        </Detail>
        <Detail>
          <h1 className="count">0</h1>
          <p className="progress">Agents</p>
        </Detail>
        <Detail>
          <h1 className="count">0</h1>
          <p className="progress">Unread Messages</p>
        </Detail>
        <Detail>
          <h1 className="count">0</h1>
          <p className="progress">Archived Messages</p>
        </Detail>
      </ChatDetails>
    </ChatDashboardContainer>
  )
}

export default ChatDashboard