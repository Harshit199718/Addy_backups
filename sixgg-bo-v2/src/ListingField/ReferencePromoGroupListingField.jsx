import { Spin, Tag } from 'antd';
import { useGetPromotionGroupListQuery } from '../features/promotiongroup/promotionGroupApiSlices';

const ReferenceGroupListingField = ({ id }) => {
    const { 
        data: groupList,
        isLoading: groupLoading, 
    } = useGetPromotionGroupListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 100
        },
        filters : {
            
        }
    });

    if (groupLoading) {
        return <Spin />;
    }

    const group = groupList?.list || [];
    const filteredGroup = group?.filter(group => id?.includes(group.id));

    return (
        <div>
            {filteredGroup.length > 0 ?
            filteredGroup.map(group => (
                <Tag key={group.id} color="blue" style={{ borderRadius: '10px', marginBottom: '5px' }}>{group.title}</Tag>
            ))
            :
            '-'
            }
        </div>
    );
}

export default ReferenceGroupListingField;
