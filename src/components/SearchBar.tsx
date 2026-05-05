import type { ChangeEvent } from 'react';
 
type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};
 
export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <input
      type="search"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      placeholder="Search..."
      className="p-2 rounded-xl bg-gray-700 border border-gray-600
                 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-white"
    />
  );
};