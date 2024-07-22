import React, { useEffect, useState } from 'react';
import { GiGuitarBassHead } from "react-icons/gi";
import { BsPencil } from "react-icons/bs";
import { Link } from 'react-router-dom';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from '../context/AuthContext';
import CartStatus from './CartStatus';
import OrderStatus from './OrderStatus';
import DeliveryStatus from './DeliveryStatus';

const STYLE_HEADER_ROW = 'flex justify-between border-b border-gray-300 p-2';
const STYLE_HEADER_COL = 'flex flex-col items-center border-b border-gray-300 p-2 relative';
export default function Header() {
  const {user, login, logout} = useAuthContext();
  const [winSize, setWinSize] = useState(window.innerWidth);
  const resizeListener = () => {
    setWinSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return (
    winSize > 640 ? 
    (
    <header className={STYLE_HEADER_ROW}>
      <Link to='/' className='flex items-center text-5xl text-brand'>
        <GiGuitarBassHead />
        <h1>Basser</h1>
      </Link>
      <nav className='flex items-center justify-center gap-3 font-semibold'>
        <Link to='/products'>Products</Link>
        {user && <Link to='/cart'><CartStatus /></Link>}
        {user && <Link to='/order/recipt'><OrderStatus /></Link>}
        {user && user.isAdmin &&  <Link to='/products/add' className='text-2xl'><BsPencil /></Link>}
        {user && user.isAdmin &&  <Link to='/order/handle' className='text-2xl'><DeliveryStatus /></Link>}
        {user && <User user={user} />}
        {!user && <Button text='Login' onClick={login} />}
        {user && <Button text='Logout' onClick={logout} />}
      </nav>
    </header>
    ) 
    : 
    (
    <header className={STYLE_HEADER_COL}>
      <Link to='/' className='flex items-center text-5xl text-brand'>
        <GiGuitarBassHead />
        <h1>Basser</h1>
      </Link>
      <div className='flex absolute right-4'>
        {user && <User user={user} />}
        {!user && <Button text='Login' onClick={login} />}
        {user && <Button text='Logout' onClick={logout} />}
      </div>
      <nav className='flex flex-col items-center text-center gap-4 font-semibold text-xl my-4 w-full text-white'>
        <Link className='bg-brand w-full p-1 rounded-md hover:brightness-110' to='/products'>
          Products
        </Link>
        {user && (
          <Link className='bg-brand w-full p-1 rounded-md hover:brightness-110' to='/cart'>
            My Cart
          </Link>
        )}
        {user && (
          <Link className='bg-brand w-full p-1 rounded-md hover:brightness-110' to='/order/recipt'>
            My Orders
          </Link>
        )}
        {user && user.isAdmin &&  
          <Link to='/products/add' className='bg-brand w-full p-1 rounded-md hover:brightness-110'>
            Edit Products for Admin
          </Link>
        }
        {user && user.isAdmin &&  
          <Link to='/order/handle' className='bg-brand w-full p-1 rounded-md hover:brightness-110'>
            Handle Orders for Admin
          </Link>
        }
      </nav>
    </header>
    )
  );
}

