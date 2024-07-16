import React from 'react';

export default function Input({type, name, onChange, value, placeholder, required, accept}) {
  return (
    <input className='outline-none border border-gray-300 p-4 my-1'
      type={type} name={name} onChange={onChange} 
      value={value} placeholder={placeholder}
      accept={accept} required={required}
    />
  );
}

