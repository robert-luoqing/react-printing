import React from 'react';

interface MyCheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MyCheckbox: React.FC<MyCheckboxProps> = ({ checked, onChange }) => {
  return (
    <input
      type="checkbox"
      checked={!!checked}
      onChange={onChange}
    />
  );
};
