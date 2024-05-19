import React,{useEffect, useState} from 'react'
import TextField from 'src/Components/TextField';
import { useFormik } from 'formik';
import AmenitiesCard from 'src/Components/AmenitiesCard';
import { AmenityType } from 'src/Hooks/useTypes';
import Button from '@mui/material/Button'
import useModal from 'src/Hooks/useModal';
import DatePicker from 'src/Components/DatePicker';
import DateRange from 'src/Components/DateRange';
import useDates from 'src/Hooks/useDates';
import PaymentModal from './PaymentModal';
import IconButton from '@mui/material/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
export default function ReservationForm(){
  const {setOpenModal,ModalComponent,closeModal} = useModal();
  const {getDatesToArray} = useDates()
  const [selectedDate, setSelectedDate] = useState<string>("Single Day");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })
  const [datePicker, setDatePicker] = useState(new Date())
  const[EventsPlaceData,setEventsPlaceData] = useState<any>({})
  const ReservationFormik = useFormik({
    initialValues: {
      guestsNumber:1,
      renterID:"",
      hostID:"",
      EventsPlaceID:"",
      status:"",
      timeStamp:"",
      amenitiesList:[],
      date: new Date(),
    },
    validate: (values) => {
      const errors:{ [key:string]:string}  = {};
      return errors;
    },
    onSubmit: (values) => {
      console.log({...values,date:getDate(),AmenitiesList:values.amenitiesList.map((amenity:any)=>{return {amenityId:amenity.amenityId,quantity:amenity.quantity}})})
      setOpenModal(<PaymentModal/>)
    },
  })
  function getDate(){
    if(selectedDate === "Single Day"){
      return getDatesToArray(datePicker,datePicker)
    }else if(selectedDate === "Multiple Days"){
      return getDatesToArray(dateRange.startDate,dateRange.endDate)
    }
  }

  const ReservationFormComp = () => {
    return <>
    <div className='w-full flex rounded-full border border-[black]/10'>
      <p style={{transition:"all .3s ease-in-out"}} className={`grow text-center rounded-full  py-[.5em]  cursor-pointer ${selectedDate ==="Single Day"?"bg-[#144273] text-[white]":""}`} 
        onClick={()=>{
          if(selectedDate === "Single Day") return;
          if(selectedDate === "Multiple Days"){
            ReservationFormik.setFieldValue("date",new Date())
          }
          setSelectedDate("Single Day");
        }}
      >
        Single Day
      </p>
      <p style={{transition:"all .3s ease-in-out"}} className={`grow text-center py-[.5em] rounded-full  cursor-pointer ${selectedDate ==="Multiple Days"?"bg-[#144273] text-[white]":""}`} 
        onClick={()=>{
          ReservationFormik.setFieldValue("date",{
            startDate: new Date(),
            endDate: new Date(),
            key:'selection'
          })
          setSelectedDate("Multiple Days")
        }}
      >
        Multiple Days
      </p>
    </div>
    {selectedDate === "Multiple Days"?
      <>
        <div>
          <p className={`mb-2  font-[500]  text-[#646464]`}>Date Range</p>
            <DateRange
              dateValue={dateRange} 
              setDateValue={setDateRange}
            />
        </div>
      </>:<>
        <div>
          <p className={`mb-2  font-[500]  text-[#646464]`}>When</p>
          <DatePicker value={datePicker} handleChange={(value)=>{
            setDatePicker(value)
          }}/>
        </div>
      </>
    }
    <TextField 
      attr={{
        placeholder:"1",
        name:"guestsNumber",
        value:ReservationFormik.values.guestsNumber,
        min:1,
        max:100
      }}
      label="Guests" 
      type="number" 
      handleChange={ReservationFormik.handleChange}
      error={ReservationFormik.touched.guestsNumber && ReservationFormik.errors.guestsNumber !== undefined}
      errorMessages={ReservationFormik.errors.guestsNumber}
    />
    {ReservationFormik.values.amenitiesList.length > 0 && <>
      <div >
        <p className={`mb-2  font-[500] text-[#646464]`}>Amenities</p>
        <div className='flex flex-col gap-3'>
          {ReservationFormik.values.amenitiesList.map((data:any,index:number)=>{
            return <>
              <AmenitiesField key={index}  data={data}/>
            </>
          })}
        </div>
      </div>
    </>}
    <Button variant="contained" onClick={()=>{ReservationFormik.handleSubmit()}} sx={{borderRadius:"10px !important",marginTop:"2em",background:"#144273"}}>
      Reserve
    </Button>
    {ModalComponent()} 
  </>
  }
  const AmenitiesList = () => {
    return <>
      <div className='grid gap-4' style={{gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))"}}>
        {EventsPlaceData?.amenities?.map((data:any,index)=>{
          let isSelected = ReservationFormik.values.amenitiesList.find((amenity:any)=>amenity.amenityId === data.amenityId) !== undefined;
          return <AmenitiesCard data={data} key={index} 
              isSelected={isSelected} 
              clickHandler={()=>{
                if(isSelected){
                  ReservationFormik.setFieldValue("amenitiesList",ReservationFormik.values.amenitiesList.filter((amenity:any)=>amenity.amenityId !== data.amenityId))
                }
                else{
                  ReservationFormik.setFieldValue("amenitiesList", [...ReservationFormik.values.amenitiesList,{ ...data, quantity: 1 }])
                }
                // data !== null && ReservationFormik.setFieldValue("amenitiesList",ReservationFormik.setFieldValue("amenitiesList", [...ReservationFormik.values.amenitiesList,{ amenityId: data.amenityId, quantity: 1 }]))
              }}
            />
        })}
      </div> 
    </>
  }
  const AmenitiesField = ({data}:any) => {
    return <>
      <div className='flex gap-2 items-center border border-[black]/10 p-2 rounded-xl'>
        <div className='grow'>
          <p className='font-semibold text-[black]/70'>{data.name}</p>
          <p className='mt-[-7px]'>₱{data.rate} {data.amenityType ==="per day"&&"per day"} {data.amenityType ==="per quantity"&&"each"}</p>
        </div>
        {data.amenityType !== "one time" && <div className='flex gap-1 items-center'>
          <IconButton aria-label="" onClick={()=>{
            ReservationFormik.setFieldValue("amenitiesList", ReservationFormik.values.amenitiesList.map((amenity: any) => {
              if (amenity.amenityId === data.amenityId  && data.quantity !== 1) {
                return {
                  ...amenity,
                  quantity: amenity.quantity - 1
                };
              }
              return amenity;
            }));
          }}>
            <RemoveCircleOutlineIcon/>
          </IconButton>
          <span>{data.quantity}</span>
          <IconButton aria-label="" onClick={()=>{
            ReservationFormik.setFieldValue("amenitiesList", ReservationFormik.values.amenitiesList.map((amenity: any) => {
              if (amenity.amenityId === data.amenityId) {
                return {
                  ...amenity,
                  quantity: amenity.quantity + 1
                };
              }
              return amenity;
            }));
          }}>
            <AddCircleOutlineIcon/>
          </IconButton>
        </div>}
      </div>
    </>
  }
  
  return {AmenitiesList,ReservationFormComp,setEventsPlaceData}
}
