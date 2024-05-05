import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
type PropsType = {
  data:any,
  type: "view" | "booked" | "manage"
}
export default function EventCard() {
  const navigate = useNavigate();
  return (
    <div className='event-card cursor-pointer box-content relative CardHover' onClick={()=>{navigate("/view")}}>
      <div className='w-[full] aspect-card bg-[gray]/10 rounded-md' style={{background:"url(https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg)",backgroundSize:"cover"}}/>
      <div className='mt-1'>
        <h5 className=' text-[15px] font-[700]'>Dela Castle Resort</h5>
        <p className='text-[13px] opacity-70'>8 Guests | San Mateo Abuab III</p>
        <div className='flex gap-1 items-center opacity-70'>
          <StarIcon  sx={{fontSize:"18px"}}/>
          <p className='text-[13px] '><span className='font-semibold'>4.5 </span>(28 Reviews)</p>
        </div>
      </div>
      <div className='BackgroundHover'></div>
    </div>
  )
}
