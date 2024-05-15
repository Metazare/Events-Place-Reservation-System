import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useSearch from 'src/Hooks/useSearch';
import IconButton from '@mui/material/IconButton'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import useModal from 'src/Hooks/useModal';
import HelpDeskModal from 'src/Components/HelpDeskModal';
export default function HelpDesk() {
  const {ModalComponent,setOpenModal,closeModal} = useModal();
  const {SearchComponent} = useSearch();
  return <>
    <div className='flex justify-start items-center gap-4'>
      <SearchComponent/>
      <IconButton aria-label="" onClick={()=>{}}>
        <FilterAltIcon/>
      </IconButton>
    </div>
    <TableContainer >
      <Table sx={{ minWidth: 650,maxWidth:1500}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Usename</TableCell>
            <TableCell align="left">Subject</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            sx={{ background:"#D7D7D7",cursor:"pointer" }}
            // component={Link} to={`/invoice`}
          >
            <TableCell component="th" scope="row"> {/* {id} */}3</TableCell>
            <TableCell align="left">
              <div className='flex gap-2 items-center'>
                <Avatar variant="circular" src="" alt="Sample" sx={{ width: '30px', height: '30px' }} />
                <p>Username</p>
              </div>
            </TableCell>
            <TableCell align="left">Sample Title</TableCell>
            <TableCell align="left">Oct 25, 2023 - 10:23 am </TableCell>
            <TableCell align="left">
              <div className='flex gap-2'>
                <Button variant="contained" onClick={()=>{setOpenModal(<HelpDeskModal closeModal={closeModal} toRespond={false}/>)}} sx={{background:"white",color:"gray",":hover":{background:"white"}}}>
                  View Report
                </Button>
                <Button variant="contained" color="primary" onClick={()=>{setOpenModal(<HelpDeskModal closeModal={closeModal} toRespond={true}/>)}}>
                  Respond
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    {ModalComponent()}
  </>
}
