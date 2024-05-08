import React from 'react'

export default function Timeline() {
  return (
    <ul className="pl-5 py-4 list-disc flex flex-col gap-2 grow">
      <li className=''>
        <div className='flex justify-between'>
          <p className='text-[18px] text-[black]/50 '>₱300 x 5 Days</p>
          <p className='text-[18px] font-semibold'>₱ 5000</p>
        </div>
      </li>
      <li className=''>
        <div className='flex justify-between'>
          <div>
            <p className='text-[18px] text-[black]/50 '>₱300 x 5 Days</p>
            <p className='text-[18px] text-[black]/50 mt-[-4px]'>Slippers</p>
          </div>
          <p className='text-[18px] font-semibold'>₱ 5000</p>
        </div>
      </li>
    </ul>
  )
}
