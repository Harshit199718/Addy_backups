import React, { useState, useEffect } from "react";
import "./ChangePassword.css";
import userService from "../services/user.service";
import useToast from "../useToast";
import Loading from "../components/common/Loading/Loading";

const initialValues = {
  amount: "",
};

function Withdraw({ isLoggedIn, setOpenWithdraw }) {
  const [wallet, setWallet] = useState();
  const [withdrawalLoading, setWithdrawLoading] = useState(false);
  const [values, setValues] = useState(initialValues);
  // const [toast, setToast] = useState(false);
  const [validations, setValidations] = useState({
    customer_bank_account: "",
    credit_type: "",
    amount: "",
  });
  const {
    customer_bank_account: CUBank,
    credit_type: creditTypeVal,
    amount: amountVal,
  } = validations;
  const toast = useToast();
  const [creditOptions] = useState([
    {
      key: "CA",
      label: "Cash",
    },
    // {
    //   key: "CH",
    //   label: "Chips",
    // },
  ])
  const [banks, setBanks] = useState([])
  const [customerBanks, setCustomerBanks] = useState([])

  const getWalletInfo = async () => {
    try {
      const wallet = await userService.getBalance()
      setWallet(wallet?.data)
      const banks = await userService.getBanks();
      const customerBanks = await userService.getCustomerBanks();
      setBanks(banks?.data)
      setCustomerBanks(customerBanks?.data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (isLoggedIn) {
      getWalletInfo()
    }
  }, [isLoggedIn])

  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name === "credit_type") {
      setValues((values) => {
        return { ...values, 
          [name]: value, 
          amount: value==="CA"?wallet?.balance:wallet?.chips_balance
        };
      });
    } else {
      setValues((values) => {
        return { ...values, 
          [name]: value, 
        };
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setWithdrawLoading(true)
    try {
      await userService.withdraw(values);
      setWithdrawLoading(false)
      toast.success(
        "Withdraw Submitted Successfully"
      );
      setTimeout(() => {
        setOpenWithdraw(false);
      }, 2000);
    } catch (err) {
      setWithdrawLoading(false)
      console.log(err.response.data);
      setValidations({
        ...validations,
        customer_bank_account: err.response.data && err.response.data.customer_bank_account,
        credit_type: err.response.data && err.response.data.credit_type,
        amount: err.response.data && (err.response.data.amount || err.response.data.non_field_errors),
      });
    }
  };

  return (
  <>
  <div className="w-full overflow-y-scroll history_container show-scrollbar">
      {
        toast.ToastContainer
      }
      {/* <div className="change_pswd_header flex w-full items-center bg-[#06D6FA] justify-between">
        <p>Modify Password</p>
        <span
          className="rounded-full mr-9"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <Icon
            icon="oi:x"
            fontSize={35}
            style={{ color: "#3C3339", fontWeight: 800 }}
          />
        </span>
      </div> */}
      <div className="change_pswd_inputs">
        <div className="">
          <div className="flex items-center justify-between">
          <p className="flex items-center">
            <span className="me-3">*</span>Choose Your Account
          </p>
          <div className="not_null_text mt-auto"> {CUBank === "" && "Must not be null"}</div>
          </div>
          <div className="flex gap-x-24 flex-wrap">
            {/* <input type="password" name="old_password" onChange={handleChange} /> */}
            {/* <div className="not_null_text mt-auto"> {CUBank === "" ? "Must not be null" : validations.old_password}</div> */}
            <select name="customer_bank_account" id="" onChange={handleChange}>
              <option value="" disabled selected>Select Bank</option>
              {
                customerBanks?.map(bank => {
                  const matchedBank = banks.find(b => b.id == bank.bank);
                  return (
                    <option value={bank?.id} key={bank?.id}>
                      {matchedBank?.name || ''} - {bank?.name} ({bank?.number})
                    </option>
                  );
                })
              }
            </select>
          </div>
          {validations?.customer_bank_account &&
            <div style={{ color: "red" }} className={'invalid-feedback'}>
                {validations?.customer_bank_account}
            </div>
          }
        </div>
        <div className="md:pt-1 pt-2">
        <div className="flex items-center justify-between">
          <p className="flex items-center">
            <span className="me-3">*</span>Choose Credit Type
          </p>
            <div className="not_null_text mt-auto"> {creditTypeVal === "" && "Must not be null"}</div>
        </div>
          <div className="flex gap-x-24 flex-wrap">
            {/* <input type="password" name="password" onChange={handleChange} /> */}
            <select name="credit_type" id="" onChange={handleChange}>
              <option value="" disabled selected>Select Credit Type</option>
              {
                creditOptions?.map(creditOption => (
                  <option value={creditOption?.key}>
                    {creditOption?.label}
                  </option>
                ))
              }
            </select>
            {/* <div className="not_null_text mt-auto"> {creditTypeVal === "" ? "Must not be null" : validations.password}</div> */}
          </div>
        </div>
        {validations?.credit_type &&
          <div style={{ color: "red" }} className={'invalid-feedback'}>
              {validations?.credit_type}
          </div>
        }
        <div className="md:pt-1 pt-2">
        <div className="flex items-center justify-between">
          <p className="flex items-center">
            <span className="me-3">*</span>Amount
          </p>
          <div className="not_null_text mt-auto"> {amountVal === "" && "Must not be null"}</div>
        </div>
          <div className="flex gap-x-24 flex-wrap">
            <input type="number" name="amount" value={values?.amount} readOnly onChange={handleChange} />
            {/* <div className="not_null_text mt-auto"> {amountVal === "" ? "Must not be null" : validations.password2}</div> */}
          </div>

        </div>
        {validations?.amount &&
          <div style={{ color: "red" }} className={'invalid-feedback'}>
              {validations?.amount}
          </div>
        }
        <div className="chnage_pswd_btns pt-2 gap-x-4 ">
          <div className="chnage_pswd_ok" onClick={handleSubmit}>OK</div>
          <div className="chnage_pswd_exit" onClick={(e) => {
            e.preventDefault();
            // navigate("/");
            setOpenWithdraw(false)
          }} >Exit</div>
        </div>
      </div>
    </div>
      {withdrawalLoading && <Loading fullscreen />}
</>
  );
}

export default Withdraw;
