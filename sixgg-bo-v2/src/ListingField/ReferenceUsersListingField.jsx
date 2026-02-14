import React from 'react';
import { Spin } from 'antd';
import { useGetUsersIDQuery } from '../features/users/usersApiSlices';

const ReferenceUsersListingField = ({ id  }) => {
    const { 
        data: usersData,
        isLoading: usersLoading,
        isError: usersError,
        error: usersErrorMessage,
    } = useGetUsersIDQuery({ id: id });

    if (usersLoading) {
        return <Spin />;
    }

    return usersData && (
        usersData.username
    );
    
}

export default ReferenceUsersListingField;
