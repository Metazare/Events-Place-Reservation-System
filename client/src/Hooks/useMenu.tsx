import React, { useEffect, useState } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface MenuVariablesType {
  anchorEl: HTMLElement | null;
  content: JSX.Element | null; // You can change the type of content based on what it actually is
}


{/* 
  Step 1: Import useMenu
  import useMenu from 'src/Hooks/useMenu';

  Step 2: Destructure the following from useMenu
  const {menuVariables,setMenuVariables,MenuComp,MenuItemComp,handleClose} = useMenu();

  Step 3: place the MenuComp inside of the return page you want to implement
  <MenuComp/>
  Step 4: Create a function that will return the content of the menu
  const ProfileMenu = () => {
    return<>
      <MenuItemComp handleClick={()=>{}}>
        <p>Change Password</p>
      </MenuItemComp>
      <MenuItemComp handleClick={()=>{}}>
        <p>Logout</p>
      </MenuItemComp>
    </>
  }
  Step 5: place this on the IconButton onClick event to open the menu
    setMenuVariables({...menuVariables,anchorEl:e.currentTarget,content:<ProfileMenu/>})
*/}
export default function useMenu() {
  const [menuVariables, setMenuVariables] = useState<MenuVariablesType>({
    anchorEl: null,
    content: null
  });
  const open = Boolean(menuVariables.anchorEl);
  const handleClose = () => {
    setMenuVariables({...menuVariables,anchorEl:null,content:null})
  };

  useEffect(()=>{
    console.log(menuVariables)
  },[menuVariables])
  function MenuItemComp({children,handleClick}:{children:JSX.Element,handleClick?:()=>void}){
    return<>
      <MenuItem onClick={handleClick}>
        {children}
      </MenuItem>
    </>
  }
  function MenuComp(){
    if(!menuVariables.content) return null;
    return<>
      <Menu
        anchorEl={menuVariables.anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {menuVariables.content}
      </Menu>
    </>
  }
  return {menuVariables,setMenuVariables,handleClose,MenuComp,MenuItemComp}
}
