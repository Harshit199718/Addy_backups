import React, { useEffect, useMemo } from "react";
import { Menu } from 'antd';
import { HeaderMenuOption } from "./MenuOptions";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLivechatUnreadCount } from "../features/generalSlice";
import { EllipsisOutlined } from "@ant-design/icons";

const HeaderMenu = ({ selectedMenu, t, supportPersonalization, dispatch, setSideMenuCollapsed }) => {
    const livechatUnreadCount = useSelector(selectLivechatUnreadCount);
    const location = useLocation();
    
    const menuOptions = useMemo(() => {
        return HeaderMenuOption(livechatUnreadCount, t)
    }, [location, t])

    return (
        <Menu
        theme="dark"
        mode="horizontal"
        style={{
            flex: 1,
            minWidth: 0,
            backgroundColor: supportPersonalization?.headerColor ? supportPersonalization?.headerColor : "#001528",
        }}
        selectedKeys={selectedMenu}
        items={menuOptions}
        overflowedIndicator={<EllipsisOutlined onClick={() => dispatch(setSideMenuCollapsed(true))} />}
        />
    )
};

export default HeaderMenu;