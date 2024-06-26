import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container'
import Image from '../../Images/pattern.png'
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton'
import FilterListIcon from '@mui/icons-material/FilterList';
import Tooltip from '@mui/material/Tooltip'
import EventCard from 'src/Components/EventCard';

// Hooks
import useEventsPlace from 'src/Hooks/useEventsPlace';
import useSearch from 'src/Hooks/useSearch';
import useGreedyAlgorithm from 'src/Hooks/useGreedyAlgorithm';
export default function LandingPage() {
  const {sortData} = useGreedyAlgorithm();
  const {data,loading,error,getEventsPlace} = useEventsPlace();
  useEffect(()=>{
    getEventsPlace('');
  },[])

  const {filteredData,setSearchValue,SearchFunction,setFilteredData} = useSearch(data);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <div className='grow'>
      <div className='relative h-[250px] w-full gap-5 LandingPageHeader flex justify-center items-center z-1 p-4' style={{background:`url(${Image})`}}>
        <div className='flex max-w-[500px] w-full gap-1 items-center bg-[white] rounded-full pr-3 '>
          <input name='search' id='search' type="text" className=' grow outline-none p-4 bg-[transparent]' placeholder='Search...'
            onChange={(e)=>{
              if(e.target.value === "") setFilteredData(null)
              setSearchValue(e.target.value)
            }}
            onKeyDown={(e)=>{
              if(e.key === 'Enter') SearchFunction()
            }}
          />
          <IconButton aria-label="" onClick={()=>{
            SearchFunction()
          }}>
            <SearchIcon sx={{opacity:".9"}} />
          </IconButton>
        </div>
        <Tooltip title="Filter">
          <IconButton aria-label="" onClick={()=>{}} sx={{color:"white"}}>
            <FilterListIcon sx={{fontSize:"30px"}}/>
          </IconButton>
        </Tooltip>
      </div>
      <Container maxWidth="lg" sx={{padding:"1.5em"}}>
        {filteredData?<>
          <h5 className='text-[17] mb-4 font-bold opacity-70'>Search Result</h5>
          {filteredData?.length === 0?<p>No result found</p>:
            <div className='grid gap-5 mb-7' style={{gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))"}}>
              {filteredData?.map((place:any)=><EventCard key={place._id} data={place} type="view"/>)}
            </div>
          }
          
        </>:<>
          <h5 className='text-[17] mb-4 font-bold opacity-70'>Recommended Places</h5>
          <div className='grid gap-5 mb-7' style={{gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))"}}>
            {data&&sortData(data,'name','asc')?.map((place:any)=><EventCard key={place._id} data={place} type="view"/>)}
          </div>
          <h5 className='text-[17] mb-4 font-bold opacity-70'>New Added Places</h5>
          <div className='grid gap-5' style={{gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))"}}>
            {data&&sortData(data,'name','asc')?.map((place:any)=><EventCard key={place._id} data={place} type="view"/>)}
          </div>
        </>}
      </Container>
    </div>
  );
}
