import styled from "styled-components";
import { Box } from "../../common/Box";

export const MessagesHeaderContainer = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  gap: 10px;
  background-color: ${({ theme }) => theme.primary_color};
  padding: 10px;

  .user-icon {
    cursor: pointer;
  }
  .user-img {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .username {
    font-size: 1.6em;
    font-weight: 400;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 6px;

    .user {
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 220px;
      overflow: hidden;
    }
    .online {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #00ff00;
    }

    @media screen and (max-width: 1250px) {
      font-size: 1.2em;
    }
  }
  @media screen and (max-width: 1250px) {
    .assign-to-btn {
      font-size: .7em;
    }
  }
`;

export const PlayerMessagesContainer = styled(Box)`
  gap: 10px;
  height: calc(100% - 100px);
  overflow-y: scroll;
  position: relative;
  .group-title {
    margin: 0 auto;
    background: #ddd;
    padding: 10px;
    border-radius: 10px;
    font-size: 0.7em;
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
      font-size: 0.5em;
    }
  }
  .message.self {
    background: ${({ theme }) => theme.primary_color};
    color: #fff;
    margin-left: auto;
  }
  ${({ $previewImage }) =>
    $previewImage
      ? {
          overflow: "hidden",
          padding: 0,
        }
      : {}}
`;

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

  ${({ $previewImage }) =>
    $previewImage
      ? {
          width: "100%",
          height: "100%",
          position: "absolute",
          bottom: 0,
          zIndex: "10",
        }
      : {}}
`;

export const SearchInput = styled(Box)`
  margin-left: ${({$marginLeft}) => $marginLeft?$marginLeft:"auto"};
  padding: 0;
  width: ${({$width}) => $width?$width:"40%"};
  height: 100%;
  gap: 5px;
  justify-content: flex-end;
  input {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: none;
    padding: 10px 0;
    outline: none;
    font-size: 1.5em;
    box-sizing: border-box;
    text-indent: 5px;
  }
`;

// For message 2

export const AllMessagesWrapper = styled.div`
  position: relative;
  height: calc(100% - 110px);

  .preview-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: #000;

    img{
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .icons_container {
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
`
export const AllMessages = styled(Box)`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  height: 100%;
  overflow-y: auto;
  position: relative;

  .group-title {
    margin: 0 auto;
    background: #ddd;
    padding: 10px;
    border-radius: 10px;
    font-size: 0.7em;
    font-weight: 400;
  }
`;

export const UserMessage = styled.div`
  border-radius: 10px;
  font-size: 1.2em;
  background: #fff;
  padding: 10px 10px 16px;
  position: relative;
  margin-top: 15px;
  min-width: 50px;

  .username {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-100%);
    font-size: 1em;
    color: #000;
  }

  .img-message {
    width: 150px;
    height: 100px;
    cursor: pointer;
    background: #000;
    
    img{
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .highlight {
    background-color: yellow;
    color: black;
  }
  span.time {
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 0.5em;
  }

  ${({ $fromMe, theme }) =>
    $fromMe
      ? {
          marginLeft: "auto",
          background: theme.primary_color,
          color: "#fff",
        }
      : {}}
`;
