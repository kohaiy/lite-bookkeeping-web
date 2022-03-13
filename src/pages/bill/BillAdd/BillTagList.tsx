import { GetBillTagsResp } from '@/apis/modules/bill-tag/get-bill-tags';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import { BillTypeEnum } from '@/enums';
import { postBillTag } from '@/apis/modules/bill-tag';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PostBillTagBody } from '@/apis/modules/bill-tag/post-bill-tag';
import { toast } from '@/components/KToast';
import TagPanel from '@/pages/components/TagPanel';

interface Props {
    activeTab: number;
    list: GetBillTagsResp[];
    value?: GetBillTagsResp['id'];
    onChange?: (v: GetBillTagsResp['id']) => void;
    onAdded?: () => void;
}

const BillTagList: React.FC<Props> = ({ activeTab, value, list, onChange, onAdded }) => {
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [billTypeCode, setBillTypeCode] = useState(activeTab);
    const { register, handleSubmit, reset } = useForm<PostBillTagBody>();
    const handleConfirm: SubmitHandler<PostBillTagBody> = async (values) => {
        setIsLoading(true);
        const { data } = await postBillTag({
            ...values,
            billTypeCode,
        });
        if (data) {
            toast({
                content: '添加标签成功',
            });
            reset();
            handleCloseDialog();
            onAdded?.();
        }
        setIsLoading(false);
    };
    const handleChange = (val: GetBillTagsResp['id']) => {
        onChange?.(val);
    };
    const handleTypeChange = (_: unknown, val?: number) => {
        val && setBillTypeCode(val);
    };
    const handleOpenDialog = () => {
        setVisible(true);
    };
    const handleCloseDialog = () => {
        setVisible(false);
    };
    return (
        <div>
            <TagPanel list={list.filter((t) => t.billTypeCode === activeTab)} value={value} onChange={handleChange} onEdit={handleOpenDialog} />
            <Dialog open={visible} onClose={handleCloseDialog}>
                <form onSubmit={handleSubmit(handleConfirm)}>
                    <DialogTitle>添加标签</DialogTitle>
                    <DialogContent>
                        <ToggleButtonGroup color="primary" value={billTypeCode} size="small" exclusive onChange={handleTypeChange}>
                            <ToggleButton value={BillTypeEnum.BT_PAY}>支出</ToggleButton>
                            <ToggleButton value={BillTypeEnum.BT_INCOME}>收入</ToggleButton>
                        </ToggleButtonGroup>
                        <TextField label="标签名称" variant="standard" size="medium" autoFocus fullWidth {...register('name', { required: true })} />
                        <TextField label="标签图标" variant="standard" size="medium" fullWidth {...register('icon')} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} type="button">
                            取消
                        </Button>
                        <Button variant="contained" type="submit" disabled={isLoading}>
                            确定
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default BillTagList;
