import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import { addOrUpdateToCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';


export default function ProductDetail() {
  const { uid } = useAuthContext()
  const {state: {id, image, name, category, price, options, discription}} = useLocation();
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = () => {
    const product = {id, image, name, price, option: selected, quantity: 1};
    addOrUpdateToCart(product, uid);
  }
  return (
    <>
      <p className='mx-12 mt-4 text-gray-700'>{category}</p>
      <section className='flex flex-col xl:flex-row p-4'>
        <img className='w-full px-4 basis-7/12' src={image} alt={name} />
        <div className='w-full basis-5/12 flex flex-col p-4'>
          <h2 className='text-3xl font-bold py-2 '>{name}</h2>
          <p className='text-2xl font-bold py-2 border-b border-gray-400'>{`₩${price}`}</p>
          <p className='py-4 text-lg'>{discription}</p>
          <div className='flex items-center'>
            <label className='text-brand font-bold' htmlFor='select'>옵션: </label>
            <select className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none'
              id='select' onChange={handleSelect} value={selected}>
              {options.map((option, index) => 
                <option key={index}>{option}</option>)}
            </select>
          </div>
          <Button text='장바구니에 추가' onClick={handleClick}/>
        </div>
      </section>
    </>
    
  );
}

