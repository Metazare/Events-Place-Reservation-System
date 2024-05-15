import React from 'react'

export default function ({label,quantity,setOpen,value,clickHandle} : {label:string,quantity:number,setOpen:Function,value:string,clickHandle:Function}) {
  return <p
    className={`p-4 cursor-pointer bg-[transparent]   transition-colors ${value === label ? 'bg-primary text-[white]' : 'hover:bg-[#ececec]'}`}
    style={{ transition: 'all .3s ease-in' }}
    onClick={() => {
      setOpen(label)
      clickHandle()
    }}
  >
    {label} ({quantity})
  </p>
}