import React from 'react'
import styled from 'styled-components'
import Image from '../components/common/Image'
import { useSelector } from 'react-redux'
import { selectConfigData } from '../api/generalApi'
import { TransactionHeader } from './Transactions/Transactions.styled'
import { useTranslation } from 'react-i18next'

const VIPImageContainer = styled.div`
    width: 100%;
    max-width: 1036px;
    margin: auto;
`
function VIPRanking() {
    const {vip_ranking} = useSelector(selectConfigData);
    const {t} = useTranslation();
  return (
    <>
        <TransactionHeader>{t("VIP_Ranking")}</TransactionHeader>
        <VIPImageContainer>
            <Image src={vip_ranking} />
        </VIPImageContainer>
    </>
  )
}

export default VIPRanking