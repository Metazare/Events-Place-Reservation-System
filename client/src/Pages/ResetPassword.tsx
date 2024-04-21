
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';

// Components
import CardBaseLoginRegister from 'src/Layouts/CardBaseLoginRegister';
import TextField from 'src/Components/TextField';
import {  Button} from '@mui/material';

// Hooks
import { usePasswordReset } from 'src/Hooks/useAuth';

export default function ResetPassword() {
  const {hash} = useParams();
  const { resetPassword } = usePasswordReset();

  const ResetPasswordForm = useFormik({
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
      resetPassword(values.newPassword, hash ?? '');
    }
  })

  return (
    <div className='grow w-full flex justify-center items-center p-4'>
        <CardBaseLoginRegister title={"Forgot Password"} subTitle={"Enter Verification Code"}>
          <div className='flex flex-col items-start gap-2'>
            <TextField 
              attr={{
                placeholder:"New Password",
                name:"newPassword",
                values:ResetPasswordForm.values.newPassword,
              }}
              label="Password" 
              type="password" 
              handleChange={ResetPasswordForm.handleChange}
              error={ResetPasswordForm.touched.newPassword && ResetPasswordForm.errors.newPassword !== undefined}
              errorMessages={ResetPasswordForm.errors.newPassword}
            />
            <TextField 
              attr={{
                placeholder:"Confirm Password",
                name:"confirmPassword",
                values:ResetPasswordForm.values.confirmPassword,
              }}
              label="Confirm Password" 
              type="password" 
              handleChange={ResetPasswordForm.handleChange}
              error={ResetPasswordForm.touched.confirmPassword && ResetPasswordForm.errors.confirmPassword !== undefined}
              errorMessages={ResetPasswordForm.errors.confirmPassword}
            />
            <Button fullWidth variant="contained" onClick={()=>{ResetPasswordForm.handleSubmit()}} sx={{ marginTop:"2em", background:"#144273", color: "white", borderRadius:"10px"}}>
              Confirm
            </Button>
          </div>
        </CardBaseLoginRegister>
    </div>
  )
}
