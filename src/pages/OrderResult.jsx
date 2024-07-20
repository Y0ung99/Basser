import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import Button from '../components/ui/Button';

export default function OrderResult() {
  const {state: {products, form, totalPrice, SHIPPING}} = useLocation();
  const navigate = useNavigate();

  return (
    <section className='p-8 pt-4 flex flex-col'>
      <div className='text-2xl text-center py-16'>
        <p className='my-3'><span className='font-bold'>{`${form.senderName}`}</span>님의 주문이 완료되었습니다!</p>
        <p className='my-3'>고객님의 집까지 배송일로부터 <span className='font-bold'>최대 2~3일</span> 소요됩니다.</p>
        <Button text='주문내역으로 가기' onClick={() => navigate('/order/recipt')}/>
      </div>
      {
        <>
          <ul className='border-b border-gray-300 mb-8 p-4 px-8'>
          {products.map(product => 
            <CartItem type='order' key={product.id} product={product}/>)}
          </ul>
        </>}
      <div className='flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16'>
        <PriceCard text='상품 총액' price={totalPrice}/>
        <BsFillPlusCircleFill className='shrink-0'/>
        <PriceCard text='배송액' price={SHIPPING}/>
        <FaEquals className='shrink-0'/>
        <PriceCard text='총가격' price={totalPrice + SHIPPING}/>
      </div>
    </section>
  );
}

