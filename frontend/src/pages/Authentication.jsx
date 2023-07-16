import { useSearchParams } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/Signup';

function AuthenticationPage() {
  const [searchParams] = useSearchParams();

  const isLogin = searchParams.get('mode') === 'login';

  if (isLogin) return <Login />;

  if (!isLogin) return <Signup />;
}

export default AuthenticationPage;
