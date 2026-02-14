import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useBanksQuery, useGetTacV3Mutation, useVerifyBankV3Mutation, useVerifyTacV3Mutation, useVerifyWithoutTacV3Mutation, useWalletQuery } from '../../../api/hooks';
import { useSelector } from 'react-redux';
import { selectConfigData } from '../../../api/generalApi';
import { OpionLabel } from '../../Transactions/Withdraw/Withdraw1';
import OptimizedImage from '../../../components/common/OptimizedImage';
import { useTranslation } from 'react-i18next';
import Form from '../../../components/common/Form';
import Input, { ErrorMessage } from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import MobileInput from '../../../components/common/MobileInput';
import GetEnvVarInfo from '../../../features/EnvVarInfo/GetEnvVarInfo';

function VerifyV3({setOpenVerifyAccount}) {
    const { t } = useTranslation();
    const [ getTacValues, setGetTacValues ] = useState();
    const { data: wallet } = useWalletQuery();
    const { data: banks } = useBanksQuery();
    const [getTacV3Mutation, { isSuccess: isTacSent, error: getTacError }] = useGetTacV3Mutation();
    const [verifyTacV3, { isSuccess: isVerified, error: verifyError }] = useVerifyTacV3Mutation();
    const [verifyWithoutOTPV3, { isSuccess: isVerifiedWithoutOTP, error: verifiedWithoutOTPError }] = useVerifyWithoutTacV3Mutation();
    const [verifyBankV3, { isSuccess: isBankVerified, error: verifyBankError }] = useVerifyBankV3Mutation();
    const [formErrors, setFormErrors] = useState({})
    const [tac, setTac] = useState("");
    const { signup_version, phone_format, ...config } = useSelector(selectConfigData);
    const isOTPRequired = GetEnvVarInfo({name: "FE_IS_OTP_REQUIRED", type: "boolean"})

    const [timeLeft, setTimeLeft] = useState(0);
    useEffect(() => {
      if (isTacSent) {
        setTimeLeft(60); 
        const timerId = setInterval(() => {
          setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(timerId);
      }
    }, [isTacSent]);

      const bankOptions = useMemo(() => {
        if (!banks) {
          return [];
        } else {
          return banks?.map((bank) => ({
            key: bank.id,
            label: (
              <OpionLabel key={bank?.id}>
                <OptimizedImage src={bank.icon} alt={bank.name} width="40px" />
                {bank.name} {bank.number}
              </OpionLabel>
            ),
          }));
        }
      }, [banks]);
      const bankFields = [
        {
          name: "bank",
          type: "select",
          label: t("Select_Bank"),
          options: bankOptions,
          $background: "transparent",
          $color: "#fff"
        },
        {
          name: "account_name",
          type: "text",
          label: t("Full_Name"),
          $background: "transparent",
          $color: "#fff"
        },
        {
          name: "account_number",
          type: "number",
          label: t("Account_Number"),
          $background: "transparent",
          $color: "#fff"
        },
      ]
      useEffect(() => {
        setFormErrors(null)
        if (!getTacError && !verifyBankError && !verifyError) return;
        if(getTacError?.originalStatus === 500){
          setFormErrors({mobile: "Mobile Error"});
          return;
        }
        const {data}= getTacError || verifyError || verifyBankError || verifiedWithoutOTPError;
        const errorsObj={}
        for (const key in data) {
            if (Array.isArray(data[key])) {
                errorsObj[key]=data[key][0];
            } else {
                errorsObj[key]=data[key];
            }
        }
        setFormErrors(errorsObj);
      }, [getTacError, verifyError, verifyBankError])
      useEffect(() => {
        if (isBankVerified) {
          setOpenVerifyAccount(false)
        }
      }, [isBankVerified])
  return (
    <div>
        {
              wallet?.registration_stage==="signup" && !isVerified?
              <>
                  <Input type="text" placeholder={t("Username")} name="username" value={wallet?.user?.username} />
                  <MobileInput name="mobile" onlyCountries={[phone_format]} disabled={isTacSent}
                    onChange={(value) => {
                      setGetTacValues(prevvalue => ({
                      ...prevvalue,
                      username: wallet?.user?.username,
                      mobile: value?.target?.value,
                      cc: value?.target?.extraValues?.cc
                    }))
                    } 
                    }
                  />
                  <ErrorMessage>{formErrors?.mobile}</ErrorMessage>
                  {isOTPRequired &&
                  <div className="request-otp" style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px"}}>
                      <div>
                        <Input type="text" placeholder={t("SMS_OTP")} name="tac" onChange={(event) => setTac(event.target.value)} error={formErrors?.tac}/>
                        {isTacSent && <p>{t("OTP_Hint")}</p>}
                      </div>
                      <div className="request-otp-btn">
                        <Button $width="auto" disabled={isTacSent && timeLeft > 0} onClick={() =>
                          getTacV3Mutation(getTacValues)
                        }>
                          {t("REQUEST_OTP")}
                        </Button>
                        {
                          timeLeft > 0 ?
                          <p>{t("Next OTP")}: <span>{timeLeft}</span> {t("seconds")}</p>
                          :null
                        }
                      </div>
                  </div>
                  }
                <Button onClick={() => {
                  isOTPRequired ?
                  verifyTacV3({username: wallet?.user?.username, tac})
                  :
                  verifyWithoutOTPV3(getTacValues)
                }}>{t("Verify")}</Button>
              </>
              :
              <Form allFields={bankFields} onSubmit={(values) => {
                verifyBankV3({...values, username: wallet?.user?.username})
              }} errors={formErrors}>
                <Button type="submit">{t("Save_And_Continue")}</Button>
              </Form>
            }
    </div>
  )
}

export default VerifyV3