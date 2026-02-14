import { Input } from 'antd';
import { useEffect, useState } from 'react';

const { Search } = Input;

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const SearchBar = ({ onChange, placeholder, isLoading=false, ...props}) => {
  const [searchValue, setSearchValue] = useState('');

  const debounceDelay = 300; 

  const debouncedSearchValue = useDebounce(searchValue, debounceDelay);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  useEffect(() => {
      onChange(debouncedSearchValue)
  }, [debouncedSearchValue]);

  return (
    <Search
      onChange={(value) => handleSearchChange(value)}
      loading={isLoading} 
      placeholder={placeholder}
      {...props}
    />
  );
}

export default SearchBar;
