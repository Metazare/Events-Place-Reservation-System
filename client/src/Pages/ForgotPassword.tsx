
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import OTPComponent from 'src/Components/OTPComponent';
import { useState } from 'react';
// Components
import CardBaseLoginRegister from 'src/Layouts/CardBaseLoginRegister';
import TextField from 'src/Components/TextField';
import {  Button} from '@mui/material';

// Hooks
export default function ForgotPassword() {
  const [OTPResult, setOTPResult] = useState(false)
  const ForgotPasswordForm = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: ''
    },
    validate: values => {
      let error:{newPassword?:string,confirmPassword?:string} = {};
      if(values.confirmPassword !== values.newPassword) error.confirmPassword = "Password not match"
      if(!values.newPassword) error.newPassword = "New Password is required"
      if(!values.confirmPassword) error.confirmPassword = "Confirm Password is required"
      return error;
    },
    onSubmit: values => {
      
      alert("success")
    }
  })
  return (
    <div className='grow w-full flex justify-center items-center p-4'>
      {OTPResult?
        <CardBaseLoginRegister title={"Forgot Password"} subTitle={"Enter Verification Code"}>
          <div className='flex flex-col items-start gap-2'>
            <TextField 
              attr={{
                placeholder:"New Password",
                name:"newPassword",
                value:ForgotPasswordForm.values.newPassword,
              }}
              label="Password" 
              type="password" 
              handleChange={ForgotPasswordForm.handleChange}
              error={ForgotPasswordForm.touched.newPassword && ForgotPasswordForm.errors.newPassword !== undefined}
              errorMessages={ForgotPasswordForm.errors.newPassword}
            />
            <TextField 
              attr={{
                placeholder:"Confirm Password",
                name:"confirmPassword",
                value:ForgotPasswordForm.values.confirmPassword,
              }}
              label="Confirm Password" 
              type="password" 
              handleChange={ForgotPasswordForm.handleChange}
              error={ForgotPasswordForm.touched.confirmPassword && ForgotPasswordForm.errors.confirmPassword !== undefined}
              errorMessages={ForgotPasswordForm.errors.confirmPassword}
            />
            <Button fullWidth variant="contained" onClick={()=>{ForgotPasswordForm.handleSubmit()}} sx={{ marginTop:"2em", background:"#144273", color: "white", borderRadius:"10px"}}>
              Confirm
            </Button>
          </div>
        </CardBaseLoginRegister>
        :
        <OTPComponent setStatus={setOTPResult} email='haroldjamescastillo@gmail.com'/>
      }
    </div>
  )
}
