import React, { CSSProperties } from 'react';

interface MySelectProps {
  value: string;
  onChange: (value: string) => void;
  items?: { value: string; label: string }[];
  className?: string;
  style?: CSSProperties;
}

export const MySelect: React.FC<MySelectProps> = ({ value, onChange, items = [], className, style }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select className={className} style={{height: '34px', ...style}} value={value} onChange={handleChange}>
      {items.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

