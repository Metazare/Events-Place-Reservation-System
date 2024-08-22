import React from 'react'
import Container from '@mui/material/Container'
import ImageBuilding from '../Images/Building.svg'
import QuoteImg from '../Images/Quote.png'
import QuestionMark from '../Images/Questionmark.svg'
import Step1Image from '../Images/Step1.png'
import Step2_1Image from '../Images/Step2_1.png'
import Step2_2Image from '../Images/Step2_2.png'
import Step2_3Image from '../Images/Step2_3.png'
import Step3Image from '../Images/Step3.png'
import Checkbox from '@mui/material/Checkbox';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import GoBackComp from 'src/Components/GoBackComp'
export default function BecomeHost() {
  const StepsContent =[
    {
      Description:"Create your Host Account, providing essential details and your rental license",
      img:[
        {src:Step1Image,alt:"Become a host form"}
      ]
    },
    {
      Description:"Showcase your event spaces in their best light by registering them on our platform. Captivate potential renters with stunning photos and compelling descriptions.",
      img:[
        {src:Step2_1Image,alt:"Create Events Form - Basic Information"},
        {src:Step2_2Image,alt:"Create Events Form - Amenities"},
        {src:Step2_3Image,alt:"Create Events Form - Gallery"},
      ]
    },
    {
      Description:"Stay in control with our intuitive reservation monitoring system. Keep track of rentees reservations' selected dates, guest numbers, amenities, and more with ease!",
      img:[
        {src:Step3Image,alt:"View Listing"},
      ]
    }
  ]
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues:{
      isAgree:false
    },validate:(values)=>{
      let error:{isAgree?:string} = {};
      if(!values.isAgree) error.isAgree = "Please agree to the policy and terms & condition"
      return error;
    },
    onSubmit:(values)=>{
      navigate('/host/register')
    }
  })
  return (
    <div className='grow'>
      <Container maxWidth="lg" className=' pb-[2em] '>
        <div className='flex justify-start pt-[1em] pb-[7em] '>
          <GoBackComp/>
        </div>
        <Container maxWidth="lg" className='mt-[2em] mb-[6em]'>
        <p className='text-[red] pl-3'>{formik.touched.isAgree && formik.errors.isAgree !== undefined&&formik.errors.isAgree}</p>
        <div className='w-full flex justify-center mt-[2em]'>
          <Button variant="contained" onClick={()=>{formik.handleSubmit()}} sx={{background:"#144273",padding:"1em 3em"}}>
            Become a Host now!
          </Button>
        </div>
        <div className='flex gap-2 items-center'>
          <Checkbox
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<TaskAltIcon />}
            onClick={()=>{formik.setFieldValue('isAgree',!formik.values.isAgree)}}
          />
          <p>I agree with the <a className='font-bold cursor-pointer' target="_blank" href="/policy" >Policy</a> and <a className='font-bold cursor-pointer' target="_blank" href="/termscondition">Terms & Condition</a></p>
        </div>
      </Container>
        <div className='flex flex-col gap-4 items-center'>
          <h6 className='text-center md:translate-x-[30px] text-[34px] font-semibold leading-[40px]'>
            Let&apos;s <span className='text-[#0071BC]  font-bold'>Transform</span> your event  <br className='hidden md:block' />
            <span className='text-[#0071BC]  font-bold'>hosting dreams</span> into reality effortlessly <br className='hidden md:block' />
            with <span className='text-[#0071BC]  font-bold'>Events Place.</span>
          </h6>
          <img src={ImageBuilding}  alt="Qoute" className=' mt-[5em] w-full max-w-[700px]'/>
          <div className='relative flex  px-[4em] justify-center mt-[9em]'>
            <img src={QuoteImg} className='absolute bottom-[20%] left-0 z-[-1]' alt="" />
            <p className='text-center text-[28px] text-[black]/50 z-1'>
              “Join our community of hosts and unlock the <br  className='hidden md:block'/>
              potential of your event spaces!”
            </p>
            <img src={QuoteImg} alt="Qoute" className='absolute bottom-[20%] right-0 z-[-1]' style={{transform:"scaleX(-1)"}}/>
          </div>
        </div>
        
      </Container>
      <div className='bg-[#EDEDED] w-full py-[4em] mt-[7em]'>
        <Container maxWidth="lg">
          <div className='flex flex-col gap-8 md:grid' style={{gridTemplateColumns:".5fr .8fr"}}>
            <div className='w-full'>
              <div className='sticky top-[20px] flex flex-col items-center md:items-start'>
                <img src={QuestionMark} className='w-[90px]' alt="questionmark" />
                <p className='text-center md:text-left text-[33px] font-bold text-[#2D74B4]'>Ready to <br /> Get Started?</p>
              </div>
            </div>
            <div className='flex flex-col gap-5'>
              {StepsContent.map((data,index)=>(
                <StepsContainer data={data} key={index} index={index}/>
              ))}
            </div>
          </div>
        </Container>
      </div>
      
    </div>
  )
}


function StepsContainer({data,index}){
  return <>
    <div className='rounded-xl bg-[#E7E7E7] w-full p-4 flex flex-col gap-4'>
      <h6 className='text-[46px] leading-[46px] font-semibold text-[#0071BC]'>Step #{index+1}:</h6>
      <p>{data.Description}</p>
      {data.img.map((img,index)=>(
        <img className='w-full rounded-xl' src={img.src} alt={img.alt} key={index} />)
      )}
    </div>
  </>
}
