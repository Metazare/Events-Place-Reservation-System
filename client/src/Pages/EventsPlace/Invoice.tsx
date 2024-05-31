import React, { useEffect } from 'react'
import Container from '@mui/material/Container'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventHeader from 'src/Components/EventHeader';
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import ChatIcon from '@mui/icons-material/Chat';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import Timeline from 'src/Components/Timeline';
import GoBackComp from 'src/Components/GoBackComp';
import Button from '@mui/material/Button'
import StarRateIcon from '@mui/icons-material/StarRate';
import useModal from 'src/Hooks/useModal';
import CancelReservation from 'src/Components/CancelReservation';
import RateComponent from 'src/Components/RateComponent';
import { useParams } from 'react-router-dom';
import useReservation from 'src/Hooks/useReservation';
import moment from 'moment';
import StarIcon from '@mui/icons-material/Star';
import PayReservation from 'src/Components/PayReservation';

export default function Invoice() {
  const {id} = useParams<{id:string}>();
  const {data, getReservation, getReservationTotal, payReservation, cancelReservation} = useReservation();
  const [status, setStatus] = React.useState<string | null>(null);

  useEffect(()=>{
    if (data) {
      setStatus(data[0].status.reservation)
    }
    else{
      getReservation({
        reservationId:id,
        userType:"renter"
      })
    }
  },[data])

  const {setOpenModal,ModalComponent,closeModal} = useModal();

  const payment = () => {
    closeModal();
    payReservation({reservationId:id||''})
    window.location.reload();
  }

  const cancel = () => {
    closeModal();
    cancelReservation({reservationId:id||''})
    window.location.reload();
  }

  return (
    <Container maxWidth="lg" className='grow py-7'>
      <div className='flex justify-start'>
        <GoBackComp/>
      </div>
      <div className='flex flex-col-reverse gap-4 md:grid mt-[2em]' style={{gridTemplateColumns:"1fr .5fr"}}>
        <div className='flex flex-col gap-4 items-start '>
        <div className='w-full '>
        <h3 className='text-[27px] grow font-medium'>{data?.[0]?.eventsPlace?.name}</h3>
        <div className='flex gap-2 items-center color-[#303030] divide-x divide-solid flex-wrap'>
          <div className='flex gap-1 '>
            <StarIcon sx={{fontSize:"15 px"}}/>
            <p className='text-[15px]'>0 (0 Reviews)</p>
          </div>
          <div className='flex gap-1 pl-1'>
            <p className='text-[15px]'>{data?.[0]?.guestCount} Guests</p>
          </div>
          <div className='flex gap-1 pl-1'>
            <p className='text-[15px]'>{data?.[0]?.eventsPlace?.location}</p>
          </div>
          <div className='flex gap-1 pl-1'>
            <p className='text-[15px]'>{data?.[0]?.eventsPlace?.placeType}</p>
          </div>
        </div>
      </div>
          <a href={`/eventsplace/view/`+data?.[0]?.eventsPlace?.eventsPlaceId} className='px-4 py-2 bg-[white] rounded-lg hover:bg-[#e6e6e6] cursor-pointer'>
            View Event Place
          </a>
          <div className='p-5 flex gap-4 items-center bg-[white] rounded-xl w-full '>
            <Avatar variant="circular" src={data?.[0]?.renter?.photo} alt="WEW" sx={{ width: '48px', height: '48px' }} />
            <div>
              <h6 className='text-[#141414] font-bold'>{data?.[0]?.renter?.name?.first} {data?.[0]?.renter?.name?.last}</h6>
              <p className='text-[#303030] mt-[-7px]'>Renter</p>
            </div>
          </div>
          <div className='flex justify-between items-center border-t border-black pt-5 border-[black]/10 w-full'>
            <div className='flex gap-3 items-center'>
              <Avatar variant="circular" src={data?.[0]?.host?.photo} alt="Wew" sx={{ width: '55px', height: '55px' }} />
              <div>
                <h6 className='text-[20px] leading-[23px] font-semibold'>{data?.[0]?.host?.name?.first} {data?.[0]?.host?.name?.last}</h6>
                <p className='text-[14px] leading-[13px] font-semibold opacity-65'>Host</p>
              </div>
            </div>
            <IconButton aria-label="" onClick={()=>{}}>
              <ChatIcon sx={{fontSize:"35px"}}/>
            </IconButton>
            
          </div>
          <p className='mt-[1em] text-justify'>{data?.[0]?.host?.description}</p>
        </div>
        
        <div >
          <div className="bg-[white] p-4 w-full rounded-xl shadow-md">
            <div className='flex items-start justify-between'>
              <h6 className='text-[18px] leading-[19px] font-bold '>Reservation <br />Details</h6>
              <div className='bg-[#144273] py-1 px-4 rounded-xl'>
                <p className='text-[white] text-[14px]'>
                  {
                    status==="pending" &&
                    <span>To Pay</span>
                  }
                  {
                    status==="reserved" &&
                    <span>Reserved</span>
                  }
                  {
                    status==="failed" &&
                    <span>Failed</span>
                  }
                  {
                    status==="canceled" &&
                    <span>Cancelled</span>
                  }
                </p>
              </div>
            </div>
            <div className='flex justify-between items-center mt-8 pb-4'>
              <div className='flex gap-2 items-center'>
                <EventIcon/>
                <p className='font-semibold'>{moment(data?.[0]?.duration?.start).format('MMMM Do, YYYY')} - {moment(data?.[0]?.duration?.end).format('MMMM Do, YYYY')}</p>
              </div>
              <div className='flex gap-2 items-center'>
                <PeopleIcon/>
                <p className='font-semibold'>{data?.[0]?.guestCount} Guests</p>
              </div>
            </div>
            <div className=' border-y py-4 border-[black]/10'>
                <p className='text-[16px] text-[black]/80'>Event Place</p>
                <p className='text-[14px] text-[black]/50'>₱{data?.[0].eventsPlace.rate} x {(new Date(data?.[0].duration.end).getTime() - new Date(data?.[0].duration.start).getTime()) / (1000 * 60 * 60 * 24)} day(s) = ₱{data?.[0].eventsPlace.rate*((new Date(data?.[0].duration.end).getTime() - new Date(data?.[0].duration.start).getTime()) / (1000 * 60 * 60 * 24))}</p>
                <br/>
                <p className='text-[16px] text-[black]/80'>Amenities</p>
              <Timeline 
                isCard={true}
                data={{
                  ...data?.[0],
                  days: (new Date(data?.[0].duration.end).getTime() - new Date(data?.[0].duration.start).getTime()) / (1000 * 60 * 60 * 24),
                  rate: data?.[0].eventsPlace?.rate
                }}
              />
            </div>
            <div className='flex justify-between items-center pt-4 mb-4'>
              <p className='text-[18px] text-[black]/50'>Total</p>
              {data && data[0] &&
                <p className='text-[24px] font-semibold'>
                  ₱{getReservationTotal({
                    ...data?.[0],
                    days: (new Date(data?.[0].duration.end).getTime() - new Date(data?.[0].duration.start).getTime()) / (1000 * 60 * 60 * 24),
                    rate: data?.[0].eventsPlace?.rate
                  })}
                </p> 
              }
            </div>
            {
              status==="pending"&&
              <Button variant="outlined" fullWidth onClick={()=>{setOpenModal(
                <PayReservation 
                closeModal={payment} 
                accountNum={data?.[0]?.host?.contact} 
                total={getReservationTotal({
                  ...data?.[0],
                  days: (new Date(data?.[0].duration.end).getTime() - new Date(data?.[0].duration.start).getTime()) / (1000 * 60 * 60 * 24),
                  rate: data?.[0].eventsPlace?.rate
                })}
                />)}
              }>
                Pay Reservation
              </Button>
            }
            {
              status==="reserved"&&
              <>
                <Button variant="contained" startIcon={<StarRateIcon/>} fullWidth onClick={()=>{setOpenModal(<RateComponent closeModal={closeModal}/>)}}>
                  Rate your experience
                </Button>
                <Button variant="outlined" fullWidth onClick={()=>{setOpenModal(<CancelReservation closeModal={cancel}/>)}}>
                  Cancel Reservation
                </Button>
              </>
              
            }
          </div>
        </div>
      </div>
      <ModalComponent/>
    </Container>
  )
}
