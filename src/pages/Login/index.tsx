import Button from '@components/Button';
import './styles.scss';
import Input from '@components/Input';
import { useNavigate } from 'react-router-dom';
import { getPlayerByName } from '@services/players';
import { useState } from 'react';
import { useAuthContext } from '@contexts/useAuthContext';
import { ROUTES } from '@constants/routes';

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuthContext();

  const [name, setName] = useState('');

  const handleLogin = async () => {
    const result = await getPlayerByName(name);
    if (result) {
      login?.(result);
      navigate(ROUTES.ROOM_LIST);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <div className='title mb-10'>
          <h2>Đăng nhập</h2>
        </div>
        <div className='mb-10 w-3/4'>
          <Input
            label='Username'
            onChange={(e) => setName(e.target.value)}
            value={name}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLogin();
              }
            }}
          />
        </div>
        <div>
          <Button onClick={handleLogin}>Đăng nhập</Button>
        </div>
      </div>
    </div>
  );
}
