import { Form } from "antd";
import SelectOption from "../customToolbar/SelectOption";
import { useTranslation } from "react-i18next";
import { useGetCouponTagsListQuery } from "../features/couponbatchs/couponBatchsApiSlices";

const ReferenceCouponTagField = ({ name, label="Coupon Tag", apiErrors, disabled=false, mode=null, isRequired=true, filterProp={}, onChange = () => {} }) => {
    const { t } = useTranslation();
    const { 
        data: promotionList,
        isLoading: promotionLoading, 
    } = useGetCouponTagsListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 500
        },
        filters : {
            active: true,
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
                message: `${t('referencefield.Please select coupon tag')}`,
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
                placeholder={t('referencefield.Please select coupon tag')}
                options={promotionList && promotionList.list.map(item => ({
                    value: item.id,
                    label: `${item.name}`
                }))}
            />
        </Form.Item>
    )
}

export default ReferenceCouponTagField