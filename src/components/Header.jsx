import React from 'react';
import { IoBagHandleSharp } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { Link } from 'react-router-dom';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from '../context/AuthContext';
import CartStatus from './CartStatus';

export default function Header() {
  const {user, login, logout} = useAuthContext();

  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <IoBagHandleSharp />
        <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
        {user && (
          <Link to='/cart'>
            <CartStatus />
          </Link>
        )}
        {user && user.isAdmin &&  <Link to='/products/add' className='text-2xl'><BsPencil /></Link>}
        {user && <User user={user} />}
        {!user && <Button text='Login' onClick={login} />}
        {user && <Button text='Logout' onClick={logout} />}
      </nav>
    </header>
  );
}

