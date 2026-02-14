import React, { useState } from "react";
import AmountButtons from "./AmountButton";
import userService from "../../services/user.service";
import SubmitForm from "./SubmitForm";

const SurepayDeposit = ({setOpenDeposit, setDepositLoading, depositLoading}) => {
    const [validations, setValidations] = useState(null);
    const [amount, setAmount] = useState("");

    const handleDeposit = async (e) => {
        e.preventDefault();
        setDepositLoading(true)
        setValidations(null)
        try {
            let response;
            if (!amount) {
                setValidations({
                    ...validations,
                   amount: "Please input amount"
                });
                setDepositLoading(false)
                return;
            }
            const values = {
                "ttype": "PG",
                "amount": amount,
                "pg": "surepay"
            }
            response = await userService.createDeposit(values);
            if(response?.data?.action){
                SubmitForm(response?.data?.action?.url, response?.data?.action?.data);
            }
              
        } catch(err){
            setDepositLoading(false)
            if(err && err.response && err.response.data && (err.response.data.error || err.response.data.non_field_errors)){
                setValidations({
                    ...validations,
                   amount: err.response.data.non_field_errors[0] 
                });
            }else{
                setValidations({
                    ...validations,
                   amount: "Deposit error, please contact support"
                });
            }
        }
    }

    return (
        <>
            <label style={{ color: "#fff" }} for="Provider">Surepay</label>
            <div style={{ color: "#000" }} className="w-full">
                <input 
                type="number" 
                name="" 
                id="" 
                className="rounded-lg w-full p-2" 
                placeholder="Amount" 
                value={amount}
                onChange={(e) => {
                    setAmount(e.target.value)
                    setValidations({
                        ...validations,
                        amount: ""
                    })
                }}
                /> 
            </div>
            {validations?.amount &&
            <div style={{ color: "red" }} className={'invalid-feedback'}>
                {validations.amount}
            </div>
            }
            <AmountButtons setAmount={setAmount}/>
            <button
                className="bg-[#596fd6] rounded-xs text-uppercase font-700 w-full mt-3 py-2"
                style={{ color: "white", borderRadius: "5px" }}
                onClick={handleDeposit}
            >
                {depositLoading ? "Loading, Please wait" : "Deposit"}
            </button>
        </>
    )
}

export default SurepayDeposit;