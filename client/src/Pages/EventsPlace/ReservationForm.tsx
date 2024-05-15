import React,{useState} from 'react'
import TextField from 'src/Components/TextField';
import { useFormik } from 'formik';
import AmenitiesCard from 'src/Components/AmenitiesCard';
import { AmenityType } from 'src/Hooks/useTypes';
import Button from '@mui/material/Button'
import AmenitiesField from 'src/Components/AmenitiesField';
import useModal from 'src/Hooks/useModal';
import DatePicker from 'src/Components/DatePicker';
import DateRange from 'src/Components/DateRange';
import useDates from 'src/Hooks/useDates';
import PaymentModal from './PaymentModal';
export default function ReservationForm(){
  const {setOpenModal,ModalComponent,closeModal} = useModal();
  const {getDatesToArray} = useDates()
  const [selectedDate, setSelectedDate] = useState<string>("Single Day");
  const [Data, setData] = useState<any>("sample");

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })
  const [datePicker, setDatePicker] = useState(new Date())

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
      console.log({...values,date:getDate()})
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
      }}
      label="Guests" 
      type="number" 
      handleChange={ReservationFormik.handleChange}
      error={ReservationFormik.touched.guestsNumber && ReservationFormik.errors.guestsNumber !== undefined}
      errorMessages={ReservationFormik.errors.guestsNumber}
    />
    <div >
      <p className={`mb-2  font-[500] text-[#646464]`}>Amenities</p>
      <div className='flex flex-col gap-3'>
        <AmenitiesField />
      </div>
    </div>
    <Button variant="contained" onClick={()=>{ReservationFormik.handleSubmit()}} sx={{borderRadius:"10px !important",marginTop:"2em",background:"#144273"}}>
      Reserve
    </Button>
    {ModalComponent()} 
  </>
  }
  const AmenitiesList = () => {
    return <>
      {Data?.amenities!==undefined && Data?.amenities?.length > 0 &&
        <div className='grid gap-4' style={{gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))"}}>
          {Data?.amenities?.map((data:AmenityType,index)=>(
            <AmenitiesCard data={data} key={index} 
              isSelected={true} 
              click={()=>{
                data !== null && ReservationFormik.setFieldValue("amenitiesList",[...ReservationFormik.values.amenitiesList,{id:data.id}])
              }}
            />
          ))}
        </div> 
      }
    </>
  }
  
  return {AmenitiesList,ReservationFormComp,setData}
}
