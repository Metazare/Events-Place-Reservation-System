import React from 'react'
import Container from '@mui/material/Container'
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReportIcon from '@mui/icons-material/Report';
import IconButton from '@mui/material/IconButton'
import AmenitiesCard from 'src/Components/AmenitiesCard';
import { AmenityType } from 'src/Hooks/useTypes';
import ChatIcon from '@mui/icons-material/Chat';
import Avatar from '@mui/material/Avatar'
import ReviewCard from 'src/Components/ReviewCard';
import Rating from '@mui/material/Rating';
export default function ViewEventsPlace({data}:{data?:any}) {

  const SampleAmenitie: AmenityType[] = [
    {
      id:"1",
      name:"Complementary Drinks",
      amenityType:"perQuantity",
      rate:100
    },
    {
      id:"2",
      name:"Complementary Drinks",
      amenityType:"perDay",
      rate:100
    },
    {
      id:"3",
      name:"Complementary Drinks",
      amenityType:"oneTime",
      rate:100
    },
    {
      id:"4",
      name:"Complementary Drinks",
      amenityType:"oneTime",
      rate:100
    }
  ]
  console.log(data)
  return (
    <Container maxWidth="lg" sx={{flexGrow:"1",display:"flex",flexDirection:"column",gap:"2em",alignItems:"start",padding:"2em 1em"}}>
      {!data&&
        <div className=' flex items-center gap-2 cursor-[pointer] opacity-70 hover:opacity-100'>
          <ArrowBackIcon sx={{fontSize:"25px"}}/>
          <p>Go Back</p>
        </div>
      }
      
      <div className='w-full'>
        <div className='flex text-[#303030] items-start'>
          <h3 className='text-[27px] grow font-medium'>Eagles Nest, Luxury Villa, Koh Yao Noi</h3>
          <IconButton  sx={{marginTop:".1em"}} onClick={()=>{}}>
            <ReportIcon sx={{fontSize:"27px"}} />
          </IconButton>
        </div>
        <div className='flex gap-2 items-center color-[#303030]'>
          <StarIcon sx={{fontSize:"15 px"}}/>
          <p className='text-[15  px]'>4.5 (28 Reviews)</p>
        </div>
      </div>
      <div className='flex flex-col md:flex-row  aspect-video w-full gap-4'>
        {data? <>
            <div className='grow h-full rounded' style={{background:`url("${data.images[0]}") no-repeat`,backgroundSize:"cover",backgroundPosition:"center"}}/>
            <div className='w-[100%] md:w-[30%] hidden md:flex flex-col gap-4'>
              <div className='grow rounded' style={{background:`url("https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg") no-repeat`,backgroundSize:"cover",backgroundPosition:"center"}}/>
              <div className='grow rounded' style={{background:`url("https://assets.architecturaldigest.in/photos/65b2aecf269da4a0ee6c9b40/master/w_1600%2Cc_limit/atr.royalmansion-bedroom2-mr.jpg") no-repeat`,backgroundSize:"cover",backgroundPosition:"center"}}/>
            </div>
          </>
          :<>
          <div className='grow h-full rounded' style={{background:`url("https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg") no-repeat`,backgroundSize:"contain",backgroundPosition:"center"}}/>
            <div className='w-[100%] md:w-[30%] hidden md:flex flex-col gap-4'>
              <div className='grow rounded' style={{background:`url("https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg") no-repeat`,backgroundSize:"cover",backgroundPosition:"center"}}/>
              <div className='grow rounded' style={{background:`url("https://assets.architecturaldigest.in/photos/65b2aecf269da4a0ee6c9b40/master/w_1600%2Cc_limit/atr.royalmansion-bedroom2-mr.jpg") no-repeat`,backgroundSize:"cover",backgroundPosition:"center"}}/>
            </div>
          </>
        }
        
      </div>
      <div className='w-full flex md:grid gap-5' style={{gridTemplateColumns:"1fr .6fr"}}>
        <div className='grow flex flex-col gap-[2.5em]'>
          <div className='border-b border-[black]/10 pb-[2.5em]'>
            <h6  className='text-[20px] font-semibold mb-3'>About this place</h6>
            <p className='text-justify'>
              Our 3 bedroom beach front home is perfect for a family of 6-10 people. We have an outdoor space for fun activities and a 4ft pool with a section for small children and elderly. We also have 2 friendly dogs in the property that roam freely.
              
              The space Our beachfront vacation home is available for occupancy. Each spacious room has an en-suite toilet and shower.Covered by lush trees, we designed this home in a way where we encourage guests to enjoy the outdoor space and beach. The Nipa hut is another inviting space you can enjoy.
              Guest access

              Full access to the entire private property. Other things to note We have two (2) friendly dogs that roam freely in the property.We encourage unplugged outdoor family time that is why there is no TV. Bring your own personal gadgets if you wish to be connected. Internet is provided inside the home.
            </p>
          </div>
          <div className='border-b border-[black]/10 pb-[2.5em]'>
            <h6  className='text-[20px] font-semibold mb-3'>What this place can offer</h6>
            <div className='grid gap-3' style={{gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))"}}>
              {SampleAmenitie.map((data,index)=>(
                <AmenitiesCard data={data} key={index}/>
              ))}
            </div>
          </div>
          <div className='mt-[1em]'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-3 items-center'>
                <Avatar variant="circular" src="" alt="Wew" sx={{ width: '55px', height: '55px' }} />
                <div>
                  <h6 className='text-[20px] leading-[23px] font-semibold'>John Doe</h6>
                  <p className='text-[14px] leading-[13px] font-semibold opacity-65'>Host</p>
                </div>
              </div>
              <IconButton aria-label="" onClick={()=>{}}>
                <ChatIcon sx={{fontSize:"35px"}}/>
              </IconButton>
            </div>
            <p className='mt-[1em] text-justify'>"Meet our Events Host Extraordinaire! With a knack for creating unforgettable experiences, our host ensures every event is seamlessly executed. From welcoming guests with warmth to orchestrating activities with finesse, they guarantee a memorable occasion for all attendees. Trust our Events Host to infuse charm, professionalism, and enthusiasm into every event, leaving guests with lasting impressions and cherished memories."event is seamlessly executed. From welcoming guests with warmth to orchestrating activities with finesse, they guarantee a memorable occasion for all attendees. Trust our Events Host to infuse charm, professionalism, and enthusiasm into every event, leaving guests with lasting impressions and cherished memories."</p>
          </div>
        </div>
        <div className='hidden md:block'>
          <div className='w-full sticky top-[10px] rounded-xl shadow-sm bg-[white] min-h-[400px]'>
            
          </div>
        </div>
      </div>
      <div className='border-t mt-4 flex flex-col-reverse gap-12 md:gap-0 pt-[2.5em] border-[black]/10 w-full md:grid' style={{gridTemplateColumns:"1fr .5fr"}}>
        <div className='grid gap-4' style={{gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))"}}>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
          <ReviewCard/>
        </div>
        <div>
          <div className='w-full items-center sticky top-[10px] flex flex-col justify-center'>
            <h6 className='text-[66px] font-semibold leading-[88px]'>4.5</h6>
            <Rating name="read-only" value={4.5} precision={0.5} sx={{border:"white"}} readOnly />
            <p className='mt-2 text-[18px] opacity-80'>28 Reviews</p>
          </div>
        </div>
      </div>
    </Container>
  )
}
