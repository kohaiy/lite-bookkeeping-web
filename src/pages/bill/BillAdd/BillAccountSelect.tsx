import { useEffect, useState } from "react";
import styled from "styled-components";
import { getBillAccounts } from "../../../apis/modules/bill-account";
import { GetBillAccountsRespDatum } from "../../../apis/modules/bill-account/get-bill-accounts";
import KPopover from "../../../components/KPopover"

interface Props {
    value?: number;
    onChange?: (v: number) => void;
}

const List = styled.ul`
    width: 200px;
    max-height: 400px;
    overflow: auto;
`;

const ListItem = styled.li<{ isSelected: boolean }>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    color: ${p => p.isSelected ? '#f57284' : ''};
    user-select: none;
    cursor: pointer;
    &::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 20px;
        right: 20px;
        height: 1px;
        background-color: #ccc;
    }
`;

const BillAccountSelect: React.FC<Props> = (props) => {
    const [billAccounts, setBillAccounts] = useState<GetBillAccountsRespDatum[]>([]);

    useEffect(() => {
        (async () => {
            const { data } = await getBillAccounts()
            if (data) {
                setBillAccounts(data.data);
            }
        })();
    }, []);

    const handleClick = (item: GetBillAccountsRespDatum) => {
        props.onChange?.(item.id);
    };

    return <KPopover content={<List>{
        billAccounts.map((it) => <ListItem key={it.id}
            isSelected={props.value === it.id}
            onClick={() => handleClick(it)}>{it.name}</ListItem>)
    }</List>} placement="right">
        <div className="flex justify-center items-center w-16 h-16 mr-4 rounded-full border-2 border-gray-800 bg-white cursor-pointer">
            <div className="relative w-8 h-8 rounded-md border border-gray-600 bg-gray-400">
                <div className="absolute right-0 top-2 w-4 h-3 border border-r-0 border-gray-600 rounded rounded-r-none bg-white">
                    <div className="relative -top-3 leading-2 select-none">.</div>
                </div>
            </div>
        </div>
    </KPopover>
}

export default BillAccountSelect;
