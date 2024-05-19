import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function GoBackComp() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className='flex gap-2 items-center cursor-pointer py-1 px-2 rounded-xl hover:bg-[black]/10 translate-x-[-10px]' style={{transition:"all .3s ease-in-out"}} onClick={goBack}>
      <ArrowBackIcon/>
      <p>Go Back</p>
    </div>
  )
}