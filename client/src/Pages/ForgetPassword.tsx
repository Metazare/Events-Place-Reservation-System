
import { useFormik } from 'formik';

// Components
import CardBaseLoginRegister from 'src/Layouts/CardBaseLoginRegister';
import TextField from 'src/Components/TextField';
import { Button} from '@mui/material';

// Hooks
import { usePasswordReset } from 'src/Hooks/useAuth';

export default function ForgetPassword() {
  const { forgetPassword } = usePasswordReset();

  const ResetPasswordForm = useFormik({
    initialValues: {
      email: '',
    },
    validate: values => {
      let error:{email?:string} = {};
      if(!values.email) error.email = "Email is required"
      return error;
    },
    onSubmit: values => {
      forgetPassword(values.email);
    }
  })

  return (
    <div className='grow w-full flex justify-center items-center p-4'>
        <CardBaseLoginRegister title={"Forget Password"} subTitle={"Enter Email"}>
          <div className='flex flex-col items-start gap-2'>
            <TextField 
              attr={{
                placeholder:"Email",
                name:"email",
                value:ResetPasswordForm.values.email,
              }}
              label="Email" 
              type="email" 
              handleChange={ResetPasswordForm.handleChange}
              error={ResetPasswordForm.touched.email && ResetPasswordForm.errors.email !== undefined}
              errorMessages={ResetPasswordForm.errors.email}
            />
            <Button fullWidth variant="contained" onClick={()=>{ResetPasswordForm.handleSubmit()}} sx={{ marginTop:"2em", background:"#144273", color: "white", borderRadius:"10px"}}>
              Reset Password
            </Button>
          </div>
        </CardBaseLoginRegister>
    </div>
  )
}
