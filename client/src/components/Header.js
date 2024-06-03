import React from 'react';
import { Route, Link } from 'react-router-dom';
import Logo from '../assets/img/logo.svg';

const Header = () => {
  return (
    <header className='py-6 mb-12 border-b-2'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Logo */}
        <Link to='/'><img src={Logo} alt='Logo' /></Link>

        {/* Authentication buttons */}
        <div className='flex items-center gap-6'>
          {/* Use Route component within Link */}
          <Link to='/login'>
            <button className='hover:text-violet-900 transition'>Login</button>
          </Link>
          <button className='bg-violet-500 hover:bg-violet-600 text-white px-4 py-3 rounded-md transition'>
            <Link to='/signup'>SignUp</Link>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
