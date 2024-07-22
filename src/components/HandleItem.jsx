import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HandleItem({order}) {
  const navigate = useNavigate();
  const {orderName, paymentId, userInfo} = order;
  return (
    <li>
      <p 
      className='bg-brand text-white line-clamp-1 text-sm rounded-md w-full p-1 cursor-pointer my-1 hover:brightness-110'
      onClick={() => navigate(`/order/handle/${paymentId}`, {state: {order, userInfo}})}
      >
        <span className='bg-white text-brand rounded-md px-1 mr-2'>{paymentId.slice(-4)}</span>{orderName}
      </p>
    </li>
  );
}