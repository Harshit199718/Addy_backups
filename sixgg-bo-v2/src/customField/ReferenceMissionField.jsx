import { Form } from "antd";
import SelectOption from "../customToolbar/SelectOption";
import { useTranslation } from "react-i18next";
import { useGetMissionsListQuery } from "../features/missions/missionsApiSlices";

const ReferenceMissionField = ({ name, label="Mission", apiErrors, disabled=false, mode=null, isRequired=true, filterProp={}, onChange = () => {} }) => {
    const { t } = useTranslation();
    const { 
        data: missionList,
        isLoading: missionLoading, 
    } = useGetMissionsListQuery({
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
                message: `${t('referencefield.Please select mission')}`,
            },
            ]}
            hasFeedback
        >
            <SelectOption 
                mode={mode}
                onChange={onChange}
                loading={missionLoading}
                disabled={missionLoading || disabled}
                allowClear
                width= '100%'
                placeholder={t('referencefield.Please select mission')}
                options={missionList && missionList.list.map(item => ({
                    value: item.id,
                    label: `${item.title} - ${item.sites_name}`
                }))}
            />
        </Form.Item>
    )
}

export default ReferenceMissionField