import React from 'react'
import { Button } from '@mui/material'
import { useFormik } from 'formik'
import TextField from 'src/Components/TextField'

import useUser from 'src/Hooks/useUser';

interface PropsType {
  closeModal:() => void
  data: any
}

export default function UpdateCredentials({closeModal, data}:PropsType) {
  const {editCredentials} = useUser();
  const UpdateCredentials = useFormik({
    initialValues: {
      email: data[0].email || '',
      password: '',
      confirmPassword:''
    },
    validate: values => {
      let error:{email?: string,password?:string, confirmPassword?:string} = {};
      if (!/\S+@\S+\.\S+/.test(values.email)) error.email = "Invalid email format";
      if(!values.confirmPassword) error.confirmPassword = "Confirm Password is required"
      if(!values.password) error.password = "Password is required"
      return error;
    },
    onSubmit: values => {
      editCredentials({email:values.email, password:values.password})
      closeModal()
    }
  })
  return <>
    <div className='flex flex-col gap-4 grow'>
      <TextField 
        attr={{
          placeholder:"email@gmail.com",
          name:"email",
          value:UpdateCredentials.values.email,
        }}
        label="Email" 
        type="text" 
        handleChange={UpdateCredentials.handleChange}
        error={UpdateCredentials.touched.email && UpdateCredentials.errors.email !== undefined}
        errorMessages={typeof UpdateCredentials.errors.email}
      />
      <TextField 
        attr={{
          placeholder:"Password",
          name:"password",
          value:UpdateCredentials.values.password,
        }}
        label="Password" 
        type="password" 
        handleChange={UpdateCredentials.handleChange}
        error={UpdateCredentials.touched.password && UpdateCredentials.errors.password !== undefined}
        errorMessages={typeof UpdateCredentials.errors.password}
      />
      <TextField 
        attr={{
          placeholder:"Confirm Password",
          name:"confirmPassword",
          value:UpdateCredentials.values.confirmPassword,
        }}
        label="Confirm Password" 
        type="password" 
        handleChange={UpdateCredentials.handleChange}
        error={UpdateCredentials.touched.confirmPassword && UpdateCredentials.errors.confirmPassword !== undefined}
        errorMessages={typeof UpdateCredentials.errors.confirmPassword}
      />
    </div>
    <div className='flex gap-2 mt-10'>
      <Button variant="contained" onClick={()=>{closeModal()}} sx={{ marginTop:"1em", background:"white", color: "black", borderRadius:"10px",flexGrow:1,":hover":{color:"white"}}}>
        Cancel
      </Button>
      <Button variant="contained" onClick={()=>{UpdateCredentials.handleSubmit()}} sx={{ marginTop:"1em", background:"#144273", color: "white", borderRadius:"10px",flexGrow:1}}>
        Update
      </Button>
    </div>
  </>
}

