import React from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
type PropsType = {
  label:string,
  name:string, 
  cols:number, 
  rows:number, 
  value:string, 
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void, 
  error:boolean | undefined, 
  errorMessages:string | undefined,
  attr?: any
}
export default function TextArea({label,name, cols, rows, value, handleChange, error, errorMessages}:PropsType){
  return (
    <div >
      <p className={`mb-2 text-[] font-[500] ${error?"text-[#ff1d1ddc]":"text-[#646464]"}`}>{label}</p>
      <textarea name={name} cols={cols} rows={rows} 
        className={`w-full  p-2 rounded-xl border-2  bg-[transparent] outline-none  text-[#292929]  ${error ? "border-[#ff1d1ddc]" : "border-[#D9D9D9]"}`} 
        onChange={handleChange}
      >
        {value}
      </textarea>
      {error && <div className='flex gap-1 px-2 items-center  mt-[.5em]'>
        <ErrorOutlineIcon sx={{color:"#ff1d1ddc",fontSize:"16px"}}/>
        <p className='text-[#ff1d1ddc] text-[12px] '> {errorMessages}</p>
      </div>}
    </div>
  )
}
