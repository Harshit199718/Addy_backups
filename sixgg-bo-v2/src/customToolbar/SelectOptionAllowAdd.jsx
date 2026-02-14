import React, { useEffect, useRef, useState } from 'react';
import { Select, Spin, Button, Divider, Input, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

let index = 0;

const SelectOptionAllowAdd = ({ onSearch = () => {}, onChange = () => {}, options, placeholder="", isLoading=false, width=300, notFoundContent='No Content Found', filterNumberic=false, ...props }) => {
  const [items, setItems] = useState();
  useEffect(() => {
    setItems(options)
  },[options])
  
  const [name, setName] = useState('');
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  
  return (
    <Select
      {...props}
      loading={isLoading}
      showSearch
      onSearch={(value) => onSearch(value)}
      onChange={(value) => onChange(value)}
      style={{ minWidth: 150, width: width }}
      placeholder={placeholder}
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
      filterSort={(optionA, optionB) => {
        if(filterNumberic){
          const numberA = parseInt(optionA?.label.match(/\d+/)[0]);
          const numberB = parseInt(optionB?.label.match(/\d+/)[0]);
          return optionA - optionB;
        }else{
          return (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
      }}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: '8px 0',
            }}
          />
          <Space
            style={{
              padding: '0 8px 4px',
            }}
          >
            <Input
              placeholder="Please enter item"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add item
            </Button>
          </Space>
        </>
      )}
      options={items?.length > 0 && items.map((item) => ({
        label: item,
        value: item,
      }))}
      notFoundContent={isLoading ? <Spin size="small" /> : notFoundContent}
    />
  );
}

export default SelectOptionAllowAdd;
