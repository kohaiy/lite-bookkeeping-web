import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postBill } from '@/apis/modules/bill';
import getBillTags, { GetBillTagsResp } from '@/apis/modules/bill-tag/get-bill-tags';
import { toast } from '@/components/KToast';
import { BillTypeEnum } from '@/enums';
import BillInput, { BillInputProps } from './BillInput';
import BillTagList from './BillTagList';
import TagPanel from '@/pages/components/TagPanel';
import { Box, Tab, Tabs } from '@mui/material';

interface BillAddForm {
    billTagId: number;
}

const BillAdd: React.FC = () => {
    const [billTags, setBillTags] = useState<GetBillTagsResp[]>([]);
    const [activeTab, setActiveTab] = useState(BillTypeEnum.BT_PAY);
    const [form, setForm] = useState<BillAddForm>({
        billTagId: -1,
    });

    const loadBillTags = async () => {
        const { data } = await getBillTags();
        if (data) {
            setBillTags(data);
            setForm((value) => ({
                ...value,
                billTagId: data.find(({ billTypeCode }) => billTypeCode === activeTab)?.id ?? 0,
            }));
        }
    };

    useEffect(() => {
        loadBillTags();
    }, []);

    const handleTabChange = (_: unknown, val: number) => {
        setActiveTab(val);
        setForm((value) => ({
            ...value,
            billTagId: billTags.find(({ billTypeCode }) => billTypeCode === val)?.id ?? 0,
        }));
    };
    const handleTagAdded = () => {
        loadBillTags();
    };

    const handleConfirm: BillInputProps['onConfirm'] = async (values) => {
        const { data } = await postBill({
            ...form,
            ...values,
            amount: parseInt((values.amount * 100).toString()),
            actionTime: values.actionTime.toISOString(),
        });
        if (data) {
            toast({ content: '记下了' });
        }
    };

    return (
        <Box className="flex flex-col" sx={{ height: { xs: 'calc(100vh - 112px)', sm: 'calc(100vh - 120px)' } }}>
            <div className="flex-1">
                <Tabs value={activeTab} onChange={handleTabChange} centered>
                    <Tab value={BillTypeEnum.BT_PAY} label="支出" />
                    <Tab value={BillTypeEnum.BT_INCOME} label="收入" />
                </Tabs>
                {activeTab === BillTypeEnum.BT_PAY ? (
                    <BillTagList activeTab={BillTypeEnum.BT_PAY} list={billTags} value={form.billTagId} onChange={(billTagId) => setForm((v) => ({ ...v, billTagId }))} onAdded={handleTagAdded} />
                ) : null}
                {activeTab === BillTypeEnum.BT_INCOME ? (
                    <BillTagList activeTab={BillTypeEnum.BT_INCOME} list={billTags} value={form.billTagId} onChange={(billTagId) => setForm((v) => ({ ...v, billTagId }))} onAdded={handleTagAdded} />
                ) : null}
            </div>
            <BillInput onConfirm={handleConfirm} />
        </Box>
    );
};

export default BillAdd;
