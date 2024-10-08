import React, {useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import useSearch from 'src/Hooks/useSearch';
import IconButton from '@mui/material/IconButton'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Avatar from '@mui/material/Avatar'
import useReservation from 'src/Hooks/useReservation';


export default function ReservationLogs() {
  const { SearchComponent } = useSearch([]);
  const { data, loading, error, getReservation } = useReservation();
  
  useEffect(() => {
    getReservation({userType: 'all'});
  }, []);

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
            <TableCell align="left">Event Place ID</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Status</TableCell>
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
            <TableCell align="left">eventsID</TableCell>
            <TableCell align="left">Oct 25, 2023</TableCell>
            <TableCell align="left"><span className='font-semibold'>Upcomming</span></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </>
}
