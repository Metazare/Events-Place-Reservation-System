
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

//assets
import GoogleIcon from "../../Images/Logo/google.png"

// Components
import CardBaseLoginRegister from 'src/Layouts/CardBaseLoginRegister';
import TextField from 'src/Components/TextField';
import {  Button} from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
// Hooks
import { useLogin } from '../../Hooks/useAuth';

export default function Login() {
  const { login } = useLogin();
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
      login(values);
    }
  })
  
  return (
    <div className='grow w-full flex justify-center items-center p-4'>
      <CardBaseLoginRegister title={"Welcome Back!"} subTitle={"Log in to access your account."}>
        <div className='flex flex-col items-start gap-2'>
          <TextField 
            attr={{
              placeholder:"email@gmail.com",
              name:"email",
              value:LoginForm.values.email,
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
              value:LoginForm.values.password,
            }}
            label="Password" 
            type="password" 
            handleChange={LoginForm.handleChange}
            error={LoginForm.touched.password && LoginForm.errors.password !== undefined}
            errorMessages={LoginForm.errors.password}
          />
          <a href='/forgetpassword' target="_blank" rel="noreferrer" className='cursor-pointer opacity-50 hover:opacity-100 text-[13px]'  style={{transition:"all .3s ease-in-out"}}>Forgot Password?</a>
          <Button fullWidth variant="contained" onClick={()=>{LoginForm.handleSubmit()}} sx={{ marginTop:"1em", background:"#144273", color: "white", borderRadius:"10px"}}>
            Login
          </Button>
          <p className='text-[13px] mt-[10px]'><span className='opacity-50'>Don’t have an account yet? </span> <span className='opacity-100 cursor-pointer text-primary font-[500]' onClick={()=>{navigate("/register")}}>Register now!</span></p>
          <div className='mt-[.5em] flex gap-5 items-center w-full'>
            <hr className='grow opacity-50'/>
            <p className='text-[10px] opacity-50'>or continue with</p>
            <hr className='grow opacity-50'/>
          </div>
          <div className=' w-full flex justify-center mt-2' >
            <GoogleLogin
              onSuccess={credentialResponse => {
                if(credentialResponse.credential){
                  const token = credentialResponse.credential;
                  const decoded: { email?:string} = jwtDecode(token);
                  console.log(decoded.email)
                }
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              theme='outline'
            />
          </div>
        </div>
      </CardBaseLoginRegister>
    </div>
  );
};
