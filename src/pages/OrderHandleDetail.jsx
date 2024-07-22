import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PriceCard from '../components/PriceCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import CartItem from '../components/CartItem';
import Button from '../components/ui/Button';
import { useOrder } from '../hooks/useOrder';

const STEP = ['결제완료', '주문확인', '배송중', '배송완료'];
const STYLE_P = 'outline-none border border-gray-300 p-4 my-1 w-full';
export default function OrderHandleDetail() {
  const navigate = useNavigate();
  const {state: {userInfo, order}} = useLocation();
  const {totalPrice, productsPrice, shipPrice} = order.price;
  const {paymentId, date, status} = order;
  const [success, setSuccess] = useState('');
  const {
    receiverAddress, receiverAddressDetail, receiverName, receiverRequest,
    receiverTel, senderAddress, senderAddressDetail, senderName, senderRequest,
    senderTel
  } = userInfo;
  const { orderStateChangeForAdmin } = useOrder();
  const handleClick = () => {
    const nextStep = STEP[STEP.findIndex(step => step === status) + 1]
    orderStateChangeForAdmin.mutate(
      {order, status: nextStep},
      {
        onSuccess: () => {
          setSuccess(`${status}에서 ${nextStep}으로 주문상태가 변경되었습니다.`);
          setTimeout(() => {
            setSuccess(null);
            navigate(`/order/handle`);
          }, 2000);
        }
      }
    )
  }

  return (
    <section className='p-8 pt-4 flex flex-col'>
      <p className='text-2xl text-center fond-bold pb-4 border-b border-gray-300'>주문상세내역</p>
      <div className='py-2'>
        <p className='text-sm text-gray-700'>{date}</p>
        <p className='text-sm text-gray-700 line-clamp-1'><label className='font-semibold'>주문번호: </label>{paymentId}</p>
        <p className='text-sm text-gray-700 line-clamp-1'><label className='font-semibold'>주문상태: </label>{status}</p>
      </div>
      <ul>
        {order.products.map(product => <CartItem type='order' key={product.id} product={product}/>)}
      </ul>
      <div className='flex flex-col sm:flex-row justify-between items-center my-6 px-2 md:px-8 lg:px-16'>
        <PriceCard text='상품 총액' price={productsPrice}/>
        <BsFillPlusCircleFill className='shrink-0'/>
        <PriceCard text='배송액' price={shipPrice}/>
        <FaEquals className='shrink-0'/>
        <PriceCard text='총가격' price={totalPrice}/>
      </div>
      <div className='flex flex-col border-b border-gray-300 pb-8 md:flex-row md:gap-4 mb-4'>
          <div className='flex flex-col basis-1/2 pt-4'>
            <p className='text-xl text-center fond-bold pb-4'>구매자정보</p>
            <p className={STYLE_P}><span className='font-bold'>이름 </span>{senderName}</p>
            <p className={STYLE_P}><span className='font-bold'>전화번호 </span>{senderTel}</p>
            <p className={STYLE_P}><span className='font-bold'>주소 </span>{senderAddress}</p>
            <p className={STYLE_P}><span className='font-bold'>상세주소 </span>{senderAddressDetail}</p>
            <p className={STYLE_P}><span className='font-bold'>요청사항 </span>{senderRequest || '없음'}</p>
          </div>
          <div className='flex flex-col basis-1/2 pt-4'>
            <p className='text-xl text-center fond-bold pb-4'>받는사람정보</p>
            <p className={STYLE_P}><span className='font-bold'>이름 </span>{receiverName}</p>
            <p className={STYLE_P}><span className='font-bold'>전화번호 </span>{receiverTel}</p>
            <p className={STYLE_P}><span className='font-bold'>주소 </span>{receiverAddress}</p>
            <p className={STYLE_P}><span className='font-bold'>상세주소 </span>{receiverAddressDetail}</p>
            <p className={STYLE_P}><span className='font-bold'>요청사항 </span>{receiverRequest || '없음'}</p>
          </div>
        </div>
        {success && <p>{success}</p>}
        <Button onClick={status === '배송완료' ?  () => alert('배송완료되어 상태를 변경할수 없습니다.') : handleClick} text={status === '배송완료' ? `다음단계가 없습니다`: `${status}에서 다음단계로`} />
    </section>
  );
}