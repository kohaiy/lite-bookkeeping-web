import { GetBillsResp } from '@/apis/modules/bill/get-bills';
import { BillTypeEnum } from '@/enums';
import { formatDate } from '@/helpers/data';

export const splitBillsByDate = (bills: GetBillsResp[]) => {
    const billsByDate = new Map<string, GetBillsResp[]>();
    bills.forEach((bill) => {
        const date = formatDate(bill.actionTime);
        if (!billsByDate.has(date)) {
            billsByDate.set(date, []);
        }
        billsByDate.get(date)?.push(bill);
    });
    return [...billsByDate.keys()].map((date) => {
        const bills = billsByDate.get(date)!;
        const overview = bills.reduce(
            (acc, bill) => {
                acc.total += bill.amount;
                acc.count += 1;
                if (bill.billTypeCode === BillTypeEnum.BT_INCOME) {
                    acc.income += bill.amount;
                } else if (bill.billTypeCode === BillTypeEnum.BT_EXPENSE) {
                    acc.expense += bill.amount;
                }
                return acc;
            },
            { total: 0, count: 0, income: 0, expense: 0 }
        );
        return {
            date,
            bills,
            overview,
        };
    });
};

export type BillByDateItem = ReturnType<typeof splitBillsByDate>[number];
