import React from 'react'
import IconButton from '@mui/material/IconButton'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
export default function ViewImageModal({data,index}:{data:any,index:number}) {
  const [counter, setCounter] = React.useState(index)
  return (
    <div className='w-[90vw] h-[80vh] rounded-xl' style={{background:`url("${data[counter]}") no-repeat`,backgroundSize:"cover",backgroundPosition:"center"}}>
      <IconButton aria-label="" sx={{position:"absolute",top:"50%",left:"-40px",transform:"translateY(-50%)"}} 
        onClick={()=>{
          if(counter !==0){
            setCounter(counter-1)
          }else{
            setCounter(data.length-1)
          }
        }}
      >
        <div className='relative rounded-full bg-[white] w-[70px] h-[70px]'>
          <NavigateBeforeIcon sx={{fontSize:"30px",position:"absolute",top:"50%",left:"54%", transform:"translate(-50%,-50%)"}}/>
        </div>
      </IconButton>
      <IconButton aria-label="" sx={{position:"absolute",top:"50%",right:"-40px",transform:"translateY(-50%)"}} 
        onClick={()=>{
          if(counter !==data.length-1){
            setCounter(counter+1)
          }else{
            setCounter(0)
          }
        }}
      >
        <div className='relative rounded-full bg-[white] w-[70px] h-[70px]'>
          <NavigateNextIcon sx={{fontSize:"30px",position:"absolute",top:"50%",left:"54%", transform:"translate(-50%,-50%)"}}/>
        </div>
      </IconButton>
    </div>
  )
}
