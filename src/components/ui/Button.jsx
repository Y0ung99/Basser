import React from 'react';

export default function Button({text, type, onClick, styles}) {
  return (
    <button 
      className={`bg-brand text-white py-2 px-4 rounded-sm hover:brightness-110 my-2 ${styles}`}
      type={type} onClick={onClick}>
      {text}
    </button>
  )
}

