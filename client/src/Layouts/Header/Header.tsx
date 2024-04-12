import React from 'react'
import { AppBar,Box, Toolbar,IconButton,Typography,Menu,MenuItem,Avatar,Container,Tooltip, Button} from '@mui/material';

// Images
import Logo from '../../Images/Logo/White.png'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate()
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const Login = true;

  return (
    <AppBar position="static" sx={{background:"#144273"}}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{gap:"1em"}}>
          <Box display="flex" sx={{flexGrow:1}}>
            <img src={Logo} width={"100px"} alt="" className='cursor-pointer' draggable={false}/>
          </Box>
          {Login?
            <>
              <Button variant="outlined" sx={{borderColor:"white",opacity:".9",borderRadius:"15px",padding:".4em 1.5em",color:"white", ":hover":{borderColor:"white"}}}>
                Renter Mode
              </Button>
              <div className='border-l-2 border-[white]/60 pl-2 ml-2'>
                <Tooltip title="Notification">
                  <IconButton aria-label="" onClick={()=>{}}>
                    <NotificationsIcon sx={{color:"white"}}/>
                  </IconButton>
                </Tooltip>
              </div>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={
                    (event: React.MouseEvent<HTMLElement>) => {
                      setAnchorElUser(event.currentTarget);
                    }} sx={{ p: 0 }}
                  >
                    <Avatar alt="UserProfile" src="/static/images/avatar/2.jpg" sx={{width:"30px",height:"30px"}}/>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={()=>{
                    navigate("/profile")
                    handleCloseUserMenu()
                  }}>
                    <Typography textAlign="center">
                      Profile
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>:<>
              <Button variant="contained" sx={{background:"white",color:"#144273",padding:".5em 2em",":hover":{color:"white"}}} onClick={()=>{navigate("/login")}}>
                Login
              </Button>
            </>
          }
          
        </Toolbar>
      </Container>
    </AppBar>
  )
}