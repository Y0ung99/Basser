import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({product}) {
  const {id, image, name, category, price} = product
  return (
    <Link to={`/products/${id}`} state={product}>
      <li className='rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105'>
        <img className='w-full' src={image} alt={name} />
        <div className='mt-2 px-2 text-lg flex justify-between items-center'>
          <h3 className='truncate'>{name}</h3>
          <p>{`₩${price}`}</p>
        </div>
        <p className='mb-2 px-2 text-gray-600'>{category}</p>
      </li>
    </Link>
  )
}