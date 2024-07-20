import React from 'react';
import Button from '../components/ui/Button';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import {BsFillPlusCircleFill} from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import useCart from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const SHIPPING = 3000;
export default function Cart() {
  const navigator = useNavigate();
  const {cartQuery: {isLoading, data: products}} = useCart();

  if(isLoading) return <p>Loading...</p>
  const hasProducts = products && products.length > 0;
  const totalPrice = products && products.reduce((prev, cur) =>
  prev + (cur.checked ? cur.price * cur.quantity : 0), 0)

  return (
    <section className='p-8 pt-4 flex flex-col'>
      <p className='text-2xl text-center fond-bold pb-4 border-b border-gray-300'>내 장바구니</p>
      {!hasProducts && <p className='py-4'>장바구니에 상품이 없습니다.</p>}
      {hasProducts && <>
        <ul className='border-b border-gray-300 mb-8 p-4 px-8'>
          {products && products.map(product => 
            <CartItem type='cart' key={product.id} product={product}/>)}
        </ul>
      </>}
      <div className='flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16'>
        <PriceCard text='상품 총액' price={totalPrice}/>
        <BsFillPlusCircleFill className='shrink-0'/>
        <PriceCard text='배송액' price={SHIPPING}/>
        <FaEquals className='shrink-0'/>
        <PriceCard text='총가격' price={totalPrice + SHIPPING}/>
      </div>
      <Button onClick={() => navigator('/order',{
        state: {
          products: products.filter(product => product.checked),
          SHIPPING,
          totalPrice,
        }
    })} 
      text='주문하기' />
    </section>
  );
}

