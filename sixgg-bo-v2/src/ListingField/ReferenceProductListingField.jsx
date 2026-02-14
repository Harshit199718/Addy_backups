import React from 'react';
import { Spin, Space } from 'antd';
import { useGetProductsIDQuery } from '../features/products/productsApiSlices';
import ReferenceSiteListingField from './ReferenceSiteListingField';

const ReferenceProductListingField = ({ id  }) => {
    const { 
        data: productData,
        isLoading: productLoading,
        isError: productError,
        error: productErrorMessage,
    } = useGetProductsIDQuery({ id: id });

    if (productLoading) {
        return <Spin />;
    }

    return productData && (
        <>
        <Space>
            {productData.name} - {productData.category} - <ReferenceSiteListingField id={productData.sites} />
        </Space>

        </>
    );
    
}

export default ReferenceProductListingField;
