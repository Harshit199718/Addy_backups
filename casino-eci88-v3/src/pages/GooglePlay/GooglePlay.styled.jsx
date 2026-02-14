import styled from "styled-components";

export const GooglePlayContainer = styled.div`
  background-color: #fff;

  .body {
    margin: 0 16px;
  }
}
`
export const Header = styled.div `
  border: 0;
  color: inherit;
  font: inherit;
  font-size: 100%;
  margin: 0;
  padding: 0;
  vertical-align: baseline;
  color: rgb(95,99,104);
  fill: rgb(95,99,104);
  stop-color: rgb(95,99,104);
  line-height: 1.75rem;
  font-size: 1.375rem;
  letter-spacing: 0;
  font-weight: 400;
  font-weight: 500;
  align-items: center;
  display: flex;
  height: 100%;
  white-space: nowrap;
  z-index: 1;
  
  .logo {
    margin-right: 8px;
    height: 40px;
    width: 40px;
  }
`

export const AppTitle = styled.div`
    margin-top: 50px;
    align-items: flex-start;
    display: flex;
    border: 0;
    color: inherit;
    font: inherit;
    font-size: 100%;
    padding: 0;
    vertical-align: baseline;

    .logo {
        border-radius: 20%;
        border-width: 0;
        box-shadow: 0 1px 2px 0 rgba(60,64,67,.3),0 1px 3px 1px rgba(60,64,67,.15);
        border-radius: 4px;
        margin: 7px 24px 0 0;
        width: 72px;
        height: 72px;
    }

    .title {
        font-family: Roboto,Arial,sans-serif;
        line-height: 2rem;
        font-size: 1.5rem;
        letter-spacing: 0;
        font-weight: 400;
        font-weight: 500;
        align-items: flex-end;
        display: flex;
        overflow-wrap: anywhere;
        width: 100%;
        word-break: keep-all;
    }

    .provider-name {
        font-family: "Google Sans",Roboto,Arial,sans-serif;
        line-height: 1.5rem;
        font-size: 1rem;
        letter-spacing: .00625em;
        font-weight: 500;
        color: #01875f;
        fill: #01875f;
        stop-color: #01875f;
    }

    .app-contain {
        color: rgb(95,99,104);
        fill: rgb(95,99,104);
        stop-color: rgb(95,99,104);
        font-family: Roboto,Arial,sans-serif;
        line-height: 1rem;
        font-size: .75rem;
        letter-spacing: .025em;
        font-weight: 400;

        span {
        border: 0;
        color: inherit;
        font: inherit;
        font-size: 100%;
        margin: 0;
        padding: 0;
        vertical-align: baseline;
        }
    }
`
export const AppRateSection = styled.div`
    margin-top: 20px;
    height: 64px;
    padding: 12px 0;
    text-align: center;

    .row {
      align-items: center;
      display: flex;
      overflow: auto;
      width: 100%;
      align-items: center;
      display: flex;

      .column {
        min-width: 96px;
        padding: 0 32px;
        position: relative;

        .first-row {
          color: rgb(32,33,36);
          fill: rgb(32,33,36);
          stop-color: rgb(32,33,36);
          font-family: "Google Sans",Roboto,Arial,sans-serif;
          line-height: 1.25rem;
          font-size: .875rem;
          letter-spacing: .0178571429em;
          font-weight: 500;
          align-items: center;
          display: flex;
          height: 24px;
          justify-content: center;
          white-space: nowrap;
        }

        .second-row {
          color: rgb(95,99,104);
          fill: rgb(95,99,104);
          stop-color: rgb(95,99,104);
          font-family: Roboto,Arial,sans-serif;
          line-height: 1rem;
          font-size: .75rem;
          letter-spacing: .025em;
          font-weight: 400;
          align-items: center;
          display: flex;
          height: 20px;
          justify-content: center;
          white-space: nowrap;
        }
      }
      .column-line {
        background-color: rgb(232,234,237);

        height: 24px;
        left: 0;
        top: calc(50% - 12px);
        width: 1px;
      }
    }
`

export const InstallSection = styled.div`
    margin-top: 20px;
    align-items: unset;
    display: flex;
    flex-direction: column;

    button {
        color: white;
        align-items: center;
        background-color: #01875f;
        text-align: center;
        border-radius: 8px;
        border: 0;
        font: inherit;
        font-size: 16px;
        font-weight: bold;
        margin: 0;
        padding: 8px;
        vertical-align: baseline;
        cursor: pointer;
    }

    .share {
        margin: auto;
        
        .button {
            color: #01875f;
            height: 100%;
            overflow: hidden;
            width: 100%;
        }
    }
`

export const ShareWishList = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    button {
        display: flex;
        align-items: center;
        background: none;
        border: none;
        color: #01875f;
        cursor: pointer;
        margin-right: 10px;
        font-size: 18px;
        font-weight: 600;

        svg {
            margin-right: 10px;
        }
    }
`;

export const AvailableSection = styled.div`
    margin-top: 16px;

    .tag-container {
        display: flex; /* Use flexbox for layout */
        flex-wrap: wrap; /* Allow tags to wrap onto new lines */
        overflow-x: hidden; /* Enable horizontal scrolling if necessary */
        margin-bottom: 15px;
    }

    .tag {
        display: inline-block;
        border: 1px solid rgb(218, 220, 224);
        color: rgb(95, 99, 104);
        border-radius: 16px;
        padding: 5px 18px;
        font-size: 18px;
        margin: 5px;
        width: max-content;
    }

    .text {
        text-align: justify;
        font-size: .875rem;
        font-weight: 400;
        letter-spacing: .0142857143em;
        line-height: 1.25rem;
        color: rgb(95,99,104);
        fill: rgb(95,99,104);
        stop-color: rgb(95,99,104);
        display: flex;
        padding: 4px 0;
    }

    .scroll-container {
        width: 100%;
        overflow-x: auto;
        white-space: nowrap;
    }

    .scroll-image {
        display: inline-block;
        min-height: 30dvh;
        max-height: 30dvh;
        max-width: 80dvw;
        margin-right: 10px;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
    }
`

