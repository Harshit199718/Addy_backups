import styled from "styled-components";

// Styled Components
export const JackpotTickerContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.border_color};
  border-radius: 1rem;
  box-shadow: 0 0 12px ${({ theme }) => theme.border_shadow_primary_color},
    0 0 12px ${({ theme }) => theme.border_shadow_primary_color} inset;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 16px;

  .tick-credits {
    display: none !important;
  }
  .tick-flip {
    min-width: 17px !important;
    min-height: 26px;
    border-radius: 4px !important;
    border: 1px solid #e6960c;
    box-shadow: 0 0 6px rgba(230, 150, 12, 0.8),
      /* Outer shadow */ 0 0 6px rgba(230, 150, 12, 0.8) inset; /* Inner shadow */
  }

  .tick-flip-panel {
    background: linear-gradient(to top, #c1c1c1, #fff);
    color: #000 !important;
  }

  .tick-flip-panel-text-wrapper {
    font-size: 1.1em;
  }

  @media screen and (max-width: 400px), (min-width: 1200px) and (max-width: 1770px) {
    font-size: 12px;

    .tick-flip {
      min-height: 21px;
    }
  }
`;

export const LeftContainer = styled.div`
  flex-basis: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;

  @media screen and (max-width: 400px), (min-width: 1200px) and (max-width: 1770px) {
    font-size: 12px;
  }
`;

export const Subtitle = styled.p`
  text-transform: uppercase;
  font-size: 0.9em;
  color: #fff;
`;

export const Title = styled.h5`
  text-transform: uppercase;
  font-size: 1.4em;
  letter-spacing: 4px;
  color: #fff;
`;

export const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 12px;
`;

export const TickCounterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
`;

export const TickView = styled.div`
  display: inline-block;
`;

export const Separator = styled.div`
  // Styled component for separators (commas, periods)
  p {
    // Style for the comma and period text
  }
`;
