import styled from 'styled-components';

export const Jackpot3Wrapper = styled.div`
    width: 100%;
    padding-top: calc(290 / 1229 * 100%); /* Calculate aspect ratio (height / width * 100%) */
    position: relative;
    overflow: hidden;
    background-image: url(${props => props.$jackpot_image ? props.$jackpot_image : "https://gwfd.qatgwawm.net/system-requirement/Web.PortalNew/TU231-01/1bd63ab02a/images/0590a51445248585036829e5393ab293.png"});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`

export const Jackpot3Container = styled.div`
    position: absolute;
    bottom: 15px;
    right: 10px;
    font-weight: bold;
    text-align: right;
    color: #ffffff;
    font-size: 32px;

    @media (min-width: 1001px) and (max-width: 1200px) {
        font-size: 6.25rem;
        right: 1.6rem;
        bottom: 2.8rem;
    }

    @media (min-width: 701px) and (max-width: 1000px) {
        font-size: 4rem;
        right: 1.6rem;
        bottom: 1.5rem;
    }

    @media (min-width: 551px) and (max-width: 700px) {
        font-size: 45px;
        right: 1.6rem;
        bottom: 1rem;
    }
    
    @media (min-width: 468px) and (max-width: 550px) {
        font-size: 45px;
        right: 1rem;
        bottom: 0.5rem;
    }
        
    @media (min-width: 300px) and (max-width: 400px) {
        font-size: 28px;
        bottom: 0.8rem;
    }

`

export const Jackpot3Digit = styled.div`
    display: inline-block;
    width: 21px;
    height: 40px;
    margin-right: 5px;
    text-align: center;
    color: #00020c;
    font-weight: bold;
    background-image: linear-gradient(to top, #fff6d6, #ffd900, #fab909);
    border-radius: 10px;

    @media (min-width: 1001px) and (max-width: 1200px) {
        width: 3.8rem;
        height: 7.6rem;
    }

    @media (min-width: 701px) and (max-width: 1000px) {
        width: 2.5rem;
        height: 5rem;
    }

    @media (min-width: 551px) and (max-width: 700px) {
        width: 30px;
        height: 3.5rem;
    }

    @media (min-width: 468px) and (max-width: 550px) {
        width: 25px;
        height: 45px;
    }

    @media (min-width: 300px) and (max-width: 400px) {
        width: 18px;
        height: 40px;
    }

`

export const Jackpot3separator = styled.div`
    display: inline-block;
    color: #fbc000; /* Adjust separator color */
`