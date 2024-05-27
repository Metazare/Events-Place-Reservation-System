import React from 'react'
import { useFormik } from 'formik';
import Rating from '@mui/material/Rating';
import TextArea from './TextArea';
export default function RateComponent({closeModal}:{closeModal:()=>void}) {
  const formik = useFormik({
    initialValues: {
      rating: 1,
      comment:''
    },
    validate: values => {
      const errors: Record<string, string> = {};
      if (!values.comment) {
        errors.comment = 'Required';
      }
      return errors;
    },
    onSubmit: values => {
      console.log(values);
      closeModal()
    },
  });
  return (
    <div className='p-4 w-[95vw] max-w-[400px]'>
      <p className='text-[20px] font-semibold text-[#144273]'>Rate your Experience</p>
      <div className='h-[100px] flex items-center justify-center'>
        <Rating
          size="large"
          name="simple-controlled"
          value={formik.values.rating}
          onChange={(event, newValue) => {
            formik.setFieldValue("rating",newValue);
          }}
        />
        
      </div>
      <TextArea 
          value={formik.values.comment}
          name='comment'
          label="Your comment" 
          handleChange={formik.handleChange}
          cols={20} // specify the number of columns
          rows={5} // specify the number of rows
          error={formik.touched.comment && formik.errors.comment !== undefined}
          errorMessages={formik.errors.comment}
        />
      <div className='grid mt-5 gap-4' style={{gridTemplateColumns:".4fr .6fr"}}>
        <button onClick={closeModal} className='bg-[#e6e6e6] text-[#181818] px-4 py-2 rounded-md'>No</button>
        <button onClick={()=>{
          formik.handleSubmit()
          // closeModal()
        }} className='bg-[#144273] text-[white] px-4 py-2 rounded-md'>Yes</button>
      </div>
    </div>
  )
}
