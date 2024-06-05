  import React from 'react'
  import CircleIcon from '@mui/icons-material/Circle';
  export default function TimelineComp({title,subtitle,price}:{title:string,subtitle:string,price:string}) {
    return <>
      <div className='grid ' style={{gridTemplateColumns:"40px 1fr auto",gridTemplateRows:"repeat(2,1fr)",gridColumnGap:"0",gridRowGap:"5px"}}>
        <div className='flex justify-center items-center' style={{gridArea:"1 / 1 / 2 / 2"}}>
          <CircleIcon sx={{fontSize:"15px",color:"#3F3F3F"}}/>
        </div>
        <div className='flex items-center justify-center' style={{gridArea:"2 / 1 / 3 / 2"}}>
          <div className='w-[2px] bg-[#ECECEC] h-[100%] '/>
        </div>
        <div className='flex items-center' style={{gridArea:"1 / 2 / 2 / 3"}}>
          <h6 className='font-semibold text-[18px] leading-[18px] opacity-80'>{title}</h6>
        </div>
        <div style={{gridArea:"2 / 2 / 3 / 3"}}>
          {subtitle}
        </div>
        <div style={{gridArea:"1 / 3 / 3 / 4"}}>
          <p className='font-semibold text-[18px] leading-[18px]'>{price}</p>
        </div>
      </div>
    
    </>
  }
