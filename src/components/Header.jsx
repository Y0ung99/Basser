import React from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
      <FaShoppingCart />
      <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
        <Link to='/cart'>Cart</Link>
        <Link to='/' className='text-2xl'><BsPencil /></Link>
        <button>Login</button>
      </nav>
    </header>
  );
}

