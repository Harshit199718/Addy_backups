import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { filtersTabActions, paginationTabActions, resetTabFilters, sortingTabAction } from '../../features/filtersTabSlice';
import ReferenceBankField from '../../customField/ReferenceBankField';
import CustomerBankAccountToolBar from './CustomerBankAccountToolBar';
import { useAddCustomerBankAccountMutation, useGetCustomerBankAccountsListQuery, useUpdateCustomerBankAccountMutation } from '../../features/customerbankaccounts/customerBankAccountsApiSlice';
import { notification } from '../../features/modalSlice';

const CustomerBankAccountList = ({ t }) => {
  const dispatch = useDispatch();
  const player = useSelector(state => state.general.player);
  const pagination = useSelector((state) => state.filtersTab.pagination);
  const filters = useSelector((state) => state.filtersTab.filters);
  const sorting = useSelector((state) => state.filtersTab.sorting);
  const [isReady, setIsReady] = useState(false)
  const [apiErrors, setApiErrors] = useState([])
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(resetTabFilters())
    dispatch(filtersTabActions({ value: [player.id], type: 'default', event: 'user' }))
    setIsReady(true)
  }, []); // initial sort

  const { 
    data: list,
    isLoading,
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetCustomerBankAccountsListQuery({
     pagination, 
     filters,
     sorting
  }, {
    pollingInterval: 10000,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true,
    skip: !isReady
  });
  
  const [Update] = useUpdateCustomerBankAccountMutation();
  const [Create] = useAddCustomerBankAccountMutation();

  const emptyRow = { id: 'new', sites: '', key: '', type: '', value: '' };
  const handleAddNewRow = () => {
    form.resetFields();
    setEditingRow('new');
  };

  const onFinish = async (values) => {
    values.user = player.id
    values.wallet = player.wallet_id
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
      dispatch(notification({notification_status: 'success', notification_message: `${t("common.Env Variable")} ${action} ${t("common.Successfully")}`}));
      setEditingRow(null)
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
      setApiErrors(errorField(error));
    }
  };

  const columns = [
    {
      title: t('common.Bank'),
      dataIndex: 'bank_name_type',
      render: (bank_name_type, record) => {
        if (editingRow === record.id) {
          return (
            <ReferenceBankField name='bank' apiErrors={apiErrors && apiErrors.bank} label={null}/>
          );
        } else {
          return <p>{bank_name_type}</p>;
        }
      },
    },
    {
      title: t('common.Name'),
      dataIndex: 'name',
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
                  message: `${t("requiredmessage.Please enter player bank name")}`,
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{name}</p>;
        }
      },
    },
    {
      title: t('common.Number'),
      dataIndex: 'number',
      render: (number, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="number"
              validateStatus={apiErrors.number ? 'error' : ''}
              help={apiErrors.number}
              rules={[
                {
                  required: true,
                  message: `${t("requiredmessage.Please enter player bank number")}`,
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{number}</p>;
        }
      },
    },
    {
      title: t('common.Action'),
      dataIndex: 'action',
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
                    bank: record.bank,
                    name: record.name,
                    number: record.number,
                  });
                }}
              >
                {t("common.Edit")}
              </Button>
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
    <div>
      <CustomerBankAccountToolBar isLoading={isFetching} handleAddNewRow={handleAddNewRow} t={t} />
      <Form form={form} onFinish={onFinish}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={editingRow === 'new' ? [emptyRow, ...(list && list.list ? list.list : [])] : (list && list.list ? list.list : [])}
          scroll={{
            x: 1500,
            y: 'calc(100vh - 350px)',
          }}
          size='small'
          loading={isLoading}
          onChange={(pagination, filter, sorter) => {
            dispatch(paginationTabActions({ page: pagination.current, pageSize: pagination.pageSize }))
            dispatch(sortingTabAction({ field: sorter.field, name: sorter.column ? sorter.column.columnKey : null, order: sorter.order || null}))
          }}
          pagination={{
            current: pagination.currentPage,
            defaultPageSize: 10,
            showSizeChanger: true,
            total: list ? list.totalCount : 0,
            showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
          }}
        />
      </Form>
    </div>
  )
}

export default CustomerBankAccountList;