import React from 'react'
import Header from 'src/Layouts/Header/Header'
import Avatar from '@mui/material/Avatar'
import GoBackComp from 'src/Components/GoBackComp'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tooltip from '@mui/material/Tooltip'
import { useFormik } from 'formik'
export default function Chat() {
  const ChatFormik = useFormik({
    initialValues: {
      message:"",
    },
    validate: (values) => {
      const errors:{ [key:string]:string}  = {};
      if(!values.message){
        errors.message = "Message is required"
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })
  return <>
    <div className='flex flex-col min-h-[100vh] h-[100vh%] '>
      <div className='grow bg-[white] grid grid-cols-ChatMD md:grid-cols-ChatLG'>
        <div  className='bg-[#E9E9E9]  h-[100%] flex flex-col'>
          <div className='px-5 py-3'>
            <div className='md:hidden'>
              <Tooltip title="Go Back">
                <IconButton aria-label="" onClick={()=>{}}>
                  <ArrowBackIcon/>
                </IconButton>
              </Tooltip>
            </div>
            {/* <div className='hidden md:flex justify start'>
              <GoBackComp/>
            </div> */}
            <p className="text-[20px] font-semibold hidden md:block mt-1 ">My Messeges</p>
          </div>
          <div className='flex flex-col mt-4 grow max-h-custom overflow-hidden '>
            <ChatMenu id={112} name={"Harold James H. Castillo"} message={"Hello"} img={"https://i.pravatar.cc/150?img=10"}/>
            <ChatMenu id={112} name={"Harold James H. Castillo"} message={"Hello"} img={"https://i.pravatar.cc/150?img=10"}/>
            <ChatMenu id={112} name={"Harold James H. Castillo"} message={"Hello"} img={"https://i.pravatar.cc/150?img=10"}/>
            <ChatMenu id={112} name={"Harold James H. Castillo"} message={"Hello"} img={"https://i.pravatar.cc/150?img=10"}/>
            <ChatMenu id={112} name={"Harold James H. Castillo"} message={"Hello"} img={"https://i.pravatar.cc/150?img=10"}/>
            <ChatMenu id={112} name={"Harold James H. Castillo"} message={"Hello"} img={"https://i.pravatar.cc/150?img=10"}/>

          </div>
        </div>
        <div className='flex flex-col grow'>
          <div className='p-3'>
            <p className='p-3 text-[20px] font-medium text-[black]/80'>Miles Morales</p>
          </div>
          <div className='p-3 grow border-y-2 border-[black]/10'>
            <MessageBubble isSender={true}/>
            <MessageBubble isSender={false}/>
          </div>
          <div className='p-3 flex gap-2'>
            <input type="text" className='w-full border border-[black]/10 p-2 rounded-xl' placeholder='Type a message'
              name='message'
              value={ChatFormik.values.message}
              onChange={ChatFormik.handleChange}
            />
            <IconButton aria-label="" onClick={()=>{ChatFormik.handleSubmit()}}>
              <SendIcon/>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  </>
}

function MessageBubble({isSender}){
  return <>
    <div className={`flex items-center gap-3 ${isSender && "justify-end"}`}>
      {!isSender && <Avatar src='https://i.pravatar.cc/150?img=10' sx={{width:"30px",height:"30px"}}/>}
      <p className='text-[14px] text-[black]/60 bg-[#D9D9D9] py-1 px-2 rounded-xl'>Hi</p>
    </div>
  </>
}
function ChatMenu({id, name, message,img}){
  return<>
    <Tooltip title={name}>
      <div className={`px-5 py-3  flex gap-2 items-center cursor-pointer hover:bg-[#D9D9D9]`} style={{transition:"all .3s ease-in-out"}}>
        <Avatar variant="circular" src={img} alt={name} sx={{ width: '40px', height: '40px' }} />
        <div className=' flex-col grow  w-full  max-w-[220px] hidden md:flex'>
          <p className='whitespace-nowrap overflow-hidden text-ellipsis text-[15px] leading-[13px] w-full'>{name}</p>
          <p className='whitespace-nowrap overflow-hidden text-ellipsis text-[12px]  w-full opacity-80 max-w-[80%]'>{message}</p>
        </div>
      </div>
    </Tooltip>
  </>
}