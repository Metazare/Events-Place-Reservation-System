import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

//assets
import GoogleIcon from "../../Images/Logo/google.png"

// Components
import CardBaseLoginRegister from 'src/Layouts/CardBaseLoginRegister';
import TextField from 'src/Components/TextField';
import {  Button, Box} from '@mui/material';

interface PropsType {
  closeModal:() => void
}
export default function UpdateProfileForm({closeModal}:PropsType) {
  const UpdateProfileForm = useFormik({
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
    <div>
      <h6 className='text-[25px] text-primary font-[700] mb-5'>Update Profile</h6>
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
              values:UpdateProfileForm.values.firstName,
            }}
            label="First Name" 
            type="text" 
            handleChange={UpdateProfileForm.handleChange}
            error={UpdateProfileForm.touched.firstName && UpdateProfileForm.errors.firstName !== undefined}
            errorMessages={UpdateProfileForm.errors.firstName}
          />
          <TextField 
            attr={{
              placeholder:"M",
              name:"middleName",
              values:UpdateProfileForm.values.middleName,
            }}
            label="Middle Name" 
            type="text" 
            handleChange={UpdateProfileForm.handleChange}
            error={UpdateProfileForm.touched.middleName && UpdateProfileForm.errors.middleName !== undefined}
            errorMessages={UpdateProfileForm.errors.middleName}
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
              values:UpdateProfileForm.values.lastName,
            }}
            label="Last Name" 
            type="text" 
            handleChange={UpdateProfileForm.handleChange}
            error={UpdateProfileForm.touched.lastName && UpdateProfileForm.errors.lastName !== undefined}
            errorMessages={UpdateProfileForm.errors.lastName}
          />
          <TextField 
            attr={{
              placeholder:"Jr.",
              name:"suffix",
              values:UpdateProfileForm.values.suffix,
            }}
            label="Suffix" 
            type="text" 
            handleChange={UpdateProfileForm.handleChange}
            error={UpdateProfileForm.touched.suffix && UpdateProfileForm.errors.suffix !== undefined}
            errorMessages={UpdateProfileForm.errors.suffix}
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
              values:UpdateProfileForm.values.email,
              disabled:true
            }}
            label="Email" 
            type="text" 
            handleChange={UpdateProfileForm.handleChange}
            error={UpdateProfileForm.touched.email && UpdateProfileForm.errors.email !== undefined}
            errorMessages={UpdateProfileForm.errors.email}
          />
          <TextField 
            attr={{
              placeholder:"09152312322",
              name:"contactNumber",
              values:UpdateProfileForm.values.contactNumber,
            }}
            label="Contact Number" 
            type="text" 
            handleChange={UpdateProfileForm.handleChange}
            error={UpdateProfileForm.touched.contactNumber && UpdateProfileForm.errors.contactNumber !== undefined}
            errorMessages={UpdateProfileForm.errors.contactNumber}
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
              values:UpdateProfileForm.values.password,
            }}
            label="Password" 
            type="password" 
            handleChange={UpdateProfileForm.handleChange}
            error={UpdateProfileForm.touched.password && UpdateProfileForm.errors.password !== undefined}
            errorMessages={UpdateProfileForm.errors.password}
          />
          <TextField 
            attr={{
              placeholder:"Confirm Password",
              name:"confirmPassword",
              values:UpdateProfileForm.values.confirmPassword,
            }}
            label="Confirm Password" 
            type="password" 
            handleChange={UpdateProfileForm.handleChange}
            error={UpdateProfileForm.touched.confirmPassword && UpdateProfileForm.errors.confirmPassword !== undefined}
            errorMessages={UpdateProfileForm.errors.confirmPassword}
          />
        </Box>
        
        <div className='flex gap-2'>
          <Button variant="contained" onClick={()=>{closeModal()}} sx={{ marginTop:"1em", background:"white", color: "black", borderRadius:"10px",flexGrow:1}}>
            Cancel
          </Button>
          <Button variant="contained" onClick={()=>{UpdateProfileForm.handleSubmit()}} sx={{ marginTop:"1em", background:"#144273", color: "white", borderRadius:"10px",flexGrow:1}}>
            Update
          </Button>
        </div>
      </div>
    </div>
  )
}
