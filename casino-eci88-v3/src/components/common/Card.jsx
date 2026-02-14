import React from 'react'
import styled from 'styled-components'
import OptimizedImage from './OptimizedImage'
import Image from './Image'
import Skeleton from 'react-loading-skeleton'

const CardWrapper = styled.div`
    width: ${props => props.width?props.width:"auto"};
    overflow: hidden;
    border-radius: ${props=>props.$borderRadius?props.$borderRadius:"1rem"};
    background-color: ${props=>props.$background?props.$background:props.theme.layout_card_bg};
    flex-shrink: 0;
    border: ${props=>props.$border ? props.$border : ""};
    border: 2px solid ${({theme}) => theme.border_color ? theme.border_color : "#cd9f15"};
    
    .card-img_container {
        width: 100%;
        // height: 140px;
        border-radius: ${props=>props.$borderRadius?props.$borderRadius:"1rem"};
        overflow: hidden;
    }
    .card-img_container img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
`

const CardBody = styled.div`
    padding: 1rem;
    .title {
        font-size: 1rem;
        color: ${props=>props.theme.text_color};
        text-align: center;
    }
    .card-body-content {
        margin-top: 8px;
    }
`
function Card({image, title, content, ...props}) {
  return (
    <CardWrapper {...props}>
        <div className="card-img_container">
            <Image src={image} alt="" skeletonHeight={140} />
        </div>
        <CardBody>
            <h3 className="title">{title}</h3>
            <div className="card-body-content">
                {content || <Skeleton height={50} />}
            </div>
        </CardBody>
    </CardWrapper>
  )
}

export default React.memo(Card)