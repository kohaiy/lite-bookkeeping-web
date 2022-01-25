import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { postBill } from "../../../apis/modules/bill";
import { getBillAccounts } from "../../../apis/modules/bill-account";
import { GetBillAccountsRespDatum } from "../../../apis/modules/bill-account/get-bill-accounts";
import getBillTags, { GetBillTagsRespDatum } from "../../../apis/modules/bill-tag/get-bill-tags";
import { toast } from "../../../components/KToast";
import { BillTypeEnum } from "../../../enums";
import BillInput, { BillInputProps } from "./BillInput";
import BillTagList from "./BillTagList";

interface BillAddForm {
    billAccountId: number;
    billTagId: number;
    amount: number;
    actionTime: Date;
    remarks?: string;
}

const BillAdd: React.FC = () => {
    const [billAccounts, setBillAccounts] = useState<GetBillAccountsRespDatum[]>([]);
    const [billTags, setBillTags] = useState<GetBillTagsRespDatum[]>([]);
    const [activeTab, setActiveTab] = useState(BillTypeEnum.BT_PAY);
    const [form, setForm] = useState<BillAddForm>({
        billAccountId: -1,
        billTagId: -1,
        amount: 0,
        actionTime: new Date()
    });

    useEffect(() => {
        (async () => {
            const { data } = await getBillAccounts()
            if (data) {
                setBillAccounts(data.data);
                setForm((value) => ({
                    ...value,
                    billAccountId: data.data?.[0].id,
                }));
            }
        })();
        (async () => {
            const { data } = await getBillTags()
            if (data) {
                setBillTags(data.data);
                setForm((value) => ({
                    ...value,
                    billTagId: data.data?.[0].id,
                }));
            }
        })();
    }, []);

    const handleConfirm: BillInputProps['onConfirm'] = async (values) => {
        console.log(values);
        const { data } = await postBill({
            ...form,
            ...values,
            amount: parseInt((values.amount * 100).toString()),
            actionTime: new Date().toISOString(),
        });
        if (data) {
            toast({ content: '记下了' });
        }
    };

    return (<div className="flex flex-col h-full">
        <div className="flex-1">
            <div>
                <Link to="/home" replace>返回</Link>
            </div>
            <header className="flex justify-center text-xl">
                <section onClick={() => setActiveTab(BillTypeEnum.BT_PAY)}
                    className={`mr-4 cursor-pointer ${activeTab === BillTypeEnum.BT_PAY ? 'font-bold' : ''}`}>支出</section>
                <section onClick={() => setActiveTab(BillTypeEnum.BT_INCOME)}
                    className={`ml-4 cursor-pointer ${activeTab === BillTypeEnum.BT_INCOME ? 'font-bold' : ''}`}>收入</section>
            </header>
            <div>
                <div style={{ display: activeTab === BillTypeEnum.BT_PAY ? '' : 'none' }}>
                    <BillTagList list={billTags.filter(t => t.billTypeCode === BillTypeEnum.BT_PAY)}
                        value={form.billTagId} onChange={(tag) => setForm((v) => ({ ...v, billTagId: tag.id }))} />
                </div>
                <div style={{ display: activeTab === BillTypeEnum.BT_INCOME ? '' : 'none' }}>
                    <BillTagList list={billTags.filter(t => t.billTypeCode === BillTypeEnum.BT_INCOME)}
                        value={form.billTagId} onChange={(tag) => setForm((v) => ({ ...v, billTagId: tag.id }))} />
                </div>
            </div>
            <form className="flex flex-col items-center">
                <div>
                    <p>
                        <label>
                            钱包：
                            <select value={form.billAccountId} onChange={(e) => {
                                setForm((value) => ({
                                    ...value,
                                    billAccountId: +e.target.value,
                                }));
                            }} className="border p-1" required>{
                                    billAccounts.map(a => <option value={a.id} key={a.id}>{a.name}</option>)
                                }</select>
                        </label>
                    </p>
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
    </div>);
};

export default BillAdd;
