import styled from "styled-components";
import { Box } from "../../components/common/Box";

/*===================================================================*/

// Chat Styles
export const PlayerChatsContainer = styled(Box)`
    border-radius: 10px;
    overflow: hidden;
    overflow-y: auto;
    background-color: rgb(248, 249, 250);
    padding: 0;
    flex: auto;
    width: 200px;
    padding-bottom: 25px;
`
export const ChatHeader = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 120px;
    align-items: center;
    gap: 10px;
    background-color: ${({ theme }) => theme.primary_color};
    padding: 5px;
    position: sticky;
    top: 0;

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
        margin-left: 5px;
    }

    .filters_container {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    input {
        border-radius: 10px;
        width: 100%;
        background-color: #fff;
        border: none;
        padding: 10px 0;
        outline: none;
        font-size: 1.5em;
        box-sizing: border-box;
        text-indent: 5px;
    }
`
export const PlayerChat = styled(Box)`
    width: 100%;
    font-size: 1.2em;
    text-align: center;
    background-color: ${({$selected}) => $selected?"#0d6efd":"#fff"};
    color: ${({$selected}) => $selected?"#fff":"#000"};
    cursor: pointer;
    border-bottom: 1px solid rgba(72, 94, 144, 0.16);
    .username {
        font-size: 1em;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .user {
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 70%;
            overflow: hidden;
        }

        .time {
            color: #333;
            font-size: .7em;
        }
    }
    .chat-details {
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
        .last-message {
            width: 100%;
            height: 20px;
            font-size: .7em;
            color: ${({$selected}) => $selected?"#ddd":"#667781"};
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
        }
        
        .typing {
            color: #00ff00;
            font-weight: 500;
        }
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
    height: 100%;
    max-width: ${({userType}) => ((userType==="user") || (userType==="anonymous"))?"100%":"700px"};
`
export const MessageHeader = styled.div`
    display: flex;
    height: 50px;
    align-items: center;
    gap: 10px;
    background-color: ${({theme}) => theme.primary_color};
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
    position: relative;
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
        background: ${({theme}) => theme.primary_color};
        color: #fff;
        margin-left: auto;
    }
    ${({$previewImage}) => $previewImage?({
        overflow: "hidden",
        padding: 0
    }):({})}
`

export const ImageMessage = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 6px;
    padding: 6px;

    .icons_container {
        display: flex;
        align-items: center;
        gap: 10px;
        position: absolute;
        z-index: 20;
        color: #fff;
        top: 10px;
        right: 10px;

        a {
            color: #fff;
            display: block;
        }
    }

    &.self {
        margin-left: auto;
    }

    .img_container {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #000;
        width: 100%;
        height: 100%;

        img {
            max-width: 100%;
        }
    }

    ${({$previewImage}) => $previewImage?({
        width: "100%",
        height: "100%",
        position: "absolute",
        bottom: 0,
        zIndex: "10"
    }):({})}
`
export const MessageInputContainer = styled(Box)`
    /* height: 50px; */
    background-color: ${({theme}) => theme.primary_color};
    border: 1px solid #ccc;
    border-radius: 10px;
    gap: 10px;
    padding: 5px;
    position: relative;
    color: #ddd;

    input {
        border-radius: 10px;
        width: calc(100% - 72px);
        height: 100%;
        background-color: #fff;
        border: none;
        outline: none;
        padding: 5px;
        font-size: 1.8em;
        box-sizing: border-box;
    }
    img {
        width: 30px;
        cursor: pointer;
        cursor: ${({$disableSend}) => $disableSend?"default":"pointer"};
        filter: invert(${({$disableSend}) => $disableSend?"70%":"0%"});
    }

    .quick-messages_container {
        position: relative;
        
        .quick-messages {
            position: absolute;
            top: 0;
            right: 0;
            transform: translateY(-120%);
            width: max-content;
            background: #fff;
            padding: 10px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            gap: 5px;

            .quick-message {
                font-size: .9em;
                background: ${({theme}) => theme.primary_color};
                border: 1px solid ${({theme}) => theme.primary_color};
                padding: 5px 10px;
                margin: 0;
                border-radius: 10px;
                cursor: pointer;

                p {
                    margin: 0;
                }
            }
        }
    }
    .file-input_container {
        position: relative;

        input {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
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

    @media screen and (max-width: 1250px) {
        display: ${({hide}) => hide?"none":"flex"};
        width: 100%;
    }

    h2.header {
        width: 100%;
        height: 50px;
        background-color: ${({theme}) => theme.primary_color};
        padding: 10px;
        font-size: 1.4em;
        font-weight: 400;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .refresh-history {
            margin-left: auto;
            cursor: pointer;
        }
    }
    &>table {
        table-layout: fixed;
        width: 100%;
        .key {
            font-size: 1.2em;
            font-weight: 500;
            width: 35%;
        }
        .value {
            font-size: .7em;
            font-weight: 400;
        }
        .user {
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 100%;
            overflow: hidden;
            display: inline-block;
        }
    }
`
export const HistoryContainer = styled.div`
    width: 100%;
    overflow: auto;
`