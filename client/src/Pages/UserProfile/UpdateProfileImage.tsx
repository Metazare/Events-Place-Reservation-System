import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { Button, Avatar, Chip } from '@mui/material'
interface PropsType {
  closeModal:() => void
  data: any
}
export default function UpdateProfileImage({closeModal, data}:PropsType) {
  const UpdateImage = useFormik({
    initialValues: {
      image: data[0]?.image || ''
    },
    onSubmit: values => {
      closeModal()
    }
  })
  return <>
    <div className='grow flex flex-col justify-center items-center'>
      <Avatar variant="circular" src={UpdateImage.values.image} alt="sample" sx={{width:"150px",height:"150px"}} />
      <input type="file" id='image' name="image" accept=".png, .jpg"  onChange={(e:any)=>{
        if(e.target.files.length > 0){ 
          UpdateImage.setFieldValue(`image`,URL.createObjectURL(e.target.files[0]))
        }
      }} className='hidden'/>
      <label htmlFor="image" className='mt-[2em]'>
        <Chip label="Upload Image" onClick={()=>{}} />
      </label>
    </div>
    <div className='flex gap-2 mt-2'>
      <Button variant="contained" onClick={()=>{closeModal()}} sx={{ marginTop:"1em", background:"white", color: "black", borderRadius:"10px",flexGrow:1,":hover":{color:"white"}}}>
        Cancel
      </Button>
      <Button variant="contained" onClick={()=>{UpdateImage.handleSubmit()}} sx={{ marginTop:"1em", background:"#144273", color: "white", borderRadius:"10px",flexGrow:1}}>
        Update
      </Button>
    </div>
  </>
}
