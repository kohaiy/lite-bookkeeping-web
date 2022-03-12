import { CurrencyYen, Add } from '@mui/icons-material';
import { GetBillTagsResp } from '@/apis/modules/bill-tag/get-bill-tags';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import { BillTypeEnum } from '@/enums';
import { postBillTag } from '@/apis/modules/bill-tag';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PostBillTagBody } from '@/apis/modules/bill-tag/post-bill-tag';
import { toast } from '@/components/KToast';

interface Props {
    list: GetBillTagsResp[];
    value?: GetBillTagsResp['id'];
    onChange?: (v: GetBillTagsResp) => void;
}

const BillTagList: React.FC<Props> = (props) => {
    const [visible, setVisible] = useState(false);
    const [billTypeCode, setBillTypeCode] = useState(BillTypeEnum.BT_PAY);
    const { register, handleSubmit } = useForm<PostBillTagBody>();
    const handleConfirm: SubmitHandler<PostBillTagBody> = async (values) => {
        const { data } = await postBillTag({
            ...values,
            billTypeCode,
        });
        if (data) {
            toast({
                content: '添加标签成功，请重新进入此页面',
            });
            handleCloseDialog();
        }
    };
    const handleChange = (value: GetBillTagsResp) => {
        props.onChange?.(value);
    };
    const handleTypeChange = (_: unknown, value?: number) => {
        value && setBillTypeCode(value);
    };
    const handleOpenDialog = () => {
        setVisible(true);
    };
    const handleCloseDialog = () => {
        setVisible(false);
    };
    return (
        <div className="flex flex-wrap p-4">
            {props.list.map((tag) => (
                <div
                    key={tag.id}
                    onClick={() => handleChange(tag)}
                    className={`flex flex-col justify-center items-center w-16 h-16 m-4 border-solid border-2 border-gray-800 rounded-full cursor-pointer
            ${props.value === tag.id ? 'border-red-400' : ''}`}
                >
                    <div className="w-6 h-6">
                        <CurrencyYen />
                    </div>
                    <div className="mt-2 text-xs">{tag.name}</div>
                </div>
            ))}
            <div onClick={handleOpenDialog} className="flex flex-col justify-center items-center w-16 h-16 m-4 border-solid border-2 border-gray-800 rounded-full cursor-pointer">
                <div className="w-6 h-6">
                    <Add />
                </div>
                <div className="mt-2 text-xs">添加</div>
            </div>
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
                        <Button variant="contained" type="submit">
                            确定
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default BillTagList;
