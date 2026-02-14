import styled from "styled-components";

export const StepsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    margin: 0 auto 20px;
`

export const Step = styled.div`
    display: flex;
    align-items: center;
    width: ${({$width, $lastStep})=> $lastStep?"auto":$width};

    .number {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        text-align: center;
        line-height: 30px;
        background-color: ${({$active, $completed})=>$active?"rgb(6, 214, 250)": ($completed?"#4CAF50":"#fff")};
        color: ${({$active, $completed})=>($active || $completed)?"#fff": "#000"};
        /* order: ${({$lastStep})=>$lastStep?"0":"1"}; */
    }
    .line {
        /* order: ${({$lastStep})=>!$lastStep?"0":"1"}; */
        display: ${({$lastStep})=>$lastStep?"none":"block"};
        width: calc(100% - 30px);
        height: 2px;
        /* background-color: ${({$active})=>$active?"rgb(6, 214, 250)": "#fff"}; */
        background-color: ${({$activeLine, $completed})=>$activeLine?"rgb(6, 214, 250)": ($completed?"#4CAF50":"#fff")};
    }
`