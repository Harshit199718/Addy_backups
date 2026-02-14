import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Input, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserGroupsListQuery, useAddUserGroupsMutation, useUpdateUserGroupsMutation } from '../../features/usergroups/usergroupsApiSlices';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import errorField from '../../features/error/errorField';
import { notification } from '../../features/modalSlice';
import UserGroupToolBar from './userGroupToolBar';
import PermissionTransferTemplate from './usergrouppermissions/permissionTransfer';
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';

const UserGroupList = () => {
  const { t } = useTranslation();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [apiErrors, setApiErrors] = useState([])
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'name', name: 'name', order: 'ascend' }));
    setIsReady(true)
  }, []); // initial sort

  const { 
    data: list,
    isLoading,
    isFetching,
    isSuccess, 
    isError, 
    error
  } = useGetUserGroupsListQuery({
     pagination, 
     filters, 
     sorting
  }, isModalOpen ? {} : {
    pollingInterval: 100000,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true,
    skip: !isReady
  });

  const [Update] = useUpdateUserGroupsMutation();
  const [Create] = useAddUserGroupsMutation();
  const emptyRow = { id: 'new', sites: '', text: '', sequence: '', status: '' };
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
        const updatedRow = list?.list.find(item => item.id === editingRow);
        values.permissions = updatedRow.permissions;
        const data = await Update(values).unwrap();
      }
      dispatch(notification({notification_status: 'success', notification_message: `${t("common.Permission")} ${action} ${t("common.Successfully")}`}));
      setEditingRow(null)
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
      setApiErrors(errorField(error));
    }
  };

  const columns = [
    {
      title: t('common.Name'),
      dataIndex: 'name',
      columnKey: 'name',
      sorter: true,
      align: 'center',
      render: (name, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="name"
              validateStatus={apiErrors.name ? 'error' : ''}
              help={apiErrors.name}
              rules={[
                {
                  required: true,
                  message: t("requiredmessage.Please input the name"),
                },
              ]}
              hasFeedback
            >
              <Input placeholder={t('common.Name')} />
            </Form.Item>
          );
        } else {
          return <p>{name}</p>;
        }
      },
    },
    {
      title: t('common.Action'),
      dataIndex: 'action',
      align: 'center',
      hidden: PermissionsAuth.checkPermissions('button', 'change_permission', false),
      render: (_, record) => {
        return (
          <>
            {editingRow !== record.id &&
            <>
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  setEditingRow(record.id);
                  form.setFieldsValue({
                    name: record.name,
                  });
                }}
              >
                {t("common.Edit")}
              </Button>
              <PermissionTransferTemplate id={record.id} t={t} />
            </Space>
          </>
          }
            {editingRow === record.id &&
            <>
            <Space>
              <Button type="primary" htmlType="submit">
                {t("common.Save")}
              </Button>
              <Button type="primary" onClick={() => setEditingRow(null)}>
                {t("common.Cancel")}
              </Button>
            </Space>
            </>
            }
          </>
        );
      },
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_permission',
    <div>
      <UserGroupToolBar isLoading={isFetching} handleAddNewRow={handleAddNewRow} t={t} />
      <Form form={form} onFinish={onFinish}>
        <Table
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

export default UserGroupList;