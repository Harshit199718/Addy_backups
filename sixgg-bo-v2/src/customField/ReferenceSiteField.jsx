import { Form, Select } from "antd";
import { useGetSitesListQuery } from "../features/sites/sitesApiSlices";
import { useTranslation } from "react-i18next";

const ReferenceSiteField = ({ name, label, apiErrors, mode="multiple", disabled=false, hidden=false, onChange = () => {}}) => {
    const { t } = useTranslation();
    const { 
        data: sitesList,
        isLoading: siteLoading, 
    } = useGetSitesListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 100
        },
        filters : {
            active: true
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
                message: `${t("referencefield.Please select sites!")}`,
            },
            ]}
            hasFeedback
            hidden={hidden}
        >
            <Select 
                onChange={(value) => onChange(value)}
                loading={siteLoading}
                disabled={disabled}
                mode={mode}
                allowClear
                style={{ width: '100%' }}
                placeholder={t("common.Sites")}
                options={sitesList && sitesList.list.map(site => ({
                    value: site.id,
                    label: site.name
                }))}
            />
        </Form.Item>
    )
}

export default ReferenceSiteField