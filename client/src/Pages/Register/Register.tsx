import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

//assets
import GoogleIcon from "../../Images/Logo/google.png"

// Components
import CardBaseLoginRegister from 'src/Layouts/CardBaseLoginRegister';
import TextField from 'src/Components/TextField';
import {  Button, Box} from '@mui/material';

export default function Register() {
  const navigate = useNavigate();
  const LoginForm = useFormik({
    initialValues: {
      firstName:'',
      middleName:'',
      lastName:'',
      suffix:'',
      contactNumber:'',
      email: '',
      password: '',
      confirmPassword:''
    },
    validate: values => {
      let error:{ firstName?:string, middleName?:string, lastName?:string, suffix?:string, contactNumber?:string, email?: string, password?:string, confirmPassword?:string} = {};

      if(!values.firstName) error.firstName = "First Name is required"
      if(!values.middleName) error.middleName = "Middle Name is required"
      if(!values.lastName) error.lastName = "Last Name is required"
      if(!values.suffix) error.suffix = "Middle Name is required"
      if(!values.contactNumber) error.contactNumber = "Contact Number is required"
      if(!values.confirmPassword) error.confirmPassword = "Confirm Password is required"
      if (!/\S+@\S+\.\S+/.test(values.email)) error.email = "Invalid email format";
      if(!values.email) error.email = "Email is required"
      if(!values.password) error.password = "Password is required"

      return error;
    },
    onSubmit: values => {
      console.log(values)
    }
  })

  return (
    <div className='grow w-full flex justify-center items-center p-4'>
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
                values:LoginForm.values.firstName,
              }}
              label="First Name" 
              type="text" 
              handleChange={LoginForm.handleChange}
              error={LoginForm.touched.firstName && LoginForm.errors.firstName !== undefined}
              errorMessages={LoginForm.errors.firstName}
            />
            <TextField 
              attr={{
                placeholder:"M",
                name:"middleName",
                values:LoginForm.values.middleName,
              }}
              label="Middle Name" 
              type="text" 
              handleChange={LoginForm.handleChange}
              error={LoginForm.touched.middleName && LoginForm.errors.middleName !== undefined}
              errorMessages={LoginForm.errors.middleName}
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
                values:LoginForm.values.lastName,
              }}
              label="Last Name" 
              type="text" 
              handleChange={LoginForm.handleChange}
              error={LoginForm.touched.lastName && LoginForm.errors.lastName !== undefined}
              errorMessages={LoginForm.errors.lastName}
            />
            <TextField 
              attr={{
                placeholder:"Jr.",
                name:"suffix",
                values:LoginForm.values.suffix,
              }}
              label="Suffix" 
              type="text" 
              handleChange={LoginForm.handleChange}
              error={LoginForm.touched.suffix && LoginForm.errors.suffix !== undefined}
              errorMessages={LoginForm.errors.suffix}
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
                values:LoginForm.values.email,
              }}
              label="Email" 
              type="text" 
              handleChange={LoginForm.handleChange}
              error={LoginForm.touched.email && LoginForm.errors.email !== undefined}
              errorMessages={LoginForm.errors.email}
            />
            <TextField 
              attr={{
                placeholder:"09152312322",
                name:"contactNumber",
                values:LoginForm.values.contactNumber,
              }}
              label="Contact Number" 
              type="text" 
              handleChange={LoginForm.handleChange}
              error={LoginForm.touched.contactNumber && LoginForm.errors.contactNumber !== undefined}
              errorMessages={LoginForm.errors.contactNumber}
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
                values:LoginForm.values.password,
              }}
              label="Password" 
              type="password" 
              handleChange={LoginForm.handleChange}
              error={LoginForm.touched.password && LoginForm.errors.password !== undefined}
              errorMessages={LoginForm.errors.password}
            />
            <TextField 
              attr={{
                placeholder:"Confirm Password",
                name:"confirmPassword",
                values:LoginForm.values.confirmPassword,
              }}
              label="Confirm Password" 
              type="password" 
              handleChange={LoginForm.handleChange}
              error={LoginForm.touched.confirmPassword && LoginForm.errors.confirmPassword !== undefined}
              errorMessages={LoginForm.errors.confirmPassword}
            />
          </Box>
          

          <Button variant="contained" onClick={()=>{LoginForm.handleSubmit()}} sx={{ marginTop:"1em", background:"#144273", color: "white", borderRadius:"10px"}}>
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
            <p>Goggle</p>
          </div>
        </div>
      </CardBaseLoginRegister>
    </div>
  );
};