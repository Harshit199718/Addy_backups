import { Select, Spin } from 'antd';

const SelectOption = ({ onSearch = () => {}, onChange = () => {}, placeholder="", options, isLoading=false, width=300, notFoundContent='No Content Found', filterNumberic=false, ...props }) => {
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
        const labelA = optionA?.label ?? '';
        const labelB = optionB?.label ?? '';
        if (filterNumberic) {
          const numberA = parseInt(labelA.match(/\d+/)?.[0] || 0); // Extract number or use 0 if not found
          const numberB = parseInt(labelB.match(/\d+/)?.[0] || 0); // Extract number or use 0 if not found
          return numberA - numberB;
        } else {
          return labelA.toLowerCase().localeCompare(labelB.toLowerCase());
        }
      }}      
      options={options}
      notFoundContent={isLoading ? <Spin size="small" /> : notFoundContent}
    />
  );
}

export default SelectOption;
