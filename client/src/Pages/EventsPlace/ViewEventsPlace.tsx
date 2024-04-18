import React from 'react'
import Container from '@mui/material/Container'
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReportIcon from '@mui/icons-material/Report';
import IconButton from '@mui/material/IconButton'
export default function ViewEventsPlace() {
  return (
    <Container maxWidth="lg" sx={{flexGrow:"1",display:"flex",flexDirection:"column",gap:"1em",alignItems:"start",padding:"2em 1em"}}>
      <div className=' flex items-center gap-2 cursor-[pointer] opacity-70 hover:opacity-100'>
        <ArrowBackIcon sx={{fontSize:"25px"}}/>
        <p>Go Back</p>
      </div>
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
        <div className='grow h-full rounded' style={{background:`url("https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=612x612&w=0&k=20&c=cODMSPbYyrn1FHake1xYz9M8r15iOfGz9Aosy9Db7mI=") no-repeat`,backgroundSize:"cover",backgroundPosition:"center"}}/>
        <div className='w-[100%] md:w-[30%] hidden md:flex flex-col gap-4'>
          <div className='grow rounded' style={{background:`url("https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg") no-repeat`,backgroundSize:"cover",backgroundPosition:"center"}}/>
          <div className='grow rounded' style={{background:`url("https://assets.architecturaldigest.in/photos/65b2aecf269da4a0ee6c9b40/master/w_1600%2Cc_limit/atr.royalmansion-bedroom2-mr.jpg") no-repeat`,backgroundSize:"cover",backgroundPosition:"center"}}/>
        </div>
      </div>
      <div className='w-full  md:grid gap-5' style={{gridTemplateColumns:"1fr .6fr"}}>
        <div className='grow'>
          <h6  className='text-[20px] font-semibold mb-1'>About this place</h6>
          <p className='text-justify'>
            Our 3 bedroom beach front home is perfect for a family of 6-10 people. We have an outdoor space for fun activities and a 4ft pool with a section for small children and elderly. We also have 2 friendly dogs in the property that roam freely.
            
            The space Our beachfront vacation home is available for occupancy. Each spacious room has an en-suite toilet and shower.Covered by lush trees, we designed this home in a way where we encourage guests to enjoy the outdoor space and beach. The Nipa hut is another inviting space you can enjoy.
            Guest access

            Full access to the entire private property. Other things to note We have two (2) friendly dogs that roam freely in the property.We encourage unplugged outdoor family time that is why there is no TV. Bring your own personal gadgets if you wish to be connected. Internet is provided inside the home.
          </p>
        </div>
        <div className=' bg-[red]'>
          <div className='w-full sticky top-0'>
            wew
          </div>
        </div>
      </div>
    </Container>
  )
}
