import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from '../theme/rootTheme';
import { url } from '../config';

const Login = () => {
  const navigate = useNavigate();

  const loginSchema = z.object({
    email: z
      .string({ required_error: 'Email is required.' })
      .email('Please provide a valid email.'),
    password: z
      .string({ required_error: 'Password is required.' })
      .min(6, 'Password must have at least 6 characters.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    const res = await fetch(`${url}/auth/email/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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

    const token = result.token;

    localStorage.setItem('token', token);

    const expiration = new Date();

    expiration.setHours(expiration.getHours() + 24);

    localStorage.setItem('expiration', expiration.toISOString());

    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="bottom-center"
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
      <Container maxWidth="xs" className="my-20">
        <Card
          className="rounded-none"
          elevation={0}
          sx={{ border: 1, borderColor: '#3e363663', borderRadius: 0 }}
        >
          <CardContent>
            <Typography variant="h6" className="text-center">
              The Media
            </Typography>

            <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                className="block"
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
                {...register('password')}
                error={!!errors.password?.message}
                helperText={errors.password?.message}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ marginY: 1.5 }}
              >
                Login
              </Button>
              <Typography sx={{ fontSize: '0.7rem' }}>
                Forgot password?
              </Typography>
            </form>
          </CardContent>
        </Card>
        <Card
          className="mt-4 p-5 text-center rounded-none"
          elevation={0}
          sx={{ border: 1, borderColor: '#3e363663', borderRadius: 0 }}
        >
          <Typography>
            {`Don't have an account?`}
            <Link to="?mode=signup" className="ml-2 font-bold text-blue-600">
              {'Sign up'}
            </Link>
          </Typography>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
