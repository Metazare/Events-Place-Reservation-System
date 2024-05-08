import React from 'react'
import IconButton from '@mui/material/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
export default function AmenitiesField() {
  return (
    <div className='flex gap-2 items-center border border-[black]/10 p-2 rounded-xl'>
      <div className='grow'>
        <p className='font-semibold'>Complementary Drinks</p>
        <p className='mt-[-7px]'>₱100 each</p>
      </div>
      <div className='flex gap-1 items-center'>
        <IconButton aria-label="" onClick={()=>{}}>
          <RemoveCircleOutlineIcon/>
        </IconButton>
        <span>0</span>
        <IconButton aria-label="" onClick={()=>{}}>
          <AddCircleOutlineIcon/>
        </IconButton>
      </div>
    </div>
  )
}
