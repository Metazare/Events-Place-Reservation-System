import React, { useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search';
import { useFormik } from 'formik';
import useGreedyAlgorithm from './useGreedyAlgorithm';

export default function useSearch(data:any) {
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [filteredData, setFilteredData] = React.useState<any>(null);


  const SearchFunction =()=>{
    if(searchValue === "") return setFilteredData(null)
    const filtered = data.filter((item:any)=>{
      return item.name.toLowerCase().includes(searchValue.toLowerCase())
    })
    // console.log(filtered)
    setFilteredData(filtered)
  }

  const SearchComponent = () => {
    return <>
      <div className='flex rounded-full bg-[white] gap-1' >
        <input className='grow py-2 pl-4 outline-none bg-[transparent]'/>
        <IconButton aria-label="" onClick={()=>{}}>
          <SearchIcon/>
        </IconButton>
      </div>
    </>
  }
  return {filteredData,searchValue,setSearchValue,SearchComponent,SearchFunction,setFilteredData}
}
