import React, { useEffect, useMemo } from 'react';
import { Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';

const TabLayout = ({ panes, onPanesEdit, activeKey, t }) => {
    const navigate = useNavigate();
        
    const onChange = (key) => {
        navigate(key)
    };
    
    const onEdit = (targetKey, action) => {
        if(action === 'remove'){
            const newPanes = panes.filter((pane) => pane.key !== targetKey);
            if (newPanes.length && targetKey === activeKey) {
                const lastKey = newPanes[newPanes.length - 1].key;
                navigate(lastKey)
            }
            onPanesEdit(newPanes);
        }
    };
    
    const items = useMemo(() => {
        const uniqueKeys = new Set();
        
        const uniquePanes = panes.filter(pane => {
            if (uniqueKeys.has(pane.key)) {
                return false;
            } else {
                uniqueKeys.add(pane.key); 
                return true;
            }
        });
        
        return uniquePanes.map((pane) => ({
            label: t(pane.title),
            children: pane.content,
            key: pane.key,
        }));
    }, [panes, t]);

    return (
        <Tabs
        hideAdd
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
        items={items}
       />
    );
};

export default TabLayout;
