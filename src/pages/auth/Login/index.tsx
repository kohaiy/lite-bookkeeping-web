import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { postUserLogin } from '../../../apis/modules/user';
import { toast } from '../../../components/KToast';

interface LoginForm {
  name: string;
  password: string;
}

const AuthLogin: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const handleLogin: SubmitHandler<LoginForm> = async (values) => {
    const { data } = await postUserLogin(values);
    if (data) {
      toast({ content: '登录成功，' + data.data.name + '(' + data.data.id + ')' });
      console.log(data.data);
      localStorage.setItem('token', data.data.token);

      navigate('/home');
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <h1>用户登录</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <p>
            <label>
              用户名:
              <input type="text" {...register('name', { required: true })} />
            </label>
          </p>
          <p>
            <label>
              密码:
              <input type="password" {...register('password', { required: true })} />
            </label>
          </p>
        </div>
        <div>
          <button type="submit">登录</button>
          <button type="button" onClick={() => navigate('/register')}>
            去注册
          </button>
        </div>
      </form>
    </>
  );
};

export default AuthLogin;
