import React from 'react'
import Button from '@mui/material/Button'
import LogoIcon from 'src/Images/Logo/LogoBox.svg';
import Timeline from 'src/Components/Timeline';
export default function PaymentModal() {
  return <>
    <div className=' w-[100vw] max-w-[1000px]  min-h-[550px] overflow-hidden rounded-xl flex flex-col sm:grid' style={{gridTemplateColumns:"60% 40%"}}>
      <div className='p-[1.5em] flex flex-col grow'>
        <h6 className='text-[25px] text-[#144273] font-semibold'>Price Details</h6>
        <div className='grow py-4'>
          <Timeline isCard={false}/>
        </div>
        <div className='border-t border-[black]/50 flex justify-between items-end pt-[1em]'>
          <p className='text-[18px] text-[black]/50'>Total</p>
          <p className='text-[26px] font-semibold'>₱ 5000</p>
        </div>
      </div>
      <div className='p-[1.5em] relative flex flex-col overflow-hidden '  style={{background:`url(${Image})`}}>
        <div className='bg-[#132F4C] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-full w-full z-[-4]'/>
        <div className='grow justify-center items-start hidden sm:flex'>
          <img src={LogoIcon} className='w-[40%] mt-[20%]' alt="" />
        </div>
        <Button variant="contained" sx={{background:"#2D74B4"}} fullWidth>
          Reserve
        </Button>
      </div>
    </div>
  </>
}
