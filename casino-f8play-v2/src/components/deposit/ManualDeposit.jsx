import React, { useState } from "react";
import AmountButtons from "./AmountButton";
import userService from "../../services/user.service";
import SubmitForm from "./SubmitForm";
import BankList from "./BankList";
import Upload from "./Upload/UploadImage";
import ImgToBase64 from "./Upload/imgToBase64";
import CustomModal from "../common/CustomModal/CustomModal";

const ManualDeposit = ({setOpenDeposit, setDepositLoading, depositLoading}) => {
    const [validations, setValidations] = useState(null);
    const [amount, setAmount] = useState("");
    const [selectedBank, setSelectedBank] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [successfulDeposit, setSuccessfulDeposit] = useState(null);

    const handleImageUpload = async (file) => {
        const base64 = await ImgToBase64(file);
        setUploadedImage({
            title: file.name,
            base64,
        })
      };

    const handleDeposit = async (e) => {
        e.preventDefault();
        setDepositLoading(true)
        setValidations(null)
        try {
            let response;
            if (!amount) {
                setValidations({
                   amount: "Please input amount"
                });
                setDepositLoading(false)
                return;
            }
            if (!selectedBank?.id) {
                setValidations({
                    merchant_bank_account: "Please Select Merchant Bank"
                });
                setDepositLoading(false)
                return;
            }
            if (!uploadedImage?.title) {
                setValidations({
                    proof: "Please Upload Images"
                });
                setDepositLoading(false)
                return;
            }
            const values = {
                "ttype": "IB",
                "merchant_bank_account": selectedBank?.id,
                "amount": amount,
                "proof": uploadedImage
            }
            response = await userService.createDeposit(values);
            setDepositLoading(false)
            setSuccessfulDeposit(response?.data?.txid)
              
        } catch(err){
            setDepositLoading(false)
            if(err && err.response && err.response.data && (err.response.data.error || err.response.data.non_field_errors)){
                setValidations({
                   amount: err.response.data.non_field_errors[0]
                });
            }else{
                setValidations({
                   amount: "Deposit error, please contact support"
                });
            }
        }
    }

    return (
        <>
            <label style={{ color: "#fff" }} for="Provider">Manual Deposit</label>
            <BankList selectedBank={selectedBank} setSelectedBank={setSelectedBank}/>
            {validations?.merchant_bank_account &&
            <div style={{ color: "red" }} className={'invalid-feedback'}>
                {validations?.merchant_bank_account}
            </div>
            }
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
                {validations?.amount}
            </div>
            }
            <AmountButtons setAmount={setAmount}/> 
            <Upload label="Bank Slip" onChange={handleImageUpload} />
            {validations?.proof &&
            <div style={{ color: "red" }} className={'invalid-feedback'}>
                {validations?.proof}
            </div>
            }
            <button
                className="bg-[#596fd6] rounded-xs text-uppercase font-700 w-full mt-3 py-2"
                style={{ color: "white", borderRadius: "5px" }}
                onClick={handleDeposit}
            >
                {depositLoading ? "Loading, Please wait" : "Deposit"}
            </button>
            <CustomModal open={successfulDeposit} onClose={() => {
                setOpenDeposit(null)
                setSuccessfulDeposit(null)
            }}
            style={{ textAlign: "center", color: "white" }}>
                <p>Successfully Deposited, TXID: {successfulDeposit}</p>
            </CustomModal>
        </>
    )
}

export default ManualDeposit;