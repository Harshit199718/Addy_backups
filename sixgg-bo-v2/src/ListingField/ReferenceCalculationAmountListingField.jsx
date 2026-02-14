import { Spin } from 'antd';
import { useGetRewardsListQuery } from '../features/rewards/rewardsApiSlices';
import NumberListingField from './NumberListingField';

const ReferenceCalculationAmountListingField = ({ id }) => {
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
        id:id
    });

    if (loading) {
        return <Spin />;
    }

    const rewards = rewardsData?.list || [];
    const filteredReward = rewards.find(reward => id?.includes(reward.id));

    return rewardsData && filteredReward && (
      <NumberListingField value={filteredReward.calculated_amount} />
    )
}

export default ReferenceCalculationAmountListingField;
