import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Postcode from '../components/ui/Postcode';
import { productsPayment } from '../api/portone';
import useCart from '../hooks/useCart';

const STYLE_INPUT = 'outline-none border border-gray-300 p-4 my-1 w-full'
export default function OrderRequest() {
  const navigate = useNavigate();
  const { state: {products, totalPrice, SHIPPING} } = useLocation();
  const { removeProductFromCart } = useCart();
  const [form, setForm] = useState({
    senderName: '', senderAddress: '', senderAddressDetail: '', senderTel: '', senderRequest: '',
    receiverName: '', receiverAddress: '', receiverAddressDetail: '', receiverTel: '', receiverRequest: '',
  })
  const [isOpen, setIsOpen] = useState({sender: false, receiver: false});

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm(prev => ({...prev, [name]: value}));
  }
  const handleCheck = (e) => {
    e.target.checked && setForm((prev) => ({
      ...prev,
      receiverName: prev.senderName, 
      receiverAddress: prev.senderAddress, 
      receiverAddressDetail: prev.senderAddressDetail, 
      receiverTel: prev.senderTel,
    }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await productsPayment(products, form, totalPrice + SHIPPING);
    if (!response) return alert('주문을 실패했습니다.');
    products.map(product => 
      removeProductFromCart.mutate(
        product.id, 
        {onSuccess: () => navigate('/order/result', {state: {products, price:totalPrice + SHIPPING}})},
      )
    );
  }

  const handleSenderPostIsOpen = () => setIsOpen(prev => ({...prev, sender: false}));
  const handleReceiverPostIsOpen = () => setIsOpen(prev => ({...prev, receiver: false}));
  const handleVisibleSenderPost = () => setIsOpen(prev => ({...prev, sender: !prev.sender}));
  const handleVisibleReceiverPost = () => setIsOpen(prev => ({...prev, receiver: !prev.receiver}));
  const handleSenderPostInput = (address, zonecode) => setForm(prev => ({...prev, senderAddress: `(${zonecode}) ${address}`}));
  const handleReceiverPostInput = (address, zonecode) => setForm(prev => ({...prev, receiverAddress: `(${zonecode}) ${address}`}));


  return (
    <section className='p-8 pt-4 flex flex-col'>
      <p className='text-2xl text-center fond-bold pb-4 border-b border-gray-300'>주문하기</p>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col border-b border-gray-300 pb-8 md:flex-row md:gap-4'>
          <div className='flex flex-col basis-1/2 pt-4 relative'>
            <p className='text-xl text-center fond-bold pb-4'>구매자정보</p>
            <input className={STYLE_INPUT} required onChange={handleChange} value={form.senderName} type="text" name='senderName' placeholder='이름'/>
            <input className={STYLE_INPUT} required onChange={handleChange} value={form.senderAddress} type="text" name='senderAddress' placeholder='주소' readOnly/>
            <input className={STYLE_INPUT} required onChange={handleChange} value={form.senderAddressDetail} type="text" name='senderAddressDetail' placeholder='주소상세'/>
            <Button styles='absolute right-2 top-32' text='주소찾기' onClick={handleVisibleSenderPost}/>
            {isOpen.sender && <Postcode 
            handlePostIsOpen={handleSenderPostIsOpen}
            handlePostInput={handleSenderPostInput} 
            />}
            <input className={STYLE_INPUT} required onChange={handleChange} value={form.senderTel} type="tel" name='senderTel' placeholder='전화번호'/>
            <input className={STYLE_INPUT} onChange={handleChange} value={form.senderRequest} type="text" name='senderRequest' placeholder='구매자 요청사항'/>
          </div>
          <div className='flex flex-col basis-1/2 pt-4 relative'>
            <div className='text-sm absolute top-10'>
              <input type="checkbox" onChange={handleCheck} name="구매자와받는사람같음"/><label>구매자와 받는사람이 같아요</label>
            </div>
            <p className='text-xl text-center fond-bold pb-4'>받는사람정보</p>
            <input className={STYLE_INPUT} required onChange={handleChange} value={form.receiverName} type="text" name='receiverName' placeholder='이름'/>
            <input className={STYLE_INPUT} required onChange={handleChange} value={form.receiverAddress} type="text" name='receiverAddress' placeholder='주소' readOnly/>
            <input className={STYLE_INPUT} required onChange={handleChange} value={form.receiverAddressDetail} type="text" name='receiverAddressDetail' placeholder='상세주소'/>
            <Button styles='absolute right-2 top-32' text='주소찾기' onClick={handleVisibleReceiverPost}/>
            {isOpen.receiver && <Postcode 
            handlePostIsOpen={handleReceiverPostIsOpen}
            handlePostInput={handleReceiverPostInput} 
            />}
            <input className={STYLE_INPUT} required onChange={handleChange} value={form.receiverTel} type="tel" name='receiverTel' placeholder='전화번호'/>
            <input className={STYLE_INPUT} onChange={handleChange} value={form.receiverRequest} type="text" name='receiverRequest' placeholder='받는사람 요청사항'/>
          </div>
        </div>
        <div>
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
        </div>
        <Button styles='w-full' type='submit' text='결제하기' />
      </form>
    </section>
  );
}