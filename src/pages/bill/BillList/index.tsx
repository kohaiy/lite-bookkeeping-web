import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBills } from '@/apis/modules/bill';
import { Box, Card, CardActionArea, CardContent, Container, Divider, Fab, Skeleton, Typography } from '@mui/material';
import { Add, CalendarMonth } from '@mui/icons-material';
import { formatDate, formatMoney } from '@/helpers/data';
import { BillByDateItem, getMonthDateRange, splitBillsByDate } from './service';
import MonthSelect from './MonthSelect';
import BillItem from './BillItem';

const BillList: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [billDates, setBillDates] = useState<BillByDateItem[]>([]);
    const [date, setDate] = useState<Date>(new Date());

    const loadBills = async () => {
        try {
            const [startDate, endDate] = getMonthDateRange(date);
            const { data } = await getBills({ startDate, endDate });
            if (data) {
                const billDates = splitBillsByDate(data);
                setBillDates(billDates);
            }
        } finally {
            setIsLoaded(true);
        }
    };

    const handleMonthChange = (val: Date) => {
        setDate(val);
        loadBills();
    };

    useEffect(() => {
        loadBills();
    }, []);

    return (
        <>
            <Container sx={{ pt: 2, pb: 8 }}>
                <MonthSelect value={date} onChange={handleMonthChange} />
                {isLoaded ? (
                    billDates.map(({ date, bills, overview }) => (
                        <Box sx={{ mb: 2 }} key={date}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                                <Typography color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CalendarMonth fontSize="small" />
                                    {formatDate(date, 'MM-DD ddd')}
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
                                <BillItem {...bill} onChange={loadBills} key={bill.id} />
                            ))}
                        </Box>
                    ))
                ) : (
                    // 骨架屏
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
