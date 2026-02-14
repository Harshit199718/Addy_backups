import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DepositForm from '../DepositForm';
import { DepositContainer, Deposits, TransactionFormContainer, TransactionHeader } from '../Transactions.styled';
import { useSelector } from 'react-redux';
import { selectConfigData } from '../../../api/generalApi';
import Image from '../../../components/common/Image';
import { useTranslation } from 'react-i18next';
import { useMerchantEwalletsQuery } from '../../../api/hooks';

function Deposit() {
    const [selected, setSelected] = useState(null)
    const {available_paymentgateway_providers, available_ewallets, ...configs} = useSelector(selectConfigData);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const {id} = useParams();
    const {data: accounts} = useMerchantEwalletsQuery(id, {skip: !id});
  return (
    <DepositContainer>
        <Deposits>
            <TransactionHeader>{t("Choose_a_Payment_Method")}</TransactionHeader>
            {
                !id?.includes("ewallet")?
                <>
                    <Image 
                        src={configs[`deposit_manual_deposit`]} 
                        alt="" 
                        onClick={()=> {
                            if (window.innerWidth>800) {
                                setSelected({id: "manual"})
                            } else {
                                navigate(`/deposit/manual`)
                            }
                        }}
                        width="96%"
                        skeletonHeight="15vh"
                        style={{ maxHeight: "30dvh" }}
                    />
                    {
                        available_paymentgateway_providers?.split(",")?.map(provider=>(
                            <Image 
                                key={provider}
                                src={configs[`deposit_${provider}`]} 
                                alt="" 
                                onClick={()=> {
                                    if (window.innerWidth>800) {
                                        setSelected({id: provider})
                                    } else if (provider==="easypay_manual_deposit") {
                                        navigate(`/deposit/${provider}`)
                                    } else {
                                        navigate(`/deposit/online-transfer/${provider}`)
                                    }
                                }}
                                width="96%"
                                skeletonHeight="15vh"
                                style={{ maxHeight: "30dvh" }}
                            />
                        ))
                    }
                    {
                        available_ewallets?.split(",")?.map(provider=>(
                            <Image 
                                key={provider.split("-")[0]}
                                src={configs[`deposit_${(provider.split("-")[0]==="surepay"?"":(provider.split("-")[0]+"_"))}ewallet`]}
                                alt="" 
                                onClick={()=> {
                                    if(provider === "dgpay-ewallet" || provider === "quickpay-ewallet"){
                                        if (window.innerWidth>800) {
                                            setSelected({id: provider})
                                        } else {
                                            navigate(`/deposit/online-transfer/${provider}`)
                                        }
                                    } else {
                                        setSelected(null);
                                        navigate(`/deposit/ewallet/${provider}`)
                                    }
                                }}
                                width="96%"
                                skeletonHeight="15vh"
                                style={{ maxHeight: "30dvh" }}
                            />
                        ))
                    }
                </>
                :
                <>
                    {
                        accounts?.map(account=>(
                            <Image 
                                key={account?.id}
                                src={account?.icon}
                                alt="" 
                                onClick={()=> {
                                    if (window.innerWidth>800) {
                                        setSelected({id, accountId: account?.id, accountName: account?.name})
                                    } else {
                                        navigate(`/deposit/ewallet/${id}/${account?.id}/${account?.name}`)
                                    }
                                }}
                                width="96%"
                                skeletonHeight="15vh"
                                style={{ maxHeight: "50dvh" }}
                            />
                        ))
                    }
                </>
            }
        </Deposits>
        <TransactionFormContainer>
            {
                selected?
                <DepositForm id={selected?.id} accountId={selected?.accountId} accountName={selected?.accountName} />
                :null
            }
        </TransactionFormContainer>
    </DepositContainer>
  )
}

export default Deposit