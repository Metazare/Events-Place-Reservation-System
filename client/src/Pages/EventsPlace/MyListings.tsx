import React, {useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import EventCard from 'src/Components/EventCard'
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button'
import SideBarMenu from 'src/Components/SideBarMenu'
import ReservationCard from '../../Components/ReservationCard';

// Hooks
import useEventsPlace from 'src/Hooks/useEventsPlace';
import useSearch from 'src/Hooks/useSearch';
import { useAuthContext } from 'src/Context/AuthContext';
import useReservation from 'src/Hooks/useReservation';

export default function MyListings() {
  const {authUser} = useAuthContext();
  const {SearchComponent} = useSearch([]);
  const {data,loading,error,getEventsPlace} = useEventsPlace();

  const {data:reservation, getReservation} = useReservation();

  const [toOpen,setToOpen] = useState("Upcoming")
  const [isHost,setIsHost] = useState(
    localStorage.getItem('mode') === 'Host' ? true:false
  )

  const [MenuContent, SetMenuContent] = useState<any>()


  useEffect(()=>{
    if (reservation == null) {
      getEventsPlace();
      getReservation({
        userType:isHost?"host":"renter"
      })
    }
    else {
      
      SetMenuContent({
        host: [
          {
            label: "Pending",
            data: reservation.filter(item => item.status.reservation === "pending")
          },
          {
            label: "Reserved",
            data: reservation.filter(item => item.status.reservation === "reserved")
          },
          {
            label: "Cancelled",
            data: reservation.filter(item => item.status.reservation === "cancelled")
          }
        ],
        hostEventsPlace: {
          label: "My Events Place",
          data: data
        },
        renter: [
          {
            label: "To Pay",
            data: reservation.filter(item => item.status.reservation === "pending")
          },
          {
            label: "Reserved",
            data: reservation.filter(item => item.status.reservation === "reserved")
          },
          {
            label: "Cancelled",
            data: reservation.filter(item => item.status.reservation === "cancelled")
          },
          {
            label: "Failed",
            data: reservation.filter(item => item.status.reservation === "failed")
          }
        ]
      })
    }

    if (MenuContent) {
      setToShow(isHost ? MenuContent.host[0].data : MenuContent.renter[0].data);
    }
  },[reservation])

  const [toShow,setToShow] = useState<null|any>([])
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  return (
    <Container  maxWidth="lg" sx={{flexGrow:"1",display:"flex"}}> 
    {MenuContent && 
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
                      setToShow(MenuContent.hostEventsPlace.data)
                    }}
                  >
                    View Lists
                  </Button>
                  :
                  <Button href="/host" variant="contained" fullWidth sx={{background:"white",color:"black",marginTop:"1em" ,":hover":{background:"white"}}}>
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
                <Chip key={index} label={data.label} variant={toOpen === data.label? "filled":"outlined"} 
                onClick={()=>{
                  setToOpen(data.label)
                  setToShow(data.data)
                }} />
              ))}
              <Chip label={"My Events Place"} variant={toOpen === "My Events Place"? "filled":"outlined"} 
                onClick={()=>{
                  setToOpen("My Events Place")
                  setToShow(MenuContent.hostEventsPlace.data)
                }} 
              />
            </div>
          </div>
          <div className='flex justify-between mb-9'>
            <SearchComponent/>
            {toOpen === "My Events Place"&&
              <Button variant="contained" color="primary" href='/eventsplace/create' sx={{background:"#144273",padding:".5em 3em"}}>
                Add
              </Button>
            }
            
          </div>
          {toOpen === "My Events Place"? <EventCardList edit={true} isHost={isHost} data={toShow} setData={setToShow}/>:<EventCardList edit={false} isHost={isHost} data={toShow} setData={setToShow}/>}
        </div>
      </div> 
    }
    </Container>
  )
}


function EventCardList({isHost,data,edit,setData}: {isHost:boolean,data:any,edit:boolean,setData:any}){
  return<>
    <div className={`grid  mb-7`} style={isHost && !(isHost && edit)?{gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))",gap:"1em"}:{gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))",gap:"1.5em"}}>
      {data.map((data:any,index:any)=>(
        isHost?
          edit  
            ? <EventCard key={data._id} data={data} type="manage"/>
            : <ReservationCard 
                key={index} 
                data={{
                  ...data,
                  days: (new Date(data?.duration.end).getTime() - new Date(data?.duration.start).getTime()) / (1000 * 60 * 60 * 24),
                  rate: data?.eventsPlace?.rate
                }}
              /> 
          :
          <EventCard 
            type='booked' 
            key={index} 
            data={{...data?.eventsPlace, reservationId: data?.reservationId, duration: data?.duration, guestCount: data?.guestCount}}
          />
      ))}
    </div>
  </>
}