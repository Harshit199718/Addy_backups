import React from 'react';
import { Spin } from 'antd';
import { useGetAffiliatesListQuery } from '../features/affiliates/affiliatesApiSlices';

const ReferenceAffiliatesListingField = ({ id }) => {
    const { 
        data: affiliatesData,
        isLoading: affiliatesLoading,
        isError: affiliatesError,
        error: affiliatesErrorMessage,
    } = useGetAffiliatesListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 500,
        },
        filters: {},
        id: id
    });

    if (affiliatesLoading) {
        return <Spin />;
    }

    const affiliates = affiliatesData?.list;
    const filteredAffiliates = affiliates?.filter(affiliates => affiliates.id === id);

    return affiliatesData && (
        <div>
            {filteredAffiliates.length > 0 ?
            <div key={filteredAffiliates[0].id} style={{ display: 'flex', alignItems: 'center' }}>
                <span>{`${filteredAffiliates[0].name}`}</span>
            </div>
            :
            '-'
            }
        </div>
    );
    
}

export default ReferenceAffiliatesListingField;
