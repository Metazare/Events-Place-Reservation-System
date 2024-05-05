import React from 'react'
import { Button } from '@mui/material'
import { useFormik } from 'formik'
import TextField from 'src/Components/TextField'
interface PropsType {
  closeModal:() => void
  data: any
}
export default function UpdateEmail({closeModal, data}:PropsType) {
  const UpdateEmail = useFormik({
    initialValues: {
      email: 'Sample@gmail.com',
    },
    validate: values => {
      let error:{email?: string,} = {};
      if (!/\S+@\S+\.\S+/.test(values.email)) error.email = "Invalid email format";
      return error;
    },
    onSubmit: values => {
      closeModal()
    }
  })
  return <>
    <div className='grow'>
      <TextField 
        attr={{
          placeholder:"email@gmail.com",
          name:"email",
          value:UpdateEmail.values.email,
        }}
        label="Email" 
        type="text" 
        handleChange={UpdateEmail.handleChange}
        error={UpdateEmail.touched.email && UpdateEmail.errors.email !== undefined}
        errorMessages={typeof UpdateEmail.errors.email}
      />
    </div>
    <div className='flex gap-2 mt-10'>
      <Button variant="contained" onClick={()=>{closeModal()}} sx={{ marginTop:"1em", background:"white", color: "black", borderRadius:"10px",flexGrow:1,":hover":{color:"white"}}}>
        Cancel
      </Button>
      <Button variant="contained" onClick={()=>{UpdateEmail.handleSubmit()}} sx={{ marginTop:"1em", background:"#144273", color: "white", borderRadius:"10px",flexGrow:1}}>
        Update
      </Button>
    </div>
  </>
}

