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
import { useAuthContext } from 'src/Context/AuthContext';

interface Data {
  eventsPlaceId: string;
  name: string;
  description: string;
  location: string;
  rate: number;
  maxCapacity: number;
  images: string[];
}

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
      guestCount:1,
      renterID:"",
      hostID:"",
      eventsPlaceId:"",
      status:"",
      timeStamp:"",
      amenities:[],
      date: [new Date()],
    },
    validate: (values) => {
      const errors:{ [key:string]:string}  = {};
      return errors;
    },
    onSubmit: (values) => {
      let data = {
        ...values,
        date:getDate(),
        eventsPlaceId:EventsPlaceData.eventsPlaceId,
        rate:EventsPlaceData.rate,
        startDate: getDate()[0]?.getTime() ?? dateRange.startDate.getTime(),
        days:values.date.length || dateRange.endDate.getDate() - dateRange.startDate.getDate() + 1,
        AmenitiesList:values.amenities.map((amenity:any)=>{
          return {amenityId:amenity.amenityId,quantity:amenity.quantity}
        })
      }
      console.log(data)
      setOpenModal(<PaymentModal data={data}/>)
    },
  })
  function getDate(){
    if(selectedDate === "Single Day"){
      return getDatesToArray(datePicker,datePicker)
    }else if(selectedDate === "Multiple Days"){
      return getDatesToArray(dateRange.startDate,dateRange.endDate)
    }else{
      return getDatesToArray(new Date(),new Date())
    }
  }

  const ReservationFormComp = (data) => {
    const {authUser} = useAuthContext();
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
        name:"guestCount",
        value:ReservationFormik.values.guestCount,
        min:1,
        max:100
      }}
      label="Guests" 
      type="number" 
      handleChange={ReservationFormik.handleChange}
      error={ReservationFormik.touched.guestCount && ReservationFormik.errors.guestCount !== undefined}
      errorMessages={ReservationFormik.errors.guestCount}
    />
    {ReservationFormik.values.amenities.length > 0 && <>
      <div >
        <p className={`mb-2  font-[500] text-[#646464]`}>Amenities</p>
        <div className='flex flex-col gap-3'>
          {ReservationFormik.values.amenities.map((data:any,index:number)=>{
            return <>
              <AmenitiesField key={index}  data={data}/>
            </>
          })}
        </div>
      </div>
    </>}
    {data?.[0]?.host?.userId !== authUser?.userId &&
      <Button variant="contained" onClick={()=>{ReservationFormik.handleSubmit()}} sx={{borderRadius:"10px !important",marginTop:"2em",background:"#144273"}}>
        Reserve
      </Button>
    }
    
    {ModalComponent()} 
  </>
  }
  const AmenitiesList = () => {
    return <>
      <div className='grid gap-4' style={{gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))"}}>
        {EventsPlaceData?.amenities?.map((data:any,index)=>{
          let isSelected = ReservationFormik.values.amenities.find((amenity:any)=>amenity.amenityId === data.amenityId) !== undefined;
          return <AmenitiesCard data={data} key={index} 
              isSelected={isSelected} 
              clickHandler={()=>{
                if(isSelected){
                  ReservationFormik.setFieldValue("amenities",ReservationFormik.values.amenities.filter((amenity:any)=>amenity.amenityId !== data.amenityId))
                }
                else{
                  ReservationFormik.setFieldValue("amenities", [...ReservationFormik.values.amenities,{ ...data, quantity: 1 }])
                }
                // data !== null && ReservationFormik.setFieldValue("amenities",ReservationFormik.setFieldValue("amenities", [...ReservationFormik.values.amenities,{ amenityId: data.amenityId, quantity: 1 }]))
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
            ReservationFormik.setFieldValue("amenities", ReservationFormik.values.amenities.map((amenity: any) => {
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
            ReservationFormik.setFieldValue("amenities", ReservationFormik.values.amenities.map((amenity: any) => {
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
