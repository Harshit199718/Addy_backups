import { Space, Spin, Tag } from 'antd';
import { useGetRanksListQuery } from '../features/rank/ranksApiSlices';

const ReferenceRankListingField = ({ id }) => {
    const { 
        data: ranksList,
        isLoading: rankLoading, 
    } = useGetRanksListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 100
        },
        filters : {
            active: true,
        }
    });

    if (rankLoading) {
        return <Spin />;
    }

    const ranks = ranksList?.list || [];
    const filteredRanks = ranks.filter(rank => id?.includes(rank.id));

    return (
        <div>
            {filteredRanks.map(rank => (
                <Tag key={rank.id} color="blue" style={{ borderRadius: '10px', marginBottom: '5px', marginRight: '3px' }}>
                    {rank.name}
                </Tag>
            ))}
        </div>
    );
}

export default ReferenceRankListingField;
