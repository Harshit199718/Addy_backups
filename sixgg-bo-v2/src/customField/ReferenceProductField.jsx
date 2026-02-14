import { Form, Select } from "antd";
import { useGetProductsListQuery } from "../features/products/productsApiSlices";
import SelectOption from "../customToolbar/SelectOption";
import { useTranslation } from "react-i18next";

const ReferenceProductField = ({ name, apiErrors, label="Product", disabled=false, mode=null, isRequired=true, isActive=true, filterProp={} }) => {
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
            ...(isActive && { active: true }),
            ...filterProp
        }
    });

    return (
        <Form.Item 
            name={name}
            label={label}
            validateStatus={apiErrors ? 'error' : ''}
            help={apiErrors}
            rules={[
            {
                required: isRequired,
                message: `${t('referencefield.Please select product!')}`,
            },
            ]}
            hasFeedback
        >
            <SelectOption 
                mode={mode}
                loading={productLoading}
                disabled={productLoading || disabled}
                allowClear
                width= '100%'
                placeholder={t('referencefield.Please select product!')}
                options={productList && productList.list.map(item => ({
                    value: item.id,
                    label: `${item.name} (${item.category}) - ${item.ltype} [${item.sites_name}] (${item.active ? 'Active' : 'Inactive'})`
                }))}
            />
        </Form.Item>
    )
}

export default ReferenceProductField