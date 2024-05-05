import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

//assets
import GoogleIcon from "../../Images/Logo/google.png"

// Components
import CardBaseLoginRegister from 'src/Layouts/CardBaseLoginRegister';
import TextField from 'src/Components/TextField';
import {  Button, Box} from '@mui/material';

// Hooks
import { useRegister } from '../../Hooks/useAuth';
import OTPComponent from 'src/Components/OTPComponent';

export default function Register() {

  const navigate = useNavigate();
  const { register, isEmailUnique } = useRegister();

  const [openOtp, setOpenOtp] = useState(false)
  const [otpStatus, setOtpStatus] = useState(false)
  const RegisterForm = useFormik({
    initialValues: {
      firstName:'',
      middleName:'',
      lastName:'',
      suffixName:'',
      contact:'',
      email: '',
      password: '',
      confirmPassword:''
    },
    validate: values => {
      let error:{ firstName?:string, middleName?:string, lastName?:string, suffixName?:string, contact?:string, email?: string, password?:string, confirmPassword?:string} = {};

      if(!values.firstName) error.firstName = "First Name is required"
      if(!values.lastName) error.lastName = "Last Name is required"
      if(!values.contact) error.contact = "Contact Number is required"
      if(!values.confirmPassword) error.confirmPassword = "Confirm Password is required"
      if (!/\S+@\S+\.\S+/.test(values.email)) error.email = "Invalid email format";
      if(!values.email) error.email = "Email is required"
      if(!values.password) error.password = "Password is required"
      if (values.password !== values.confirmPassword) {
        error.confirmPassword = "Password does not match";
      }

      return error;
    },
    onSubmit: async (values) => {
      const isUniqueEmail = await isEmailUnique(values.email);
      if (isUniqueEmail) {
        setOpenOtp(true);
      } else {
        toast.error("Email is already taken");
      }
    }
  })
  useEffect(() => {
    if(otpStatus){
      const { confirmPassword, ...formData } = RegisterForm.values;
      register({ ...formData, role: 'renter' });
    }
  }, [otpStatus])

  return (
    <div className='grow w-full flex justify-center items-center p-4'>
      {openOtp?
        <OTPComponent setStatus={setOtpStatus} email={RegisterForm.values.email}/>
        :
        <CardBaseLoginRegister title={"We Get You Started!"} subTitle={"Signup now to get you onboard."} otherStyle="max-w-[500px]">
          <div className='flex flex-col gap-2'>
            {/* First Name & Middle Name */}
            <Box className='grid' sx={{ 
              display: 'grid',
              gap:"1em",
              gridTemplateColumns: { 
                xs: '1fr', // When screen size is small, each column takes 1fr
                sm: '67% 30%' // When screen size is large, first column takes 60% and second column takes 40%
              },
            }}>
              <TextField 
                attr={{
                  placeholder:"John Michael",
                  name:"firstName",
                  value:RegisterForm.values.firstName,
                }}
                label="First Name" 
                type="text" 
                handleChange={RegisterForm.handleChange}
                error={RegisterForm.touched.firstName && RegisterForm.errors.firstName !== undefined}
                errorMessages={RegisterForm.errors.firstName}
              />
              <TextField 
                attr={{
                  placeholder:"M",
                  name:"middleName",
                  value:RegisterForm.values.middleName,
                }}
                label="Middle Name" 
                type="text" 
                handleChange={RegisterForm.handleChange}
                error={RegisterForm.touched.middleName && RegisterForm.errors.middleName !== undefined}
                errorMessages={RegisterForm.errors.middleName}
              />
            </Box>
            {/* Last Name & Suffix */}
            <Box className='grid' sx={{ 
              display: 'grid',
              gap:"1em",
              gridTemplateColumns: { 
                xs: '1fr', // When screen size is small, each column takes 1fr
                sm: '67% 30%' // When screen size is large, first column takes 60% and second column takes 40%
              },
            }}>
              <TextField 
                attr={{
                  placeholder:"Rowel",
                  name:"lastName",
                  value:RegisterForm.values.lastName,
                }}
                label="Last Name" 
                type="text" 
                handleChange={RegisterForm.handleChange}
                error={RegisterForm.touched.lastName && RegisterForm.errors.lastName !== undefined}
                errorMessages={RegisterForm.errors.lastName}
              />
              <TextField 
                attr={{
                  placeholder:"Jr.",
                  name:"suffixName",
                  value:RegisterForm.values.suffixName,
                }}
                label="Suffix" 
                type="text" 
                handleChange={RegisterForm.handleChange}
                error={RegisterForm.touched.suffixName && RegisterForm.errors.suffixName !== undefined}
                errorMessages={RegisterForm.errors.suffixName}
              />
            </Box>
            {/* Email & Contact Number */}
            <Box className='grid' sx={{ 
              display: 'grid',
              gap:"1em",
              gridTemplateColumns: { 
                xs: '1fr', // When screen size is small, each column takes 1fr
                sm: '49% 49%' // When screen size is large, first column takes 60% and second column takes 40%
              },
            }}>
              <TextField 
                attr={{
                  placeholder:"email@gmail.com",
                  name:"email",
                  value:RegisterForm.values.email,
                }}
                label="Email" 
                type="text" 
                handleChange={RegisterForm.handleChange}
                error={RegisterForm.touched.email && RegisterForm.errors.email !== undefined}
                errorMessages={RegisterForm.errors.email}
              />
              <TextField 
                attr={{
                  placeholder:"09152312322",
                  name:"contact",
                  value:RegisterForm.values.contact,
                }}
                label="Contact Number" 
                type="text" 
                handleChange={RegisterForm.handleChange}
                error={RegisterForm.touched.contact && RegisterForm.errors.contact !== undefined}
                errorMessages={RegisterForm.errors.contact}
              />
            </Box>
            {/* Password & Confirm Password */}
            <Box className='grid' sx={{ 
              display: 'grid',
              gap:"1em",
              gridTemplateColumns: { 
                xs: '1fr', // When screen size is small, each column takes 1fr
                sm: '49% 49%' // When screen size is large, first column takes 60% and second column takes 40%
              },
            }}>
              <TextField 
                attr={{
                  placeholder:"Password",
                  name:"password",
                  value:RegisterForm.values.password,
                }}
                label="Password" 
                type="password" 
                handleChange={RegisterForm.handleChange}
                error={RegisterForm.touched.password && RegisterForm.errors.password !== undefined}
                errorMessages={RegisterForm.errors.password}
              />
              <TextField 
                attr={{
                  placeholder:"Confirm Password",
                  name:"confirmPassword",
                  value:RegisterForm.values.confirmPassword,
                }}
                label="Confirm Password" 
                type="password" 
                handleChange={RegisterForm.handleChange}
                error={RegisterForm.touched.confirmPassword && RegisterForm.errors.confirmPassword !== undefined}
                errorMessages={RegisterForm.errors.confirmPassword}
              />
            </Box>
            

            <Button variant="contained" onClick={()=>{RegisterForm.handleSubmit()}} sx={{ marginTop:"1em", background:"#144273", color: "white", borderRadius:"10px"}}>
              Sign Up
            </Button>
            <p className='text-[13px] mt-[10px]'><span className='opacity-50'>Do you have an account? </span> <span className='opacity-100 cursor-pointer text-primary font-[500]' onClick={()=>{navigate("/login")}}>Login now!</span></p>
            <div className='mt-[.5em] flex gap-5 items-center'>
              <hr className='grow opacity-50'/>
              <p className='opacity-50'>or continue with</p>
              <hr className='grow opacity-50'/>
            </div>

            <div className='w-full flex gap-3 justify-center bg-[#F7F7F7] p-2 cursor-pointer hover:bg-[#e9e9e9] mt-3 rounded-xl opacity-90 font-[4  00]' style={{transition:"all .3s ease-in-out"}}>
              <img src={GoogleIcon} alt="" width={"25px"}/>
              <p>Google</p>
            </div>
          </div>
        </CardBaseLoginRegister>        
        }
    </div>
  );
};