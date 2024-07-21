import React from 'react';
import Button from './ui/Button';
import { useNavigate } from 'react-router-dom';

export default function OrderItem({order}) {
  const navigate = useNavigate();
  const {paymentId, orderName, products, userInfo, price, status, date} = order;
  return (
    <li className='w-full border-b border-gray-300 p-8'>
      <p className='text-sm text-gray-700'>{date}</p>
      <p className='text-sm text-gray-700 line-clamp-1'><label className='font-semibold'>주문번호: </label>{paymentId}</p>
      <div className='flex justify-between my-2 items-center'>
        <img className='w-24 md:w-48 rounded-lg' src={products[0].image} alt={products[0].name} />
        <div className='flex-1 flex justify-between ml-4'>
          <div className='basis-3/5'>
            <p className='line-clamp-1'>{orderName}</p>
            <p>₩{price.totalPrice}</p>
            <p className='font-bold text-brand'>{status}</p>
          </div>
          <Button text='주문자세히보기' onClick={() => navigate(`/order/${paymentId}`, {state: {userInfo, order}})}></Button>
        </div>
      </div>
    </li>
  );
}