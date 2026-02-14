import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import NumberListingField from '../../ListingField/NumberListingField';
import { productsCategory } from '../../customField/customOption';
import CustomOptionField from '../../ListingField/CustomOptionField';
import RankingRateToolBar from './rankingRateToolBar';
import { useGetRankRatesListQuery } from '../../features/rank/rankRatesApiSlices';
import ReferenceRankListingField from '../../ListingField/ReferenceRankListingField';
import PermissionsAuth from '../../components/permissionAuth';
import EditRankRate from './EditRankRate';
import { BooleanField } from '../../ListingField/BooleanField';

const RankingRateList = ({ record, index, indent, expanded, t }) => {
  const { 
    data: list,
    isLoading,
    isFetching,
    isSuccess, 
    isError, 
    error
  } = useGetRankRatesListQuery({
    filters: {
      rank: record.id,
    }
  }, {
    pollingInterval: 100000,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true,
    skip: !expanded
  });

  const columns = [
    {
      title: t('common.Product Category'),
      dataIndex: 'product_category',
      columnKey: 'product_category',
      sorter: true,
      align: 'left',
      render: (product_category) => <CustomOptionField option={productsCategory(t)} mappingText={product_category} />
    },
    {
      title: t('common.Active'),
      dataIndex: 'active',
      columnKey: 'active',
      align: 'center',
      sorter: true,
      render: (active) => <BooleanField boolean={active} />
    },
    {
      title: t('common.Is Eztech'),
      dataIndex: 'is_eztech',
      columnKey: 'is_eztech',
      align: 'center',
      sorter: true,
      render: (is_eztech) => <BooleanField boolean={is_eztech} />
    },
    {
      title: t('common.Rate'),
      dataIndex: 'rate',
      columnKey: 'rate',
      align: 'right',
      sorter: true,
      render: (rate) => <NumberListingField value={rate} />
    },
    {
      title: t('common.Sequence'),
      dataIndex: 'sequence',
      columnKey: 'sequence',
      align: 'right',
      defaultSortOrder: 'ascend',
      sorter: true,
    },
    {
      title: t('common.Rank'),
      dataIndex: 'rank',
      align: 'center',
      width: 300,
      render: (rank) => <ReferenceRankListingField id={[rank]}/>
    },
    {
      title: t('common.Action'),
      dataIndex: 'id',
      width: 100,
      hidden: PermissionsAuth.checkPermissions('button', 'change_rankrate', false),
      render: (id) => {
        return (
          <div>
            <EditRankRate id={id} site={record?.sites} t={t} />
          </div>
        )
      }
    },
  ];  

  return (
    PermissionsAuth.checkPermissions('list', 'view_rankrate', 
    <div>
      <RankingRateToolBar record={record} t={t} />
        <Table
          rowKey="id"
          columns={columns}
          dataSource={list && list.list ? list.list : []}
          scroll={{
            x: 1500,
            y: 'calc(100vh - 350px)',
          }}
          loading={isLoading}
          record={record}
        />
    </div>
    )
  )
}

export default RankingRateList;