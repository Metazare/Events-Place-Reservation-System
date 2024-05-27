import React from 'react'

export default function CancelReservation({closeModal}:{closeModal:()=>void}) {
  return (
    <div className='p-4 w-[95vw] max-w-[400px]'>
      <p className='text-[20px] font-semibold'>Cancel Reservation</p>
      <p className='mt-4 text-[14px] text-[#144273]'>Are you sure you want to cancel this reservation?</p>
      
      <div className='grid mt-5 gap-4' style={{gridTemplateColumns:".4fr .6fr"}}>
        <button onClick={closeModal} className='bg-[#e6e6e6] text-[#181818] px-4 py-2 rounded-md'>No</button>
        <button onClick={closeModal} className='bg-[#144273] text-[white] px-4 py-2 rounded-md'>Yes</button>
      </div>
    </div>
  )
}
