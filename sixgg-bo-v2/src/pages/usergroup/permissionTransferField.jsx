import { Form, Spin, Transfer } from "antd";
import { useState } from "react";
import { useGetPermissionsListQuery } from "../../features/permissions/permissionsApiSlices";
import { useTranslation } from "react-i18next";

const PermissionTransferField = ({ name, apiErrors, label="Product", disabled=false, mode=null, isRequired=true, filterProp={}, targetKeys=[] }) => {
    const { t } = useTranslation();
    const { 
        data: permissionList,
        isFetching 
    } = useGetPermissionsListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 500
        },
        filters : {
            active: true,
            ...filterProp
        }
    });

    const listStyle = ({ direction }) => ({
        width: direction === 'left' ? '50%' : '50%', // Adjust widths based on direction
        height: 400, // Fixed height
        overflow: 'auto', // Add overflow styling if needed
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
                dataSource={permissionList?.list}
                rowKey={(record) => record.id}
                showSearch
                filterOption={(inputValue, option) =>
                    option.content_type_model.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 ||
                    option.codename.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 ||
                    option.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                }
                listStyle={listStyle}
                titles={[t('common.Permissions Available'), t('common.Permissions Added')]}
                operations={[t('common.Add'), t('common.Remove')]}
                targetKeys={targetKeys?.filter(key => key !== null)}
                render={(item) => (
                    <div>
                        <div style={{ whiteSpace: 'pre-wrap'}} >{`${item.content_type_model} - ${item.codename}`}</div>
                        <div>{item.name}</div>
                    </div>
                )}
            />
            }
        </Form.Item>
    )
}

export default PermissionTransferField