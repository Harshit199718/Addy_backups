import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Link from '../../components/common/Link'
import { useTranslation } from 'react-i18next';
import Modal from '../../components/common/Modal';
import LanguageSelector from '../../components/common/LanguageSelector';
import { Profile3Container } from './Profile3.styled';
import { useBanksQuery, useCustomerBanksQuery, useLogoutMutation, useUpdateAutoTransferMutation, useWalletQuery } from '../../api/hooks';
import Loading from '../../components/common/Loading';
import { useSelector } from 'react-redux';
import { selectCurrentLang } from '../../app/slices/general';
import Input from '../../components/common/Input';
import ToggleSwitch from '../../components/common/ToggleSwitch';

function Profile3() {
  const { t } = useTranslation();
  const [languageModal, setLanguageModal] = useState(false);
  const currentLanguage = useSelector(selectCurrentLang);
  const { data: customerBanks } = useCustomerBanksQuery();
  const { data: banks } = useBanksQuery(
    customerBanks ? customerBanks[0].bank : "",
    { skip: !customerBanks }
  );
  const { data: wallet } = useWalletQuery();
  const [logout, { isLoading }] = useLogoutMutation();
  const [updateAutoTransfer, {isLoading: isUpdating, isSuccess}] = useUpdateAutoTransferMutation();
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setIsUpdated(true)
    }
  }, [isSuccess])
  const userBankDetails = useMemo(() => {
    if (banks) {
      return {
        ...customerBanks[0],
        metaData: banks,
      };
    }
  }, [banks]);

  const userDetails = useMemo(
    () => [
      {
        label: t("Username"),
        value: `${wallet?.user.username} ✅` || `${t("No_Account")} ✅`,
      },
      {
        label: t("Mobile_No"),
        value: wallet?.mobile || t("No_items_found"),
      },
      {
        label: t("Bank"),
        value: userBankDetails?.metaData?.name,
      },
      {
        label: t("Bank_Accounts"),
        value: userBankDetails?.name,
      },
      {
        label: t("Bank_Details"),
        value: userBankDetails?.number,
      },
    ],
    [wallet, userBankDetails, currentLanguage]
  );

  const handleClose = useCallback(() => {
    setLanguageModal(false)
  }, [])

  return (
    <Profile3Container>
      <Loading isLoading={isLoading} />
      <h3 className='profile2_heading'>{t("Profile")}</h3>
      <table>
        <tbody>
          {
            userDetails.map((userDetail) => (
              <tr key={userDetail?.value}>
                <td>{userDetail.label}</td>
                <td>: {userDetail.value}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <h3 className='profile2_heading'>{t("Settings")}</h3>
      <ToggleSwitch 
        label={t("Auto Transfer Credit to Game")}
        defaultChecked={wallet?.auto_transfer_credit_to_game}
        onChange={(checked) => updateAutoTransfer({id: wallet?.user?.id, username: wallet?.user?.username, auto_transfer_credit_to_game: checked})}
        disabled={isUpdating}
      />
      <Link className="setting_info" to="/change-password">{t("Change_Password")}</Link>
      <div className="setting_info" onClick={() => {
        setLanguageModal(true)
      }}>{t("Change_Language")}
      </div>
      <div className="setting_info" onClick={() => logout()} >{t("Log_out")}</div>
      <Modal
        title={t("Select_Language")}
        isOpen={languageModal}
        onClose={handleClose}
      >
        <LanguageSelector />
      </Modal>
      <Modal
        title={"Auto Transfer"}
        isOpen={isUpdated}
        onClose={() => setIsUpdated(false)}
        success={{ message: `${t("Auto Transfer updated successfully")}` }}
      />

    </Profile3Container>

  )
}

export default Profile3;