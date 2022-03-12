import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postBill } from '@/apis/modules/bill';
import getBillTags, { GetBillTagsResp } from '@/apis/modules/bill-tag/get-bill-tags';
import { toast } from '@/components/KToast';
import { BillTypeEnum } from '@/enums';
import BillInput, { BillInputProps } from './BillInput';
import BillTagList from './BillTagList';

interface BillAddForm {
    billTagId: number;
}

const BillAdd: React.FC = () => {
    const [billTags, setBillTags] = useState<GetBillTagsResp[]>([]);
    const [activeTab, setActiveTab] = useState(BillTypeEnum.BT_PAY);
    const [form, setForm] = useState<BillAddForm>({
        billTagId: -1,
    });

    useEffect(() => {
        (async () => {
            const { data } = await getBillTags();
            if (data) {
                setBillTags(data);
                setForm((value) => ({
                    ...value,
                    billTagId: data.find(({ billTypeCode }) => billTypeCode === BillTypeEnum.BT_PAY)?.id ?? 0,
                }));
            }
        })();
    }, []);

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
        <div className="flex flex-col" style={{ height: 'calc(100vh - 112px)' }}>
            <div className="flex-1">
                <header className="flex justify-center text-xl">
                    <section onClick={() => setActiveTab(BillTypeEnum.BT_PAY)} className={`mr-4 cursor-pointer ${activeTab === BillTypeEnum.BT_PAY ? 'font-bold' : ''}`}>
                        支出
                    </section>
                    <section onClick={() => setActiveTab(BillTypeEnum.BT_INCOME)} className={`ml-4 cursor-pointer ${activeTab === BillTypeEnum.BT_INCOME ? 'font-bold' : ''}`}>
                        收入
                    </section>
                </header>
                <div>
                    <div style={{ display: activeTab === BillTypeEnum.BT_PAY ? '' : 'none' }}>
                        <BillTagList list={billTags.filter((t) => t.billTypeCode === BillTypeEnum.BT_PAY)} value={form.billTagId} onChange={(tag) => setForm((v) => ({ ...v, billTagId: tag.id }))} />
                    </div>
                    <div style={{ display: activeTab === BillTypeEnum.BT_INCOME ? '' : 'none' }}>
                        <BillTagList
                            list={billTags.filter((t) => t.billTypeCode === BillTypeEnum.BT_INCOME)}
                            value={form.billTagId}
                            onChange={(tag) => setForm((v) => ({ ...v, billTagId: tag.id }))}
                        />
                    </div>
                </div>
                <form className="flex flex-col items-center">
                    <div>
                        {/* <p>
                <label>
                    标签：
                    <select {...register('billTagId', { required: true, valueAsNumber: true })}>{
                        billTags.map(t => <option value={t.id} key={t.id}>{t.name}</option>)
                    }</select>
                </label>
            </p> */}
                        {/* <p className="mt-2">
                        <label>
                            金额：
                            <input {...register('amount', { required: true, valueAsNumber: true })} className="border p-1" />
                        </label>
                    </p> */}
                        {/* <p className="mt-2">
                        <label>
                            备注：
                            <textarea {...register('remarks', { maxLength: 200 })} className="border p-1"></textarea>
                        </label>
                    </p> */}
                        {/* <p className="mt-4 text-center">
                        <button type="submit" className="px-4 py-2 bg-sky-400">提交</button>
                    </p> */}
                    </div>
                </form>
            </div>
            <BillInput onConfirm={handleConfirm} />
        </div>
    );
};

export default BillAdd;
