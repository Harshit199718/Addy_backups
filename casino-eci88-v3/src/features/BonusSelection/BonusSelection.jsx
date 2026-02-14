import React, { useState } from 'react'
import Checkbox from '../../components/common/Checkbox'
import { Icon } from '@iconify/react'
import { BonusSelectionContainer, BonusSelectionLabel, BonusSelectionList } from './BonusSelection.styled'
import { useTranslation } from 'react-i18next'
import { useGetDepositPromotionsQuery } from '../../api/hooks'
import Modal from '../../components/common/Modal'

function BonusSelection({onChange}) {
  const { t } = useTranslation();
  const {data: bonusList} = useGetDepositPromotionsQuery();
  const [selectedBonus, setSelectedBonus] = useState(null);
  
  const handleChange = (event, id, title, description) => {
    const {value, checked} = event.target;
    if (checked) {
      setSelectedBonus({id, title, description});
      onChange && onChange(value);
    } else {
      onChange && onChange(false);
      setSelectedBonus(null);
    }
  }
  return bonusList?.length?(
    <BonusSelectionContainer>
        <BonusSelectionLabel>{t("Bonus")} {t("Selection")} <span>({t("optional")}):</span></BonusSelectionLabel>
        <BonusSelectionList>
            {
                bonusList?.filter(bonus=> bonus.active)?.map(bonus=>(
                    <Checkbox key={bonus.id} label={bonus.title} value={bonus.id} checked={selectedBonus?.id === bonus.id} onChange={(event) => handleChange(event, bonus.id, bonus.title, bonus.description)} />
                ))
            }
        </BonusSelectionList>
        <div className="warning">
            <Icon icon="material-symbols:info" fontSize="2rem" />
            <h3 className="message">{t("PromotionMessage")}</h3>
        </div>
        <Modal title={selectedBonus?.title} isOpen={selectedBonus?.description} onClose={() => setSelectedBonus({id: selectedBonus?.id})}>
            { selectedBonus?.header_description && <div className='sun-editor-editable' dangerouslySetInnerHTML={{__html: selectedBonus?.header_description}} />}
            <div className='sun-editor-editable' dangerouslySetInnerHTML={{__html: selectedBonus?.description}} />
        </Modal>
    </BonusSelectionContainer>
  ):null
}

export default BonusSelection