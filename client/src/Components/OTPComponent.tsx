import React from 'react';
import { useFormik } from 'formik';
import { useState } from 'react';
//assets

// Components
import CardBaseLoginRegister from 'src/Layouts/CardBaseLoginRegister';
import TextField from 'src/Components/TextField';
import { Button } from '@mui/material';

type PropsType = {
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;

}
export default function OTPComponent({setStatus}:PropsType) {
  const [resend, setResend] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState("123456") 
  const forgotPasswordForm = useFormik({
    initialValues: {
      otpCode: "",
    },
    validate: (values) => {
      const errors:{ otpCode?:string}  = {};
      if (!values.otpCode) {
        errors.otpCode = "OTP Code is required";
      } else if (values.otpCode.length == 6 && values.otpCode !== generatedOTP) {
        errors.otpCode = "OTP does not match";
      }
      return errors;
    },
    onSubmit: (values) => {
      setStatus(true)
    },
  });
  return (
    <CardBaseLoginRegister title={"Forgot Password"} subTitle={"Enter Verification Code"}>
        <div className='flex flex-col items-start gap-2'>
          <TextField 
            attr={{
              name:"otpCode",
              values:forgotPasswordForm.values.otpCode,
              maxLength:"6"
            }}
            label="OTP Code" 
            type="text" 
            handleChange={forgotPasswordForm.handleChange}
            error={forgotPasswordForm.touched.otpCode && forgotPasswordForm.errors.otpCode !== undefined}
            errorMessages={forgotPasswordForm.errors.otpCode}
          />
          {resend?<p className='text-[13px] '>Dont received yet? <span className='cursor-pointer text-primary font-[500]'>Resend</span></p>:<p className='text-center opacity-70 text-[13px]'>Dont received yet? Resend (30 Seconds)</p>}
          <Button fullWidth variant="contained" onClick={()=>{forgotPasswordForm.handleSubmit()}} sx={{ marginTop:"2em", background:"#144273", color: "white", borderRadius:"10px"}}>
            Confirm
          </Button>
        </div>
      </CardBaseLoginRegister>
  )
}
