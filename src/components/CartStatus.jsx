import React from 'react';
import { GiShoppingCart } from "react-icons/gi";
import useCart from '../hooks/useCart';

export default function CartStatus() {
  const {cartQuery:{ data:products }} = useCart();

  return (
    <div className='relative'>
      <GiShoppingCart className='text-4xl'/>
      {products && <p className='w-6 h-6 text-center bg-brand text-white font-bold rounded-full absolute -top-1 -right-2'>{products.length}</p>}
    </div>
  );
}

