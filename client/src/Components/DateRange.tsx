import React,{useState} from 'react'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file'
import IconButton from '@mui/material/IconButton'
import EventIcon from '@mui/icons-material/Event';
interface PropsType{
  dateValue: any,
  setDateValue: any
}
export default function DateRange({dateValue,setDateValue}:PropsType) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [showCalendar, setShowCalendar] = useState({
    TextFieldFocus:false, 
    calendarFocus:false
  })

  return (
    <div className='relative w-full px-2 py-1 rounded-xl border-2 flex items-center gap-2 border-[#D9D9D9]'>
      <input type="text" className='grow bg-[transparent] ' disabled  placeholder='WEW'
        value={`${months[dateValue.startDate.getMonth()]} ${dateValue.startDate.getDate()}, ${dateValue.startDate.getFullYear()} - ${months[dateValue.endDate.getMonth()]} ${dateValue.endDate.getDate()}, ${dateValue.endDate.getFullYear()}`}
      />
      <IconButton aria-label="" onClick={()=>{
        setShowCalendar({...showCalendar,TextFieldFocus:showCalendar.TextFieldFocus?false:true})
      }}>
        <EventIcon/> 
      </IconButton>
      {showCalendar.TextFieldFocus && <div className='absolute top-12 right-0 z-10'  onMouseEnter={()=>{setShowCalendar({...showCalendar,calendarFocus:true})}} onMouseLeave={()=>{setShowCalendar({...showCalendar,calendarFocus:false})}}>
        <DateRangePicker
          ranges={[dateValue]}
          minDate={new Date()}  
          onChange={(ranges)=>{
            setDateValue(ranges.selection)
          }}
        />
      </div>}

      
    </div>
  )
}

