import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Input, Switch, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useGetNewsFeedListQuery, useAddNewsFeedMutation, useUpdateNewsFeedMutation } from '../../features/newsfeed/newsfeedApiSlices';
import ReferenceSiteListingField from '../../ListingField/ReferenceSiteListingField';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { notification } from '../../features/modalSlice';
import NewsFeedToolBar from './newsfeedToolBar';
import PermissionsAuth from '../../components/permissionAuth';
import { BooleanField } from '../../ListingField/BooleanField';
import { useTranslation } from 'react-i18next';

const NewsFeedList = () => {
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
    dispatch(sortingAction({ field: 'sequence', name: 'sequence', order: 'ascend' }));
    setIsReady(true)
  }, []); // initial sort

  const { 
    data: list,
    isLoading,
    isFetching,
    isSuccess, 
    isError, 
    error
  } = useGetNewsFeedListQuery({
     pagination, 
     filters, 
     sorting
  }, isModalOpen ? {} : {
    pollingInterval: 100000,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true,
    skip: !isReady
  });

  const [Update] = useUpdateNewsFeedMutation();
  const [Create] = useAddNewsFeedMutation();
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
        const data = await Update(values).unwrap();
      }
      dispatch(notification({notification_status: 'success', notification_message: `${t("common.News Feed")} ${action} ${t("common.Successfully")}`}));
      setEditingRow(null)
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
      setApiErrors(errorField(error));
    }
  };

  const columns = [
    {
      title: t('common.Sites'),
      dataIndex: 'sites',
      align: 'left',
      titleAlign: 'center',
      width: 200,
      render: (sites, record) => {
        if (editingRow === record.id) {
          return (
            <ReferenceSiteField name="sites" label={null} />
          );
        } else {
          return <ReferenceSiteListingField id={sites}/>;
        }
      },
    },
    {
      title: t('common.Text'),
      dataIndex: 'text',
      columnKey: 'text',
      align: 'left',
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="text"
              validateStatus={apiErrors.text ? 'error' : ''}
              help={apiErrors.text}
              rules={[
                {
                  required: true,
                  message: `${t("requiredmessage.Please enter text")}`,
                },
              ]}
              hasFeedback
            >
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }}/>
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: t('common.Sequence'),
      dataIndex: 'sequence',
      columnKey: 'sequence',
      align: 'center',
      defaultSortOrder: 'ascend',
      sorter: true,
      width: 200,
      render: (number, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="sequence"
              validateStatus={apiErrors.sequence ? 'error' : ''}
              help={apiErrors.sequence}
              rules={[
                {
                  required: true,
                  message: `${t("requiredmessage.Please enter sequence")}`,
                },
              ]}
              hasFeedback
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          );
        } else {
          return <p>{number}</p>;
        }
      },
    },
    {
        title: t('common.Status'),
        dataIndex: 'active',
        columnKey: 'active',
        align: 'center',
        sorter: true,
        width: 200,
        render: (isActive, record) => {
          if (editingRow === record.id) {
            return (
              <Form.Item
                name="active"
                initialValue={isActive}
                valuePropName="checked"
              >
                <Switch defaultChecked/>
              </Form.Item>
            );
          } else {
            return (
                <>
                  <BooleanField boolean={isActive} />
                </>
              );
          }
        },
      },
    {
      title: t('common.Action'),
      dataIndex: 'action',
      align: 'center',
      width: 200,
      hidden: PermissionsAuth.checkPermissions('button', 'change_newsfeed', false),
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
                    text: record.text,
                    sequence: record.sequence,
                    active: record.active,
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
    PermissionsAuth.checkPermissions('list', 'view_newsfeed',
    <div>
      <NewsFeedToolBar isLoading={isFetching} handleAddNewRow={handleAddNewRow} t={t} />
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

export default NewsFeedList;