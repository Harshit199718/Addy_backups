import styled from "styled-components";

export const NotificationHeader = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
`;
  
export const NotificationBody = styled.div`
    margin-top: 10px;
    text-align: center;
`;
  
export const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    height: 100px;
    object-fit: contain;
`;

const Message = ({ notification }) => {
    return (
      <>
        <NotificationHeader>
          {/* image is optional */}
          {notification.image && (
            <ImageContainer>
              <img src={notification.image} width={100} />
            </ImageContainer>
          )}
          <span>{notification.title}</span>
        </NotificationHeader>
        <NotificationBody>{notification.body}</NotificationBody>
      </>
    );
  };
  
  export default Message;