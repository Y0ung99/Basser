import React from 'react';
import { useOrder } from '../hooks/useOrder';
import HandleItem from '../components/HandleItem';

export default function OrderHandle() {
  const { ordersForAdminQuery: {isLoading, data} } = useOrder();
  const allOrders = data.map(userOrder => Object.values(userOrder)).flat(1);
  isLoading && <p>Loading...</p>
  return (
    <section className='p-8 pt-4'>
      <p className='text-2xl text-center fond-bold pb-4 mb-4 border-b border-gray-300'>주문처리</p>
      <div className='flex flex-col items-center py-8 gap-2'>
        <p className='text-center text-xl'>담당자는 주문건의 상세내역에서 배송목록을 확인 후 해당주문을 다음단계로 처리해주세요!</p>
        <p className='text-center text-xl'>해당 주문건을 클릭하면 상세내역페이지로 이동합니다.</p>
        <p className='text-center text-gray-500'>(결제완료 → 주문확인 → 배송중 → 배송완료)</p>
      </div>
      <div className='flex flex-col sm:flex-row justify-between gap-4 h-96'>
        <div className='bg-gray-100 rounded-lg p-3 basis-1/4'>
          <p className='text-lg text-center'>결제완료</p>
          <ul className='overflow-scroll'>
            {allOrders
            .filter(order => order.status === '결제완료')
            .map((order) => <HandleItem key={order.paymentId} order={order}/>)}
          </ul>
        </div>
        <div className='bg-gray-100 rounded-lg p-3 basis-1/4'>
          <p className='text-lg text-center'>주문확인</p>
          <ul className='overflow-scroll'>
            {allOrders
            .filter(order => order.status === '주문확인')
            .map((order) => <HandleItem key={order.paymentId} order={order}/>)}
          </ul>
        </div>
        <div className='bg-gray-100 rounded-lg p-3 w-full basis-1/4'>
          <p className='text-lg text-center'>배송중</p>
          <ul className='overflow-scroll'>
            {allOrders
            .filter(order => order.status === '배송중')
            .map((order) => <HandleItem key={order.paymentId} order={order}/>)}
          </ul>
        </div>
        <div className='bg-gray-100 rounded-lg p-3 w-full basis-1/4'>
          <p className='text-lg text-center'>배송완료</p>
          <ul className='overflow-scroll'>
            {allOrders
            .filter(order => order.status === '배송완료')
            .map((order) => <HandleItem key={order.paymentId} order={order}/>)}
          </ul>
        </div>
      </div>
    </section>
  );
}