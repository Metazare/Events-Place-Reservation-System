import React from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import useModal from 'src/Hooks/useModal'
import UpdateProfileForm from './UpdateProfileForm'

export default function Profile() {
  const {setOpenModal,ModalComponent,closeModal} = useModal();
  return (
    <div className='grow'>
      <Container maxWidth="xl" sx={{display:'flex', flexDirection:{xs:"column",sm:"row"},gap:".5em",padding:"1em"}}>
        <Paper variant="elevation" elevation={1} sx={{borderRadius:"15px",padding:"2em 1em 1em", width:{xs:"100%",sm:"250px" },display:"flex",flexDirection:"column",alignItems:"center"}}>
          <Avatar variant="circular" src="" alt="Sample" sx={{ width: '65px', height: '65px' }} />
          <div className='w-full mt-7'>
            <h6 className='text-[15px]'>Miles Morales</h6>
            <p className='text-[10px] font-[500] opacity-65'>Full Name</p>
            <h6 className='text-[15px] mt-2'>milesmorales@gmail.com</h6>
            <p className='text-[10px] font-[500] opacity-65'>Email</p>
            <h6 className='text-[15px] mt-2'>0923-232-1231</h6>
            <p className='text-[10px] font-[500] opacity-65'>Contact Number</p>
          </div>
          <Button variant="outlined" color="primary" sx={{width:"100%",marginTop:"25px"}} onClick={()=>{setOpenModal(<UpdateProfileForm closeModal={closeModal}/>)}}>
            Update Profile
          </Button>
        </Paper>
        <div className='p-4 grow'>
          <h6 className='text-[20px] font-[500] opacity-75'>Event Place</h6>
          <h6 className='text-[20px] font-[500] opacity-75'>Previews Reviews </h6>
        </div>
      </Container>
      {ModalComponent()} 
    </div>
  )
}
