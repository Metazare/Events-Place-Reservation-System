
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

//assets
import GoogleIcon from "../../Images/Logo/google.png"

// Components
import CardBaseLoginRegister from 'src/Layouts/CardBaseLoginRegister';
import TextField from 'src/Components/TextField';
import {  Button} from '@mui/material';


export default function Login() {
  const navigate = useNavigate();
  const LoginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: values => {
      let error:{ email?: string, password?: string } = {};

      if (!/\S+@\S+\.\S+/.test(values.email)) {
        error.email = "Invalid email format";
      }
      if(!values.email) error.email = "Email is required"
    
      if(!values.password) error.password = "Password is required"
      return error;
    },
    onSubmit: values => {
      console.log(values)
    }
  })
  
  return (
    <div className='grow w-full flex justify-center items-center'>
      <CardBaseLoginRegister title={"Welcome Back!"} subTitle={"Log in to access your account."}>
        <div className='flex flex-col gap-2'>
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

          <Button variant="contained" onClick={()=>{LoginForm.handleSubmit()}} sx={{ marginTop:"1em", background:"#144273", color: "white", borderRadius:"10px"}}>
            Login
          </Button>
          <p className='text-[13px] mt-[10px]'><span className='opacity-50'>Don’t have an account yet? </span> <span className='opacity-100 cursor-pointer text-primary font-[500]' onClick={()=>{navigate("/register")}}>Register now!</span></p>
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
