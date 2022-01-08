import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Footer, Form, FormItem, Input } from './style';
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
      <Form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <FormItem>
            <Input type="text" placeholder="请输入用户名" {...register('name', { required: true })} />
          </FormItem>
          <FormItem>
            <Input type="password" placeholder="请输入密码" {...register('password', { required: true })} />
          </FormItem>
        </div>
        <Footer>
          <div>
            <Button className="primary" type="submit">
              登 录
            </Button>
          </div>
          <div>
            没有账户？<Link to="/register">去注册</Link>
          </div>
        </Footer>
      </Form>
    </>
  );
};

export default AuthLogin;
