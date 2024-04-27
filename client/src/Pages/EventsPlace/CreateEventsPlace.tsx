import React from 'react'
import Container from '@mui/material/Container'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link';
import TextField from 'src/Components/TextField';
import { useFormik } from 'formik';
import Button from '@mui/material/Button'
import TextArea from 'src/Components/TextArea';
import SelectField from 'src/Components/SelectField';
import AmenitiesCard from 'src/Components/AmenitiesCard';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewEventsPlace from './ViewEventsPlace';
const steps = [
  'Basic Information',
  'Amenities',
  'Gallery',
  'Preview',
];
function CreateEventsPlace() {
  const [activeStep, setActiveStep] = React.useState(2);
  const CreateEventformik = useFormik({
    initialValues: {
      eventName: '',
      eventDescription: '',
      eventLocation: '',
      eventCapacity: '',
      eventPrice: '',
      placeType: 'Resort',
      amenities:[],
      images:[],
    },
    validate: values => {
      let errors:{eventName?:string,placeType?:string, eventDescription?:string, eventLocation?:string, eventCapacity?:string, eventPrice?:string,images?:any} = {};
      switch(activeStep){
        case 0:
          if(!values.eventName) errors.eventName = "Event Name is required"
          if(!values.eventDescription) errors.eventDescription = "Event Description is required"
          if(!values.eventLocation) errors.eventLocation = "Event Location is required"
          if(!values.eventCapacity) errors.eventCapacity = "Event Capacity is required"
          if(!values.eventPrice) errors.eventPrice = "Event Price is required"
          if(!values.placeType) errors.placeType = "Event Price is required"
          break;
        case 1:
          // if(values.amenities.length) errors.eventName = "Event Name is required"
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
      console.log(values)
      if(activeStep === steps.length - 1) {
        console.log("submit")
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
          <h5 className='text-[25px] font-semibold text-primary'>Create Event Place</h5>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Create Event
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
                    name:"eventName",
                    values:CreateEventformik.values.eventName,
                  }}
                  label="Event Name" 
                  type="text" 
                  handleChange={CreateEventformik.handleChange}
                  error={CreateEventformik.touched.eventName && CreateEventformik.errors.eventName !== undefined}
                  errorMessages={CreateEventformik.errors.eventName}
                />
                <TextArea 
                  value={CreateEventformik.values.eventDescription}
                  name='eventDescription'
                  label="Event Description" 
                  handleChange={CreateEventformik.handleChange}
                  cols={20} // specify the number of columns
                  rows={5} // specify the number of rows
                  error={CreateEventformik.touched.eventDescription && CreateEventformik.errors.eventDescription !== undefined}
                  errorMessages={CreateEventformik.errors.eventDescription}
                />
                <div className='md:flex gap-5'>
                  <TextField 
                    attr={{
                      placeholder:"Event Location",
                      name:"eventLocation",
                      values:CreateEventformik.values.eventLocation,
                    }}
                    label="Event Location" 
                    type="text" 
                    handleChange={CreateEventformik.handleChange}
                    error={CreateEventformik.touched.eventLocation && CreateEventformik.errors.eventLocation !== undefined}
                    errorMessages={CreateEventformik.errors.eventLocation}
                  />
                  <TextField 
                      attr={{
                        placeholder:"Event Capacity",
                        name:"eventCapacity",
                        values:CreateEventformik.values.eventCapacity,
                      }}
                      label="Event Capacity" 
                      type="number" 
                      handleChange={CreateEventformik.handleChange}
                      error={CreateEventformik.touched.eventCapacity && CreateEventformik.errors.eventCapacity !== undefined}
                      errorMessages={CreateEventformik.errors.eventCapacity}
                    />
                </div>
                
                <div className='md:flex gap-5'>
                  
                  <SelectField 
                    name='type'
                    label="Place Type" 
                    options={[{label:"Resort", value:"resort"},{label:"Hotel", value:"hotel"},{label:"Function Room", value:"functionRoom"}]}
                    handleChange={CreateEventformik.handleChange}
                    error={CreateEventformik.touched.placeType && CreateEventformik.errors.placeType !== undefined}
                    errorMessages={CreateEventformik.errors.placeType}
                  />
                  <TextField 
                    attr={{
                      placeholder:"Event Price",
                      name:"eventPrice",
                      values:CreateEventformik.values.eventPrice,
                    }}
                    label="Event Price" 
                    type="number" 
                    handleChange={CreateEventformik.handleChange}
                    error={CreateEventformik.touched.eventPrice && CreateEventformik.errors.eventPrice !== undefined}
                    errorMessages={CreateEventformik.errors.eventPrice}
                  />
                </div>
                <ButtonNavigate ActiveStep={activeStep} setActiveStep={setActiveStep} submitFunction={CreateEventformik.handleSubmit} />
              </div>}
              {activeStep === 1 && <div className='flex flex-col gap-4'>
                <AddAmenities  value={CreateEventformik.values.amenities} setAmenities={CreateEventformik}/>
                <div className='grid gap-4 mt-[3em] ' style={{gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))"}}>
                  {CreateEventformik.values.amenities.map((amenity:any, index:number) => (
                    <div key={index} className='relative amenitiesCard' onClick={()=>{
                      // let myArray = [...CreateEventformik.values.amenities]
                      CreateEventformik.setFieldValue("amenities", CreateEventformik.values.amenities.filter((item, i) => i !== index))
                    }}>
                      <AmenitiesCard data={amenity}/>
                      <div className='position top-[50%] left-[50%] absolute  z-140 w-full h-full bg-[black]/30 rounded-xl  justify-center items-center deleteHover '  style={{transform:"translate(-50%,-50%)"}}>
                        <DeleteIcon sx={{color:"white"}}/>
                      </div>
                    </div>
                  ))}
                </div>
                <ButtonNavigate ActiveStep={activeStep} setActiveStep={setActiveStep}  submitFunction={CreateEventformik.handleSubmit}/>
              </div>}
              {activeStep === 2 && <div className='flex flex-col gap-4'>
                <div className='flex'>
                  <input type="file" name="images" id="file" className="hidden"  multiple
                    onChange={(e)=>{
                      if(e.target.files) {
                        const filesArray = Array.from(e.target.files).map((file: any) => URL.createObjectURL(file));
                        CreateEventformik.setFieldValue("images", [
                          ...CreateEventformik.values.images,
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
                {CreateEventformik.touched.images && CreateEventformik.errors.images && <p className='text-[#ff1d1ddc] text-[12px] mt-2'> {CreateEventformik.errors.images}</p>}
                <div className='grid gap-4 mt-5' style={{gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))"}} >
                  {CreateEventformik.values.images.map((image:any, index:number) => (
                    <div key={index} className='relative amenitiesCard' onClick={()=>{
                      CreateEventformik.setFieldValue("images", CreateEventformik.values.images.filter((item, i) => i !== index))
                    }}>
                      <div className='rounded-xl aspect-card'  style={{background:`url("${image}") no-repeat`,backgroundSize:"contain",backgroundPosition:"center"}}/>
                      <div className='position top-[50%] left-[50%] absolute  z-140 w-full h-full bg-[black]/30 rounded-xl  justify-center items-center deleteHover ' style={{transform:"translate(-50%,-50%)"}}>
                        <DeleteIcon sx={{color:"white"}}/>
                      </div>
                    </div>
                  ))}
                </div>
                <ButtonNavigate ActiveStep={activeStep} setActiveStep={setActiveStep} submitFunction={CreateEventformik.handleSubmit}/>
              </div>}
              {activeStep === 3 && <div className='flex flex-col gap-4'>
                <ButtonNavigate ActiveStep={activeStep} setActiveStep={setActiveStep}  submitFunction={CreateEventformik.handleSubmit}/>
                <ViewEventsPlace data={CreateEventformik.values}/>
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
      type:'oneTime',
      rate: 0
    },
    validate: values => {
      let errors:{name?:string,type?:string,price?:string} = {};
      if(!values.name) errors.name = "name is required"
      if(!values.rate) errors.price = "price is required"
      if(!values.type) errors.type = "name is required"
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
        values:AddAmenitiesformik.values.name,
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
      options={[{label:"One Time", value:"oneTime"},{label:"Per Day", value:"perDay"},{label:"Per Quantity", value:"perQuantity"}]}
      handleChange={AddAmenitiesformik.handleChange}
      error={AddAmenitiesformik.touched.type && AddAmenitiesformik.errors.type !== undefined}
      errorMessages={AddAmenitiesformik.errors.type}
    />
    <TextField 
      attr={{
        placeholder:"Price",
        name:"rate",
        values:AddAmenitiesformik.values.rate,
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
export default CreateEventsPlace