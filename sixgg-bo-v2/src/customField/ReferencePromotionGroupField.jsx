import { Form, Select } from "antd";
import SelectOption from "../customToolbar/SelectOption";
import { useGetPromotionGroupListQuery } from "../features/promotiongroup/promotionGroupApiSlices";
import { useTranslation } from "react-i18next";

const ReferencePromotionGroupField = ({ name, apiErrors, label="Promotion Group", disabled=false, mode=null, filterProp={} }) => {
    const { t } = useTranslation();
    const { 
        data: promotionGroupList,
        isLoading: promotionGroupLoading, 
    } = useGetPromotionGroupListQuery({
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
            hasFeedback
        >
            <SelectOption 
                mode={mode}
                loading={promotionGroupLoading}
                disabled={promotionGroupLoading || disabled}
                allowClear
                width= '100%'
                placeholder={t("referencefield.Please select promotion group")}
                options={promotionGroupList && promotionGroupList.list.map(item => ({
                    value: item.id,
                    label: `${item.title}`
                }))}
            />
        </Form.Item>
    )
}

export default ReferencePromotionGroupField