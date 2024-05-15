import Button from '@components/Button';
import './styles.scss';
import Input from '@components/Input';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className='login-container'>
      <div className='login-box'>
        <div className='title mb-10'>
          <h2>Đăng nhập</h2>
        </div>
        <div className='mb-10 w-3/4'>
          <Input label='Username' />
        </div>
        <div>
          <Button onClick={() => navigate('/room-list')}>Đăng nhập</Button>
        </div>
      </div>
    </div>
  );
}
