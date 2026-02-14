import styled from 'styled-components';

export const MissionContainer = styled.div`
    margin: 0 auto;
    font-family: Arial, sans-serif;
    background-color: #3E2723;
    padding: 10px;
    border-radius: 10px;
    height: 100%;
`;

export const MissionBanner = styled.div`
    text-align: center;
    padding: 10px;
    background-color: #5D4037;
    border-radius: 10px;
    margin-bottom: 10px;
`;

export const MissionTitle = styled.h1`
    margin: 0;
    font-size: 24px;
    color: white;

    .token {
        font-size: 16px;
    }
`;

export const MissionTabs = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
    overflow-x: auto;

    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, and Opera */
    }
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
`;

export const MissionTab = styled.div`
    padding: 10px 10px;
    background-color: ${(props) => (props.active ? '#4CAF50' : '#9E9E9E')};
    color: white;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    text-transform: uppercase;
    margin-right: 5px;
    width: 100%;
    text-align: center;
`;

export const MissionTimerContainer = styled.div`
    text-align: center;
    margin-bottom: 10px;
    color: white;
    background-color: #805a3b;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Shadow for depth */
`;

export const MissionList = styled.div`
    background-color: #4E342E;
    padding: 10px;
    border-radius: 10px;
    height: 100%;
    ${props => props.$activeTab === "checkin" && `
        @media (min-width: 900px) {
            width: 50dvw;
            margin: 0 auto;
        }
    `
    }
`;

export const MissionItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.isClaimed ? "#A1887F" : "#795548"};
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    color: white;
`;

export const MissionDescription = styled.div`
    flex: 1;
    margin-right: 10px;
    
    .title {
        font-weight: bold;
        font-size: 18px;
    }
    
    .description {
        font-size: 12px;
    }
`;

export const MissionProgressBar = styled.div`
    border: 1px solid #555555;
    background-color: #424242;
    border-radius: 10px;
    width: 100%;
    height: 20px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const MissionProgress = styled.div`
    background-color: #4caf50;
    height: 100%;
    width: ${(props) => props.progress}%;
    border-radius: ${(props) => (props.progress === 100 ? '10px' : '10px 0 0 10px')};
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`;

export const MissionProgressText = styled.div`
    position: relative;
    z-index: 2;
    color: color;
    font-weight: bold;
`;

export const MissionClaimButton = styled.button`
    margin: 2px;
    width: 100%;
    background-color: #FF9800;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 10px;
    &:disabled {
        background-color: #9E9E9E;
        cursor: not-allowed;
        &:hover {
            background-color: #9E9E9E;
        }
    }
    &:hover {
        background-color: #F57C00;
    }
`;

export const MissionRewardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    .navigation {
        font-size: 12px;
    }
`

export const MissionImage = styled.img`
    width: 50px;
    height: 50px;
    margin: 5px;
`