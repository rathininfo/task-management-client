import React from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className='max-w-[1440px] mx-auto'>
           <Navbar></Navbar>
           <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;