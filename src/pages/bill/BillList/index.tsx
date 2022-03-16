import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBills } from '@/apis/modules/bill';
import { Box, Card, CardActionArea, CardContent, Container, Divider, Fab, Skeleton, Typography } from '@mui/material';
import { Add, CalendarMonth } from '@mui/icons-material';
import { BillTypeEnum } from '@/enums';
import { formatMoney } from '@/helpers/data';
import { BillByDateItem, splitBillsByDate } from './service';

const getBillType = (type: number) => {
    return type === BillTypeEnum.BT_INCOME ? 1 : type === BillTypeEnum.BT_EXPENSE ? -1 : 0;
};

const BillList: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [billDates, setBillDates] = useState<BillByDateItem[]>([]);

    useEffect(() => {
        getBills()
            .then(({ data }) => {
                if (data) {
                    setBillDates(splitBillsByDate(data));
                }
            })
            .finally(() => {
                setIsLoaded(true);
            });
    }, []);

    return (
        <>
            <Container sx={{ pt: 2, pb: 8 }}>
                {isLoaded ? (
                    billDates.map(({ date, bills, overview }) => (
                        <Box sx={{ mb: 2 }} key={date}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                                <Typography color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CalendarMonth fontSize="small" />
                                    {date}
                                </Typography>
                                <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end', alignItems: 'center', opacity: 0.8 }}>
                                    <Typography color="success.main" fontSize="small">
                                        {formatMoney(overview.income - overview.expense)}
                                    </Typography>
                                    <Typography color="text.disabled" fontSize="small" sx={{ mx: 1 }}>
                                        =
                                    </Typography>
                                    <Typography color="error.main" fontSize="small">
                                        +{formatMoney(overview.income)}
                                    </Typography>
                                    <Typography color="text.disabled" fontSize="small" sx={{ mx: 1 }}>
                                        +
                                    </Typography>
                                    <Typography color="primary" fontSize="small">
                                        -{formatMoney(overview.expense)}
                                    </Typography>
                                </Box>
                            </Box>
                            {bills.map((bill) => (
                                <Card sx={{ mb: 1 }} key={bill.id}>
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
                                                        {['-', '', '+'][getBillType(bill.billTypeCode) + 1]}
                                                        {formatMoney(bill.amount)}
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
                        </Box>
                    ))
                ) : (
                    <>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <Card sx={{ mb: 1 }} key={i}>
                                <CardActionArea>
                                    <CardContent>
                                        <Box sx={{ display: 'flex' }}>
                                            <div className="flex-1">
                                                <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} gutterBottom>
                                                    <Skeleton width={56} />
                                                </Typography>
                                                <Typography sx={{ fontSize: 14 }} gutterBottom>
                                                    <Skeleton />
                                                </Typography>
                                                <Typography sx={{ fontSize: 12 }}>
                                                    <Skeleton width={72} />
                                                </Typography>
                                            </div>
                                            <div className="flex-1 flex flex-col items-end justify-center">
                                                <Typography sx={{ fontSize: 20 }}>
                                                    <Skeleton width={56} />
                                                </Typography>
                                                <Typography sx={{ fontSize: 14 }}>
                                                    <Skeleton width={48} />
                                                </Typography>
                                            </div>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            // <Skeleton variant="rectangular" animation="wave" height={83} key={i} sx={{ maxWidth: 420, mb: 1, mx: 'auto' }} />
                        ))}
                    </>
                )}
                {isLoaded ? <Divider>没有更多了</Divider> : null}
            </Container>
            <Fab color="primary" aria-label="add" component={Link} to="/bill-add" sx={{ position: 'fixed', right: 16, bottom: 72 }}>
                <Add />
            </Fab>
        </>
    );
};

export default BillList;
