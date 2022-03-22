import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Container, Link, TextField, Toolbar, Typography } from '@mui/material';
import { postUserLogin } from '@/apis/modules/user';
import { useAuth } from '@/router/AuthProvider';
import { setToken } from '@/helpers/storage';
import { getConfigCommon } from '@/apis/modules/config';

interface LoginForm {
    name: string;
    password: string;
}

const AuthLogin: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();
    const handleLogin: SubmitHandler<LoginForm> = async (values) => {
        const { data } = await postUserLogin(values);
        if (data) {
            setToken(data.token);
            auth.setUser(data);

            navigate((location.state as any)?.from || '/');
        }
    };
    const handleOAuthLogin = async () => {
        const { data } = await getConfigCommon();
        if (data) {
            const { uniAuthClientId, uniAuthUrl } = data;
            console.log(uniAuthClientId, uniAuthUrl);
            window.location.replace(`${uniAuthUrl}?clientId=${uniAuthClientId}`);
        }
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        用户登录
                    </Typography>
                    <Button color="inherit" component={RouterLink} to="/register" replace>
                        新用户
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xs" className="pt-8">
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div>
                        <Box>
                            <TextField
                                label="用户名"
                                variant="standard"
                                size="medium"
                                fullWidth
                                error={!!errors.name}
                                helperText={errors.name && '请输入用户名'}
                                type="text"
                                {...register('name', { required: true })}
                            />
                        </Box>
                        <Box mt={4}>
                            <TextField
                                label="密码"
                                variant="standard"
                                size="medium"
                                fullWidth
                                error={!!errors.password}
                                helperText={errors.password && '请输入密码'}
                                type="password"
                                {...register('password', { required: true })}
                            />
                        </Box>
                    </div>
                    <div className="mt-8 text-center">
                        <div>
                            <Button type="submit" variant="contained" size="large" fullWidth>
                                登 录
                            </Button>
                            <span className="mx-2"></span>
                            <Button onClick={handleOAuthLogin} sx={{ mt: 2 }} variant="contained" type="button" color="success" size="large" fullWidth>
                                Uni Auth 登录
                            </Button>
                        </div>
                        <div className="mt-2">
                            没有账户？
                            <Link component={RouterLink} to="/register" replace>
                                去注册
                            </Link>
                        </div>
                    </div>
                </form>
            </Container>
        </>
    );
};

export default AuthLogin;
