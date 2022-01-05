import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { postUserRegister } from '../../../apis/modules/user';

interface RegisterForm {
  name: string;
  password: string;
}

const AuthRegister: React.FC = () => {
  const { register, handleSubmit } = useForm<RegisterForm>();

  const handleRegister: SubmitHandler<RegisterForm> = async (form) => {
    const { data } = await postUserRegister(form);
    if (data) {
      setTimeout(() => {
        alert('注册成功，ID 为 ' + data.data.id);
      });
      console.log(data);
    }
  };
  const navigate = useNavigate();
  return (
    <div>
      <h1>用户注册</h1>
      <form onSubmit={handleSubmit(handleRegister)}>
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
          <p>
            <button type="submit">注册</button>
            <button onClick={() => navigate(-1)}>返回</button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AuthRegister;
