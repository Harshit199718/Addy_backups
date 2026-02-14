import styled from 'styled-components'

export const GeneralWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 5px;
    ${props => props.showReferralinBanner &&
        `
        position: absolute;
        bottom: 5px;
        left: 0;
        width: 100%; 
        `
    }

    &>img {
        flex: 1;
        /* width: ${props=>(props.theme.general_buttons_rows==="1")?"24%":"48%"}; */
    }
`
export const MoreInfoImage = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    // img {
    //     width: auto;
    //     max-height: 80vh;
    //     margin: auto;
    // }
`

export const ShareImageContainer = styled.div`
    width: max-content;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    color: #fff;
    img {
        width: 60px;
    }
`

export const QRCodeContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    img {
        border-radius: 15px;
    }
    .referral-link_container {
        width: 100%;
        background-color: #fff;
        border-radius: 10px;
        padding: 10px;
        margin: auto;
        overflow: hidden;
        
        .link {
            display: flex;
            align-items: center;
            gap: 5px;
            background-color:#efeef3;
            color: #747474;
            border-radius: 10px;
            padding: 10px;
            width: 100%;
            height: 100%;
        }
    }
`