import styled from "styled-components";

export const SignInContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-image: url("http://localhost:3000/static/media/Background.f52a85f16da5d90a203a.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: end;
    padding-bottom: 10px;
`

export const SignInBox = styled.div`
    width: 90%;
    max-width: 67%;
    height: 85%;
    border-radius: 20px;
    background: linear-gradient(#1276e6, #116FDF, #0E66CE, #0F62CA, #0C5BC2, #094FB5, #0B49AD, #0843A5, #053999, #063492);
    padding-top: 6%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .bg-lines {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;
        margin-bottom: 10px;
    }

    .box-img {
        position: absolute;
        bottom: 0;
        min-height: 90%;
        max-height: 90vmin;
        max-width: 45%;
        // height: auto;
    }
    .box-img.img-left {
        left: 0;
        transform: translateX(-50%);
    }
    .box-img.img-right {
        right: 0;
        transform: translateX(50%);
    }
`
        
export const BgLine = styled.div`
    background: rgb(6 55 130);
    height: ${({$size}) => $size};
    border-top: 1px solid #fff;
`

export const LoginInput = styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 2.5vmax;
    text-transform: uppercase;
    font-weight: 300;
    text-shadow: 1px 1px 3px black;
    color: #fff;
    width: 55%;
    letter-spacing: 1px;
    margin-bottom: 10px;

    .input-container {
        box-shadow: 0px 0px 4px 3px #74a7e5;
        background-color: #05113b;
        height: 8vmin;
        padding: .3vmax;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1vmax;
        border: 2px solid #fff;
        input {
            border-color: #2d4a92;
            background: #05113b;
            font-weight: 400;
            font-size: 1.8vmax;
            outline: none;
            border-radius: .8vmax;
            flex: 1;
            text-transform: uppercase;
            height: 100%;
            color: #fff;
        }
    }
`