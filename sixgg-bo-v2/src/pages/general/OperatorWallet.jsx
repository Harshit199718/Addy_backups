import { Dropdown, Popover, Space, Tag, Tooltip, Flex, Row, Col, Button } from 'antd';
import React, { useEffect } from 'react';
import { useGetOperatorWalletQuery } from '../../features/general/generalApiSlices';
import { Icon } from '@iconify/react';
import { WalletOutlined, MoneyCollectOutlined, UserOutlined } from '@ant-design/icons';
import NumberListingField from '../../ListingField/NumberListingField';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReportMerchantBankAccount from '../report/reportItem/reportMerchantBankAccount';
import { setRefetchBankMeter, setSupportPersonalization } from '../../features/generalSlice';
import UserMenuOption from './UserMenuOption';
import PermissionsAuth from '../../components/permissionAuth';
import { InternationalClock } from '../../components/convertDate';

const OperatorWallet = ({ t, dispatch, setSideMenuCollapsed }) => {
    const { 
        data: list,
        isLoading, 
        isSuccess, 
        isError, 
        error
    } = useGetOperatorWalletQuery({},{
        pollingInterval: 30000,
        skipPollingIfUnfocused: true,
        refetchOnFocus: true,
    });

    useEffect(() => {
        dispatch(setSupportPersonalization({
            username: list?.length > 0 && list[0].username,
            getContent: true
        }))
    },[list])

    return (
        <Row gutter={[4, 4]}>
            <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={8} onClick={() => dispatch(setSideMenuCollapsed(true))}>
                <InternationalClock />
            </Col>
            {PermissionsAuth.checkPermissions('menu', 'view_merchantbankaccount', true) && import.meta.env.VITE_MODULES_EXCLUDED_JQK &&
            <Col xs={0} sm={0} md={0} lg={0} xl={6} xxl={4} onClick={() => dispatch(setSideMenuCollapsed(true))}>
                <Popover content={<ReportMerchantBankAccount t={t}/>} title={t("report.Bank Meter")} trigger="hover" 
                onOpenChange={(value) => {
                    dispatch(setSideMenuCollapsed(true))
                    dispatch(setRefetchBankMeter({refetchBankMeter: value}))
                }}
                >
                    <Button icon={<Icon icon="carbon:piggy-bank" width="1rem" height="1rem" />} color="default" style={{ width: "100%" }}>
                        {t("report.Bank Meter")}
                    </Button>
                </Popover>
            </Col>
            }
            {import.meta.env.VITE_MODULES_EXCLUDED_JQK &&
            <Col xs={0} sm={0} md={0} lg={0} xl={6} xxl={4} onClick={() => dispatch(setSideMenuCollapsed(true))}>
                <Tooltip placement="bottom" title={t("general.Wallet Balance")} arrow>
                    <Button icon={<Icon icon="material-symbols:account-balance-wallet-outline" width="1rem" height="1rem" />} color="default" style={{ width: "100%" }}>
                        <NumberListingField value={list?.length > 0 && list[0].closingbalance}/>
                    </Button>
                </Tooltip>
            </Col>
            }
            {PermissionsAuth.checkPermissions('menu', 'view_unclaim', true) && import.meta.env.VITE_MODULES_EXCLUDED_JQK &&
            <Col xs={0} sm={0} md={0} lg={0} xl={6} xxl={4} onClick={() => dispatch(setSideMenuCollapsed(true))}>
                <Tooltip placement="bottom" title={t("general.Unclaim")} arrow>
                    <Button icon={<Icon icon="game-icons:pay-money" width="1rem" height="1rem" />} color="default" style={{ width: "100%" }}>
                        <Link to="/unclaims">
                            <NumberListingField value={list?.length > 0 && list[0].unclaim_balance}/>
                        </Link>
                    </Button>
                </Tooltip>
            </Col>
            }
            <Col xs={24} sm={24} md={24} lg={24} xl={6} xxl={4} onClick={() => dispatch(setSideMenuCollapsed(true))}>
                <Popover content={<UserMenuOption list={list} />} trigger="hover" 
                onOpenChange={(value) => dispatch(setSideMenuCollapsed(true))}
                >
                    <Button icon={<Icon icon="oui:user" width="1rem" height="1rem" />} color="default" style={{ width: "100%" }}>
                        {list?.length > 0 && list[0].username}
                    </Button>
                </Popover>
            </Col>
        </Row>
    )
}

export default OperatorWallet;