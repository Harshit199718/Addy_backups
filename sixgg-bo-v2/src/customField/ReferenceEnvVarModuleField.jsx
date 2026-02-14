import { Form, Select } from "antd";
import { useGetEnvironmentVariablesModulesListQuery } from "../features/envVar/envVarApiSlices";
import { useTranslation } from "react-i18next";

const ReferenceEnvVarModuleField = ({ name, label="Env Var Module", apiErrors, disabled=false, mode="single", t }) => {
    const { 
        data: envVarModuleList,
        isLoading: envVarModuleLoading, 
        isFetching: envVarModulefetching,
      } = useGetEnvironmentVariablesModulesListQuery();

    return (
        <Form.Item
            name={name}
            label={label}
            validateStatus={apiErrors ? 'error' : ''}
            help={apiErrors}
            rules={[
            {
                required: true,
                message: `${t("referencefield.Please select module")}`,
            },
            ]}
            hasFeedback
        >
            <Select
                mode={mode}
                allowClear
                style={{
                    width: '100%',
                }}
                placeholder={t("referencefield.Please select module")}
                options={envVarModuleList?.map(module => ({
                    value: module.module,
                    label: `${module.module}`
                }))}
                disabled={disabled}
            />
        </Form.Item>
    )
}

export default ReferenceEnvVarModuleField