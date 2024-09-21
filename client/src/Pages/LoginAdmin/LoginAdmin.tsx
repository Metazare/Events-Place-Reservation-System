
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
  const { loginAdmin } = useLogin();
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
      loginAdmin(values);
    }
  })
  
  return (
    <div className='grow w-full flex justify-center items-center p-4'>
      <CardBaseLoginRegister title={"Admin Login"} subTitle={"This is for admin only"}>
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
          <Button fullWidth variant="contained" onClick={()=>{LoginForm.handleSubmit()}} sx={{ marginTop:"1em", background:"#144273", color: "white", borderRadius:"10px"}}>
            Login
          </Button>
        </div>
      </CardBaseLoginRegister>
    </div>
  );
};
