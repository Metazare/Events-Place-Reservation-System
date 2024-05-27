import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

// Components
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import useModal from 'src/Hooks/useModal'
import UpdateProfileForm from './UpdateProfileForm'
import Layout from './Layout'
// Hooks
import useUser from 'src/Hooks/useUser'
import { useAuthContext } from 'src/Context/AuthContext'

export default function Profile() {
  const {userId} = useParams<{userId:string}>()
  const {authUser} = useAuthContext();
  const {data,loading,error,getUser} = useUser();
  const {setOpenModal,ModalComponent,closeModal} = useModal();

  useEffect(() => {
    if (userId)
      getUser(userId);
    else if (authUser) 
      getUser(authUser.userId);
    else
      toast.error("User not found");
  }, [])

  if (loading)
    return <div>Loading...</div>
  if (error)
    return <div>Error: {error.message}</div>

  return (
    <div className='grow'>
      {data && data[0] && (
        <Container maxWidth="xl" sx={{display:'flex', flexDirection:{xs:"column",sm:"row"},gap:".5em",padding:"1em"}}>
          <Paper variant="elevation" elevation={1} sx={{borderRadius:"15px",padding:"2em 1em 1em", width:{xs:"100%",sm:"250px" },display:"flex",flexDirection:"column",alignItems:"center"}}>
            <Avatar variant="circular" src={data[0]?.photo} alt="Sample" sx={{ width: '65px', height: '65px' }} />
            <div className='w-full mt-7'>
              <h6 className='text-[15px]'>{data[0]?.name?.first} {data[0].name?.middle} {data[0].name?.last} {data[0].name?.suffix}</h6>
              <p className='text-[10px] font-[500] opacity-65'>Full Name</p>
              <h6 className='text-[15px] mt-2'>{data[0]?.email}</h6>
              <p className='text-[10px] font-[500] opacity-65'>Email</p>
              <h6 className='text-[15px] mt-2'>{data[0]?.contact}</h6>
              <p className='text-[10px] font-[500] opacity-65'>Contact Number</p>
            </div>
            {(userId === undefined && authUser) || (userId === authUser?.userId) ? (
              <Button variant="outlined" color="primary" sx={{width:"100%",marginTop:"25px"}} onClick={()=>{setOpenModal(<Layout closeModal={closeModal} data={data}/>)}}>
                Update Profile
              </Button>
            ) : null}
          </Paper>
          <div className='p-4 grow'>
            <h6 className='text-[20px] font-[500] opacity-75'>Event Places</h6>
            {/* <h6 className='text-[20px] font-[500] opacity-75'>Previews Reviews </h6> */}
          </div>
        </Container>
      )}
      {ModalComponent()} 
    </div>
  )
}