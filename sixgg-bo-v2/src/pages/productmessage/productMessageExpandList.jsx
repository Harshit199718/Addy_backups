import React, { useEffect, useState } from 'react';
import { Form, Table } from 'antd';
import PermissionsAuth from '../../components/permissionAuth';

const ProductMessageExpandList = ({ record, t }) => {
    const [form] = Form.useForm();
    const columns = [
      {
        title: t('common.Payload'),
        sorter: true,
        render: (record) => (record.payload),

      },
      {
        title: t('common.Response'),
        sorter: true,
        render: (record) => (record.response),
      },
      {
        title: t('common.Message'),
        sorter: true,
        render: (record) => (record.message),
      },
    ];
  
    return (
      PermissionsAuth.checkPermissions('list', 'view_productmessage', (
        <div>
          <Form form={form}>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={[record]} 
              scroll={{
                x: 1500,
                y: 'calc(100vh - 350px)',
              }}
            />
          </Form>
        </div>
      ))
    );
  };
  
  export default ProductMessageExpandList;
  