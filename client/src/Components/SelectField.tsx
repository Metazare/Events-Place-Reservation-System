import React from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
type Props = {
  name: string,
  label: string,
  options?: Array<{value:string, label:string}>,
  error:boolean | undefined, 
  errorMessages:string | undefined,
  handleChange:(event: React.ChangeEvent<HTMLSelectElement>) => void,

}
export default function SelectField({name, label, options,error, errorMessages,handleChange}:Props) {
  return <div className='w-full'>
    <p className={`mb-2 text-[] font-[500] ${error?"text-[#ff1d1ddc]":"text-[#646464]"}`}>{label}</p>
    <div className={`w-full  pr-2 rounded-xl border-2 ${error ? "border-[#ff1d1ddc]" : "border-[#D9D9D9]"}`}>
      <select name={name}  onChange={handleChange} className='bg-[transparent] pl-2 py-2 outline-none w-full'>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
    {error && <div className='flex gap-1 px-2 items-center  mt-[.5em]'>
        <ErrorOutlineIcon sx={{color:"#ff1d1ddc",fontSize:"16px"}}/>
        <p className='text-[#ff1d1ddc] text-[12px] '> {errorMessages}</p>
      </div>}
  </div>
}
