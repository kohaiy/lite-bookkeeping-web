import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { postUserRegister } from '../../../apis/modules/user';
import { toast } from '../../../components/KToast';
import { Button, Footer, Form, FormItem, Input } from '../Login/style';

interface RegisterForm {
  name: string;
  password: string;
}

const AuthRegister: React.FC = () => {
  const { register, handleSubmit } = useForm<RegisterForm>();

  const handleRegister: SubmitHandler<RegisterForm> = async (form) => {
    const { data } = await postUserRegister(form);
    if (data) {
      toast({ content: '注册成功，ID 为 ' + data.data.id });
      console.log(data);
    }
  };
  return (
    <div>
      <Form onSubmit={handleSubmit(handleRegister)}>
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
              注 册
            </Button>
          </div>
          <div>
            已有账户？<Link to="/login">去登录</Link>
          </div>
        </Footer>
      </Form>
    </div>
  );
};

export default AuthRegister;
