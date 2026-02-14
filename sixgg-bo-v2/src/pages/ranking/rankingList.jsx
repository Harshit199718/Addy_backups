import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Input, Switch, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ReferenceSiteListingField from '../../ListingField/ReferenceSiteListingField';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { notification } from '../../features/modalSlice';
import RankingToolBar from './rankingToolBar';
import { useAddRankMutation, useGetRanksListQuery, useUpdateRankMutation } from '../../features/rank/ranksApiSlices';
import NumberListingField from '../../ListingField/NumberListingField';
import SelectOption from '../../customToolbar/SelectOption';
import { rankingOption } from '../../customField/customOption';
import CustomOptionField from '../../ListingField/CustomOptionField';
import RankingRateList from "./rankingRateList"
import PermissionsAuth from '../../components/permissionAuth';
import { BooleanField } from '../../ListingField/BooleanField';
import { useTranslation } from 'react-i18next';

const RankingList = () => {
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
  } = useGetRanksListQuery({
     pagination, 
     filters, 
     sorting
  }, isModalOpen ? {} : {
    pollingInterval: 100000,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true,
    skip: !isReady
  });

  const [Update] = useUpdateRankMutation();
  const [Create] = useAddRankMutation();
  const emptyRow = { id: 'new' };
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
      dispatch(notification({notification_status: 'success', notification_message: `${t("common.Rank")} ${action} ${t("common.Successfully")}`}));
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
          return <ReferenceSiteListingField id={sites} />;
        }
      },
    },
    {
      title: t('common.Name'),
      dataIndex: 'name',
      columnKey: 'name',
      sorter: true,
      width: 200,
      align: 'left',
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
                  message: t('requiredmessage.Please input the name'),
                },
              ]}
              hasFeedback
            >
              <SelectOption options={rankingOption(t)} width={100}/>
            </Form.Item>
          );
        } else {
          return <CustomOptionField option={rankingOption(t)} mappingText={name} />;
        }
      },
    },
    {
      title: t('common.Min Deposit'),
      dataIndex: 'min_deposit',
      columnKey: 'min_deposit',
      align: 'right',
      sorter: true,
      width: 200,
      render: (min_deposit, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="min_deposit"
              validateStatus={apiErrors.min_deposit ? 'error' : ''}
              help={apiErrors.min_deposit}
              rules={[
                {
                  required: true,
                  message: t('requiredmessage.Please input min deposit'),
                },
              ]}
              hasFeedback
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          );
        } else {
          return <NumberListingField value={min_deposit} />;
        }
      },
    },
    {
      title: t('common.Maintain Rank Day Count'),
      dataIndex: 'maintain_rank_days_count',
      columnKey: 'maintain_rank_days_count',
      align: 'right',
      sorter: true,
      width: 200,
      render: (maintain_rank_days_count, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="maintain_rank_days_count"
              validateStatus={apiErrors.maintain_rank_days_count ? 'error' : ''}
              help={apiErrors.sequence}
              rules={[
                {
                  required: true,
                  message: t('requiredmessage.Please input maintain rank day count'),
                },
              ]}
              hasFeedback
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          );
        } else {
          return <p>{maintain_rank_days_count}</p>;
        }
      },
    },
    {
      title: t('common.Maintain Rank Min Deposit'),
      dataIndex: 'maintain_rank_min_deposit',
      columnKey: 'maintain_rank_min_deposit',
      align: 'right',
      sorter: true,
      width: 200,
      render: (maintain_rank_min_deposit, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="maintain_rank_min_deposit"
              validateStatus={apiErrors.maintain_rank_min_deposit ? 'error' : ''}
              help={apiErrors.maintain_rank_min_deposit}
              rules={[
                {
                  required: true,
                  message: t('requiredmessage.Please input maintain rank min deposit'),
                },
              ]}
              hasFeedback
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          );
        } else {
          return <NumberListingField value={maintain_rank_min_deposit} />;
        }
      },
    },
    {
      title: t('common.Rebate Max Amount'),
      dataIndex: 'rebate_max_amount',
      columnKey: 'rebate_max_amount',
      align: 'right',
      sorter: true,
      width: 200,
      render: (rebate_max_amount, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="rebate_max_amount"
              validateStatus={apiErrors.rebate_max_amount ? 'error' : ''}
              help={apiErrors.rebate_max_amount}
              rules={[
                {
                  required: true,
                  message: t('requiredmessage.Please input rebate max amount'),
                },
              ]}
              hasFeedback
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          );
        } else {
          return <NumberListingField value={rebate_max_amount} />;
        }
      },
    },
    {
      title: t('common.Sequence'),
      dataIndex: 'sequence',
      columnKey: 'sequence',
      align: 'right',
      defaultSortOrder: 'ascend',
      sorter: true,
      width: 150,
      render: (sequence, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="sequence"
              validateStatus={apiErrors.sequence ? 'error' : ''}
              help={apiErrors.sequence}
              rules={[
                {
                  required: true,
                  message: t('requiredmessage.Please input the sequence'),
                },
              ]}
              hasFeedback
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          );
        } else {
          return <p>{sequence}</p>;
        }
      },
    },
    {
      title: t('common.Active'),
      dataIndex: 'active',
      columnKey: 'active',
      align: 'center',
      sorter: true,
      width: 200,
      render: (active, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="active"
              initialValue={active}
            >
              <Switch defaultChecked/>
            </Form.Item>
          );
        } else {
          return (
              <>
                <BooleanField boolean={active} />
              </>
            );
        }
      },
    },
    {
      title: t('common.Is Default'),
      dataIndex: 'is_default',
      columnKey: 'is_default',
      align: 'center',
      sorter: true,
      width: 200,
      render: (is_default, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="is_default"
              initialValue={is_default}
            >
              <Switch />
            </Form.Item>
          );
        } else {
          return (
              <>
                <BooleanField boolean={is_default} />
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
      hidden: PermissionsAuth.checkPermissions('button', 'change_rank', false),
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
                    sequence: record.sequence,
                    active: record.active,
                    is_default: record.is_default,
                    maintain_rank_days_count: record.maintain_rank_days_count,
                    maintain_rank_min_deposit: record.maintain_rank_min_deposit,
                    min_deposit: record.min_deposit,
                    name: record.name,
                    rebate_max_amount: record.rebate_max_amount,
                  });
                }}
              >
                {t('common.Edit')}
              </Button>
          </>
          }
            {editingRow === record.id &&
            <>
            <Button type="link" htmlType="submit">
              {t('common.Save')}
            </Button>
            <Button type="link" onClick={() => setEditingRow(null)}>
              {t('common.Cancel')}
            </Button>
            </>
            }
          </>
        );
      },
    },
  ];
  
  return (
    PermissionsAuth.checkPermissions('list', 'view_rank',
    <div>
      <RankingToolBar isLoading={isFetching} handleAddNewRow={handleAddNewRow} t={t} />
      <Form form={form} onFinish={onFinish}>
        <Table
          rowKey="id"
          columns={columns}
          expandable={{
            expandedRowRender: (record, index, indent, expanded) => <RankingRateList record={record} index={index} indent={indent} expanded={expanded} t={t} />,
          }}
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

export default RankingList;