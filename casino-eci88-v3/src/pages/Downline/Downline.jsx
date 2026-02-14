import React, { useCallback, useMemo, useState } from 'react'
import Tabs from '../../components/common/Tabs'
import LayoutSpacing from '../../features/Layout/LayoutSpacing';
import { useGetCommissionQuery, useGetDownlineQuery, useGetLaporanQuery } from '../../api/hooks';
import Table from '../../components/common/Table/Table';
import useGetColumns from './useGetColumns';
import { useTranslation } from 'react-i18next';
import General from '../../features/General/General';

function Downline() {
    const [active, setActive] = useState("downline");
    const {data: downline} = useGetDownlineQuery();
    const {data: commission} = useGetCommissionQuery();
    const {data: laporan} = useGetLaporanQuery();
    const getColumns = useGetColumns()
    const { t } = useTranslation();

    const tabs = useMemo(() => ([
        {
            key: "downline",
            label: t("Downline")
        },
        {
            key: "commission",
            label: t("Commission")
        },
        {
            key: "laporan",
            label: t("Laporan")
        },
    ]), []);
    const table = useMemo(() => {
        const data = { downline, commission, laporan}
        return  {
            columns: getColumns(active),
            data: data[active]
        }
    }, [active, downline, commission])
    const handleChange = useCallback((tab) => {
        setActive(tab)
    }, [])
  return (
    <LayoutSpacing style={{ display: 'flex', flexDirection: 'column', height: '85dvh' }}>
        <div style={{ flex: 1 }}>
        <Tabs defaultActive={active} tabs={tabs} onChange={handleChange}>
            <Table 
                sx={{
                    $responsive_text: true
                }}
                columns= {table?.columns}
                data={table?.data}
            />
        </Tabs>
        </div>
        <div style={{ marginTop: 'auto' }}> 
        <General downlinePage />
        </div>
    </LayoutSpacing>
  )
}

export default Downline