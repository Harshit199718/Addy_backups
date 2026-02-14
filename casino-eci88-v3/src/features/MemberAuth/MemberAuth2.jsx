import React from 'react'
import { AuthBalance2, AuthButtons2, MemberAuthContainer2, MemberAuthWrapper2, NoAuth2 } from './MemberAuth2.styled'
import Skeleton from 'react-loading-skeleton'
import Image from '../../components/common/Image'
import { useTranslation } from "react-i18next"
import withMemberAuth from '../../HOC/withMemberAuth'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/common/Loading'
import { addThousandSeparator } from '../../components/common/NumberConvertion'

function MemberAuth2({currentUser, currency_symbol, home_login_btn, home_register_btn, updatedBankDetails, wallet, enable_chips, wallet_deposit, wallet_withdraw, wallet_refresh, country, handleClick, stopAllProducts, isLoading}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <MemberAuthWrapper2>
        <Loading isLoading={isLoading} />
        <MemberAuthContainer2>
          {
            !currentUser?
            <NoAuth2>
              <Image data-path="/signin" src={home_login_btn} alt="" skeletonHeight={48} onClick={handleClick} />
              <Image data-path="/signup" src={home_register_btn} alt="" skeletonHeight={48} onClick={handleClick} />
            </NoAuth2>
            :
            <AuthBalance2>
              <div className="balance">
                <h2 className="balance-type">{t("Cash")}:</h2>
                <h2 className="balance-value">{currency_symbol} {addThousandSeparator(wallet?.balance, country) || <Skeleton />}</h2>
              </div>
              <div className="balance">
                <h2 className="balance-type-token">{t("token")}:</h2>
                <h2 className="balance-value-token">{wallet?.checkin_token_available || 0}</h2>
              </div>
              {
                enable_chips?
                <div className="balance">
                  <h2 className="balance-type">{t("Chips")}:</h2>
                  <h2 className="balance-value">{currency_symbol} {addThousandSeparator(wallet?.chips_balance, country) || <Skeleton />}</h2>
                </div>
                :null
              }
            </AuthBalance2>
          }
          <AuthButtons2>
            <div className="buttons">
              <div className="button">
                <Image src={wallet_deposit} alt="" onClick={() => navigate("/deposit")} />
                <p className="button-name">{t("deposit")}</p>
              </div>
              <div className="button">
                <Image src={wallet_withdraw} alt="" onClick={() => navigate("/withdraw")} />
                <p className="button-name">{t("withdraw")}</p>
              </div>
              {/* <div className="button" onClick={() => stopAllProducts()}> */}
              <div className="button" onClick={() => location.reload()}>
                <Image src={wallet_refresh} alt="" />
                <p className="button-name">{t("refresh")}</p>
              </div>
            </div>
          </AuthButtons2>
        </MemberAuthContainer2>
    </MemberAuthWrapper2>
  )
}

export default withMemberAuth(MemberAuth2)