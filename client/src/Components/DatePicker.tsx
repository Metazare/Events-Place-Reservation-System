import React,{useState} from 'react'
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { Calendar } from 'react-date-range';
import IconButton from '@mui/material/IconButton'
import EventIcon from '@mui/icons-material/Event';

interface PropsType{
  value:Date,
  handleChange:(value:Date)=>void
}
export default function DatePicker({value,handleChange}:PropsType) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [showCalendar, setShowCalendar] = useState({
    TextFieldFocus:false,
    calendarFocus:false
  })
  return <>
    <div className='relative w-full px-2 py-1 rounded-xl border-2 flex items-center gap-2 border-[#D9D9D9]'>
      <input type="text" className='grow bg-[transparent] ' disabled  placeholder='WEW'
        onFocus={()=>{setShowCalendar({...showCalendar,TextFieldFocus:true})}}
        onBlur={()=>{
          if(showCalendar.calendarFocus === false && showCalendar.TextFieldFocus === true){
            setShowCalendar({...showCalendar,TextFieldFocus:false})
          }
        }}
        value={
          months[value.getMonth()] + ' ' + value.getDate() + ', ' + value.getFullYear()
        }
      />
      <IconButton aria-label="" onClick={()=>{
        setShowCalendar({...showCalendar,TextFieldFocus:showCalendar.TextFieldFocus?false:true})
      }}>
        <EventIcon/>
      </IconButton>
      {showCalendar.TextFieldFocus && <div className='absolute top-12 right-0 z-10'  onMouseEnter={()=>{setShowCalendar({...showCalendar,calendarFocus:true})}} onMouseLeave={()=>{setShowCalendar({...showCalendar,calendarFocus:false})}}>
        <Calendar
          minDate={new Date()}
          date={value}
          onChange={(date)=>{handleChange(date)}}
        />  
      </div>}
    </div>
  </>
}
