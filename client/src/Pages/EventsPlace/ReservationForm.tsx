import React,{useState} from 'react'
import TextField from 'src/Components/TextField';
export default function ReservationForm({ReservationFormik}:any){

  const [selectedDate, setSelectedDate] = useState<string>("");
  return <>
    <div className='w-full flex rounded-full border border-[black]/10'>
      <p style={{transition:"all .3s ease-in-out"}} className={`grow text-center rounded-full  py-[.5em]  cursor-pointer ${selectedDate ==="Single Day"?"bg-[#144273] text-[white]":""}`} onClick={()=>{setSelectedDate("Single Day")}}>Single Day</p>
      <p style={{transition:"all .3s ease-in-out"}} className={`grow text-center py-[.5em] rounded-full  cursor-pointer ${selectedDate ==="Multiple Days"?"bg-[#144273] text-[white]":""}`} onClick={()=>{setSelectedDate("Multiple Days")}}>Multiple Days</p>
    </div>

    <div>
      <TextField 
        attr={{
          placeholder:"",
          name:"",
          value:ReservationFormik.values.contact,
        }}
        label="" 
        type="text" 
        handleChange={ReservationFormik.handleChange}
        error={ReservationFormik.touched.contact && ReservationFormik.errors.contact !== undefined}
        errorMessages={ReservationFormik.errors.contact}
      />
    </div>
    <TextField 
      attr={{
        placeholder:"09152312322",
        name:"contact",
        value:ReservationFormik.values.contact,
      }}
      label="Contact Number" 
      type="text" 
      handleChange={ReservationFormik.handleChange}
      error={ReservationFormik.touched.contact && ReservationFormik.errors.contact !== undefined}
      errorMessages={ReservationFormik.errors.contact}
    />
  </>
}
