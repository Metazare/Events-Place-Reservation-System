import React from 'react'
import Container from '@mui/material/Container'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography'
import EventCard from 'src/Components/EventCard';
import Button from '@mui/material/Button'
import { useFormik } from 'formik';
export default function DeleteEventsPlace() {
  const formik = useFormik({
    initialValues: {
      isAllowed:false
    },
    validate: values => {
      let errors:{isAllowed?:Boolean} = {};
      // Add validation if this events place dont have any reservation
      return errors;
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  })
  return (
    <Container maxWidth="lg" className={"grow px-[2em] py-[1em] gap-[1em]"}>
      <div className='flex gap-2 cursor-[pointer] opacity-70 hover:opacity-100'>
        <ArrowBackIcon sx={{fontSize:"25px"}}/>
        <p>Go Back</p>
      </div>
      <div className='mt-[.5em] mb-[4em]'>
        <h5 className='text-[25px] font-semibold text-primary'>Delete Events Place</h5>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/listing">
            Listing
          </Link>
          <Typography  className='text-primary'>Eagles Nest, Luxury Villa, Koh Yao Noi</Typography>
        </Breadcrumbs>
      </div>
      <div className='min-h-[400px] flex flex-col justify-center items-center gap-7'>
        <p>Are you sure you want to delete? </p>
        <EventCard data={[]} type='view'/>
        {formik.errors.isAllowed && <p className='text-[red]'>{formik.errors.isAllowed}</p>}
        
        <div className='flex gap-4'>
          <Button variant="contained"  sx={{color:"black",background:"white",":hover":{background:"white"}}}
          >
            Back
          </Button>
          <Button variant="contained" color="error"
          >
            Delete
          </Button>
        </div>
      </div>
    </Container>
  )
}
