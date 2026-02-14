import styled from 'styled-components'

export const GameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: ${({theme}) => theme.vertical_tab?"10px":""};
    &>div {
        margin: 13px;
        img {
            max-width: ${({$imageWidth})=> $imageWidth?$imageWidth:"60px"};
            width: ${({$imageWidth})=> $imageWidth?$imageWidth:""};
            height: ${({$imageHeight})=> $imageHeight?$imageHeight:"auto"};
        }
    }
    .game-category {
        font-size: 14px;
        text-transform: uppercase;
        color: ${props=>props.theme.text_color};
    }

    @media screen and (max-width: 600px) {
        margin: 8px 2px;
    }
`
export const GamesContainer = styled.div`
    display: flex;
    // justify-content: ${props => props?.$isHotGames ? "center" : ""};
    justify-content: center;
    align-content: flex-start;
    // gap: ${({theme:{vertical_tab}, $isHotGames})=> vertical_tab?"30px 35px":($isHotGames?"10px":" 30px 35px")};
    flex-wrap: wrap;
    height: 100%;

    // @media screen and (max-width: 700px) {
    //     gap: ${({theme:{vertical_tab}, $isHotGames})=> vertical_tab?"25px":($isHotGames?"10px":"20px")};
    // }
    // @media screen and (max-width: 500px) {
    //     gap: ${({theme:{vertical_tab}, $isHotGames})=> vertical_tab?"10px":($isHotGames?"10px":"20px")};
    // }
`

export const GamesContent = styled.div`
    width: ${props => props?.$isHotGames ? "25%" : "28%"};
    box-sizing: border-box;
    position: relative;
    max-width: ${props => props?.$isHotGames ? "200px" : "120px"};
    margin: ${props => props?.$isHotGames ? "0px" : "12px"};
    cursor: pointer;
    
    .game-img_container {
        width: 100%;
    }

    .game-img {
        background: url('${props => props.$gameImage}');
        width: 100%;
        height: 100%;
        padding-top: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 20px;
    }

    .game-name{
        color: ${props=>props.theme.text_color};
        font-size: 13px;
        font-weight: 600;
        bottom: -1.9%;
        width: 100%;
        text-align: center;
        white-space: nowrap;
        max-width: 100%;
        overflow-x: hidden;
        text-overflow: ellipsis;
    }

    @media screen and (max-width: 720px) {
        margin-top: ${({theme:{vertical_tab}, $isHotGames})=> $isHotGames ? "0px" : (vertical_tab?"15px": "0px") };
        margin: ${props => props?.$isHotGames ? "0px" : "5px"};
    }

    @media screen and (max-width: 500px) {
        max-width: ${props => props?.$isHotGames ? "150px" : "100px"};
        margin: ${props => props?.$isHotGames ? "0px" : "5px"};
    }
`

export const GameProgress = styled.div`
    width: 100%;
    border-radius: 20px;
    background: #fff;
    overflow: hidden;
    font-size: 10px;
    text-align: center;
    
    &::before {
        content: '${props=> props.$isStarted?("Started " + props.$percentage.toFixed(2)): props.$percentage.toFixed(2)}%';
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: "bold";
        color: "black";
        padding-left: 4px;
        width: ${props=> props.$isStarted?"100":props.$percentage.toFixed(2)}%;
        height: 100%;
        background-color: ${props=> {
                const color = props.theme[`rtp_${Math.ceil(props.$percentage/10)}_color`]
                return props.$isStarted?'orange':(color?color:"#00ff00")
            }
        };
        background-image: ${props=> props.$isStarted?'none':'linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)'};
    }
`

export const LaunchInSiteContainer = styled.div`
    .back-icon {
        background: orange;
        color: ${props=>props.theme.text_color};
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        font-size: 40px;
    }
    iframe {
        position: relative;
        width: 100%;
        height: 100vh;
    }
`

export const AppDialogContainer = styled.div`
    .balance-ingame {
        background-color: #5d9cec;
        color: ${props=>props.theme.text_color};
        text-align: center;
        font-size: 1.1em;
        font-weight: 700;
        margin-bottom: 20px;
        border-radius: 20px 20px 0 0;
    }
    .user-detail, .device-buttons, .modal-buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .user-detail {
        color: ${props=>props.theme.text_color};
        
        label {
            font-size: 15px;
            font-weight: 700;
            text-transform: uppercase;
        }
        .username {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 120px;
            
            &, .copy-button {
                font-size: 13px;
                font-weight: 700;
            }
        }
    }
    .device-buttons {

        a {
            display: flex;
            align-items: center;
            text-decoration: none;
            padding: 5px 10px;
            border: 1px solid #4096ff;
            font-size: 12px;
            font-weight: 700;
            border-radius: 5px;
            color: #0d6ef8;
        }
    }
    .modal-buttons {
        margin-bottom: 0;
        gap: 5px;

        a {
            width: 50%;
            display: inline-block;
        }
    }
`

// Hot Games

export const HotGamesContainer = styled.div`
    border-radius: 16px;
    border: 2px solid ${props=> props.theme.border_color};
    box-shadow: 0 0 12px ${props=> props.theme.border_shadow_primary_color}, 0 0 12px ${props=> props.theme.border_shadow_primary_color} inset;
    padding: 0 10px 20px;
`

// Search Games

export const SearchGamesContainer = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;
    gap: 5px;

    .input-container {
        display: flex;
        width: 50%;
        margin-left: auto;
        input {
            width: 90%;
            border: none;
            font-size: 12px;
            padding: 0 8px;
        }
        .search-icon {
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: ${({theme})=> theme.secondary_color};
            color: ${({theme})=> theme.primary_color};
            font-size: 20px;
        }
    }
`

export const Categories = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const LaunchGame = styled.div`
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;

        .options {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            white-space: nowrap;

            .label, input {
              width: auto;
            }
        }
`;
