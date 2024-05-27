import React,{useState} from 'react'
import UpdateProfileForm from './UpdateProfileForm'
import UpdateProfileImage from './UpdateProfileImage'
import Divider from 'src/Components/Divider'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import UpdateCredentials from './UpdateCredentials'
interface PropsType {
  closeModal:() => void
  data: any
}
export default function Layout({closeModal, data}:PropsType) {
  const [divider,setDivider] = useState("Basic Information");
  return (
    <div className='w-[90vw] md:w-[500px] flex flex-col gap-6 min-h-[50vh] p-4'>
      <div className='flex justify-between'>
        <h6 className='text-[25px] text-primary font-[700]'>Update Profile</h6>
        <IconButton aria-label="" onClick={closeModal}>
          <CloseIcon/>
        </IconButton>
      </div>
      <Divider value={divider} setValue={setDivider} items={["Basic Information","Credentials","Profile Image"]}/>

      {divider === "Basic Information" && <UpdateProfileForm closeModal={closeModal} data={data}/>}
      {divider === "Credentials" && <UpdateCredentials closeModal={closeModal} data={data}/>}
      {divider === "Profile Image" && <UpdateProfileImage closeModal={closeModal} data={data}/>}

    </div>
  )
}
