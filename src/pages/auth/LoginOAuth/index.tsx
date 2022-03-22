import { postUserBindOauth, postUserLoginOauth } from '@/apis/modules/user';
import { OAuthTypeEnum } from '@/enums';
import { useSearch } from '@/helpers/uri';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { AppBar, Box, Button, Container, Link, TextField, Toolbar, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { setToken } from '@/helpers/storage';
import { useAuth } from '@/router/AuthProvider';

interface LoginForm {
    name: string;
    password: string;
}

const AuthLoginOAuth: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const [isLoaded, setIsLoaded] = useState(false);
    const code = useSearch().get('code');
    if (!code) {
        return (
            <>
                <Navigate to="/login" />
            </>
        );
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();

    const handleOAuthLogin = async () => {
        const { data } = await postUserLoginOauth({ code, type: OAuthTypeEnum.OT_UNIAUTH });
        if (data) {
            if (data.isBind) {
                setToken(data.data!.token);
                auth.setUser(data.data!);
                navigate((location.state as any)?.from || '/');
            } else {
                setIsLoaded(true);
            }
        } else {
            navigate('/login', { replace: true });
        }
    };

    const handleBindAccount: SubmitHandler<LoginForm> = async (values) => {
        const { data } = await postUserBindOauth({
            code,
            type: OAuthTypeEnum.OT_UNIAUTH,
            name: values.name,
            password: values.password,
        });
        if (data) {
            setToken(data.token);
            auth.setUser(data);

            navigate((location.state as any)?.from || '/');
        } else {
            navigate('/login', { replace: true });
        }
    };

    useEffect(() => {
        handleOAuthLogin();
    }, []);

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {isLoaded ? '绑定 UniAuth 帐户' : '加载中……'}
                    </Typography>
                    <Button color="inherit" component={RouterLink} to="/register" replace>
                        新用户
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xs" className="pt-8">
                {isLoaded ? (
                    <form onSubmit={handleSubmit(handleBindAccount)}>
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
                                    绑 定
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
                ) : null}
            </Container>
        </>
    );
};

export default AuthLoginOAuth;
