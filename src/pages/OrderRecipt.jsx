import React from 'react';
import { useOrder } from '../hooks/useOrder';
import OrderItem from '../components/OrderItem';

export default function OrderRecipt() {
  const {orderQuery:{isLoading, data: orders}} = useOrder();
  
  isLoading && <p>Loading...</p>;
  const hasOrders = orders && orders.length > 0;
  return (
    <section className='p-8 pt-4 flex flex-col'>
      <p className='w-full text-center text-2xl border-b border-gray-300 pb-4'>내 주문내역</p>
      {!hasOrders && <p className='py-4'>주문내역이 없습니다.</p>}
      {hasOrders && (
        <ul className='w-full'>
          {orders.map(order => <OrderItem key={order.paymentId} order={order}/>)}
        </ul>
      )}
    </section>
  );
}