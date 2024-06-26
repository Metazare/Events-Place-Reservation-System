import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';

import Container from '@mui/material/Container'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link';
import TextField from 'src/Components/TextField';
import Button from '@mui/material/Button'
import TextArea from 'src/Components/TextArea';
import SelectField from 'src/Components/SelectField';
import AmenitiesCard from 'src/Components/AmenitiesCard';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewEventsPlace from './ViewEventsPlace';

import useFirebase from 'src/Hooks/useFirebase';

import useEventsPlace from 'src/Hooks/useEventsPlace';
import toast from 'react-hot-toast';

const steps = [
  'Basic Information',
  'Amenities',
  'Gallery',
  'Preview',
];

function UpdateEventsPlace() {
  const navigate = useNavigate()

  const {uploadFile} = useFirebase();

  const [activeStep, setActiveStep] = React.useState(0);
  const UpdateFormik = useFormik({
    initialValues: {
      name: '',
      description: '',
      location: '',
      maxCapacity: '',
      rate: '',
      placeType: 'Resort',
      amenities:[],
      images:[],
    },
    validate: values => {
      let errors:{name?:string, description?:string, location?:string, maxCapacity?:string, rate?:string,images?:any} = {};
      switch(activeStep){
        case 0:
          if(!values.name) errors.name = "Event Name is required"
          if(!values.description) errors.description = "Event Description is required"
          if(!values.location) errors.location = "Event Location is required"
          if(!values.maxCapacity) errors.maxCapacity = "Event Capacity is required"
          if(!values.rate) errors.rate = "Event Price is required"
          break;
        case 1:
          // if(values.amenities.length) errors.name = "Event Name is required"
          
          break;
        case 2:
          if(values.images.length < 3) errors.images = "Image must be atleast 3"
          break;
        case 3:
          break;
      }
      
      return errors;
    },
    onSubmit: values => {
      if(activeStep === steps.length - 1) {
        // UpdateEventsPlace({
        //   ...values,
        //   maxCapacity: Number(values.maxCapacity),
        //   rate: Number(values.rate),
        // });

        // if (!loading && !error) {
        //   navigate('/');
        // }
        // else {
        //   toast.error('Error creating event place. Please try again. ' + String(error));
        // }

      }else{
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  })
  return (
    <Container maxWidth="lg" className='grow px-[2em] py-[1em] gap-[1em]' sx={{display:"flex", flexDirection:'column'}}>
      <div className='flex gap-2 cursor-[pointer] opacity-70 hover:opacity-100'>
        <ArrowBackIcon sx={{fontSize:"25px"}}/>
        <p>Go Back</p>
      </div>
      <div className='w-full grow '>
        <div className='mt-[.5em] mb-[4em]'>
          <h5 className='text-[25px] font-semibold text-primary'>Update Events Place</h5>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Update Events Place
            </Link>
            <Typography  className='text-primary'>{steps[activeStep]}</Typography>
          </Breadcrumbs>
        </div>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className='mt-[4em]'>
          {activeStep === steps.length ? (
            <div>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
            </div>
          ) : (
            <div >
              {activeStep === 0 && <div className='flex flex-col gap-4'>
                <TextField 
                  attr={{
                    placeholder:"Event Name",
                    name:"name",
                    value:UpdateFormik.values.name,
                  }}
                  label="Event Name" 
                  type="text" 
                  handleChange={UpdateFormik.handleChange}
                  error={UpdateFormik.touched.name && UpdateFormik.errors.name !== undefined}
                  errorMessages={UpdateFormik.errors.name}
                />
                <TextArea 
                  value={UpdateFormik.values.description}
                  name='description'
                  label="Event Description" 
                  handleChange={UpdateFormik.handleChange}
                  cols={20} // specify the number of columns
                  rows={5} // specify the number of rows
                  error={UpdateFormik.touched.description && UpdateFormik.errors.description !== undefined}
                  errorMessages={UpdateFormik.errors.description}
                />
                <div className='md:flex gap-5'>
                  <TextField 
                    attr={{
                      placeholder:"Event Location",
                      name:"location",
                      value:UpdateFormik.values.location,
                    }}
                    label="Event Location" 
                    type="text" 
                    handleChange={UpdateFormik.handleChange}
                    error={UpdateFormik.touched.location && UpdateFormik.errors.location !== undefined}
                    errorMessages={UpdateFormik.errors.location}
                  />
                  <TextField 
                    attr={{
                      placeholder:"Event Capacity",
                      name:"maxCapacity",
                      value:UpdateFormik.values.maxCapacity,
                    }}
                    label="Event Capacity" 
                    type="number" 
                    handleChange={UpdateFormik.handleChange}
                    error={UpdateFormik.touched.maxCapacity && UpdateFormik.errors.maxCapacity !== undefined}
                    errorMessages={UpdateFormik.errors.maxCapacity}
                  />
                  <TextField 
                    attr={{
                      placeholder:"Event Price",
                      name:"rate",
                      value:UpdateFormik.values.rate,
                    }}
                    label="Event Price" 
                    type="number" 
                    handleChange={UpdateFormik.handleChange}
                    error={UpdateFormik.touched.rate && UpdateFormik.errors.rate !== undefined}
                    errorMessages={UpdateFormik.errors.rate}
                  />
                </div>
                <ButtonNavigate ActiveStep={activeStep} setActiveStep={setActiveStep} submitFunction={UpdateFormik.handleSubmit} />
              </div>}
              {activeStep === 1 && <div className='flex flex-col gap-4'>
                <AddAmenities  value={UpdateFormik.values.amenities} setAmenities={UpdateFormik}/>
                <div className='grid gap-4 mt-[3em] ' style={{gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))"}}>
                  {UpdateFormik.values.amenities.map((amenity:any, index:number) => (
                    <div key={index} className='relative amenitiesCard' onClick={()=>{
                      // let myArray = [...UpdateFormik.values.amenities]
                      UpdateFormik.setFieldValue("amenities", UpdateFormik.values.amenities.filter((item, i) => i !== index))
                    }}>
                      <AmenitiesCard data={amenity}/>
                      <div className='position top-[50%] left-[50%] absolute  z-140 w-full h-full bg-[black]/30 rounded-xl  justify-center items-center deleteHover '  style={{transform:"translate(-50%,-50%)"}}>
                        <DeleteIcon sx={{color:"white"}}/>
                      </div>
                    </div>
                  ))}
                </div>
                <ButtonNavigate ActiveStep={activeStep} setActiveStep={setActiveStep}  submitFunction={UpdateFormik.handleSubmit}/>
              </div>}
              {activeStep === 2 && <div className='flex flex-col gap-4'>
                <div className='flex'>
                  <input type="file" name="images" id="file" className="hidden"  multiple
                    onChange={async (e)=>{
                      if(e.target.files) {
                        const filesArray = await Promise.all(
                          Array.from(e.target.files).map((file: any) => uploadFile(file, 'events_place_marikina'))
                        );
                        UpdateFormik.setFieldValue("images", [
                          ...UpdateFormik.values.images,
                          ...filesArray
                        ]);
                      }
                    }}
                    accept='.jpg, .png'
                  />
                  <label htmlFor="file" className='bg-[#EEEEEE] border border-dashed border-primary text-white rounded-xl cursor-pointer flex flex-col py-[4em] px-[10em] justify-center items-center'>
                    <p>Click to add image</p>
                  </label>
                </div>
                {UpdateFormik.touched.images && UpdateFormik.errors.images && <p className='text-[#ff1d1ddc] text-[12px] mt-2'> {UpdateFormik.errors.images}</p>}
                <div className='grid gap-4 mt-5' style={{gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))"}} >
                  {UpdateFormik.values.images.map((image:any, index:number) => (
                    <div key={index} className='relative amenitiesCard' onClick={()=>{
                      UpdateFormik.setFieldValue("images", UpdateFormik.values.images.filter((item, i) => i !== index))
                    }}>
                      <div className='rounded-xl aspect-card'  style={{background:`url("${image}") no-repeat`,backgroundSize:"contain",backgroundPosition:"center"}}/>
                      <div className='position top-[50%] left-[50%] absolute  z-140 w-full h-full bg-[black]/30 rounded-xl  justify-center items-center deleteHover ' style={{transform:"translate(-50%,-50%)"}}>
                        <DeleteIcon sx={{color:"white"}}/>
                      </div>
                    </div>
                  ))}
                </div>
                <ButtonNavigate ActiveStep={activeStep} setActiveStep={setActiveStep} submitFunction={UpdateFormik.handleSubmit}/>
              </div>}
              {activeStep === 3 && <div className='flex flex-col gap-4'>
                <ButtonNavigate ActiveStep={activeStep} setActiveStep={setActiveStep}  submitFunction={UpdateFormik.handleSubmit}/>
                <ViewEventsPlace data={UpdateFormik.values}/>
              </div>}
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
function AddAmenities({value,setAmenities}:{value:any,setAmenities:any}) {
  const AddAmenitiesformik = useFormik({
    initialValues: {
      name: '',
      amenityType:'one time',
      rate: 0
    },
    validate: values => {
      let errors:{name?:string,amenityType?:string,price?:string} = {};
      if(!values.name) errors.name = "name is required"
      if(!values.rate) errors.price = "price is required"
      if(!values.amenityType) errors.amenityType = "name is required"
      return errors;
    },
    onSubmit: (values) => {
      setAmenities.setFieldValue("amenities", [...value, values])
      ResetForm()
    }
  })
  const ResetForm=() =>{
    AddAmenitiesformik.setFieldValue("name", "")
    AddAmenitiesformik.setFieldValue("rate", "")
  }
  
  return <div className='flex flex-col md:flex-row gap-3 '>
    <TextField 
      attr={{
        placeholder:"Name",
        name:"name",
        value:AddAmenitiesformik.values.name,
      }}
      label="Name" 
      type="text" 
      handleChange={AddAmenitiesformik.handleChange}
      error={AddAmenitiesformik.touched.name && AddAmenitiesformik.errors.name !== undefined}
      errorMessages={AddAmenitiesformik.errors.name}
    />
    <SelectField 
      name='type'
      label="Type" 
      options={[{label:"One Time", value:"one time"},{label:"Per Day", value:"per day"},{label:"Per Quantity", value:"per quantity"}]}
      handleChange={AddAmenitiesformik.handleChange}
      error={AddAmenitiesformik.touched.amenityType && AddAmenitiesformik.errors.amenityType !== undefined}
      errorMessages={AddAmenitiesformik.errors.amenityType}
    />
    <TextField 
      attr={{
        placeholder:"Price",
        name:"rate",
        value:AddAmenitiesformik.values.rate,
      }}
      label="Price" 
      type="number" 
      handleChange={AddAmenitiesformik.handleChange}
      error={AddAmenitiesformik.touched.rate && AddAmenitiesformik.errors.rate !== undefined}
      errorMessages={AddAmenitiesformik.errors.rate}
    />
    <div className='pt-8'>
      <Button variant="contained" className='w-full' color="primary" sx={{padding:".7em 2em",borderRadius:".75em"}} onClick={()=>{
        AddAmenitiesformik.handleSubmit()
      }}>
        Add
      </Button>
    </div>
  </div>
}

function ButtonNavigate({ActiveStep,setActiveStep,submitFunction}:{ ActiveStep:number, setActiveStep:React.Dispatch<React.SetStateAction<number>>,submitFunction?:any}) {
  return<>
    <div className='flex justify-center gap-4 mt-[4em] mb-[2em] '>
      <Button variant="text" color="primary"
        disabled={ActiveStep === 0}
        onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
      >
        Back
      </Button>
      
      <Button variant="contained" color="primary"
        onClick={submitFunction}
      >
        {ActiveStep === steps.length - 1 ? "Finish" : "Next"}
      </Button>
    </div>
  </>
}
export default UpdateEventsPlace