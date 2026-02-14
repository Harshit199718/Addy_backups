import React, { useEffect, useState } from 'react';
import { Form, Table, Typography, Popconfirm, Button, Input, Select  } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useAddEnvironmentVariablesMutation, useDeleteEnvironmentVariablesMutation, useGetEnvironmentVariablesIDQuery, useGetEnvironmentVariablesListQuery, useUpdateEnvironmentVariablesMutation } from '../../features/envVar/envVarApiSlices';
import EnvVarToolBar from './envVarToolBar';
import ReferenceSiteListingField from '../../ListingField/ReferenceSiteListingField';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import { envVarType } from '../../customField/customOption';
import errorField from '../../features/error/errorField';
import { notification } from '../../features/modalSlice';
import BatchCreateEnvVar from './batchCreateEnvVar';
import BatchUpdateEnvVar from './batchUpdateEnvVar';
import PermissionsAuth from '../../components/permissionAuth';
import CustomOptionField from '../../ListingField/CustomOptionField';
import ReferenceEnvVarModuleField from '../../customField/ReferenceEnvVarModuleField';
import { useTranslation } from 'react-i18next';

const EnvVarList = () => {
  const { t } = useTranslation();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [apiErrors, setApiErrors] = useState([])
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'key', name: 'key', order: 'ascend' }));
  }, []); // initial sort

  const { 
    data: list,
    isLoading,
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetEnvironmentVariablesListQuery({
     pagination, 
     filters, 
     sorting
  }, isModalOpen ? {} : {
    pollingInterval: 100000,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true,
  });

  const [Update] = useUpdateEnvironmentVariablesMutation();
  const [Create] = useAddEnvironmentVariablesMutation();
  const [Delete] = useDeleteEnvironmentVariablesMutation();

  const emptyRow = { id: 'new'};
  const handleAddNewRow = () => {
    form.resetFields();
    setEditingRow('new');
  };

  const onFinish = async (values) => {
    setApiErrors([])
    try {
      let action;
      if(editingRow === 'new'){
        action = t('common.Create')
        const data = await Create(values).unwrap();
      }else{
        action = t('common.Update')
        values.id = editingRow;
        const data = await Update(values).unwrap();
      }
      dispatch(notification({notification_status: 'success', notification_message: `${t("env.Env Variable")} ${action} ${t("common.Successfully")}`}));
      setEditingRow(null)
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
      setApiErrors(errorField(error));
    }
  };

  const onDelete = async (values) => {
    try {
      let action;
        action = t('common.deleted')
        const data = await Delete(values).unwrap();

      dispatch(notification({notification_status: 'success', notification_message: `${t("env.Env Variable")} ${action} ${t("common.Successfully")}`}));
      setEditingRow(null)
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
    }
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_NONE,
      selectedRowKeys?.length > 0 && 
      {
        key: 'batchcreate',
        text: <BatchCreateEnvVar selectedRowKeys={selectedRowKeys} t={t} />,
      },
      selectedRowKeys?.length > 0 && 
      {
        key: 'batchupdate',
        text: <BatchUpdateEnvVar selectedRowKeys={selectedRowKeys} t={t} />,
      },
    ],
  };

  const columns = [
    {
      title: t('common.Sites'),
      dataIndex: 'sites',
      width: 200,
      render: (sites, record) => {
        if (editingRow === record.id) {
          return (
            <ReferenceSiteField name="sites" label={null} />
          );
        } else {
          return <ReferenceSiteListingField id={sites} />;
        }
      },
    },
    {
      title: t('env.Module'),
      dataIndex: 'module',
      columnKey: 'module',
      width: 220,
      sorter: true,
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <ReferenceEnvVarModuleField name="module" label={null} t={t} />
          );
        } else {
          return <p>{text?.toUpperCase()}</p>;
        }
      },
    },
    {
      title: t('env.Key'),
      dataIndex: 'key',
      columnKey: 'key',
      defaultSortOrder: 'ascend', // Set default sorting order
      sorter: true,
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="key"
              validateStatus={apiErrors.key ? 'error' : ''}
              help={apiErrors.key}
              rules={[
                {
                  required: true,
                  message: `${t("env.Key")}${t("common.Is Required")}`,
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: t('env.Type'),
      dataIndex: 'type',
      columnKey: 'type',
      width: 200,
      sorter: true,
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="type"
              validateStatus={apiErrors.type ? 'error' : ''}
              help={apiErrors.type}
              rules={[
                {
                  required: true,
                  message: `${t("env.Type")}${t("common.Is Required")}`,
                },
              ]}
              hasFeedback
            >
              <Select
                allowClear
                style={{ width: '100%' }}
                placeholder={t("env.Type")}
                options={envVarType(t)}
              />
            </Form.Item>
          );
        } else {
          return <CustomOptionField option={envVarType(t)} mappingText={text} />;
        }
      },
    },
    {
      title: t('env.Value'),
      dataIndex: 'value',
      columnKey: 'value',
      sorter: true,
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="value"
              validateStatus={apiErrors.value ? 'error' : ''}
              help={apiErrors.value}
              rules={[
                {
                  required: true,
                  message: `${t("env.Value")}${t("common.Is Required")}`,
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: t('common.Action'),
      dataIndex: 'action',
      width: 200,
      hidden: PermissionsAuth.checkPermissions('button', 'change_environvar', false),
      render: (_, record) => {
        return (
          <>
            {editingRow !== record.id &&
            <>
              <Button
                type="link"
                onClick={() => {
                  setEditingRow(record.id);
                  form.setFieldsValue({
                    sites: record.sites,
                    module: record.module,
                    key: record.key,
                    type: record.type,
                    value: record.value,
                  });
                }}
              >
                {t("common.Edit")}
              </Button>
              {PermissionsAuth.checkPermissions('button', 'delete_environvar',
              <Popconfirm
                title={`${t("env.Delete the")} ${record.key}`}
                description={
                  <div style={{ whiteSpace: 'pre-line' }}>
                    {`${t("env.Are you sure you want to delete")}
                    ${t('env.Key')}: ${record.key}
                    ${t('env.Type')}: ${record.type}
                    ${t('env.Value')}: ${record.value.length > 20 ? record.value.substring(0, 20) + '...' : record.value}`}
                  </div>
                }
                ok
                okText="Yes"
                cancelText="No"
                onConfirm={() => onDelete(record)}
              >
                <Button danger>{t("common.Delete")}</Button>
              </Popconfirm>
              )}
              {/* <Popconfirm
                title={`Sure to delete ?`}
                onConfirm={onDelete(record)}
              >
                Delete
              </Popconfirm> */}
          </>
          }
            {editingRow === record.id &&
            <>
            <Button type="link" htmlType="submit">
              {t("common.Save")}
            </Button>
            <Button type="link" onClick={() => setEditingRow(null)}>
              {t("common.Cancel")}
            </Button>
            </>
            }
          </>
        );
      },
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_environvar',
    <div>
      <EnvVarToolBar isLoading={isFetching} handleAddNewRow={handleAddNewRow} t={t} />
      <Form form={form} onFinish={onFinish}>
        <Table
          rowSelection={rowSelection}
          rowKey="id"
          columns={columns}
          dataSource={editingRow === 'new' ? [emptyRow, ...(list && list.list ? list.list : [])] : (list && list.list ? list.list : [])}
          scroll={{
            x: 1500,
            y: 'calc(100vh - 350px)',
          }}
          loading={isLoading}
          onChange={(pagination, filter, sorter) => {
            dispatch(paginationActions({ page: pagination.current, pageSize: pagination.pageSize }))
            dispatch(sortingAction({ field: sorter.field, name: sorter.column ? sorter.column.columnKey : null, order: sorter.order || null}))
          }}
          pagination={{
            current: pagination.currentPage,
            defaultPageSize: 10,
            pageSizeOptions: [10, 50, 100, 200, 500],
            showSizeChanger: true,
            total: list ? list.totalCount : 0,
            showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
            responsive: true
          }}
        />
      </Form>
    </div>
    )
  )
}

export default EnvVarList;