import React from 'react'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search';
import { useFormik } from 'formik';
export default function useSearch() {
  const [search, setSearch] = React.useState<string>("");
  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: values => {
      setSearch(values.search)
    },  
  })
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
  return {SearchComponent}
}
