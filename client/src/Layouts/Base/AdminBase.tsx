import React from 'react'
import { Outlet } from 'react-router-dom';
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link';
import Logo from '../../Images/Logo/Colored.png'
import CircleIcon from '@mui/icons-material/Circle';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useNavigate } from 'react-router-dom';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
export default function AdminBase() {
  const navigate = useNavigate();
  return (
    <div className='min-h-[100vh] flex md:grid' style={{gridTemplateColumns:"250px 1fr"}}>
      <div className='bg-[white] shadow-md hidden md:flex flex-col '>
        <div className=' w-full p-4 h-[100px] flex items-center'>
          <img width="70%" src={Logo} alt="" /> 
        </div>
        <div className='grow  py-4'>
          <MenuItem icon={<AssessmentIcon />} title={"Data List"} active={false} clickHandle={()=>{}}/>
          <MenuItem icon={<CircleIcon sx={{fontSize:"15px",marginLeft:"5px"}}/>} title={"Renters"} active={window.location.pathname === "/admin/renters"} clickHandle={()=>{navigate("/admin/renters")}}/>
          <MenuItem icon={<CircleIcon sx={{fontSize:"15px",marginLeft:"5px"}}/>} title={"Hosts"}  active={window.location.pathname === "/admin/hosts"} clickHandle={()=>{navigate("/admin/hosts")}}/>
          <MenuItem icon={<CircleIcon sx={{fontSize:"15px",marginLeft:"5px"}}/>} title={"Events Place"}  active={window.location.pathname === "/admin/eventsplace"} clickHandle={()=>{navigate("/admin/eventsplace")}}/>
          <MenuItem icon={<CircleIcon sx={{fontSize:"15px",marginLeft:"5px"}}/>} title={"Reservation Logs"}  active={window.location.pathname === "/admin/reservationlogs"} clickHandle={()=>{navigate("/admin/reservationlogs")}}/>
          <MenuItem icon={<FlagCircleIcon />} title={"Reprot"}  active={window.location.pathname === "/admin/report"} clickHandle={()=>{navigate("/admin/report")}}/>
        </div>
      </div>
      <div className='grow'>
        <div className='bg-[#EFEFEF] px-4 h-[100px] flex justify-between items-center'>
          <div>
            <h5 className='text-[20px] font-bold text-[#2D74B4]'>Dashboard</h5>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Create Event
              </Link>
              <Typography  className='text-primary'></Typography>
            </Breadcrumbs>
          </div>
          <div>
            <IconButton aria-label="" onClick={()=>{}}>
              <Avatar variant="circular" src="" alt="" sx={{ width: '40px', height: '40px' }} />
            </IconButton>
          </div>
        </div>
        <div className='p-4'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

function MenuItem({icon,title,clickHandle,active}){
  
  return(
    <div className={`flex gap-2 items-center border-r-4 cursor-pointer p-4 ${!active && "hover:bg-[black]/5 border-[transparent] text-[black]/60 "} ${active&&"bg-[#DDDDDD] text-[#0071BC] font-semibold border-[#0071BC]"}`} style={{transition:"all .3s ease-in-out"}} onClick={clickHandle}>
      {icon}
      <h6 className=''>{title}</h6>
    </div>
  )
}