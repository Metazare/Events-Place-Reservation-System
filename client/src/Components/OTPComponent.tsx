import React, { useLayoutEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useEffect } from 'react';

// Components
import CardBaseLoginRegister from 'src/Layouts/CardBaseLoginRegister';
import TextField from 'src/Components/TextField';
import { Button } from '@mui/material';

// Hooks
import useOTPGenerator from 'src/Hooks/useOTPGenerator';

type PropsType = {
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
}
export default function OTPComponent({setStatus, email}:PropsType) {
  const firstRun = useRef(false);
  const { generateOTP } = useOTPGenerator();
  const [resend, setResend] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState('');

  const otpCodeForm = useFormik({
    initialValues: {
      otpCode: "",
    },
    validate: (values) => {
      const errors:{ otpCode?:string}  = {};
      if (!values.otpCode) {
        errors.otpCode = "OTP Code is required";
      } else if (values.otpCode !== generatedOTP) {
        errors.otpCode = "OTP does not match";
      }
      return errors;
    },
    onSubmit: (values) => {
      setStatus(true)
    },
  });

  const resendOtp = () => {
    setGeneratedOTP(generateOTP(email));
  }

  useEffect(() => {
    if (!firstRun.current) {
      setGeneratedOTP(generateOTP(email));
    }

    return () => { firstRun.current = true; };
  }, []);

  return (
    <CardBaseLoginRegister title={"Forgot Password"} subTitle={"Enter Verification Code"}>
        <div className='flex flex-col items-start gap-2'>
          <TextField 
            attr={{
              name:"otpCode",
              value:otpCodeForm.values.otpCode,
              maxLength:"6"
            }}
            label="OTP Code" 
            type="text" 
            handleChange={otpCodeForm.handleChange}
            error={otpCodeForm.touched.otpCode && otpCodeForm.errors.otpCode !== undefined}
            errorMessages={otpCodeForm.errors.otpCode}
          />
          {resend?<p className='text-[13px] '>Dont received yet? <span className='cursor-pointer text-primary font-[500]'>Resend</span></p>:<p className='text-center opacity-70 text-[13px]'>Dont received yet? Resend (30 Seconds)</p>}
          <Button fullWidth variant="contained" onClick={()=>{otpCodeForm.handleSubmit()}} sx={{ marginTop:"2em", background:"#144273", color: "white", borderRadius:"10px"}}>
            Confirm
          </Button>
        </div>
      </CardBaseLoginRegister>
  )
}
