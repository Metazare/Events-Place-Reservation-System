import React from 'react'
import Pattern from '../Images/pattern.png'
import { AmenityType } from 'src/Hooks/useTypes'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type Props = {
  data:AmenityType,
  isSelected?:boolean,
  click?:()=>void
}
export default function AmenitiesCard({data,isSelected,click}:Props) {
  return (
    <div className='relative flex flex-col overflow-hidden min-h-[100px] rounded-xl text-[white] cursor-pointer p-2' style={{background:`url(${Pattern})`,backgroundSize:"contain"}} onClick={click}>
      <div className='grow'>
        <h6 className='text-[15]'>{data.name}</h6>
      </div>
      <div className='flex justify-between items-end'>
        <p>₱{data.rate} {data.amenityType ==="perDay"&&"per day"} {data.amenityType ==="perQuantity"&&"each"}</p>
        {isSelected&&<CheckCircleIcon sx={{color:"white"}}/>}
      </div>
      <div className='absolute top-0 left-0 w-full h-full bg-secondary z-[-1]'/>
    </div>
  )
}
