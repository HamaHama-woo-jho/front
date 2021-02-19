import { useState, useCallback } from 'react';

const useFilter = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const onToggle = useCallback((e) => {
    e.preventDefault();
    setValue(!value);
  }, [value]);
  return [value, setValue, onToggle];
};

export default useFilter;
