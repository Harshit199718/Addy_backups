import React from 'react'
import { PromoTitle, Promos, PromotionsContainer } from './Promotions.styled';
import { usePromotionsQuery } from '../../api/hooks';
import Card from '../../components/common/Card';
import LazyInView from '../../components/common/LazyInView';
import { useTranslation } from 'react-i18next';
import PromotionsCard from './PromotionsCard';

function Promotions() {
  const { t } = useTranslation();
  const {data: promotions} = usePromotionsQuery();

  
  return (
    <PromotionsContainer>
        <PromoTitle>{t("Promo_Rewards")}</PromoTitle>
        <Promos>
            {
                promotions?.map(({id, title, image, end_date, end_time})=>(
                    <LazyInView key={id}>
                        <Card key={title} width="340px" title={title} image={image} content={<PromotionsCard id={id} endDate={end_date} endTime={end_time} />} />
                    </LazyInView>
                ))
            }
        </Promos>
    </PromotionsContainer>
  )
}

export default React.memo(Promotions)