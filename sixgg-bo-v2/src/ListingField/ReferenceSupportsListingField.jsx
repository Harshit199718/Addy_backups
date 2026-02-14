import React from 'react';
import { Spin, Tag } from 'antd';
import { useGetSupportsIDQuery } from '../features/support/supportsApiSlices';

const ReferenceSupportsListingField = ({ id }) => {
    const { 
        data: supportData,
        isLoading: supportLoading,
        isError: supportError,
        error: supportErrorMessage,
    } = useGetSupportsIDQuery({ id });

    if (supportLoading) {
        return <Spin />;
    }

    return supportData && (
            supportData.username
    );
    
}

export default ReferenceSupportsListingField;
