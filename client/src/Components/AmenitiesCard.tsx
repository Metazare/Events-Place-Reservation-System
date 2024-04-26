import React from 'react'
import Pattern from '../Images/pattern.png'
import { AmenityType } from 'src/Hooks/useTypes'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type Props = {
  data:AmenityType
}
export default function AmenitiesCard({data}:Props) {
  return (
    <div className='relative flex flex-col overflow-hidden min-h-[100px] rounded-xl text-[white] cursor-pointer p-2' style={{background:`url(${Pattern})`,backgroundSize:"contain"}}>
      <div className='grow'>
        <h6 className='text-[15]'>{data.name}</h6>
      </div>
      <div className='flex justify-between items-end'>
        <p>₱{data.rate} {data.amenityType ==="per day"&&"per day"} {data.amenityType ==="per quantity"&&"each"}</p>
        <CheckCircleIcon sx={{fontSize:"27px"}}/>
      </div>
      <div className='absolute top-0 left-0 w-full h-full bg-secondary z-[-1]'/>
    </div>
  )
}
