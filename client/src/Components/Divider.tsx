import React from 'react'

interface PropsTpye {
  value:string,
  setValue:(value:string)=>void,
  items: string[]
}
function Divider({items,value,setValue}:PropsTpye) {
  return (
    <div className='w-full flex rounded-full border border-[black]/10'>
      {items.map((item,index)=><p key={index} style={{transition:"all .3s ease-in-out"}} className={`grow text-center py-[.5em] rounded-full cursor-pointer ${value === item?"bg-[#144273] text-[white]":""}`} onClick={()=>{setValue(item)}}>{item}</p>)}
    </div>
  )
}

export default Divider