import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBills } from '@/apis/modules/bill';
import { GetBillsResp } from '@/apis/modules/bill/get-bills';
import { useAuth } from '@/router/AuthProvider';
import { clearToken } from '@/helpers/storage';
import { Box, Button, Card, CardActionArea, CardContent, Fab, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { BillTypeEnum } from '@/enums';
import { formatMoney } from '@/helpers/data';

const getBillType = (type: number) => {
    return type === BillTypeEnum.BT_INCOME ? 1 : type === BillTypeEnum.BT_PAY ? -1 : 0;
};

const Home: React.FC = () => {
    const [bills, setBills] = useState<GetBillsResp[]>([]);
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        getBills().then(({ data }) => {
            if (data) {
                setBills(data);
            }
        });
    }, []);

    const handleLogout = () => {
        clearToken();
        navigate('/login', { replace: true });
        auth.setUser();
    };
    return (
        <div>
            <Button onClick={handleLogout}>退出登录</Button>
            <ul className="px-2 pb-20">
                {bills.map((bill) => (
                    <Card sx={{ maxWidth: 400, mb: 1, mx: 'auto' }} key={bill.id}>
                        <CardActionArea>
                            <CardContent>
                                <Box sx={{ display: 'flex' }}>
                                    <div>
                                        <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} color="text.primary" gutterBottom>
                                            {bill.billTagName}
                                        </Typography>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            {bill.remarks}
                                        </Typography>
                                        <Typography sx={{ fontSize: 12 }} color="text.disabled">
                                            {new Date(bill.actionTime).toLocaleDateString()}
                                        </Typography>
                                    </div>
                                    <div className="flex-1 flex flex-col items-end justify-center">
                                        <Typography sx={{ fontSize: 20 }} color={getBillType(bill.billTypeCode) > 0 ? 'error.main' : 'primary.main'}>
                                            {['-', '', '+'][getBillType(bill.billTypeCode) + 1]}{formatMoney(bill.amount)}
                                        </Typography>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                            {bill.billAccountName}
                                        </Typography>
                                    </div>
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </ul>
            <Fab color="primary" aria-label="add" component={Link} to="/bill-add" sx={{ position: 'fixed', right: 16, bottom: 16 }}>
                <Add />
            </Fab>
        </div>
    );
};

export default Home;
