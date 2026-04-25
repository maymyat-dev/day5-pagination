import React from 'react'

type SearchInputProps = {
    value: string;
    onChange: (val: string) => void;
}
function SearchInput({value, onChange}: SearchInputProps) {
  return (
      <div>
          <input type="text" id="search" className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search" required  value={value} onChange={(e)=>onChange(e.target.value)} />
    </div>
  )
}

export default SearchInput