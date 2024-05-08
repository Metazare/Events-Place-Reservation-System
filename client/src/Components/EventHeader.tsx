import React from 'react'
import StarIcon from '@mui/icons-material/Star';

export default function EventHeader() {
  return (
    <div className='w-full '>
      <h3 className='text-[27px] grow font-medium'>Eagles Nest, Luxury Villa, Koh Yao Noi</h3>
      <div className='flex gap-2 items-center color-[#303030] divide-x divide-solid flex-wrap'>
        <div className='flex gap-1 '>
          <StarIcon sx={{fontSize:"15 px"}}/>
          <p className='text-[15px]'>4.5 (28 Reviews)</p>
        </div>
        <div className='flex gap-1 pl-1'>
          <p className='text-[15px]'>8 Guests</p>
        </div>
        <div className='flex gap-1 pl-1'>
          <p className='text-[15px]'>San mateo Abuab III</p>
        </div>
        <div className='flex gap-1 pl-1'>
          <p className='text-[15px]'>Hotel</p>
        </div>
      </div>
    </div>
  )
}
