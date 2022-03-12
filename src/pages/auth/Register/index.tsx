import { AppBar, Box, Button, Container, Link, TextField, Toolbar, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { postUserRegister } from '@/apis/modules/user';
import { toast } from '@/components/KToast';

interface RegisterForm {
    name: string;
    password: string;
}

const AuthRegister: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>();

    const handleRegister: SubmitHandler<RegisterForm> = async (form) => {
        const { data } = await postUserRegister(form);
        if (data) {
            toast({ content: '注册成功，ID 为 ' + data.id });
            console.log(data);
        }
    };
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        用户注册
                    </Typography>
                    <Button color="inherit" component={RouterLink} to="/login" replace>
                        登录
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xs" className="pt-8">
                <form onSubmit={handleSubmit(handleRegister)}>
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
                                注 册
                            </Button>
                        </div>
                        <div className="mt-2">
                            已有账户？
                            <Link component={RouterLink} to="/login" replace>
                                去登录
                            </Link>
                        </div>
                    </div>
                </form>
            </Container>
        </>
    );
};

export default AuthRegister;
