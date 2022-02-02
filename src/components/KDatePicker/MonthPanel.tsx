import { useMemo } from "react";
import styled from 'styled-components';
import { generateMonthDates, generateWeeks } from "./helper";

export interface Props {
    defaultDate?: Date;
    weekFirstDay?: number;
};

type CellProps = Partial<ReturnType<typeof generateMonthDates>[0][0]> & {
    isSelected?: boolean;
};

const Wrapper = styled.div``;
const Table = styled.table`
    width: 100%;
`;
const Cell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: 32px;
    height: 28px;
    border-radius: 2px;
    font-size: 14px;
    color: ${(p: CellProps) => p.isSelected ? '#ffffff' : (p.monthDelta ? '#cecece' : '')};
    background-color: ${(p: CellProps) => p.isSelected ? '#f57284' : ''};
`;

const MonthPanel: React.FC<Props> = (props) => {
    const date = props.defaultDate ? new Date(props.defaultDate) : new Date();
    const weekFirstDay = props.weekFirstDay ?? 0;
    const weeks = generateWeeks(weekFirstDay);
    const [year, month] = [date.getFullYear(), date.getMonth()];
    const dateTable = useMemo(() => {
        return generateMonthDates(year, month, weekFirstDay);
    }, [year, month, weekFirstDay]);

    return (
        <Wrapper>
            <Table>
                <thead>
                    <tr>
                        {weeks.map(it => <th key={it.dayNum}><Cell>{it.text}</Cell></th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        dateTable.map((row, i) => <tr key={i}>{
                            row.map((d, j) => <td key={j}><Cell {...d} isSelected={d.date.getTime() - date.getTime() === 0}>{d.dateNum}</Cell></td>)
                        }</tr>)
                    }
                </tbody>
            </Table>
        </Wrapper>
    )
}

export default MonthPanel;
