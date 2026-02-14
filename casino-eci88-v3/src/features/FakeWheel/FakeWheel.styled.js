import styled from "styled-components";

export const FakeWheelContainer = styled.div`
    width: ${({$width}) => $width?$width:"100%"};
    height: ${({$height}) => $height?$height:"auto"};
    display: flex;
    flex-direction: column;
    gap: 5px;

    .luckywheel_registration_banner {
        width: 100%;
    }
`

export const SpinButton = styled.button`
  width: max-content;
  background: linear-gradient(180deg, #FDB813, #F76E11); /* Enhanced gradient for a more vibrant look */
  border: none;
  border-radius: 28px; /* Smooth border radius */
  box-shadow: 0 5px #CC6A09, 0 6px 20px rgba(0,0,0,0.19); /* Deeper shadow for 3D effect */
  color: #FFFFFF; /* White color for better contrast */
  font-size: 22px; /* Larger font size for better visibility */
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5); /* Subtle text shadow for depth */
  padding: 12px 36px; /* Optimal padding for button size */
  cursor: pointer;
  outline: none;
  transition: background 0.3s, box-shadow 0.3s; /* Smooth transition for interactive effects */
  margin: 0 auto;

  &:hover {
    background: linear-gradient(180deg, #F76E11, #FDB813); /* Inverted gradient on hover for visual feedback */
    box-shadow: 0 4px #B35807, 0 8px 16px rgba(0,0,0,0.2); /* Slightly lifted effect on hover */
  }

  &:active {
    background: linear-gradient(180deg, #E56200, #FFD580); /* Softened colors on active for a pressed effect */
    box-shadow: 0 3px #CC6A09; /* Lowered shadow simulating button press */
    transform: translateY(2px); /* Slight move down to simulate press */
  }
`;

export const WheelImg = styled.img`
  width: ${({$width}) => $width?$width:"50%"};
  max-width: 85dvw;
  margin: 0 auto;

  @media (min-width: 1024px) {
    max-width: 40dvw;
  }
`