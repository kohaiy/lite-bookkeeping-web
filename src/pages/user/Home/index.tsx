import { clearToken } from '@/helpers/storage';
import { useAuth } from '@/router/AuthProvider';
import { Avatar, Box, Button, Card, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserHome: React.FC = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    const { user } = auth;

    const handleLogout = () => {
        clearToken();
        navigate('/login', { replace: true });
        auth.setUser();
    };

    return (
        <>
            {user ? (
                <Card sx={{ display: 'flex', alignItems: 'center', mb: 2, px: 2, py: 2 }}>
                    <Avatar sx={{ width: 56, height: 56 }}>{user.name.slice(0, 2).toUpperCase()}</Avatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', ml: 2 }}>
                        <Typography fontSize={20} fontWeight="bold">
                            {user.name}
                        </Typography>
                        <Typography>ID: {user.id} </Typography>
                    </Box>
                </Card>
            ) : null}
            <Container>
                <Button onClick={handleLogout} variant="outlined" size="large" color="error" fullWidth>
                    退出登录
                </Button>
            </Container>
        </>
    );
};

export default UserHome;
