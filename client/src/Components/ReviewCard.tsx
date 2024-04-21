import React from 'react'
import Qoute from '../Images/Qoute.svg'
import Avatar from '@mui/material/Avatar'
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import {ReviewType} from '../Hooks/useTypes'

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'white',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
  '& .MuiRating-iconEmpty': {
    color: 'white', // Modify the color of the unfilled star here
  },
  '& .MuiRating-iconHalf': {
    color: 'green', // Modify the color of the half-filled star here
  },
});

type ReviewCardProps = {
  review?:ReviewType
}
export default function ReviewCard({review}:ReviewCardProps) {
  return (
    <div className='relative bg-[#092646] rounded-xl z-[-1] p-4 text-[white]'>
      <img className='absolute top-4 w-[20%] z-[-1] opacity-80 mb-[-30px]' src={Qoute} alt="" />
      <p className='pl-4  z-[12] text-[15px]  pt-[30px] z leading-[18px]'>Just wanted to drop a quick note to say thank you for the seamless reservation process at your venue. The ambiance was fantastic, </p>
      <div className='mt-[2em] flex gap-3 items-center z-[4]'  >
        <Avatar variant="circular" src="" alt="WEW" sx={{ width: '45px', height: '45px' }} />
        <div className='grow' >
          <h6 className='text-[18px] leading-[18px] font-semibold'>John Doe</h6>
          <p className='text-[12px] leading-[15px] font-semibold opacity-65'>Oct 25, 2023</p>
        </div>
        <div className='flex flex-col items-end'>
          <p>4.5</p>
          <StyledRating name="read-only" value={3.5} precision={0.5}  readOnly />
        </div>
      </div>
    </div>
  )
}
