import React from 'react'
import Container from '@mui/material/Container'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link';
import TextArea from 'src/Components/TextArea';
import { useFormik } from 'formik';
import Button from '@mui/material/Button'

import useFirebase from 'src/Hooks/useFirebase';
import { useRegister } from '../../Hooks/useAuth';

export default function HostRegister() {
  const {uploadFile} = useFirebase();
  const { registerHost } = useRegister();

  const HostRegisterFormik = useFormik({
    initialValues: {
      description: '',
      images: ''
    },
    validate: (values) => {
      const errors:{ description?:string,images?:any}  = {};
      if(!values.description) errors.description = "Description is required"
      if(!values.images) errors.images = "Image is required"
      return errors;
    },
    onSubmit: (values) => {
      registerHost({
        description: values.description,
        license: values.images
      })
    },
  })
  return (
    <Container maxWidth="lg" className='grow '>
      <div className='h-full  py-4'>
        <div className='flex gap-2 cursor-[pointer] opacity-70 hover:opacity-100'>
          <ArrowBackIcon sx={{fontSize:"25px"}}/>
          <p>Go Back</p>
        </div>
        <div className='mt-[.5em] mb-[4em]'>
          <h5 className='text-[25px] font-semibold text-primary'>Register as a Host</h5>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Host
            </Link>
            <Typography  className='text-primary'>Register as a Host</Typography>
          </Breadcrumbs>
        </div>
        <div className='flex  flex-col w-full gap-3 md:grid' style={{gridTemplateColumns:"1fr .6fr"}}>
          <div>
            <TextArea 
              value={HostRegisterFormik.values.description}
              name='description'
              label="Host Description" 
              handleChange={HostRegisterFormik.handleChange}
              cols={90} // specify the number of columns
              rows={15} // specify the number of rows
              error={HostRegisterFormik.touched.description && HostRegisterFormik.errors.description !== undefined}
              errorMessages={HostRegisterFormik.errors.description}
            />
          </div>
          <div className=' grow'>
            <h6 className={`mb-2  font-[500] ${HostRegisterFormik.touched.images && HostRegisterFormik.errors.images &&"text-[red]"}`}>Upload License</h6>
            <div className='flex'>
              <input type="file" name="images" id="file" className="hidden"  multiple
                onChange={async (e)=>{
                  if(e.target.files) {
                    const fileUrl = await uploadFile(e.target.files[0], 'events_place_marikina');
                    HostRegisterFormik.setFieldValue("images",fileUrl)
                  }
                }}
                accept='.jpg, .png'
              />
              <label htmlFor="file" className={`bg-[#EEEEEE] border border-dashed  text-white rounded-xl cursor-pointer flex flex-col py-[2em] px-[6em] justify-center items-center ${HostRegisterFormik.touched.images && HostRegisterFormik.errors.images?"border-[red]":"border-primary"}`}>
                {HostRegisterFormik.values.images ? "Change Image" : "Upload Image"}
              </label>
            </div>
            {HostRegisterFormik.touched.images && HostRegisterFormik.errors.images && <p className='text-[red] text-[13px] mt-1'>{HostRegisterFormik.errors.images}</p>}
            {HostRegisterFormik.values.images && <img className='mt-4 rounded-xl w-full' src={HostRegisterFormik.values.images} alt="" />}
          </div>
        </div>
        <div className='flex justify-center gap-4 mt-[7em] mb-[2em] '>
          <Button variant="text" color="primary"
            onClick={() =>{}}
          >
            Back
          </Button>
          <Button variant="contained" color="primary"
            onClick={()=>{HostRegisterFormik.handleSubmit()}}
          >
            Submit
          </Button>
        </div>
      </div>
    </Container>
  )
}
