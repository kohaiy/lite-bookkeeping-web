import { deleteBillById } from '@/apis/modules/bill';
import { GetBillsResp } from '@/apis/modules/bill/get-bills';
import { toast } from '@/components/KToast';
import { BillTypeEnum } from '@/enums';
import { formatDate, formatMoney } from '@/helpers/data';
import { Delete } from '@mui/icons-material';
import { Box, Card, CardActionArea, CardContent, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useState } from 'react';

interface Props extends GetBillsResp {
    onChange?: () => void;
}

const getBillType = (type: number) => {
    return type === BillTypeEnum.BT_INCOME ? 1 : type === BillTypeEnum.BT_EXPENSE ? -1 : 0;
};

const BillItem: React.FC<Props> = ({ id, billTagName, billAccountName, billTypeCode, remarks, actionTime, amount, onChange }) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDel = async () => {
        const { data } = await deleteBillById(id);
        if (data) {
            toast({ content: '删除成功' });
            setDialogOpen(false);
            onChange?.();
        }
    };

    return (
        <>
            <Card sx={{ mb: 1 }}>
                <CardActionArea onClick={() => setDialogOpen(true)}>
                    <CardContent>
                        <Box sx={{ display: 'flex' }}>
                            <div>
                                <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} color="text.primary" gutterBottom>
                                    {billTagName}
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {remarks}
                                </Typography>
                                <Typography sx={{ fontSize: 12 }} color="text.disabled">
                                    {formatDate(actionTime, 'HH:mm')}
                                </Typography>
                            </div>
                            <div className="flex-1 flex flex-col items-end justify-center">
                                <Typography sx={{ fontSize: 20 }} color={getBillType(billTypeCode) > 0 ? 'error.main' : 'primary.main'}>
                                    {['-', '', '+'][getBillType(billTypeCode) + 1]}
                                    {formatMoney(amount)}
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                    {billAccountName}
                                </Typography>
                            </div>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Drawer anchor="bottom" open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <Box sx={{ width: 'auto' }} role="presentation">
                    <List>
                        <ListItem button onClick={handleDel}>
                            <ListItemIcon>
                                <Delete color="error" />
                            </ListItemIcon>
                            <ListItemText primary="删除此记录" sx={{ color: 'error.main' }} />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default BillItem;
