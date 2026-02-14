import React from 'react';
import { Form, Spin } from 'antd';
import SelectOption from '../customToolbar/SelectOption';
import { useGetTransactionListByParentQuery } from '../features/transaction/transactionApiSlices';
import { useState } from "react";
import { useDebounce } from "../customToolbar/SearchBar";
import { useTranslation } from 'react-i18next';

const ReferenceDropTransactionDepositParentField  = ({ name, label, apiErrors, mode, disabled=false, onChange = () => {}, isRequired=true, filterProp={}, ...props }) => {
    const { t } = useTranslation();
    const [txidSearch, setTxidSearch] = useState({ username: ''});
    const debouncedSearchValue = useDebounce(txidSearch, 300); 

    const { 
        data: dropTransactionDepositList,
        isFetching: dropTransactionDepositFetching
      } = useGetTransactionListByParentQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 10
        },
        filters : {
            txid: [debouncedSearchValue.txid],
            ...filterProp
        }
      },
      {
        skip: !debouncedSearchValue.txid
      }
    );

    return (
        <Form.Item 
            name={name}
            label= {t("common.Parent")}
            validateStatus={apiErrors ? 'error' : ''}
            help={apiErrors}
            rules={[
            {
                required: true,
                message: t('referencefield.Please select txid'),
            },
            ]}
            hasFeedback
        >
            <SelectOption
                onChange={(value) => onChange(value)}
                onSearch={(value) => setTxidSearch({ txid: value })}
                isLoading={dropTransactionDepositFetching}
                placeholder={t("referencefield.Please select txid")}
                options={dropTransactionDepositList && dropTransactionDepositList.list.map(item => ({
                    value: `${item.id}, ${item.amount}`,
                    label: `${item.ttype_display} - ${item.txid} - ${item.amount}`
                }))}
                width={'100%'}
                notFoundContent={t("referencefield.Please Search txid first")}
                disabled={disabled}
            />
        </Form.Item>
    );
}

export default ReferenceDropTransactionDepositParentField ;
