import React, { useEffect, useState } from "react";
import "./BankList.css";
import userService from "../../services/user.service";
import authService from "../../services/auth.service";
import CustomModal from "../common/CustomModal/CustomModal";

const BankList = ({ bankListType="normal", selectedBank, setSelectedBank }) => {
    const [merchantBank, setMerchantBank] = useState(null);
    const [copied, setCopied] = useState(null);

    const fetchMerchantBankAccounts = async () => {
        try {
          const { data } = await userService.getMerchantBankAccount();
          if (!data) {
            setMerchantBank(null);
          }
          setMerchantBank(data);
        } catch (err) {
          console.log(err);
        }
    };

    const fetchMerchantBankAccountsEW = async () => {
        try {
          const { data } = await userService.getMerchantBankAccountEW();
          if (!data) {
            setMerchantBank(null);
          }
          setMerchantBank(data);
        } catch (err) {
          console.log(err);
        }
    };

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            if(bankListType === "normal"){
                fetchMerchantBankAccounts()
            } else if (bankListType === "e-wallet"){
                fetchMerchantBankAccountsEW()
            }
        }
    },[])

    return (
        <div className="bank-list-container">
            <div className="banks">
            {
                merchantBank?.filter(bank => (bank.name==="easypay_bank_id") || bank.name.toLowerCase() !== 'easypay' && bank.name.toLowerCase() !== 'quickpay')
                .map(bank=>(
                    <div 
                        key={bank.id} 
                        className="bank-show" 
                        style={{ 
                            filter: selectedBank?.id === bank.id ? "grayscale(0)" : "grayscale(100)", 
                            fontWeight: selectedBank?.id === bank.id ? "bold" : "normal" 
                        }}
                        onClick={() => {
                            // handleChange(bank.id)
                            setSelectedBank(bank)
                        }}
                    >
                        <img src={bank.icon} style={{ width: "50px", height: "50px" }} />
                        <h3 className="name">{bank.name}</h3>
                    </div>
                ))
            }
            </div>
            {
                selectedBank && bankListType === "normal" ?
                    <div className="banks-info">
                        <table style={{ color: "white"}}>
                            <tbody>
                                <tr>
                                    <td>Bank Account Name: </td>
                                    <td>{selectedBank.name}</td>
                                </tr>
                                <tr>
                                    <td>Bank Account Number: </td>
                                    <td>{selectedBank.number}</td>
                                    <td>
                                        <button style={{ fontSize: "10px", padding: "5px 10px", backgroundColor: "#596fd6", color: "white", borderRadius: "5px"}} 
                                        onClick={() => {
                                            navigator?.clipboard?.writeText(selectedBank?.number);
                                            setCopied(selectedBank?.number)
                                        }}>Copy</button>
                                    </td>
                                </tr>
                                {selectedBank?.qrcode_image &&
                                <tr>
                                    <td colSpan={3}>
                                        <img src={selectedBank?.qrcode_image} style={{ width: "100%" }}/>
                                    </td>
                                </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                :null
            }
            <CustomModal open={copied} onClose={() => setCopied(null)} style={{ textAlign: "center", color: "white" }}>
                <p>Bank Account Number Copied !</p>
                <p>Account Number: {copied}</p>
            </CustomModal>
        </div>
    )
}

export default BankList;