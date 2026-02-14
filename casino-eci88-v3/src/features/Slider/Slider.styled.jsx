import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import styled from 'styled-components';

export const SliderContainer = styled.div`
    height: 200px;

    .splide__slide>* {
        width: 100%;
    }
    .splide_image {
        position: relative;
        height: 100%;
    }
    .splide, .splide__list, .splide__track {
        height: 100%;
    }

    .splide__progress__bar {
        background: ${props=> props.$progress_bar};
    }
`