import React from 'react';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';

const GlobalSpin = () => {
    const spinning = useSelector(state => state.general.globalLoading);

    return (
        <Spin tip="Please wait while fetching..." size="large" spinning={spinning} fullscreen style={{ zIndex: 999999999999999 }}/>
    );
};

export default GlobalSpin;