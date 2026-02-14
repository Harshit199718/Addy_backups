import React from 'react';
import { Spin } from 'antd';
import { useGetAgentsListQuery  } from '../features/users/usersApiSlices';

const ReferenceAgentsListingField = ({ id  }) => {
    const { 
        data: agentsData,
        isLoading: agentsLoading, 
    } = useGetAgentsListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 500,
            id: id
        },
        filters: {
        }
    });

    if (agentsLoading) {
        return <Spin />;
    }

    const agents = agentsData?.list;
    const filteredAgents = agents?.filter(agents => agents?.id === id);

    return agentsData &&  (
        <div>
            {filteredAgents.length > 0 ?
                <div key={filteredAgents[0]?.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <span>{`${filteredAgents[0]?.username}`}</span>
                </div>
                :
                '-'
            }
        </div>
    );
    
}

export default ReferenceAgentsListingField;

