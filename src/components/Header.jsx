import React from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";
import { Link } from 'react-router-dom';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from './context/AuthContext';

export default function Header() {
  const {user, login, logout} = useAuthContext();

  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
      <FaShoppingCart />
      <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
        {user && <Link to='/cart'>Cart</Link>}
        {user && user.isAdmin &&  <Link to='/products/add' className='text-2xl'><BsPencil /></Link>}
        {user && <User user={user} />}
        {!user && <Button text='Login' onClick={login} />}
        {user && <Button text='Logout' onClick={logout} />}
      </nav>
    </header>
  );
}

