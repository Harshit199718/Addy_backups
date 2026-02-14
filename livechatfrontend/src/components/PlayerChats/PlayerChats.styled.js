import styled from "styled-components";
import { Box } from "../../components/common/Box";

// Deparments Styles
export const DepartmentsContainer = styled(Box)`
    flex: 1;
    border-radius: 10px;
    overflow: hidden;
    overflow-y: auto;
    background-color: rgb(248, 249, 250);
    padding: 0;
`
export const Department = styled(Box)`
    width: 100%;
    font-size: 1.2em;
    text-align: center;
    background-color: ${({$selected}) => $selected?"#0d6efd":"#fff"};
    color: ${({$selected}) => $selected?"#fff":"#000"};
    cursor: pointer;
    border-bottom: 1px solid rgba(72, 94, 144, 0.16);
`
// Deparments Styles Ends

/*===================================================================*/

// Chat Styles
export const PlayerChatsContainer = styled(DepartmentsContainer)`
    flex: auto;
    width: 200px;
`
export const PlayerChat = styled(Department)`
    .username {
        font-size: 1.2em;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        .count {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            background-color: red;
            color: #fff;
            font-size: 12px;
            border-radius: 50%;
        }
    }
    .last-message {
        width: 100%;
        font-size: .7em;
        color: ${({$selected}) => $selected?"#ddd":"#667781"};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
    }
`

// Chat Styles End
/*===================================================================*/

// Message Styles
export const MessagesContainer = styled.div`
    flex: 5;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
export const MessageHeader = styled.div`
    display: flex;
    height: 50px;
    align-items: center;
    gap: 10px;
    background-color: #475f7b;
    padding: 10px;

    .username {
        font-size: 1.6em;
        font-weight: 400;
        color: #fff;
        display: flex;
        align-items: center;
        gap: 6px;

        .online {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #00FF00;
        }
    }
`
export const PlayerMessages = styled(Box)`
    gap: 10px;
    height: calc(100% - 100px);
    overflow-y: auto;
    .group-title {
        margin: 0 auto;
        background: #ddd;
        padding: 10px;
        border-radius: 10px;
        font-size: .7em;
        font-weight: 400;
    }
    .message {
        border-radius: 10px;
        font-size: 1.2em;
        background: #fff;
        padding: 10px 20px 14px;
        position: relative;

        .time {
            position: absolute;
            bottom: 5px;
            right: 5px;
            font-size: .5em;
        }
    }
    .message.self {
        background: #475f7b;
        color: #fff;
        margin-left: auto;
    }
`
export const MessageInputContainer = styled(Box)`
    height: 50px;
    background-color: #ccc;
    border-radius: 10px;
    gap: 10px;
    padding: 5px;

    input {
        border-radius: 10px;
        flex: 1;
        height: 100%;
        background-color: #fff;
        border: none;
        outline: none;
        padding: 5px;
        font-size: 1.8em;
    }
    img {
        width: 30px;
        cursor: pointer;
    }
`

export const BlockMsg = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ddd;
    width: max-content;
    height: 50px;
    border-radius: 10px;
    padding: 10px 20px;
    margin: auto;
`
// Message Styles End


// User Details Style
export const UserDetailsContainer = styled(Box)`
    flex: auto;
    width: 200px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border-left: 1px solid #ddd;
    padding: 0;

    h2.header {
        width: 100%;
        height: 50px;
        background-color: #475f7b;
        padding: 10px;
        font-size: 1.4em;
        font-weight: 400;
        color: #fff;
    }
    table {
        .key {
            font-size: 1.2em;
            font-weight: 500;
        }
        .value {
            font-size: .7em;
            font-weight: 400;
        }
    }
`
export const HistoryContainer = styled.div`
    max-width: 100%;
    overflow: auto;
`