import React, {useEffect} from 'react'
import Container from '@mui/material/Container'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography'
import EventCard from 'src/Components/EventCard';
import Button from '@mui/material/Button'
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import useEventsPlace from 'src/Hooks/useEventsPlace';
import { useNavigate } from "react-router-dom";
export default function DeleteEventsPlace() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {data, loading, deleteEventsPlace, getEventsPlace} = useEventsPlace();
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
      // alert(JSON.stringify(values, null, 2));
      console.log(id)
      deleteEventsPlace(id||'')
    },
  })
  
  useEffect(() => {
    getEventsPlace(id||'')
    console.log(data)
}, []);

  if(loading) return <div>Loading...</div>

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
          {/* <Typography  className='text-primary'>Eagles Nest, Luxury Villa, Koh Yao Noi</Typography> */}
        </Breadcrumbs>
      </div>
      <div className='min-h-[400px] flex flex-col justify-center items-center gap-7'>
        <p>Are you sure you want to delete? </p>
        <EventCard data={data} type='view'/>
        {formik.errors.isAllowed && <p className='text-[red]'>{formik.errors.isAllowed}</p>}
        
        <div className='flex gap-4'>
          <Button variant="contained" sx={{ color: "black", background: "white", ":hover": { background: "white" } }} onClick={() => {navigate("/eventsplace/"+id)}}
          >
            Back
          </Button>
          <Button variant="contained" color="error" onClick={() => formik.handleSubmit()} type='submit'>
            Delete
          </Button>
        </div>
      </div>
    </Container>
  )
}
