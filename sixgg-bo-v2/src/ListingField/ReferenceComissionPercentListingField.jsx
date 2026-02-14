import { Spin, Tag } from 'antd';
import { useGetRewardsListQuery } from '../features/rewards/rewardsApiSlices';
import PercentListingField from './PercentListingField';

const ReferenceComissionPercentListingField = ({ id }) => {
    const { 
        data: rewardsData,
        isLoading: loading, 
    } = useGetRewardsListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 500
        },
        filters: {
            // Add filters if needed
        },
    });

    if (loading) {
        return <Spin />;
    }

    const rewards = rewardsData?.list || [];
    const filteredReward = rewards.find(reward => id?.includes(reward.id));

    return rewardsData && filteredReward && (
        <div>
            {filteredReward && (
                <PercentListingField value={filteredReward.commission_percent} />
            )}
        </div>
    );
}

export default ReferenceComissionPercentListingField;
