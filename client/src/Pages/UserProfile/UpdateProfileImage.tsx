import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { Button, Avatar, Chip } from '@mui/material'

// Hooks
import useUser from 'src/Hooks/useUser';

import useFirebase from 'src/Hooks/useFirebase';
interface PropsType {
  closeModal:() => void
  data: any
}
export default function UpdateProfileImage({closeModal, data}:PropsType) {
  const {editInfo} = useUser();
  const {uploadFile} = useFirebase();

  const UpdateImage = useFormik({
    initialValues: {
      image: data[0]?.image || ''
    },
    onSubmit: values => {
      editInfo({
        firstName: data[0]?.name?.first || '',
        middleName: data[0]?.name?.middle || '',
        lastName: data[0]?.name?.last || '',
        suffixName: data[0]?.name?.suffixName || '',
        contact: data[0]?.contact || '',
        photo: values.image
      })
      closeModal()
    }
  })
  return <>
    <div className='grow flex flex-col justify-center items-center'>
      <Avatar variant="circular" src={UpdateImage.values.image} alt="sample" sx={{width:"150px",height:"150px"}} />
      <input type="file" id='image' name="image" accept=".png, .jpg"
      onChange={async (e)=>{
        if(e.target.files) {
          const fileUrl = await uploadFile(e.target.files[0], 'events_place_marikina');
          UpdateImage.setFieldValue("image",fileUrl)
        }
      }}
      className='hidden'/>
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
