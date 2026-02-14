import React, { useState } from 'react'
import styled from 'styled-components'

const TelcoPayContainer = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 10px;
`

const TelcoPayOption = styled.div`
    width: max-content;
    min-width: 100px;
    padding: 10px 20px;
    border-radius: 4px;
    background: #333;
    color: #fff;
    font-size: 14px;
    border: 2px solid ${({ $active }) => ($active ? "#fb0" : "transparent")};
    cursor: pointer;
`
function TelcoPayProvider3({onChange}) {
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
                <TelcoPayOption key={coupon?.type} $selected={selected===coupon.type} $active={selected===coupon.type} onClick={() => {
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

export default TelcoPayProvider3