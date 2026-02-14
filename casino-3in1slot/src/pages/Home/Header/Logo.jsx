import React from "react";
import { CenterImage, Container, GradientBorder, InnerGradient } from "./Header.styled";

function Logo() {
  return (
    <Container>
      <GradientBorder>
        <InnerGradient>
          <CenterImage src={"http://localhost:3000/static/media/logo1.32db2a4e5a96b3c9cb4f.png"} alt={"altText"} />
        </InnerGradient>
      </GradientBorder>
    </Container>
  );
}

export default Logo;
