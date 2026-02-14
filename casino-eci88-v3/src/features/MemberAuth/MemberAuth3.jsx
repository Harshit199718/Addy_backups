import React from 'react'
import { AuthButtons3, MemberAuthContainer3, MemberAuthWrapper3, NoAuth3 } from './MemberAuth3.styled'
import Skeleton from 'react-loading-skeleton'
import Image from '../../components/common/Image'
import { useTranslation } from "react-i18next"
import withMemberAuth from '../../HOC/withMemberAuth'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/common/Loading'
import { addThousandSeparator } from '../../components/common/NumberConvertion'

function MemberAuth3({currentUser, currency_symbol, home_login_btn, home_register_btn, updatedBankDetails, wallet, enable_chips, wallet_deposit, wallet_withdraw, wallet_profile, wallet_refresh, country, handleClick, stopAllProducts, isLoading}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <MemberAuthWrapper3>
      <Loading isLoading={isLoading} />
      {
        !currentUser?
        <NoAuth3>
          <Image data-path="/signin" src={home_login_btn} alt="" skeletonHeight={48} onClick={handleClick} />
          <Image data-path="/signup" src={home_register_btn} alt="" skeletonHeight={48} onClick={handleClick} />
        </NoAuth3>
        :
        <MemberAuthContainer3>
          <AuthButtons3>
            <div className="buttons">
              <div className="button">
                <Image width="20px" src={wallet_deposit} alt="" onClick={() => navigate("/deposit")} />
                <p className="button-name">{t("deposit")}</p>
              </div>
              <div className="button">
                <Image width="20px" src={wallet_withdraw} alt="" onClick={() => navigate("/withdraw")} />
                <p className="button-name">{t("withdraw")}</p>
              </div>
              <div className="button">
                <Image width="20px" src={wallet_profile} alt="" onClick={() => navigate("/profile")} />
                <p className="button-name">{t("Profile")}</p>
              </div>
              <div className="button">
                <p className="username">{wallet?.username}</p>
                <p className="user-balance">{currency_symbol} {addThousandSeparator(wallet?.balance, country)}</p>
              </div>
              <div className="button">
                {/* <Image width="40px" src={wallet_refresh} alt="" onClick={() => stopAllProducts()} /> */}
                <Image width="40px" src={wallet_refresh} alt="" onClick={() => location.reload()} />
              </div>
            </div>
          </AuthButtons3>
        </MemberAuthContainer3>
      }
    </MemberAuthWrapper3>
  )
}

export default withMemberAuth(MemberAuth3)