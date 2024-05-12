import React, { useEffect,useState } from 'react'
import Container from '@mui/material/Container'
import EventCard from 'src/Components/EventCard'
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button'
import SideBarMenu from 'src/Components/SideBarMenu'
import { set } from 'date-fns';
import ReservationCard from 'src/Components/ReservationCard';
export default function MyListings() {
  const [toOpen,setToOpen] = useState("Upcoming")
  const [isHost,setIsHost] = useState(true)
  const MenuContent:any = {
    host:[
      {
        label:"Upcoming",
        data:[
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          },
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          },
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          },
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          }
        ]
      },
      {
        label:"Completed",
        data:[
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          },
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          },
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          },
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          }
        ]
      },
      {
        label:"Cancelled",
        data:[
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          },
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          },
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          },
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          }
        ]
      }
    ],
    hostEventsPlace:{
      label:"My Events Place",
      data:[
        {
          title:"Event Title",
          date:"2021-10-10",
          time:"10:00 AM",
          status:"Upcoming"
        },
      ]
    },
    renter:[
      {
        label:"Upcoming",
        data:[
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          },
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          },
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          }
        ]
      },
      {
        label:"To Rate",
        data:[
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          },
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          },
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          },
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          }
        ]
      },
      {
        label:"Completed",
        data:[
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          },
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          },
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          },
          {
            title:"Event Title",
            date:"2021-10-10",
            time:"10:00 AM",
            status:"Upcoming"
          }
        ]
      }
    ]
  }
  const [toShow,setToShow] = useState([])
  
  
  return (
    <Container  maxWidth="lg" sx={{flexGrow:"1",display:"flex"}}> 
      <div className='md:grid grow w-full gap-4 ' style={{padding:"1em 0",gridTemplateColumns:"250px 1fr"}}>
        <div className='border-r hidden md:block border-[black]/10 pt-3 '>
          <div className='sticky flex flex-col gap-2 top-[10px]  h-[100vh] max-h-[80vh]'>
            <h3 className='text-[19px] pl-4 font-semibold'>{isHost?"My Listings":"My Reservations"}</h3>
            <div className='mt-[1em] flex flex-col '>
              {MenuContent[isHost?"host":"renter"].map((data:any,index)=>(
                <SideBarMenu key={index} label={data.label} quantity={data.data.length} setOpen={setToOpen} value={toOpen} 
                  clickHandle={()=>{
                    setToShow(data.data)
                  }} 
                />
              ))}
            </div>
            <div className='p-4'>
              <div className='p-4 relative w-full mt-[4em]'>
                <p className='text-[white] text-[20px]'>{isHost?"My":"Become a"}</p>
                <h6 className='text-[white] text-[27px] font-bold mt-[-10px]'>{isHost?"Events Place":"Host Now!"}</h6>
                <div className='absolute w-full h-full top-0 left-0 bg-[#144273] z-[-1] rounded-xl'/>
                {isHost?
                  <Button  variant="contained" fullWidth sx={{background:"white",color:"black",marginTop:"1em" ,":hover":{background:"white"}}}
                    onClick={()=>{
                      setToOpen("My Events Place")
                    }}
                  >
                    View Lists
                  </Button>
                  :
                  <Button href="/becomehost" variant="contained" fullWidth sx={{background:"white",color:"black",marginTop:"1em" ,":hover":{background:"white"}}}>
                    Learn More
                  </Button>
                }
              </div>
            </div>
          </div>
        </div>
        <div className='py-[1em]'>
          <div className='mb-4 md:hidden'>
            <h3 className='text-[19px] font-semibold'>{isHost?"My Listings":"My Reservations"}</h3>
            <div className='flex flex-wrap gap-1 mt-2'>
              {MenuContent[isHost?"host":"renter"].map((data,index)=>(
                <Chip key={index} label={data.label} variant={toOpen === data.label? "filled":"outlined"} onClick={()=>{setToOpen(data.label)}} />
              ))}
            </div>
            
          </div>
          {toOpen === "My Events Place"? <EventCardList edit={true} isHost={isHost} data={toShow} setData={setToShow}/>:<EventCardList edit={false} isHost={isHost} data={toShow} setData={setToShow}/>}
        </div>
      </div>
    </Container>
  )
}


function EventCardList({isHost,data,edit,setData}: {isHost:boolean,data:any,edit:boolean,setData:any}){
  return<>
    <div className='grid gap-3 mb-7' style={isHost && !(isHost && edit)?{gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))"}:{gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))"}}>
      {data.map((data,index)=>(
        isHost?
          edit? <EventCard key={index}/>: <ReservationCard key={index} /> 
          :
          <EventCard  key={index}/>
      ))}
    </div>
  </>
}