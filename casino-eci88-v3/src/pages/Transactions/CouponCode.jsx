import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const CouponCodeContainer = styled.div`
    width: 100%;
    label {
        font-size: 13px;
        color: ${props=>props.theme.text_color};;
        margin-bottom: 5px;
        display: block;
    }
    .inputs_container {
        display: flex;
        align-items: center;
        width: 100%;
        color: ${props=>props.theme.text_color};;
        gap: 2px;
        input {
            color: #000;
            width: 25%;
            background: #fff;
            border: none;
            outline: none;
            font-size: 12px;
            border-radius: 5px;
            text-align: center;
            padding: 5px 10px;
        }
    }
`
function CouponCode({values, setValues}) {
    const input1Ref = useRef();
    const input2Ref = useRef();
    const input3Ref = useRef();
    const input4Ref = useRef();
    
    useEffect(() =>{
        if(values.coupon_code &&(values.coupon_code.length === 4)){
            input2Ref.current.focus()
        }
        if(values.coupon_code &&(values.coupon_code.length === 8)){
            input3Ref.current.focus()
        }
        if(values.coupon_code &&(values.coupon_code.length === 12)){
            input4Ref.current.focus()
        }
      },[values])

      function isNumber(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
  return (
    <CouponCodeContainer>
        <label htmlFor="">Enter Coupon Code</label>
        <div className="inputs_container">
            <input type="text" maxLength="4" ref={input1Ref} onChange={e=> {
                            if (isNumber(e)) {
                                // handleInputChange(0, e)
                                setValues(prevValues => {
                                    if (!prevValues.coupon_code || prevValues.coupon_code.length<4) {
                                        const newValues = { ...prevValues, coupon_code: e.target.value }
                                        // if(prevValues.coupon_code &&(prevValues.coupon_code.length === 3)){
                                        //     input2Ref.current.focus()
                                        // }
                                        return newValues;
                                    }
                                    return prevValues;
                                })
                            }
                        }} />-
            <input type="text" maxLength="4" ref={input2Ref} onChange={e=> {
                            if (isNumber(e)) {
                                // handleInputChange(0, e)
                                setValues(prevValues => {
                                    if (prevValues.coupon_code && (prevValues.coupon_code.length>=4) && (prevValues.coupon_code.length<8)) {
                                        const newValues = { ...prevValues, coupon_code: prevValues.coupon_code.slice(0, 4) + e.target.value }
                                        // if(prevValues.coupon_code && (prevValues.coupon_code.length === 7)){
                                        //     input3Ref.current.focus()
                                        // }
                                        return newValues;
                                    }
                                    return prevValues;
                                })
                            }
                        }} />-
            <input type="text" maxLength="4" ref={input3Ref} onChange={e=> {
                            if (isNumber(e)) {
                                // handleInputChange(0, e)
                                setValues(prevValues => {
                                    if (prevValues.coupon_code && (prevValues.coupon_code.length>=8) && (prevValues.coupon_code.length<12)) {
                                        const newValues = { ...prevValues, coupon_code: prevValues.coupon_code.slice(0, 8) + e.target.value }
                                        return newValues;
                                    }
                                    return prevValues;
                                })
                            }
                        }} />-
            <input type="text" maxLength="4" ref={input4Ref} onChange={e=> {
                            if (isNumber(e)) {
                                // handleInputChange(0, e)
                                setValues(prevValues => {
                                    if (prevValues.coupon_code && (prevValues.coupon_code.length>=12) && (prevValues.coupon_code.length<16)) {
                                        const newValues = { ...prevValues, coupon_code: prevValues.coupon_code.slice(0, 12) + e.target.value }
                                        return newValues;
                                    }
                                    return prevValues;
                                })
                            }
                        }} />
        </div>
    </CouponCodeContainer>
  )
}

export default CouponCode