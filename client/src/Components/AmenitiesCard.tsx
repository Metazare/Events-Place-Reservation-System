import React from 'react'
import Pattern from '../Images/pattern.png'
import { AmenityType } from 'src/Hooks/useTypes'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type Props = {
  data:AmenityType,
  isSelected?:boolean,
  clickHandler?:()=>void
}
export default function AmenitiesCard({data,isSelected,clickHandler}:Props) {
  return (
    <div className='relative flex flex-col overflow-hidden min-h-[100px] rounded-xl text-[white] cursor-pointer p-2' style={{background:`url(${Pattern})`,backgroundSize:"contain"}} onClick={clickHandler}>
      <div className='grow'>
        <h6 className='text-[19] font-semibold'>{data.name}</h6>
      </div>
      <div className='flex justify-between items-end'>
        <p>₱{data.rate} {data.amenityType ==="per day"&&"per day"} {data.amenityType ==="per quantity"&&"each"}</p>
        {isSelected&&<CheckCircleIcon sx={{color:"white"}}/>}
      </div>
      <div className='absolute top-0 left-0 w-full h-full bg-secondary z-[-1]'/>
    </div>
  )
}
