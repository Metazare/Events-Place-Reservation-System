import React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import TextArea from './TextArea'
interface PropsType {
  closeModal:()=>void,
  toRespond:boolean
}
export default function HelpDeskModal({closeModal,toRespond}:PropsType) {
  const [openToRespond, setOpenToRespond] = React.useState<boolean>(toRespond)
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validate: values => {
      const errors: Record<string, string> = {};
      if (!values.message) {
        errors.message = 'Required';
      }
      return errors;
    },
    onSubmit: values => {
      console.log(values)
    },
  })
  return (
    <div className='p-4 w-[100vh] max-w-[500px] flex flex-col gap-4'>
      <h6 className='text-[22px] font-semibold'>View Report</h6>
      <div className='flex items-center justify-between'>
        <div className='flex gap-3 items-center'> 
          <Avatar variant="circular" src="" alt="Sample" sx={{ width: '35px', height: '35px' }} />
          <p>Willy Chrysty</p>
        </div>
        <a href="/" target='_blank'>
          <div className='bg-[white] px-4 py-2 border rounded-xl border-[black]/10 hover:bg-[black]/20' style={{transition:"all .3s ease-in-out"}}>
            View Events Place
          </div>
        </a>
      </div>
      <div className='py-4 border-y border-[black]/20 min-h-[300px]'>
        {openToRespond ?<>
          <TextArea 
            value={formik.values.message}
            name='message'
            label="Your Message" 
            handleChange={formik.handleChange}
            cols={20} // specify the number of columns
            rows={5} // specify the number of rows
            error={formik.touched.message && formik.errors.message !== undefined}
            errorMessages={formik.errors.message}
          />
        </>:<>
          <h6 className='text-[18px] font-semibold'>Subject:</h6>
          <p className='text-[14px]'>Sample Title</p>
          <h6 className='text-[18px] font-semibold mt-4'>Concern:</h6>
          <p className='text-[14px]'>
            I hope this message finds you well. I wanted to take a moment to provide some feedback regarding my recent experience renting your event space. Overall, I must say that I thoroughly enjoyed the venue and the atmosphere it provided for my event.
            However, I encountered a small issue during my rental period that I felt compelled to bring to your attention.

            Despite this minor hiccup, I want to emphasize that my overall experience was positive. Your venue exceeded my expectations in many ways, and I received numerous compliments from my guests about the space. I truly appreciate the opportunity to host my event at your venue and the level of service provided.
            Thank you for your attention to this matter. I trust that you will address the issue promptly, and I look forward to potentially renting your venue again in the future.
            Warm regards,
          </p>
        </>}
      </div>
      <div className='flex justify-center gap-4'>
        <Button variant="contained" color="primary" sx={{background:"white",color:"black",":hover":{background:"white"}}} 
          onClick={()=>{
            if(openToRespond){
              setOpenToRespond(false)
            }else{
              closeModal()
            }
          }}>
          {openToRespond?"Back":"Cancel"}
        </Button>
        <Button variant="contained" color="primary" onClick={()=>{
          if(openToRespond){
            formik.handleSubmit()
          }else{
            setOpenToRespond(true)
          }
        }}>
          Respond
        </Button>
      </div>
    </div>
  )
}
