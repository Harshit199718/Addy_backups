import styled from "styled-components";

export const MarqueeContainer = styled.div`
  background: url(${props=>props.theme.marquee_bg});
  background-size: 100% 100%;
  padding: ${props=>props.theme.marquee_height ? `${props.theme.marquee_height}px` : `10px`} 0;
  color: ${props=>props.theme.text_color};
`;
export const MarqueeContent = styled.div`
  width: 100%;
  overflow-x: hidden;
  .marquee {
    display: flex;
    align-items: center;
  }
  .content {
    white-space: nowrap;
    flex-shrink: 0;
  }
  .gap {
    width: 50%;
    flex-shrink: 0;
  }
  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;
