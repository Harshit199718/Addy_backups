import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Input, Select, InputNumber  } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CashTransferToolBar from './cashTransferToolBar';
import { filtersActions, paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import { cashtransferType } from '../../customField/customOption';
import errorField from '../../features/error/errorField';
import { notification } from '../../features/modalSlice';
import { useAddCashTransferMutation, useGetCashTransferListQuery, useUpdateCashTransferMutation } from '../../features/cashtransafer/cashTransferApiSlices';
import DateTimeListingField from '../../ListingField/DateTimeListingField';
import DateTimeField from '../../customField/DateTimeField';
import { formattedDate, getCurrentTime, getTodayDate } from '../../components/convertDate';
import CustomOptionField from '../../ListingField/CustomOptionField';
import BankAccountListingField from '../../ListingField/MerchantBankAccountListingField';
import ReferenceMerchantBankAccountField from '../../customField/ReferenceMerchantBankAccountField';
import NumberListingField from '../../ListingField/NumberListingField';
import PermissionsAuth from '../../components/permissionAuth';
import { setCashTransferSelectedData } from '../../features/generalSlice';
import { useTranslation } from 'react-i18next';

const CashTransferList = () => {
  const { t } = useTranslation();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [apiErrors, setApiErrors] = useState([])
  const [editingRow, setEditingRow] = useState(null);
  // const [selectedData, setSelectedData] = useState({ sites: '', transferType: ''});
  const [form] = Form.useForm();
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const { startDate, endDate } = getTodayDate();
    const fromDate = formattedDate(startDate);
    const toDate = formattedDate(endDate);
    dispatch(resetFilters())
    dispatch(filtersActions({ value: fromDate, type: 'input', event: 'fromDate' }))
    dispatch(filtersActions({ value: toDate, type: 'input', event: 'toDate' }))
    setIsReady(true)
  }, []); 

  const { 
    data: list,
    isLoading,
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetCashTransferListQuery({
     pagination, 
     filters, 
     sorting
  }, isModalOpen ? {} : {
    pollingInterval: 100000,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true,
    skip: !isReady
  });

  const [Update] = useUpdateCashTransferMutation();
  const [Create] = useAddCashTransferMutation();

  const emptyRow = { 
    id: 'new', 
  };
  const selectedData = useSelector((state) => state.general.cashtTransferSelectedData);

  useEffect(() => {
    if(selectedData?.selectedBankID && selectedData?.sites && !selectedData?.isEdit){
      form.resetFields();
      form.setFieldsValue({
        updated_at_time: getCurrentTime(),
        fr_bankacc: selectedData?.selectedBankID,
        to_bankacc: selectedData?.selectedBankID,
        ttype: selectedData?.transferType,
      });
      setEditingRow('new');
    }else{
      setEditingRow(selectedData?.id);
    }
  }, [selectedData])

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

      if(action === 'Create'){
        dispatch(setCashTransferSelectedData({
          id: values.id, 
          selectedBankID: selectedData?.selectedBankID, 
          sites: selectedData?.sites, 
          transferType: '', 
          isEdit: false
        }))
      } else {
        dispatch(setCashTransferSelectedData({
          id: values.id, 
          selectedBankID: selectedData?.selectedBankID, 
          sites: selectedData?.sites, 
          transferType: '', 
          isEdit: false
        }))
      }

      dispatch(notification({notification_status: 'success', notification_message: `${t("report.Cash Transfer")} ${action} ${t("common.Successfully")}`}));
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
      setApiErrors(errorField(error));
    }
  };

  const columns = [
    {
      title: t('common.Updated At'),
      dataIndex: 'updated_at',
      columnKey: 'updated_at',
      sorter: true,
      width: 200,
      render: (updated_at, record) => {
        if (editingRow === record.id) {
            return (
              <DateTimeField name="updated_at_time" apiErrors={apiErrors && apiErrors.updated_at} label={null} />
            );
        } else {
          return <DateTimeListingField dateTime={updated_at} />
        }
      },
    },
    {
      title: t('common.Transfer Type'),
      dataIndex: 'ttype',
      columnKey: 'ttype',
      sorter: true,
      width: 160,
      render: (ttype, record) => {
        if (editingRow === record.id) {
          return (
            <>
            <Form.Item
              name="ttype"
              validateStatus={apiErrors.ttype ? 'error' : ''}
              help={apiErrors.ttype}
              rules={[
                {
                  required: true,
                  message: `${t("common.Transfer Type")} ${t("common.Is Required")}`,
                },
              ]}
              hasFeedback
            >
              <Select
                allowClear
                style={{ width: '100%' }}
                placeholder={t('common.Transfer Type')}
                options={cashtransferType(t)}
                onChange={(value) =>  dispatch(setCashTransferSelectedData({id: selectedData?.id, selectedBankID: selectedData?.selectedBankID, sites: selectedData?.sites, transferType: value}))}
                disabled={editingRow === 'new' ? false : true}
              />
            </Form.Item>
            </>
          );
        } else {
          return <CustomOptionField option={cashtransferType(t)} mappingText={ttype} />
        }
      },
    },
    {
      title: t('common.From Bank'),
      width: 350,
      render: (record) => {
        if (editingRow === record.id) {
          return (
            (selectedData?.transferType === 'ic' || selectedData?.transferType === 'co') && (selectedData?.sites || selectedData?.isEdit)&&
            <ReferenceMerchantBankAccountField 
              name="fr_bankacc" 
              placeholder={t('common.From Bank')}
              label={null}
              apiErrors={apiErrors && apiErrors.fr_bankacc} 
              disabled={editingRow === 'new' ? false : true}
              filterProp={{ sites: selectedData?.sites }}
            />
          );
        } else {
          return <BankAccountListingField info={record.fr_bankacc_info} icon={record.fr_bankacc_icon} />
        }
      },
    },
    {
      title: t('common.To Bank'),
      width: 350,
      render: (record) => {
        if (editingRow === record.id) {
          return (
            (selectedData?.transferType === 'ic' || selectedData?.transferType === 'ci') && (selectedData?.sites || selectedData?.isEdit) &&
            <ReferenceMerchantBankAccountField 
              name="to_bankacc" 
              placeholder={t('common.To Bank')}
              label={null}
              apiErrors={apiErrors && apiErrors.to_bankacc} 
              disabled={editingRow === 'new' ? false : true}
              filterProp={{ sites: selectedData?.sites }}
            />
          );
        } else {
          return <BankAccountListingField info={record.to_bankacc_info} icon={record.to_bankacc_icon} />
        }
      },
    },
    {
      title: t('common.Amount'),
      dataIndex: 'amount',
      align: 'right',
      width: 150,
      render: (amount, record) => {
        if (editingRow === record.id) {
          return (
            (selectedData?.transferType) && (selectedData?.sites || selectedData?.isEdit) &&
            <Form.Item
              name="amount"
              validateStatus={apiErrors.amount ? 'error' : ''}
              help={apiErrors.amount}
              rules={[
                {
                  required: true,
                  message: `${t("common.Amount")} ${t("common.Is Required")}`,
                },
              ]}
              hasFeedback
            >
              <InputNumber 
                placeholder={t('common.Amount')}
                disabled={editingRow === 'new' ? false : true}
              />
            </Form.Item>
          );
        } else {
          return <NumberListingField value={amount} />
        }
      },
    },
    {
      title: t('common.Bank Remark'),
      dataIndex: 'to_bankacc_remark',
      render: (to_bankacc_remark, record) => {
        if (editingRow === record.id) {
          return (
            (selectedData?.transferType === 'ci' || selectedData?.transferType === 'co') &&
            <Form.Item
              name="to_bankacc_remark"
              validateStatus={apiErrors.to_bankacc_remark ? 'error' : ''}
              help={apiErrors.to_bankacc_remark}
              rules={[
                {
                  required: true,
                  message: `${t("common.Bank Remark")} ${t("common.Is Required")}`,
                },
              ]}
              hasFeedback
            >
              <Input.TextArea autoSize={{ minRows: 6, maxRows: 12 }} placeholder={t('common.Bank Remark')} />
            </Form.Item>
          );
        } else {
          return <p>{to_bankacc_remark}</p>
        }
      },
    },
    {
      title: t('common.Remark'),
      dataIndex: 'remark',
      render: (remark, record) => {
        if (editingRow === record.id) {
          return (
            (selectedData?.transferType) &&
            <Form.Item
              name="remark"
              validateStatus={apiErrors.remark ? 'error' : ''}
              help={apiErrors.remark}
              rules={[
                {
                  required: true,
                  message: `${t("common.Remark")} ${t("common.Is Required")}`,
                },
              ]}
              hasFeedback
            >
              <Input.TextArea autoSize={{ minRows: 6, maxRows: 12 }} placeholder={t('common.Remark')} />
            </Form.Item>
          );
        } else {
          return <p>{remark}</p>
        }
      },
    },
    {
      title: t('common.Action'),
      dataIndex: 'action',
      hidden: PermissionsAuth.checkPermissions('button', 'change_cashtransfer', false),
      width: 100,
      render: (_, record) => {
        return (
          <>
            {editingRow !== record.id &&
            <>
              <Button
                type="link"
                onClick={() => {
                  setEditingRow(record.id);
                  dispatch(setCashTransferSelectedData({
                    id: record.id, 
                    selectedBankID: record.fr_bankacc ? record.fr_bankacc : record.to_bankacc, 
                    sites: record.sites, 
                    transferType: 
                    record.ttype, 
                    isEdit: true
                  }))
                  form.setFieldsValue({
                    updated_at_time: getCurrentTime(),
                    ttype: record.ttype,
                    fr_bankacc: record.fr_bankacc,
                    to_bankacc: record.to_bankacc,
                    to_bankacc_remark: record.to_bankacc_remark,
                    remark: record.remark,
                    amount: record.amount,
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
              {/* <Button type="link" onClick={() => setEditingRow(null)}>
                Cancel
              </Button> */}
            </>
            }
        </>
        );
      },
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_cashtransfer',
    <div>
      <CashTransferToolBar isLoading={isFetching} t={t} />
      <Form form={form} onFinish={onFinish}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={editingRow === 'new' ? [emptyRow, ...(list && list.list ? list.list : [])] : (list && list.list ? list.list : [])}
          scroll={{
            x: 1500,
            y: 'calc(100vh - 250px)',
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
          }}
        />
      </Form>
    </div>
    )
  )
}

export default CashTransferList;