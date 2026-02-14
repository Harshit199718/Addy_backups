import React, { useEffect, useRef, useState } from 'react'
import "./TelcoPay.css";
import userService from '../../services/user.service';
import { Icon } from '@iconify/react';
import CustomModal from '../common/CustomModal/CustomModal';
import useToast from '../../useToast';
import Loading from '../common/Loading/Loading';

const amountlist = [
    { id: 1, value: "10" }
];

function TelcoPay({setOpenDeposit, setDepositLoading, depositLoading}) {
    const toast = useToast();
    const [validations, setValidations] = useState({
        amount: "",
        non_field_errors: ""
    })
    const initialValues = {
        ttype: "TEC",
        amount: '',
        pg: "telcopay",
    };
    const [values, setValues] = useState(initialValues);
    const [depTelcopaySuccessful, setDepTelcopaySuccessful] = useState('');
    
    const input1Ref = useRef()
    const input2Ref = useRef()
    const input3Ref = useRef()
    const input4Ref = useRef()

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

    function isNumber(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
    const handleDeposit = async e => {
        e.preventDefault();
        setDepositLoading(true)
        try{
            let response;
        if (!values.coupon_type || !values.coupon_code || values.coupon_code.length < 12) {
            setValidations({
                ...validations,
                coupon_type: !values.coupon_type ? "Please select coupon type" : "",
                coupon_code: !values.coupon_code ? "Please key in coupon code" : values.coupon_code.length < 12 ? "Coupon code must be at least 12 characters" : "",
            });
            setDepositLoading(false)
            return;
        }else{
            setValidations({
                ...validations,
                coupon_type: "",
                coupon_code: "",
            });
            values.amount = 10
        }
        response = await userService.createDeposit(values);
        setDepTelcopaySuccessful(response.data.txid);
        } catch(err){
            setDepositLoading(false)
            if(err && err.response && err.response.data && err.response.data.error){
                toast.error(err.response.data.error);
              }else{
                toast.error(err.message);
              }
        }
        
    }
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

    return (
        <>
            {/* <div className="form-group deposit-form-group">
                        <label style={{color: "#fff"}} for="Provider">Select Gateway</label>
                        <select
                        style={{color: "black"}}
                        className="form-control rounded-xs"
                        value={values.coupon_type} placeholder="Select Coupon" 
                        onChange={(e)=>{
                            setValues(prevValues => {
                                const newValues = { ...prevValues, coupon_type: e.target.value }
                                return newValues;
                            })
                        }} 
                        id="Provider" name="Provider">
                        <option value="" style={{color: "#000"}}>Please Select Gateway</option>
                        {
                                coupons.map((coupon, idx) => (
                                    <option value={coupon.type}>
                                    {coupon.name}
                                    </option>
                                    ))
                                }
                                </select>
                            </div> */}
            <label style={{ color: "#fff" }} for="Provider">Select Telco Provider (RELOAD CARD)</label>
            <div className="telcopay_tabs mb-3" style={{ width: "100%" }}>
                {
                    coupons.map(coupon => (
                        <a href="#" data-active="true" style={{ background: values.coupon_type == coupon.type ? "#596FD6" : "", color: values.coupon_type == coupon.type ? "white" : "" }}
                            onClick={() => {
                                setValues(prevValues => {
                                    const newValues = { ...prevValues, coupon_type: coupon.type }
                                    return newValues;
                                })
                            }}>
                            {coupon.name}
                        </a>
                    ))
                }
            </div>
            <div style={{ color: "red" }} className={`${validations.coupon_type === '' ? 'valid-feedback' : 'invalid-feedback'} `}>{validations.coupon_type}</div>
            <label style={{ color: "#fff" }} for="Provider">Enter Coupon Code</label>
            <div style={{ color: "#000" }} className="text-center flex justify-center items-center coupon-code-box w-full">
                <input ref={input1Ref} type="text" maxLength="4" name="" id="" onChange={e => {
                    if (isNumber(e)) {
                        // handleInputChange(0, e)
                        setValues(prevValues => {
                            if (!prevValues.coupon_code || prevValues.coupon_code.length < 4) {
                                const newValues = { ...prevValues, coupon_code: e.target.value }
                                // if(prevValues.coupon_code &&(prevValues.coupon_code.length === 3)){
                                //     input2Ref.current.focus()
                                // }
                                return newValues;
                            }
                            return prevValues;
                        })
                    }
                }} /> <span>-</span>
                <input ref={input2Ref} type="text" maxLength="4" name="" id="" onChange={e => {
                    if (isNumber(e)) {
                        // handleInputChange(1, e)
                        setValues(prevValues => {
                            if (prevValues.coupon_code && (prevValues.coupon_code.length >= 4) && (prevValues.coupon_code.length < 8)) {
                                const newValues = { ...prevValues, coupon_code: prevValues.coupon_code.slice(0, 4) + e.target.value }
                                // if(prevValues.coupon_code && (prevValues.coupon_code.length === 7)){
                                //     input3Ref.current.focus()
                                // }
                                return newValues;
                            }
                            return prevValues;
                        })
                    }
                }} /> <span>-</span>
                <input ref={input3Ref} type="text" maxLength="4" name="" id="" onChange={e => {
                    if (isNumber(e)) {
                        // handleInputChange(2, e)
                        setValues(prevValues => {
                            if (prevValues.coupon_code && (prevValues.coupon_code.length >= 8) && (prevValues.coupon_code.length < 12)) {
                                const newValues = { ...prevValues, coupon_code: prevValues.coupon_code.slice(0, 8) + e.target.value }
                                return newValues;
                            }
                            return prevValues;
                        })
                    }
                }} /> <span>-</span>
                <input ref={input4Ref} type="text" maxLength="4" name="" id="" onChange={e => {
                    if (isNumber(e)) {
                        // handleInputChange(2, e)
                        setValues(prevValues => {
                            if (prevValues.coupon_code && (prevValues.coupon_code.length >= 12) && (prevValues.coupon_code.length < 16)) {
                                const newValues = { ...prevValues, coupon_code: prevValues.coupon_code.slice(0, 12) + e.target.value }
                                return newValues;
                            }
                            return prevValues;
                        })
                    }
                }} />
            </div>
            <div style={{ color: "red" }} className={`${validations.coupon_code === '' ? 'valid-feedback' : 'invalid-feedback'} `}>{validations.coupon_code}</div>
            {/* <label style={{ color: "#fff" }} for="Provider">Select Amount</label>
            <div className="flex text-center tab-scroll-wrap justify-between flex-wrap">
                {amountlist.filter((item) => {
                    return true
                }).map((item) => (
                    <div className="zIndex0 my-2" key={item.id} style={{ width: "calc(25% - 6px)" }}>
                        <div
                            className={`amt_blocks py-1 ${values.amount === item.value
                                ? "border border-[#596fd6] bg-[#596fd6]"
                                : "border border-white-500"}`}
                            style={{ width: "100%" }}
                            onClick={() => setValues({ ...values, amount: item.value })}
                        >
                            {item.value}
                        </div>
                    </div>
                ))}
            </div> */}
            <div className="px-4 mt-3 mb-1 alert alert-warning">
                <p className="font-15" style={{ fontWeight: "bold" }}> 
                ⚠️ By using the reload card deposit method, a 30% service charge fee will apply to withdrawals.
                </p>
            </div>
            <button
                className="bg-[#596fd6] rounded-xs text-uppercase font-700 w-full mt-3 py-2"
                style={{ color: "white", borderRadius: "5px" }}
                onClick={handleDeposit}
            >
                Deposit
            </button>
            {depTelcopaySuccessful &&
                <CustomModal
                    // title={"CTC Promotions"}
                    titleStyle={{
                        fontSize: "21px",
                        textTransform: "uppercase"
                    }}
                    open={depTelcopaySuccessful ? true : false}
                    // onClose={() => setOpenCTC(false)}
                    style={{
                        textAlign: "center",
                        borderRadius: "15px",
                        padding: "1.5rem 1rem",
                        color: "white",
                    }}
                    containerStyle={{ width: "38%", maxWidth: "95%", maxHeight: "98%" }}
                >
                    <div className="flex items-center">
                        <Icon icon="ep:success-filled" color="#52c41a" fontSize={35} />
                        <p style={{ fontSize: "14px", paddingLeft: "10px" }}>Deposit_Telcopay_is_successful". <br />
                            Transaction Id: {depTelcopaySuccessful}</p>
                    </div>
                    <button style={{ marginLeft: "auto", background: "#1677ff", fontWeight: "100", fontSize: "15px" }}
                        onClick={() => {
                            setDepTelcopaySuccessful('')
                            setOpenDeposit(false)
                            setTimeout(() => {
                                setDepositLoading(false)
                            }, 500);
                        }}
                        className={`flex items-center w-full justify-center py-2 ml-auto rounded-xs text-uppercase text-center
                                mt-3`}>OK
                    </button>
                </CustomModal>
            }
        {depositLoading && <Loading fullscreen />}
        </>
    )
}

export default TelcoPay