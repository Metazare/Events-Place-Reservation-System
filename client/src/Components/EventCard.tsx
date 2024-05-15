import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip'

type PropsType = {
  data?:any,
  type?: "view" | "booked" | "manage" 
}
export default function EventCard({data,type}: PropsType) {
  const navigate = useNavigate();

  return (
    <div className='event-card cursor-pointer box-content relative CardHover' onClick={()=>{
      if(type==="view")navigate("/view/"+data?.eventsPlaceId)
    }}>
      <div className='relative w-[full] aspect-card bg-[gray]/10 rounded-md' style={{background:`url("${data.images[0]}")`,backgroundSize:"cover"}}>
        {type==="manage"&&<div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] h-[100%] bg-[black]/40 flex justify-center items-center gap-4 rounded-md opacity-0 hover:opacity-100 ' style={{transition:"all .3s ease-in"}}>
          <Tooltip title="Delete">
            <IconButton aria-label="" onClick={()=>{navigate("/delete")}}>
              <DeleteIcon sx={{color:"white"}}/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Update">
            <IconButton aria-label="" onClick={()=>{navigate("/update")}}>
              <EditIcon sx={{color:"white"}}/>
            </IconButton>
          </Tooltip>
        </div>}
      </div>
      <div className='mt-1 flex flex-col items-start'>
        <h5 className=' text-[15px] font-[700]'>{data?.name}</h5>
        <p className='text-[13px] opacity-70'>{data?.location}</p>
        {type==="view"&&<div className='flex gap-1 items-center opacity-70'>
          <StarIcon  sx={{fontSize:"18px"}}/>
          <p className='text-[13px] '><span className='font-semibold'>4.5 </span>(28 Reviews)</p>
        </div>}
        {type==="booked"&&<div className='bg-[#144273] mt-1 py-1 px-3 rounded-md flex gap-1 items-center text-[white]'>
          <EventIcon  sx={{fontSize:"18px"}}/>
          <p className='text-[13px] '>Oct 25, 2023 - Oct 26 2023</p> 
        </div>}
      </div>
      <div className='BackgroundHover'></div>
    </div>
  )
}
