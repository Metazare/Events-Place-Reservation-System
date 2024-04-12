import React from 'react'
import { Outlet } from 'react-router-dom';

import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default function Base() {
  return (
    <>
      <div className='flex flex-col min-h-[100vh]'>
        <Header />
        <div className='grow'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  )
}