import React from 'react'
import Container from '@mui/material/Container'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HelpDeskImage from '../Images/HelpDesk.png'
import { useFormik } from 'formik';
import TextField from 'src/Components/TextField';
import TextArea from 'src/Components/TextArea';
import Button from '@mui/material/Button'
export default function HelpDesk() {
  const HelpDeskFormik = useFormik({
    initialValues: {
      date:new Date(),
      userID:"",
      subject:"",
      message:"",
    },validate: (values) => {
      const errors:{ [key:string]:string}  = {};
      return errors;
    },
    onSubmit: (values) => {
      console.log(values)
    }
  })
  return (
    <Container maxWidth="lg" className='grow py-7 '>
      <div className='flex flex-col gap-4 h-[100%]  bg-[]'>
        <div className=' flex items-center gap-2 cursor-[pointer] opacity-70 hover:opacity-100 '>
          <ArrowBackIcon sx={{fontSize:"25px"}}/>
          <p>Go Back</p>
        </div>
        <div className='flex flex-col gap-20 md:grid h-full grow  min-h-[75vh] md:items-center' style={{gridTemplateColumns:".6fr 1fr"}}>
          <div className='flex flex-col gap-6 '>
            <h6 className='text-[38px] leading-[50px] font-bold'>Your Go-To <span className='text-[#0071BC]'>Help Desk</span> <br /> for <span className='text-[#0071BC]'>Quick Solutions!</span></h6>
            <TextField 
              attr={{
                placeholder:"Title",
                name:"subject",
                value:HelpDeskFormik.values.subject,
              }}
              label="Subject" 
              type="text" 
              handleChange={HelpDeskFormik.handleChange}
              error={HelpDeskFormik.touched.subject && HelpDeskFormik.errors.subject !== undefined}
              errorMessages={HelpDeskFormik.errors.subject}
            />
            <TextArea 
              value={HelpDeskFormik.values.message}
              name='message'
              label="What’s the problem?" 
              handleChange={HelpDeskFormik.handleChange}
              cols={20} // specify the number of columns
              rows={5} // specify the number of rows
              error={HelpDeskFormik.touched.message && HelpDeskFormik.errors.message !== undefined}
              errorMessages={HelpDeskFormik.errors.message}
            />
            <div>
              <Button variant="contained" color="primary"
                onClick={()=>{HelpDeskFormik.handleSubmit()}}
                sx={{padding:"10px 60px",borderRadius:"12px"}}
              >
                Send
              </Button>
            </div>
          </div>
          <img src={HelpDeskImage} className='w-[100%]' alt="" />
        </div>
      </div>
    </Container>
  )
}
