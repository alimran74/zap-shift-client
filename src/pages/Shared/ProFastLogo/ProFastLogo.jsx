import React from 'react';
import logo from '../../../assets/logo.png'
import { Link } from 'react-router';

const ProFastLogo = () => {
    return (
        <Link to='/'>
        <div className='flex items-center '>
            <img src={logo} alt="" />
            <p className='text-4xl font-extrabold -mb-4 -ml-3'>ProFast</p>
        </div>
        </Link>
    );
};

export default ProFastLogo;