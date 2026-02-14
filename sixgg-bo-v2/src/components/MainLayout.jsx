import React, { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ReloadOutlined,
  } from '@ant-design/icons';
import { Layout, Button, theme, Col } from 'antd';
import { Outlet, useLocation } from "react-router-dom";
import HeaderMenu from './HeaderMenu';
import SideMenu from './SideMenu';
import TabLayout from './TabLayout';
import { converTabPanesTitle } from './generalConversion';
import NotificationBadge from '../pages/general/NotificationBadge';
import Chat from '../pages/livechat/Chat';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setSideMenuCollapsed } from '../features/generalSlice';
import OperatorWallet from '../pages/general/OperatorWallet';
import PlayerDetailModal from '../pages/player/PlayerDetailModal';
import { apiSlice } from '../data/api/apiSlice';

const { Header, Content, Sider, Footer } = Layout;

const MainLayout = () => {
    const { t } = useTranslation();
    const { supportPersonalization, sideMenuCollapsed, selectedPlayer } = useSelector(state => state.general);
    const dispatch = useDispatch();
    const location = useLocation();
    const [selectedMenu, setSelectedMenu] = useState('/');
    const [panes, setPanes] = useState(() => {
        const savedPanes = JSON.parse(localStorage.getItem('panes'));
        let parsedPanes
        if(savedPanes){
            parsedPanes = savedPanes.map(pane => ({
                ...pane,
                content: null
            }));
        }
        return parsedPanes && parsedPanes.length > 0 ? parsedPanes : [{ title: converTabPanesTitle(selectedMenu), content: <Outlet />, key: selectedMenu }];
    });
    const [activeKey, setActiveKey] = useState(panes && panes[0] && panes[0].key);

    useEffect(()=>{
        dispatch(setSideMenuCollapsed(true))
        const pathname = location.pathname;
        setActiveKey(pathname)
        setSelectedMenu(pathname);
        const existingPaneIndex = panes.findIndex((pane) => pane.key === pathname);
        if (existingPaneIndex !== -1) {
            setPanes(prevPanes => {
                const updatedPanes = [...prevPanes.map(p=>({...p,content:null}))];
                updatedPanes[existingPaneIndex].content = <Outlet />;
                return updatedPanes;
            });
        } else {
            setPanes(prevPanes => [...prevPanes.map(p=>({...p,content:null})), { title: converTabPanesTitle(pathname), content: <Outlet />, key: pathname }]);
        }
    }, [location])

    useEffect(() => {
        const panesToSave = panes.map(({ content, ...pane }) => pane);
        
        localStorage.setItem('panes', JSON.stringify(panesToSave));
    }, [panes]); 

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: "100dvh" }}>
            <Header
                style={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    left:0,
                    top:0,
                    right: 0,
                    display: 'flex',
                    alignItems: 'center',
                    position: 'sticky',
                    width: "100%",
                    zIndex: 1,
                    backgroundColor: supportPersonalization?.headerColor ? supportPersonalization?.headerColor : "#001528",
                }}
            >
                <Col xs={14} sm={15} md={15} lg={15} xl={13} xxl={12}>
                    <HeaderMenu selectedMenu={selectedMenu} t={t} supportPersonalization={supportPersonalization} dispatch={dispatch} setSideMenuCollapsed={setSideMenuCollapsed}/>
                </Col>
                <Col xs={6} sm={7} md={7} lg={7} xl={9} xxl={10} align='right'>
                    <OperatorWallet t={t} dispatch={dispatch} setSideMenuCollapsed={setSideMenuCollapsed}/>
                </Col>
                <Col xs={0} sm={0} md={0} lg={1} xl={1} xxl={1} align='right'>
                    <Button
                    type="text"
                    icon={<ReloadOutlined />}
                    onClick={() => {
                        dispatch(apiSlice.util.resetApiState());
                        // window.location.reload()
                    }}
                    style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                    color: 'white'
                    }}
                    />
                </Col>
                <Col span={1} align='right'>
                    <Button
                        type="text"
                        icon={sideMenuCollapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined /> }
                        onClick={() => dispatch(setSideMenuCollapsed(!sideMenuCollapsed))}
                        style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                        color: 'white'
                        }}
                    />
                </Col>
            </Header>
            <Layout>
                <NotificationBadge />
                <SideMenu collapsed={sideMenuCollapsed} selectedMenu={selectedMenu} t={t}/>
                <PlayerDetailModal selectedPlayer={selectedPlayer} />
                <Content
                    style={{
                        padding: '12px 12px',
                    }}
                    onClick={() => {
                        if(!sideMenuCollapsed){
                            dispatch(setSideMenuCollapsed(true))
                        }
                    }}
                >
                    <TabLayout panes={panes} onPanesEdit={(newPanes) => setPanes(newPanes)} activeKey={activeKey} t={t}/>
                    {import.meta.env.VITE_APP_CONTACTUS_OPTION === "customlivechat" && <Chat />}
                </Content>
            </Layout>
        </Layout>
    )
};
export default MainLayout;