import React from 'react'
import { AuthBalance4, AuthButtons4, MemberAuthContainer4, MemberAuthWrapper4, NoAuth4 } from './MemberAuth4.styled'
import Image from '../../components/common/Image'
import { useTranslation } from "react-i18next"
import withMemberAuth from '../../HOC/withMemberAuth'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/common/Loading'
import BonusWinover from '../../pages/Profile/BonusWinover'
import withWallet from '../../HOC/withWallet'
import GetEnvVarInfo from '../EnvVarInfo/GetEnvVarInfo'
import { addThousandSeparator } from '../../components/common/NumberConvertion'

function MemberAuth4({currentUser, currency_symbol, home_login_btn, home_register_btn, wallet_deposit, wallet_withdraw, wallet_refresh, country, minDeposit, wallet, handleClick, stopAllProducts, isLoading}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <MemberAuthWrapper4>
      <Loading isLoading={isLoading} />
      {
        !currentUser?
        <NoAuth4>
          <Image data-path="/signin" src={home_login_btn} alt="" skeletonHeight={48} onClick={handleClick} />
          <Image data-path="/signup" src={home_register_btn} alt="" skeletonHeight={48} onClick={handleClick} />
        </NoAuth4>
        :null}
        <MemberAuthContainer4>
          <AuthBalance4>
            <div className="wallet-details">
              {wallet?.balance ? 
              <div>
                <h2 className="balance-label">{t("Balance")}:</h2>
                <h1 className="balance-value">{currency_symbol} {addThousandSeparator(wallet?.balance, country)}</h1>
              </div>
              : null}
               <p className="transaction-value">{t("Min")} {t("deposit")}: {currency_symbol} {addThousandSeparator(GetEnvVarInfo({name: "MIN_DEPOSIT_LIMIT", type: "number", overwrite: minDeposit?.min_deposit}), country, 0)}</p>
              <p className="transaction-value">{t("Min")} {t("withdrawal")}: {currency_symbol} {addThousandSeparator(GetEnvVarInfo({name: "MIN_WITHDRAWAL_LIMIT", type: "number", overwrite: minDeposit?.min_turnover}),country, 0)}</p>
              <p className="transaction-value">{t("Max")} {t("withdrawal")}: {currency_symbol} {addThousandSeparator(GetEnvVarInfo({name: "MAX_WITHDRAWAL_LIMIT", type: "number", overwrite: null}), country, 0)}</p>
            </div>
          </AuthBalance4>
          <AuthButtons4>
            <div className="buttons">
              <Image src={wallet_deposit} alt="" onClick={() => navigate("/deposit")} />
              <Image src={wallet_withdraw} alt="" onClick={() => navigate("/withdraw")} />
              {/* <Image src={wallet_refresh} alt="" onClick={() => stopAllProducts()} /> */}
              <Image src={wallet_refresh} alt="" onClick={() => location.reload()} />
            </div>
          </AuthButtons4>
          {currentUser && <BonusWinover padding="16px 16px 0" textAlign="center" />}
        </MemberAuthContainer4>
    </MemberAuthWrapper4>
  )
}

export default withMemberAuth(withWallet(MemberAuth4))