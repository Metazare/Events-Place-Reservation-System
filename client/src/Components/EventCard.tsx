import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

type PropsType = {
  data?: any,
  type?: "view" | "booked" | "manage"
}

export default function EventCard({data, type}: PropsType) {

  const navigate = useNavigate();

  return (
    <div className='event-card cursor-pointer box-content relative CardHover' onClick={()=>{navigate("/view/"+data?.eventsPlaceId)}}>
      <div className='w-[full] aspect-card bg-[gray]/10 rounded-md' style={{background:`url("${data.images[0]}")`,backgroundSize:"cover"}}/>
      <div className='mt-1'>
        <h5 className=' text-[15px] font-[700]'>{data?.name}</h5>
        <p className='text-[13px] opacity-70'>{data?.location}</p>
        <div className='flex gap-1 items-center opacity-70'>
          <StarIcon  sx={{fontSize:"18px"}}/>
          <p className='text-[13px] '><span className='font-semibold'>4.5 </span>(28 Reviews)</p>
        </div>
      </div>
      <div className='BackgroundHover'></div>
    </div>
  )
}
