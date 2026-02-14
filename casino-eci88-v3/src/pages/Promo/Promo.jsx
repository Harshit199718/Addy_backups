import React, { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import Tabs from "../../components/common/Tabs";
import Card from "../../components/common/Card";
import { CardsContainer } from "./Promo.styled";
import Image from "../../components/common/Image";
import { usePromotionsQuery, usePromotionsTabsQuery } from "../../api/hooks";
import PromoDescription from "./PromoDescription";
import { useParams } from "react-router-dom";
import useImports from "../../hooks/useImports";
import Loading from "../../components/common/Loading";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../api/generalApi";

function Promo() {
  const { data: promotions } = usePromotionsQuery();
  const { data: promotionsTabs } = usePromotionsTabsQuery();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const {id} = useParams();
  const {PromoDescription} = useImports();
  const {promo_style} = useSelector(selectConfigData);

  const tabs = useMemo(() => {
    const promoCategories = {}
    promotions?.forEach((promotion) => {
      if (promotion.category && !(promotion.category in promoCategories)) {
        promoCategories[promotion.category] = true
      } 
    })

    const filteredTabs = promotionsTabs?.filter((tab) =>
      (tab[0] in promoCategories)
    );
    return filteredTabs
      ? [["all", "All"], ...filteredTabs].map((promotionsTab) => ({
          key: promotionsTab[0],
          label: promotionsTab[1],
        }))
      : [];
  }, [promotionsTabs, promotions]);

  // Scroll to specific promotion when redirected from home page
  useEffect(() => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [id])
  
  
  const handleTabChange = useCallback((tab) => {
    setSelectedCategory(tab);
  }, []);
  return (
    <div>
      <Tabs
        defaultActive={selectedCategory}
        tabs={tabs}
        onChange={handleTabChange}
        tabsBorder
      >
        <CardsContainer>
            {promotions
              ?.filter(
                (promotion) =>
                  selectedCategory === promotion.category ||
                  selectedCategory === "all"
              )
              .map((promotion) => (
                <Card
                  key={promotion.id}
                  id={promotion.id}
                  title={promo_style!=="2"?promotion.title:""}
                  image={promotion.image}
                  content={
                    <Suspense fallback={<Loading isLoading />}>
                      <PromoDescription title={promotion.title} description={promotion.description} end_date={promotion?.end_date} />
                    </Suspense>
                  }
                  $background={promo_style==="2"?"#0F0F0F":""}
                  $borderRadius={promo_style==="2"?"5px":""}
                />
              ))}
          </CardsContainer>
      </Tabs>
    </div>
  );
}

export default React.memo(Promo);
