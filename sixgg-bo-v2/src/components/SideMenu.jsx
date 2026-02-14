import React, { useEffect, useMemo } from "react";
import Sider from "antd/es/layout/Sider";
import { Menu } from 'antd';
import { SiderMenuOption } from "./MenuOptions";
import { useLocation } from "react-router-dom";
import './SideMenu.css'; // Import the custom CSS file

const SideMenu = ({ collapsed, selectedMenu, t }) => {
    const location = useLocation();
    const menuOptions = useMemo(() => {
        return SiderMenuOption(t)
    }, [location, t])

    return (
        <Sider
            trigger={collapsed} 
            collapsed={collapsed}
            style={{
                overflow: 'auto',
                maxHeight: '85dvh',
                position: 'fixed',
                zIndex: 3,
                right: collapsed ? -100 : 0,
            }}
        >
            <Menu
                className="custom-menu" 
                theme="dark" 
                mode="vertical"
                selectedKeys={selectedMenu} 
                items={menuOptions}
            />
        </Sider>
    )
};

export default SideMenu;