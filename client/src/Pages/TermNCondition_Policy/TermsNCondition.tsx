import React from 'react'
import Container from '@mui/material/Container'
import Image from '../../Images/pattern.png'
import { TermsNConditionData } from './Content'
export default function TermsNCondition() {
  return (
    <div  className='grow'>
      <div className='relative h-[250px] w-full gap-5 LandingPageHeader flex justify-center items-center z-1 p-4' style={{background:`url(${Image})`}}>
        <h1 className='text-[white] text-[40px] font-semibold text-center'>Terms & Condition</h1>
      </div>
      <Container maxWidth="lg" className='p-4'>
        <div className=' flex flex-col gap-5'>
          <p>Welcome to our online reservation system for events place. By accessing or using our service, you agree to be bound by the following Terms and Conditions. If you disagree with any part of these terms, please refrain from accessing or using our service.</p>
          {TermsNConditionData.map((data:any,index)=>(
            <div key={index} className=''>
              <h3 className='font-semibold mb-2'>{data.title}</h3>
              <p>{data.content}</p>
            </div>
          ))}
        </div>
        
      </Container>
    </div>
  )
}
