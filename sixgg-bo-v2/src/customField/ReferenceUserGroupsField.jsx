import { Form, Select } from "antd";
import { useGetUserGroupsListQuery } from "../features/usergroups/usergroupsApiSlices";
import { useTranslation } from "react-i18next";

const ReferenceUserGroupsField = ({ name, apiErrors, label="Groups", filterProp={}, mode= "single", onChange = () => {}}) => {
    const { t } = useTranslation();
    const { 
        data: userGroupsList,
        isLoading: userGroupsLoading, 
    } = useGetUserGroupsListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 100
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
                required: true,
                message: t('referencefield.Please select sites!'),
            },
            ]}
            hasFeedback
        >
            <Select 
                onChange={(value) => onChange(value)}
                loading={userGroupsLoading}
                disabled={userGroupsLoading}
                mode={mode}
                allowClear
                style={{ width: '100%' }}
                placeholder={t("referencefield.Please select group")}
                options={userGroupsList && userGroupsList.list.map(group => ({
                    value: group.id,
                    label: group.name
                }))}
            />
        </Form.Item>
    )
}

export default ReferenceUserGroupsField