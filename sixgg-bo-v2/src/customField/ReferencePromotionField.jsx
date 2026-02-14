import { Form, Select } from "antd";
import { useGetProductsListQuery } from "../features/products/productsApiSlices";
import SelectOption from "../customToolbar/SelectOption";
import { useGetPromotionListQuery } from "../features/promotion/promotionApiSlices";
import CustomOptionField, { CustomOptionLabel } from "../ListingField/CustomOptionField";
import { promotionType } from "./customOption";
import { useTranslation } from "react-i18next";

const ReferencePromotionField = ({ name, label="Promotion", apiErrors, disabled=false, mode=null, isRequired=true, filterProp={}, onChange = () => {} }) => {
    const { t } = useTranslation();
    const { 
        data: promotionList,
        isLoading: promotionLoading, 
    } = useGetPromotionListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 500
        },
        filters : {
            is_active: true,
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
                message: `${t('referencefield.Please select promotion')}`,
            },
            ]}
            hasFeedback
        >
            <SelectOption 
                mode={mode}
                onChange={onChange}
                loading={promotionLoading}
                disabled={promotionLoading || disabled}
                allowClear
                width= '100%'
                placeholder={t('referencefield.Please select promotion')}
                options={promotionList && promotionList.list.map(item => ({
                    value: item.id,
                    label: `${item.title} 
                    (${CustomOptionLabel(promotionType(t), item.promo_type)})
                    ${item.sites_name} 
                    `
                }))}
            />
        </Form.Item>
    )
}

export default ReferencePromotionField