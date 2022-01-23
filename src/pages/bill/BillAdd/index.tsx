import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { postBill } from "../../../apis/modules/bill";
import { getBillAccounts } from "../../../apis/modules/bill-account";
import { GetBillAccountsRespDatum } from "../../../apis/modules/bill-account/get-bill-accounts";
import getBillTags, { GetBillTagsRespDatum } from "../../../apis/modules/bill-tag/get-bill-tags";
import { toast } from "../../../components/KToast";

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
                setValue('billTagId', data.data?.[0].id);
            }
        })();
    }, [setValue]);

    const handleConfirm: SubmitHandler<BillAddForm> = async (values) => {
        console.log(values);
        const { data } = await postBill({
            ...values,
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
        <form onSubmit={handleSubmit(handleConfirm)}>
            <p>
                <label>
                    账户：
                    <select {...register('billAccountId', { required: true, valueAsNumber: true })}>{
                        billAccounts.map(a => <option value={a.id} key={a.id}>{a.name}</option>)
                    }</select>
                </label>
            </p>
            <p>
                <label>
                    标签：
                    <select {...register('billTagId', { required: true, valueAsNumber: true })}>{
                        billTags.map(t => <option value={t.id} key={t.id}>{t.name}</option>)
                    }</select>
                </label>
            </p>
            <p>
                <label>
                    金额：
                    <input {...register('amount', { required: true, valueAsNumber: true })} />
                </label>
            </p>
            <p>
                <label>
                    备注：
                    <textarea {...register('remarks', { maxLength: 200 })}></textarea>
                </label>
            </p>
            <p>
                <button type="submit">提交</button>
            </p>
        </form>
    </>);
};

export default BillAdd;
