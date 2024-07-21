import React from 'react';
import { PiListChecks } from "react-icons/pi";
import { useOrder } from '../hooks/useOrder';

export default function OrderStatus() {
  const {orderQuery: {data: orders}} = useOrder();

  return (
    <div className='relative'>
      <PiListChecks className='text-4xl'/>
      {orders && <p className='w-6 h-6 text-center bg-brand text-white font-bold rounded-full absolute -top-1 -right-2'>{orders.length}</p>}
    </div>
  );
}

