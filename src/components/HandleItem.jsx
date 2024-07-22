import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HandleItem({order}) {
  const navigate = useNavigate();
  const {orderName, paymentId, userInfo} = order;
  return (
    <li>
      <div 
      className='bg-brand text-white line-clamp-1 text-sm rounded-md w-full p-1 cursor-pointer my-1'
      onClick={() => navigate(`/order/handle/${paymentId}`, {state: {order, userInfo}})}
      >
        {orderName}
      </div>
    </li>
  );
}