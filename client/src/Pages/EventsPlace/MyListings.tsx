import React from 'react'
import Container from '@mui/material/Container'
import EventCard from 'src/Components/EventCard'
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button'
export default function MyListings() {
  const [toOpen,setToOpen] = React.useState("Upcoming")
  const [isHost,setIsHost] = React.useState(false)
  return (
    <Container  maxWidth="lg" sx={{flexGrow:"1",display:"flex"}}> 
      <div className='md:grid grow w-full gap-4 ' style={{padding:"1em 0",gridTemplateColumns:"250px 1fr"}}>
        <div className='border-r hidden md:block border-[black]/10 pt-3 '>
          <div className='sticky flex flex-col gap-2 top-[10px]  h-[100vh] max-h-[80vh]'>
            <h3 className='text-[19px] pl-4 font-semibold'>{isHost?"My Listings":"My Reservations"}</h3>
            <div className='mt-[1em] flex flex-col '>
              <SideBarMenu label="Upcoming" quantity={2} setOpen={setToOpen} value={toOpen}/>
              {!isHost && <SideBarMenu label="To Rate" quantity={3} setOpen={setToOpen} value={toOpen}/>}
              <SideBarMenu label="Completed" quantity={0} setOpen={setToOpen} value={toOpen}/>
              {isHost && <SideBarMenu label="Cancelled" quantity={0} setOpen={setToOpen} value={toOpen}/>}
              
            </div>
            <div className='p-4'>
              <div className='p-4 relative w-full mt-[4em]'>
                <p className='text-[white] text-[20px]'>Become a</p>
                <h6 className='text-[white] text-[27px] font-bold mt-[-10px]'>Host Now!</h6>
                <div className='absolute w-full h-full top-0 left-0 bg-[#144273] z-[-1] rounded-xl'/>
                <Button href='/becomehost' variant="contained" fullWidth sx={{background:"white",color:"black",marginTop:"1em" ,":hover":{background:"white"}}}>
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className='py-[1em]'>
          <div className='mb-4 md:hidden'>
            <h3 className='text-[19px] font-semibold'>{isHost?"My Listings":"My Reservations"}</h3>
            <div className='flex flex-wrap gap-1 mt-2'>
              <Chip label="Upcoming" variant={toOpen === "Upcoming"? "filled":"outlined"} onClick={()=>{setToOpen("Upcoming")}} />
              {!isHost && <Chip label="To Rate" variant={toOpen === "To Rate"? "filled":"outlined"} onClick={()=>{setToOpen("To Rate")}} />}
              <Chip label="Completed" variant={toOpen === "Completed"? "filled":"outlined"} onClick={()=>{setToOpen("Completed")}} />
              {isHost && <Chip label="Cancelled" variant={toOpen === "Cancelled"? "filled":"outlined"} onClick={()=>{setToOpen("Cancelled")}} />}
              
            </div>
          </div>
          <div className='grid gap-5 mb-7' style={{gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))"}}>
            {toOpen === "Upcoming" && <>
              <EventCard/>
              <EventCard/>
            </>}
            {toOpen === "To Rate" && <>
              <EventCard/>
              <EventCard/>
              <EventCard/>
            </>}
          </div>
        </div>
      </div>
    </Container>
  )
}

function SideBarMenu({label,quantity,setOpen,value} : {label:string,quantity:number,setOpen:Function,value:string}) {
  return <p
    className={`p-4 cursor-pointer bg-[transparent]   transition-colors ${value === label ? 'bg-primary text-[white]' : 'hover:bg-[#ececec]'}`}
    style={{ transition: 'all .3s ease-in' }}
    onClick={() => setOpen(label)}
  >
    {label} ({quantity})
  </p>
}
