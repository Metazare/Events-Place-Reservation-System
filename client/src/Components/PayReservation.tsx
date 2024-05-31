import React from 'react'

export default function PayReservation({closeModal, accountNum, total}:{closeModal:()=>void, accountNum:number, total:number}) {
  return (
    <div className='p-4 w-[95vw] max-w-[400px]'>
      <p className='text-[20px] font-semibold'>Pay Reservation</p>
      <p className='mt-4 text-[14px] text-[#144273]'>Pay your reservation total of ₱{total} through GCash at {accountNum}</p>
      <p className='mt-4 text-[14px] text-[#144273]'>(This is just a sample payment feature, payment API will be placed here)</p>
      
      <div className='grid mt-5 gap-4' style={{gridTemplateColumns:".4fr .6fr"}}>
        <button onClick={closeModal} className='bg-[#144273] text-[white] px-4 py-2 rounded-md'>Pay Now</button>
      </div>
    </div>
  )
}
