import { useState } from 'react'
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper'



/*
  ? How to Setup

  * Step #1
  - import this useCustom Hook
  
  * Step #2
  - Initialize  
  const {setOpenModal,ModalComponent,closeModal} = useModal();

  * Step #3
  - place this somewhere in the page
  {ModalComponent()} 

  * Step #4 
  - place this whenever you want to popup the modal
  setOpenModal(<SampleModalContent modalClose={closeModal}/>)}
*/

function useModal() {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p:"1.5em 1.5em",
    borderRadius:"15px"
  };
  const [openModal,setOpenModal] = useState<JSX.Element|"closed">("closed");

  const closeModal = () =>{
    setOpenModal("closed")
  }
  const ModalComponent = () =>{
    return(
        <Modal
          open={openModal !== "closed"}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper variant="elevation" elevation={3} sx={style}>
            {openModal !== "closed"?openModal:""}
          </Paper>
        </Modal>
    )
  }

  return {setOpenModal,ModalComponent,closeModal}
}

export default useModal