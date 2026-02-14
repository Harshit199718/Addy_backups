import React from 'react';
import { Form, Spin } from 'antd';
import { useGetAffiliatesListQuery } from '../features/affiliates/affiliatesApiSlices';
import SelectOption from '../customToolbar/SelectOption';

const ReferenceAffiliatesParentField = ({ name, label, apiErrors, mode, disabled = true }) => {
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
        filters: {}
    });

    if (affiliatesLoading) {
        return <Spin />;
    }

    // Filter out null values from the affiliatesData list

    return (
        <Form.Item 
            name={name}
            label={label}
            validateStatus={apiErrors ? 'error' : ''}
            help={apiErrors}
            hasFeedback
        >
            <SelectOption 
                mode={mode}
                loading={affiliatesLoading}
                disabled={disabled}
                allowClear
                width='100%'
                options={affiliatesData && affiliatesData.list.map(item => ({
                    value: item.id,
                    label: `${item.name} `
                }))}
            />
        </Form.Item>
    );
}

export default ReferenceAffiliatesParentField;
