import { Form, Select } from "antd";
import { useGetProductsListQuery } from "../features/products/productsApiSlices";
import { productsCategory } from "./customOption";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ReferenceProductCategoryField = ({ name, apiErrors, label="Product", placeholder="Please select category", disabled=false, mode=null, isRequired=true, filterProp={} }) => {
    const { t } = useTranslation();
    const { 
        data: productList,
        isLoading: productLoading, 
    } = useGetProductsListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 500
        },
        filters : {
            ...filterProp
        }
    });

    const [newProductsCategory, setNewProductsCategory] = useState([]);

    useEffect(() => {
        if (productList && productList.list) {
            const updatedProducts = productList.list.map(productData => ({
                value: productData.id.toString(),
                label: `${productData.name} (${productData.category})`,
            }));
            setNewProductsCategory([...productsCategory(t), ...updatedProducts]);
        }
    }, [productList]);
    
    return (
        <Form.Item 
            name={name}
            label={label}
            validateStatus={apiErrors ? 'error' : ''}
            help={apiErrors}
            hasFeedback
        >
            <Select 
                showSearch
                mode={mode}
                loading={productLoading}
                disabled={productLoading || disabled}
                allowClear
                style={{ width: '100%' }}
                placeholder={placeholder}
                filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                options={newProductsCategory}
            />
        </Form.Item>
    )
}

export default ReferenceProductCategoryField