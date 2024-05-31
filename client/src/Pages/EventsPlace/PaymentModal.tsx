import React from 'react'
import Button from '@mui/material/Button'
import LogoIcon from 'src/Images/Logo/LogoBox.svg';
import Timeline from 'src/Components/Timeline';

import useReservation from 'src/Hooks/useReservation';


import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
interface ReservationData {
  eventsPlaceId: string;
  rate: number;
  amenities: {
      amenityId: string;
      quantity: number;
      rate: number;
      amenityType: string;
      name: string;
  }[];
  guestCount: number;
  startDate: number;
  days: number;
  date:any;
}

export default function PaymentModal({data}: {data: ReservationData}) {
  const { createReservation, getReservationTotal } = useReservation();
  const submitReservation = async (e: any) => {
    e.preventDefault();
    await createReservation(data);
  }

  return <>
    <div className=' w-[100vw] max-w-[1000px]  min-h-[550px] overflow-hidden rounded-xl flex flex-col sm:grid' style={{gridTemplateColumns:"60% 40%"}}>
      <div className='p-[1.5em] flex flex-col grow'>
        <h6 className='text-[25px] text-[#144273] font-semibold'>Price Details</h6>
        <div className='grow py-4'>
          <p className='text-[18px] text-[black]/50'>Events Place Rate</p>
          <p className='text-[18px] text-[black]/50'>₱{data.rate} x {data.days} day(s) = ₱{data.rate*data.days}</p>
          <br/>

          <p className='text-[18px] text-[black]/50'>Amenities</p>
          <Timeline isCard={false} data={data}/>
        </div>
        <div className='border-t border-[black]/50 flex justify-between items-end pt-[1em]'>
          <p className='text-[18px] text-[black]/50'>Total</p>
          <p className='text-[26px] font-semibold'>₱ {getReservationTotal(data)}</p>
        </div>
      </div>
      <div className='p-[1.5em] relative flex flex-col overflow-hidden '  style={{background:`url(${Image})`}}>
        <div className='bg-[#132F4C] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-full w-full z-[-4]'/>
        <div className='grow justify-center items-start hidden sm:flex'>
          <img src={LogoIcon} className='w-[40%] mt-[20%]' alt="" />
        </div>
        <Button variant="contained" sx={{background:"#2D74B4"}} fullWidth onClick={submitReservation}>
          Reserve
        </Button>
      </div>
    </div>
  </>
}
