import React, { useEffect, useState } from 'react';
import {AiOutlineMinusSquare, AiOutlinePlusSquare} from 'react-icons/ai';
import {RiDeleteBin5Fill} from 'react-icons/ri';
import useCart from '../hooks/useCart';

const ICON_CLASS = 'transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1';
export default function CartItem(
  {
  type,
  product,
  product:{id, image, name, option, quantity, price, checked},
  }) {
  const { addProductToCart, removeProductFromCart } = useCart();
  
  const handleCheck = () => {
    addProductToCart.mutate(
      {...product, checked: !checked},
    )
  }
  const handleMinus = () => {
    if(quantity < 2) return;
    addProductToCart.mutate(
      {...product, quantity: quantity - 1},
    )
  };
  const handlePlus = () => {
    addProductToCart.mutate(
      {...product, quantity: quantity + 1},
    )
  };
  const handleDelete = () => {
    removeProductFromCart.mutate(id);
  };

  return (
    <li className='flex justify-between my-2 items-center'>
      {type === 'cart' && <input className='mr-4' checked={checked} type="checkbox" onChange={handleCheck}/>}
      <img className='w-24 md:w-48 rounded-lg' src={image} alt={name} />
      <div className='flex-1 flex justify-between ml-4'>
        <div className='basis-3/5'>
          <p className='text-lg'>{name}</p>
          <p className='text-xl font-bold text-brand'>{option}</p>
          <p>₩{price}</p>
        </div>
        {type === 'cart' ? (
          <div className='text2xl flex items-center'>
            <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus} />
            <span>{quantity}</span>
            <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus}/>
            <RiDeleteBin5Fill className={ICON_CLASS} onClick={handleDelete} />
          </div>
        )
      : <span className='font-bold'>{quantity}EA</span> }
      </div>
    </li>
  );
}

