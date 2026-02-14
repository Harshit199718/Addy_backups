import React, { useEffect, useState } from "react";
import "./AmountButton.css";

const AmountButtons = ({ setAmount, isEwalletAmount=false }) => {

    const amountList = isEwalletAmount ?
    [
        "30",
        "50",
        "100",
        "200",
        "250",
        "300",
        "500",
        "1000",
    ]
    : [
        "10",
        "30",
        "50",
        "100",
        "200",
        "250",
        "300",
        "500",
        "1000",
        "3000",
        "5000",
        "10000",
    ];

    return (
        <div className="amount-button-container">
            {amountList.map((amount, index) => (
                <button key={index} className="amount-button" onClick={() => setAmount(amount)}>{amount}</button>
            ))}
        </div>
    )
}

export default AmountButtons;