import React from 'react'
import CircleIcon from '@mui/icons-material/Circle';

export default function Timeline({isCard}: {isCard:boolean}) {
  const SampleDate = [
    {
      title:"₱300 x 5 Days",
      subtitle:"",
      price:"₱1500"
    },
    {
      title:"₱100 x 5 Items",
      subtitle:"Complementary Drinks",
      price:"₱500"
    },
    {
      title:"₱100 x 5 Items",
      subtitle:"Complementary Drinks",
      price:"₱500"
    }
    
  ]
  return (
    <div className={`flex flex-col gap-2 pl-[7px] border-l-2 border-[#aaaaaa]`} style={{transform:"translateX(7px)"}}>
      {SampleDate.map((item,index)=><Items key={index} isCard={isCard} {...item}/>)}
    </div>
  )
}
function Items({title,subtitle,price,isCard}: {title:string,subtitle:string,price:string,isCard:boolean}){
  return(
    <div className={`flex gap-4  ${isCard?"translate-x-[-13px]":"translate-x-[-15px]"}`} >
      <div className=''>
        <CircleIcon sx={isCard?{fontSize:`${isCard?"12px":"15px"}`,transform:"translateY(-8px)",color:"#737373"}:{fontSize:`${isCard?"12px":"15px"}`,color:"#737373"}}/>
      </div>
      <div className='grow'>
        <p className={`${isCard?"text-[12px] leading-[12px]":"text-[18px] leading-[18px]"} text-[black]/50 font-semibold`}>{title}</p>
        <p className={`${isCard?"text-[12px] leading-[12px]":"text-[18px] leading-[18px]"} text-[black]/50 `}>{subtitle}</p>
      </div>
      <div>
        <p className={`${isCard?"text-[12px]":"text-[18px]"} text-[black]/50 font-semibold `}>{price}</p>
      </div>
    </div>
  )
}