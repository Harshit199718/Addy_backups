
import styled from "styled-components"

const NotificationHeader = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-weight: bold;
`
const NotificationBody = styled.div`
    margin-top: 10px;
    text-align: center;
    `

const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    height: 100px;
    object-fit: contain;
`

const NotificationWebMessage = ({ title, image, body }) => {
    return (
        <>
            <NotificationHeader>
                {image && (
                <ImageContainer>
                    <img src={image} style={{ width: "30dvh" }} />
                </ImageContainer>
                )}
            </NotificationHeader>
            <NotificationBody>
                <div>{title}</div>
                {body}
            </NotificationBody>
        </>
    )
}

export default NotificationWebMessage;