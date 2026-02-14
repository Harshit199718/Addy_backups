import React from 'react';
import { Spin, Tag } from 'antd';
import { useGetPlayerSimpleListQuery } from '../features/player/playerApiSlices';
import { UserOutlined } from '@ant-design/icons';
import { setSelectedPlayer } from '../features/generalSlice';
import { useDispatch } from 'react-redux';

const ReferencePlayerListingField = ({ filterProp={}, showCustomerName }) => {
    const dispatch = useDispatch();
    const { 
        data: playerData,
        isLoading: playerLoading,
        isError: playerError,
        error: playerErrorMessage,
    } = useGetPlayerSimpleListQuery({ 
        pagination : {
            startPageRow: 1,
            endPageRow: 1,
        },
        filters: filterProp
    });

    if (playerLoading) {
        return <Spin />;
    }

    return playerData?.list.length > 0 && (
        <>
            <Tag
                icon={<UserOutlined />}
                color='default'
                onClick={() => dispatch(setSelectedPlayer({record: playerData?.list[0].id}))}
                style={{ cursor: "pointer", fontSize: 16 }}
            >
                {showCustomerName ? playerData?.list[0].customer_bank_account_name : playerData?.list[0].username}
            </Tag>
        </>
    );
    
}

export default ReferencePlayerListingField;
