import React from 'react'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import ChatIcon from '@mui/icons-material/Chat';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import Timeline from './Timeline';
import Button from '@mui/material/Button'
export default function ReservationCard() {
  return (
    <div className='bg-[#144273] rounded-md'>
      <div className='px-4 py-2 flex justify-between'>
        <div className='flex items-center gap-1'>
          <Avatar variant="circular" src="" alt="Wew" sx={{ width: '30px', height: '30px' }} />
          <div>
            <p className='text-[14px] leading-[14px] text-[#fff]'>Miles Morales</p>
            <p className='text-[11px]  text-[#fff]'>Renter</p>
          </div>
        </div>
        <IconButton aria-label="" href='/chat'>
          <ChatIcon sx={{color:"white"}}/>
        </IconButton>
      </div>
      <div className='bg-[white] p-4 rounded-md'>
        <h6 className='text-[16px] leading-[15px] font-semibold'>Dela Castle Resort</h6>
        <p className='text-[12px]'>8 Guests | San Mateo Abuab III</p>
        <div className='flex justify-between mt-3'>
          <div className='flex items-center  gap-2'>
            <EventIcon/>
            <p className='text-[12px]'>Oct 20, 2021</p>
          </div>
          <div className='flex items-center gap-2' >
            <PeopleIcon/>
            <p className='text-[12px]'>Oct 20, 2021</p>
          </div>
        </div>
        <div className='border-y border-[black]/20 py-3 my-2'>
          <Timeline isCard={true}/>
        </div>
        <div className='flex justify-between'>
          <p>Total</p>
          <p className=' font-semibold'>₱1,502</p>
        </div>
        <div className='mt-4 grid gap-2' style={{gridTemplateColumns:".9fr 1fr"}}>
          <Button variant="contained" sx={{background:"white",color:"black",":hover":{background:"white"}}}>
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            View Details
          </Button>
        </div>
      </div>
    </div>
  )
}
