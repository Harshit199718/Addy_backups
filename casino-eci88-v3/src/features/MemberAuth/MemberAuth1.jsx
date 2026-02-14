import React from 'react'
import { AuthBalance, AuthButtons, MemberAuthContainer, MemberAuthWrapper, NoAuth } from './MemberAuth1.styled'
import Skeleton from 'react-loading-skeleton'
import Image from '../../components/common/Image'
import { useTranslation } from "react-i18next"
import withMemberAuth from '../../HOC/withMemberAuth'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/common/Loading'
import { addThousandSeparator } from '../../components/common/NumberConvertion'
import RankingConverter from '../General/RankingConverter'

function MemberAuth1({currentUser, currency_symbol, home_login_btn, home_register_btn, updatedBankDetails, wallet, enable_chips, wallet_deposit, wallet_withdraw, wallet_refresh, country, handleClick, stopAllProducts, isLoading}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <MemberAuthWrapper>
      <Loading isLoading={isLoading} />
      {
        !currentUser?
        <NoAuth>
          <Image data-path="/signin" src={home_login_btn} alt="" skeletonHeight={48} onClick={handleClick} />
          <Image data-path="/signup" src={home_register_btn} alt="" skeletonHeight={48} onClick={handleClick} />
        </NoAuth>
        :
        <MemberAuthContainer>
          <div className="welcome_container">
            <div className="welcome-message">
              {t("Welcome")} {updatedBankDetails?.name}<br />
              {updatedBankDetails?.metaData?.name} ({updatedBankDetails?.number})
            </div>
            {wallet?.rank && <div className="rank_container">
              <img src={require("../../assets/icons/trophy-icon.png")} alt="" />
              {RankingConverter(wallet && wallet?.rank)}
            </div>}
          </div>
          <AuthBalance>
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
          </AuthBalance>
          <AuthButtons>
            <div className="buttons">
              <Image src={wallet_deposit} alt="" onClick={() => navigate("/deposit")} />
              <Image src={wallet_withdraw} alt="" onClick={() => navigate("/withdraw")} />
              {/* <Image src={wallet_refresh} alt="" onClick={() => stopAllProducts()} /> */}
              <Image src={wallet_refresh} alt="" onClick={() => location.reload()} />
            </div>
          </AuthButtons>
        </MemberAuthContainer>
      }
    </MemberAuthWrapper>
  )
}

export default withMemberAuth(MemberAuth1)