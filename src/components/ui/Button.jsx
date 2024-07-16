import React from 'react';

export default function Button({text, type, onClick}) {
  return (
    <button 
      className='bg-brand text-white py-2 px-4 rounded-sm hover:brightness-110' 
      type={type} onClick={onClick}>
      {text}
    </button>
  )
}

