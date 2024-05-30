import React from 'react'
import CircleIcon from '@mui/icons-material/Circle';

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
}

export default function Timeline({isCard, data}: {isCard:boolean, data:ReservationData}) {
  return (
    <div className={`flex flex-col gap-2 pl-[7px] border-l-2 border-[#aaaaaa]`} style={{transform:"translateX(7px)"}}>
      {data?.amenities?.map((item,index)=><Items key={index} isCard={isCard} data={data} {...item}/>)}
    </div>
  )
}
function Items({name,quantity,rate,amenityType,isCard,data}: {name:string,quantity:number,rate:number,amenityType:string,isCard:boolean,data:ReservationData}){
  let price = 0;

  if(amenityType === "per day"){
    price = rate * data?.days;
  }
  if(amenityType === "per quantity"){
    price = rate * quantity;
  }
  if(amenityType === "one time"){
    price = rate;
  }

  return(
    <div className={`flex gap-4  ${isCard?"translate-x-[-13px]":"translate-x-[-15px]"}`} >
      <div className=''>
        <CircleIcon sx={isCard?{fontSize:`${isCard?"12px":"15px"}`,transform:"translateY(-8px)",color:"#737373"}:{fontSize:`${isCard?"12px":"15px"}`,color:"#737373"}}/>
      </div>
      <div className='grow'>
        {amenityType === "per day" && <p className={`${isCard?"text-[12px] leading-[12px]":"text-[18px] leading-[18px]"} text-[black]/50 font-semibold`}>₱{rate} x {data?.days} days</p>}
        {amenityType === "per quantity" && <p className={`${isCard?"text-[12px] leading-[12px]":"text-[18px] leading-[18px]"} text-[black]/50 font-semibold`}>₱{rate} x {quantity} pcs</p>}
        {amenityType === "one time" && <p className={`${isCard?"text-[12px] leading-[12px]":"text-[18px] leading-[18px]"} text-[black]/50 font-semibold`}>₱{rate}</p>}
        <p className={`${isCard?"text-[12px] leading-[12px]":"text-[18px] leading-[18px]"} text-[black]/50 `}>{name}</p>
      </div>
      <div>
        <p className={`${isCard?"text-[12px]":"text-[18px]"} text-[black]/50 font-semibold `}>{price}</p>
      </div>
    </div>
  )
}