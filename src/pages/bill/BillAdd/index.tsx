import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { postBill } from "../../../apis/modules/bill";
import { getBillAccounts } from "../../../apis/modules/bill-account";
import { GetBillAccountsRespDatum } from "../../../apis/modules/bill-account/get-bill-accounts";
import getBillTags, { GetBillTagsRespDatum } from "../../../apis/modules/bill-tag/get-bill-tags";
import { toast } from "../../../components/KToast";
import { BillTypeEnum } from "../../../enums";
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
    const [billTagId, setBillTagId] = useState(-1);
    const { register, handleSubmit, setValue, reset } = useForm<BillAddForm>({
        defaultValues: {
            actionTime: new Date()
        }
    });

    useEffect(() => {
        (async () => {
            const { data } = await getBillAccounts()
            if (data) {
                setBillAccounts(data.data);
                setValue('billAccountId', data.data?.[0].id);
            }
        })();
        (async () => {
            const { data } = await getBillTags()
            if (data) {
                setBillTags(data.data);
                setBillTagId(data.data?.[0].id);
            }
        })();
    }, [setValue]);

    const handleConfirm: SubmitHandler<BillAddForm> = async (values) => {
        console.log(values);
        const { data } = await postBill({
            ...values,
            billTagId,
            amount: parseInt((values.amount * 100).toString()),
            actionTime: values.actionTime.toISOString(),
        });
        if (data) {
            toast({ content: '记下了' });
            reset();
        }
    };

    return (<>
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
                <BillTagList list={billTags.filter(t => t.billTypeCode === BillTypeEnum.BT_PAY)} value={billTagId} onChange={(tag) => setBillTagId(tag.id)} />
            </div>
            <div style={{ display: activeTab === BillTypeEnum.BT_INCOME ? '' : 'none' }}>
                <BillTagList list={billTags.filter(t => t.billTypeCode === BillTypeEnum.BT_INCOME)} value={billTagId} onChange={(tag) => setBillTagId(tag.id)} />
            </div>
        </div>
        <form onSubmit={handleSubmit(handleConfirm)} className="flex flex-col items-center">
            <div>
                <p>
                    <label>
                        钱包：
                        <select {...register('billAccountId', { required: true, valueAsNumber: true })} className="border p-1">{
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
                <p className="mt-2">
                    <label>
                        金额：
                        <input {...register('amount', { required: true, valueAsNumber: true })} className="border p-1" />
                    </label>
                </p>
                <p className="mt-2">
                    <label>
                        备注：
                        <textarea {...register('remarks', { maxLength: 200 })} className="border p-1"></textarea>
                    </label>
                </p>
                <p className="mt-4 text-center">
                    <button type="submit" className="px-4 py-2 bg-sky-400">提交</button>
                </p>
            </div>

        </form>
    </>);
};

export default BillAdd;
