import { Icon } from '@iconify/react'
import React from 'react'
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'

export const NoDataContainer = styled.span`
  width: 100%;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  color: #444;
  background: #DCE0E6;

  .no-data-icon {
    font-size: 26px;
  }
`


function NoData({icon, message}) {
  const { t } = useTranslation();
  return (
    <NoDataContainer>
        <Icon className="no-data-icon" icon={icon} />
        {message || t("No_items_found")}
    </NoDataContainer>
  )
}

export default NoData