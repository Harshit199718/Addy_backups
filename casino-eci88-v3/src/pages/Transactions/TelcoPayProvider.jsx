import React, { useState } from 'react'
import styled from 'styled-components'

const TelcoPayContainer = styled.div`
    display: flex;
    border-radius: 5px;
    border: 1px solid #596fd6;
    width: 100%;
`

const TelcoPayOption = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color: ${props=>props.theme.text_color};;
    padding: 10px 25px;
    background-color: ${({$selected})=> $selected?"#596fd6":"none"};
`
function TelcoPayProvider({onChange}) {
    const [selected, setSelected] = useState("")
    const coupons = [
        {
            type: "dg",
            name: "Digi"
        },
        {
            type: "hl",
            name: "Hotlink"
        },
        {
            type: "cl",
            name: "Celcom"
        },
        {
            type: "um",
            name: "UMobile"
        },
    ]
  return (
    <TelcoPayContainer>
        {
            coupons?.map(coupon=>(
                <TelcoPayOption key={coupon?.type} $selected={selected===coupon.type} onClick={() => {
                    setSelected(coupon.type);
                    onChange({
                        target: {
                            name: "coupon_type",
                            value: coupon.type
                        }
                    })
                }}>{coupon.name}</TelcoPayOption>
            ))
        }
    </TelcoPayContainer>
  )
}

export default TelcoPayProvider