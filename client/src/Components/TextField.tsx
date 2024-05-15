import React, { useState } from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton'


interface PropsType{
  label: string
  type: string
  attr?: any
  error?:Boolean
  errorMessages:string | undefined
  handleChange:  (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function TextField({label,type,attr,error,errorMessages,handleChange}:PropsType) {
  const[isVisible,setisVisible] = useState(false) 
  return (
    <div className='w-full'>
      <p className={`mb-2  font-[500] ${error?"text-[#ff1d1ddc]":"text-[#646464]"}`}>{label}</p>
      <div className={`w-full p-2 rounded-xl border-2 flex items-center gap-2 ${error ? "border-[#ff1d1ddc]" : "border-[#D9D9D9]"}`}>
        <input
          {...attr}
          className={`grow bg-[transparent] outline-none  w-full  text-[#292929]`} 
          type={type==="password"? isVisible?"text":"password" : type} 
          onChange={handleChange}
        />
        {type==="password"&&<>
          <IconButton aria-label="" sx={{opacity:".5",width:"15px",height:"15px"}} onClick={()=>{setisVisible(!isVisible)}}>
          {
            isVisible? 
              <VisibilityOffIcon/>
              :
              <VisibilityIcon/>
          }
          </IconButton>
        </>}
      </div>
      
      {error && <div className='flex gap-1 px-2 items-center  mt-[.5em]'>
        <ErrorOutlineIcon sx={{color:"#ff1d1ddc",fontSize:"16px"}}/>
        <p className='text-[#ff1d1ddc] text-[12px] '> {errorMessages}</p>
      </div>}
    </div>
  )
}
