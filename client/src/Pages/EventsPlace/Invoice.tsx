import React from 'react'
import Container from '@mui/material/Container'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventHeader from 'src/Components/EventHeader';
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import ChatIcon from '@mui/icons-material/Chat';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import Timeline from 'src/Components/Timeline';
export default function Invoice() {
  return (
    <Container maxWidth="lg" className='grow py-7'>
      <div className=' flex items-center gap-2 cursor-[pointer] opacity-70 hover:opacity-100'>
        <ArrowBackIcon sx={{fontSize:"25px"}}/>
        <p>Go Back</p>
      </div>
      <div className='flex flex-col-reverse gap-4 md:grid mt-[2em]' style={{gridTemplateColumns:"1fr .5fr"}}>
        <div className='flex flex-col gap-4 items-start '>
          <EventHeader/>
          <a href='/view' className='px-4 py-2 bg-[white] rounded-lg hover:bg-[#e6e6e6] cursor-pointer'>
            View Event Place
          </a>
          <div className='p-5 flex gap-4 items-center bg-[white] rounded-xl w-full '>
            <Avatar variant="circular" src="" alt="WEW" sx={{ width: '48px', height: '48px' }} />
            <div>
              <h6 className='text-[#141414] font-bold'>John Doe</h6>
              <p className='text-[#303030] mt-[-7px]'>Renter</p>
            </div>
          </div>
          <div className='flex justify-between items-center border-t border-black pt-5 border-[black]/10 w-full'>
            <div className='flex gap-3 items-center'>
              <Avatar variant="circular" src="" alt="Wew" sx={{ width: '55px', height: '55px' }} />
              <div>
                <h6 className='text-[20px] leading-[23px] font-semibold'>John Doe</h6>
                <p className='text-[14px] leading-[13px] font-semibold opacity-65'>Host</p>
              </div>
            </div>
            <IconButton aria-label="" onClick={()=>{}}>
              <ChatIcon sx={{fontSize:"35px"}}/>
            </IconButton>
            
          </div>
          <p className='mt-[1em] text-justify'>"Meet our Events Host Extraordinaire! With a knack for creating unforgettable experiences, our host ensures every event is seamlessly executed. From welcoming guests with warmth to orchestrating activities with finesse, they guarantee a memorable occasion for all attendees. Trust our Events Host to infuse charm, professionalism, and enthusiasm into every event, leaving guests with lasting impressions and cherished memories."event is seamlessly executed. From welcoming guests with warmth to orchestrating activities with finesse, they guarantee a memorable occasion for all attendees. Trust our Events Host to infuse charm, professionalism, and enthusiasm into every event, leaving guests with lasting impressions and cherished memories."</p>
        </div>
        
        <div >
          <div className="bg-[white] p-4 w-full rounded-xl shadow-md">
            <div className='flex items-start justify-between'>
              <h6 className='text-[18px] leading-[19px] font-bold '>Reservation <br />Details</h6>
              <div className='bg-[#144273] py-1 px-4 rounded-xl'>
                <p className='text-[white] text-[14px]'>Upcomming</p>
              </div>
            </div>
            <div className='flex justify-between items-center mt-8 pb-4'>
              <div className='flex gap-2 items-center'>
                <EventIcon/>
                <p className='font-semibold'>Nov 25, 2023</p>
              </div>
              <div className='flex gap-2 items-center'>
                <PeopleIcon/>
                <p className='font-semibold'>8 Guests</p>
              </div>
            </div>
            <div className=' border-y py-4 border-[black]/10'>
              <Timeline isCard={true}/>
            </div>
            <div className='flex justify-between items-center pt-4'>
              <p className='text-[18px] text-[black]/50'>Total</p>
              <p className='text-[24px] font-semibold'>₱ 5000</p>
            </div>
          </div>
          
        </div>
      </div>
    </Container>
  )
}
