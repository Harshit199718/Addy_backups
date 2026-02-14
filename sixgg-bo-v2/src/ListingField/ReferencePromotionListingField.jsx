import { Spin, Tag } from 'antd';
import { useGetPromotionListQuery } from '../features/promotion/promotionApiSlices';

const ReferencePromotionListingField = ({ id }) => {
    const { 
        data: promotionList,
        isLoading: promotionLoading, 
    } = useGetPromotionListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 100
        },
        filters : {
            
        }
    });

    if (promotionLoading) {
        return <Spin />;
    }

    const promotion = promotionList?.list || [];
    const filteredPromotion = promotion?.filter(promotion => id?.includes(promotion.id));

    return (
        <div>
            {filteredPromotion.length > 0 ?
            filteredPromotion.map(promotion => (
                <Tag key={promotion.id} color="blue" style={{ borderRadius: '10px', marginBottom: '5px' }}>{promotion.title}</Tag>
            ))
            :
            '-'
            }
        </div>
    );
}

export default ReferencePromotionListingField;
