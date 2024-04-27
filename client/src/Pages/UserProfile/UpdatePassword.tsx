import React from 'react'
import { useFormik } from 'formik'
import { Button } from '@mui/material'
import TextField from 'src/Components/TextField'
interface PropsType {
  closeModal:() => void
  data: any
}
export default function UpdatePassword({closeModal, data}:PropsType) {
  const UpdatePassword = useFormik({
    initialValues: {
      password: '',
      confirmPassword:''
    },
    validate: values => {
      let error:{ password?:string, confirmPassword?:string} = {};
      if(!values.confirmPassword) error.confirmPassword = "Confirm Password is required"
      if(!values.password) error.password = "Password is required"

      return error;
    },
    onSubmit: values => {
      closeModal()
    }
  })
  return <>
    <div className='grow flex flex-col gap-4'>
      <TextField 
        attr={{
          placeholder:"Password",
          name:"password",
          value:UpdatePassword.values.password,
        }}
        label="Password" 
        type="password" 
        handleChange={UpdatePassword.handleChange}
        error={UpdatePassword.touched.password && UpdatePassword.errors.password !== undefined}
        errorMessages={typeof UpdatePassword.errors.password}
      />
      <TextField 
        attr={{
          placeholder:"Confirm Password",
          name:"confirmPassword",
          value:UpdatePassword.values.confirmPassword,
        }}
        label="Confirm Password" 
        type="password" 
        handleChange={UpdatePassword.handleChange}
        error={UpdatePassword.touched.confirmPassword && UpdatePassword.errors.confirmPassword !== undefined}
        errorMessages={typeof UpdatePassword.errors.confirmPassword}
      />
    </div>
    <div className='flex gap-2 mt-10'>
      <Button variant="contained" onClick={()=>{closeModal()}} sx={{ marginTop:"1em", background:"white", color: "black", borderRadius:"10px",flexGrow:1,":hover":{color:"white"}}}>
        Cancel
      </Button>
      <Button variant="contained" onClick={()=>{UpdatePassword.handleSubmit()}} sx={{ marginTop:"1em", background:"#144273", color: "white", borderRadius:"10px",flexGrow:1}}>
        Update
      </Button>
    </div>
  </>
}
