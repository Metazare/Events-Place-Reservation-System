import { useFormik } from 'formik';

// Components
import TextField from '../../Components/TextField';
import {  Button, Box} from '@mui/material';

// Hooks
import useUser from 'src/Hooks/useUser';

interface PropsType {
  closeModal:() => void
  data: any
}
export default function UpdateProfileForm({closeModal, data}:PropsType) {
  const {editInfo, editCredentials} = useUser();
  const UpdateProfileForm = useFormik({
    initialValues: {
      firstName: data[0]?.name?.first || '',
      middleName: data[0]?.name?.middle || '',
      lastName: data[0]?.name?.last || '',
      suffixName: data[0]?.name?.suffixName || '',
      contact: data[0]?.contact || ''
    },
    validate: values => {
      let error:{ firstName?:string, middleName?:string, lastName?:string, suffixName?:string, contact?:string, email?: string, password?:string, confirmPassword?:string} = {};
      if(!values.firstName) error.firstName = "First Name is required"
      if(!values.lastName) error.lastName = "Last Name is required"
      return error;
    },
    onSubmit: values => {
      editInfo(values)

      // Temporary: will be transferred to another form
      // editCredentials({email:values.email, password:values.password})

      closeModal()
    }
  })
  return <>
    <div className='flex flex-col gap-4 grow'>
      <Box className='grid' sx={{ 
        display: 'grid',
        gap:"1em",
        gridTemplateColumns: { 
          xs: '1fr', 
          sm: '67% 30%' 
        },
      }}>
        <TextField 
          attr={{
            placeholder:"John Michael",
            name:"firstName",
            value:UpdateProfileForm.values.firstName,
          }}
          label="First Name" 
          type="text" 
          handleChange={UpdateProfileForm.handleChange}
          error={UpdateProfileForm.touched.firstName && UpdateProfileForm.errors.firstName !== undefined}
          errorMessages={typeof UpdateProfileForm.errors.firstName}
        />
        <TextField 
          attr={{
            placeholder:"M",
            name:"middleName",
            value:UpdateProfileForm.values.middleName,
          }}
          label="Middle Name" 
          type="text" 
          handleChange={UpdateProfileForm.handleChange}
          error={UpdateProfileForm.touched.middleName && UpdateProfileForm.errors.middleName !== undefined}
          errorMessages={typeof UpdateProfileForm.errors.middleName}
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
            value:UpdateProfileForm.values.lastName,
          }}
          label="Last Name" 
          type="text" 
          handleChange={UpdateProfileForm.handleChange}
          error={UpdateProfileForm.touched.lastName && UpdateProfileForm.errors.lastName !== undefined}
          errorMessages={typeof UpdateProfileForm.errors.lastName}
        />
        <TextField 
          attr={{
            placeholder:"Jr.",
            name:"suffixName",
            value:UpdateProfileForm.values.suffixName,
          }}
          label="Suffix" 
          type="text" 
          handleChange={UpdateProfileForm.handleChange}
          error={UpdateProfileForm.touched.suffixName && UpdateProfileForm.errors.suffixName !== undefined}
          errorMessages={typeof UpdateProfileForm.errors.suffixName}
        />
      </Box>
      <Box className='grid' sx={{ 
        display: 'grid',
        gap:"1em",
        gridTemplateColumns: { 
          xs: '1fr', 
          sm: '67% 30%' 
        },
      }}>
        <TextField 
          attr={{
            placeholder:"",
            name:"contact",
            value:UpdateProfileForm.values.contact,
          }}
          label="Contact Number" 
          type="text" 
          handleChange={UpdateProfileForm.handleChange}
          error={UpdateProfileForm.touched.contact && UpdateProfileForm.errors.contact !== undefined}
          errorMessages={typeof UpdateProfileForm.errors.contact}
        />
      </Box>
    </div>
    <div className='flex gap-2 mt-10'>
      <Button variant="contained" onClick={()=>{closeModal()}} sx={{ marginTop:"1em", background:"white", color: "black", borderRadius:"10px",flexGrow:1,":hover":{color:"white"}}}>
        Cancel
      </Button>
      <Button variant="contained" onClick={()=>{UpdateProfileForm.handleSubmit()}} sx={{ marginTop:"1em", background:"#144273", color: "white", borderRadius:"10px",flexGrow:1}}>
        Update
      </Button>
    </div>
  </>
    
}
