import React from 'react'
import useSearch from 'src/Hooks/useSearch';
import IconButton from '@mui/material/IconButton'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import EventCard from 'src/Components/EventCard';
export default function EventsPlace() {
  const {SearchComponent} = useSearch([]);
  return <>
    <div className='flex justify-between md:justify-start items-center gap-4'>
      <SearchComponent/>
      <IconButton aria-label="" onClick={()=>{}}>
        <FilterAltIcon/>
      </IconButton>
    </div>
    <div className='grid gap-5 mb-7 mt-5' style={{gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))"}}>
      <EventCard data={[]} type='view'/>
      <EventCard data={[]} type='view'/>
      <EventCard data={[]} type='view'/>
      <EventCard data={[]} type='view'/>
    </div>
  </>
}
