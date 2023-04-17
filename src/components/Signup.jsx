import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ThemeProvider } from '@mui/material/styles';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import theme from '../theme/rootTheme';
import { url } from '../config';

const Signup = () => {
  const navigate = useNavigate();

  const signupSchema = z.object({
    firstname: z
      .string({ required_error: 'Firstname is required.' })
      .min(3, 'Firstname must have at least 3 characters')
      .max(25, 'Firstname can only have 25 characters at most.'),
    lastname: z
      .string({ required_error: 'Lastname is required.' })
      .min(3, 'Lastname must have at least 3 characters')
      .max(25, 'Lastname can only have 25 characters at most.'),
    email: z
      .string({ required_error: 'Email is required.' })
      .email('Please provide a valid email.'),
    password: z
      .string({ required_error: 'Password is required.' })
      .min(6, 'Password must have at least 6 characters.'),
    gender: z.string({ required_error: 'Gender is required.' }),
    dob: z.date(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    const name = data.firstname.concat(' ', data.lastname);

    delete data.firstname;
    delete data.lastname;

    const updatedData = {
      ...data,
      username: name,
    };

    const res = await fetch(`${url}/auth/email/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    const result = await res.json();

    if (!res.ok) {
      toast.error(`${result.message}`, {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: 'light',
      });
    }

    if (res.ok) {
      const token = result.token;

      localStorage.setItem('token', token);

      const expiration = new Date();

      expiration.setHours(expiration.getHours() + 24);

      localStorage.setItem('expiration', expiration.toISOString());

      navigate('/');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
      <Container maxWidth="sm" className="my-10 ">
        <Box className=" max-w-md text-center mx-auto">
          <Card
            className="rounded-none"
            elevation={0}
            sx={{
              border: 1,
              borderColor: '#3e363663',
              borderRadius: 0,
            }}
          >
            <CardContent>
              <Typography variant="h6" className="text-center">
                The Media
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Box className="md:flex justify-between">
                  <TextField
                    label="First name"
                    margin="normal"
                    className="block w-full md:w-[45%]"
                    id="Firstname"
                    {...register('firstname')}
                    error={!!errors.firstname?.message}
                    helperText={errors.firstname?.message}
                  />
                  <TextField
                    label="Last name"
                    margin="normal"
                    className="block w-full md:w-[45%]"
                    id="Lastname"
                    {...register('lastname')}
                    error={!!errors.lastname?.message}
                    helperText={errors.lastname?.message}
                  />
                </Box>

                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  className="block"
                  id="email"
                  {...register('email')}
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
                />
                <TextField
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  fullWidth
                  margin="normal"
                  className="block"
                  id="password"
                  {...register('password')}
                  error={!!errors.password?.message}
                  helperText={errors.password?.message}
                />

                <Box className="md:flex justify-between">
                  <Box sx={{ flex: 2 }}>
                    <FormControl {...register('gender')}>
                      <FormLabel>Choose your gender</FormLabel>
                      <RadioGroup
                        onChange={(e) => setValue('gender', e.target.value)}
                      >
                        <FormControlLabel
                          control={<Radio color="secondary" />}
                          value="male"
                          label="Male"
                        />
                        <FormControlLabel
                          control={<Radio color="secondary" />}
                          value="female"
                          label="Female"
                        />
                        <FormControlLabel
                          control={<Radio color="secondary" />}
                          value="others"
                          label="Others"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  <Box sx={{ flex: 3 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DemoItem fullwidth>
                          <DatePicker
                            id="dob"
                            name="dob"
                            onChange={(e) => setValue('dob', e.$d)}
                          />
                        </DemoItem>
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{ marginY: 1.5 }}
                >
                  Signup
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card
            className="mt-4 p-5 text-center rounded-none"
            elevation={0}
            sx={{ border: 1, borderColor: '#3e363663', borderRadius: 0 }}
          >
            <Typography>
              {`Already have an account?`}
              <Link to="?mode=login" className="ml-2 font-bold text-blue-600">
                {'Log in'}
              </Link>
            </Typography>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
