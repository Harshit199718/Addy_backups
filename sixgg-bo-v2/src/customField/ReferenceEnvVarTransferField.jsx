import { Form, Select, Spin, Transfer } from "antd";
import { useState } from "react";
import { useGetEnvironmentVariablesListQuery } from "../features/envVar/envVarApiSlices";
import { useTranslation } from "react-i18next";

const ReferenceEnvVarTransferField = ({ name, apiErrors, label, disabled=false, mode=null, isRequired=true, filterProp={}, targetKeys=[] }) => {
    const { t } = useTranslation();
    const { 
        data: envVarList,
        isFetching
    } = useGetEnvironmentVariablesListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 1000
        },
        filters : {
            ...filterProp
        },
        sorting: {
            name: 'key',
            order: 'ASC'
        }
    });
    const modifiedList = envVarList?.list.map(item => {
        return {
            ...item,
            key: item.id,
            keyname: item.key, 
        };
    });

    return (
        <Form.Item 
            name={name}
            label={label}
            validateStatus={apiErrors ? 'error' : ''}
            help={apiErrors}
            hasFeedback
        >
            {isFetching ? 
            <Spin />
            :
            <Transfer
                status={apiErrors ? 'error' : ''}
                dataSource={modifiedList}
                rowKey={(record) => Number(record.id)}
                showSearch
                filterOption={(inputValue, option) =>
                    option.key.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 ||
                    option.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 ||
                    option.type.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                }
                listStyle={{
                    maxWidth: 1000,
                    minWidth: 500,
                    height: 500,
                }}
                titles={[t('referencefield.Not Applied'), t('referencefield.Applied')]}
                targetKeys={targetKeys?.filter(key => key !== null)}
                render={(item) => {
                    return `${item.keyname} (${item.type}) - ${item.value}`}
                }
            />
            }
        </Form.Item>
    )
}

export default ReferenceEnvVarTransferField