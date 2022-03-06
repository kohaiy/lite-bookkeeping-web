import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Footer, Form, FormItem, Input } from './style';
import { postUserLogin } from '@/apis/modules/user';
import { toast } from '@/components/KToast';
import { useAuth } from '@/router/AuthProvider';
import { setToken } from '@/helpers/storage';
// import { getConfigCommon } from '@/apis/modules/config';

interface LoginForm {
    name: string;
    password: string;
}

const AuthLogin: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const { register, handleSubmit } = useForm<LoginForm>();
    const handleLogin: SubmitHandler<LoginForm> = async (values) => {
        const { data } = await postUserLogin(values);
        if (data) {
            toast({ content: '登录成功，' + data.data.name + '(' + data.data.id + ')' });
            setToken(data.data.token);
            auth.setUser({ token: data.data.token });

            navigate((location.state as any)?.from || '/');
        }
    };
    // const handleOAuthLogin = async () => {
    //     const { data } = await getConfigCommon();
    //     if (data) {
    //         const { uniAuthClientId, uniAuthUrl } = data.data;

    //         window.location.href = uniAuthUrl + '?clientId=' + uniAuthClientId;
    //     }
    // };

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
                        {/* <span className="mx-2"></span>
                        <Button onClick={handleOAuthLogin} className="primary" type="button">
                            Uni Auth 登录
                        </Button> */}
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
