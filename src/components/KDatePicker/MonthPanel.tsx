import { useMemo } from "react";
import styled from 'styled-components';
import { generateMonthDates, generateWeeks } from "./helper";

export interface Props {
    defaultDate?: Date;
    weekFirstDay?: number;
    year?: number;
    month?: number;
    onChange?: (d: Date) => void;
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
`;

const WeekCell = styled(Cell) <{ isWeekend: boolean }>`
    color: ${p => p.isWeekend ? '#f57284' : ''};
`;

const DateCell = styled(Cell) <CellProps>`
    color: ${p => p.isSelected ? '#ffffff' : (p.monthDelta ? '#cecece' : '')};
    background-color: ${p => p.isSelected ? (!p.monthDelta ? '#f57284' : '#cecece') : ''};
    cursor: ${p => !p.monthDelta ? 'pointer' : 'not-allowed'};
`;

const MonthPanel: React.FC<Props> = (props) => {
    const date = props.defaultDate ? new Date(props.defaultDate) : new Date();
    const weekFirstDay = props.weekFirstDay ?? 0;
    const weeks = generateWeeks(weekFirstDay);
    const [year, month] = [props.year ?? date.getFullYear(), props.month ?? date.getMonth()];
    const dateTable = useMemo(() => {
        return generateMonthDates(year, month, weekFirstDay);
    }, [year, month, weekFirstDay]);

    const handleChange = (item: CellProps) => {
        if (item.date && !item.monthDelta && props.onChange) {
            props.onChange(item.date);
        }
    };

    return (
        <Wrapper>
            <Table>
                <thead>
                    <tr>{weeks.map(it => <th key={it.dayNum}>
                        <WeekCell isWeekend={it.isWeekEnd}>{it.text}</WeekCell></th>)
                    }</tr>
                </thead>
                <tbody>
                    {
                        dateTable.map((row, i) => <tr key={i}>{
                            row.map((d, j) => <td key={j}>
                                <DateCell {...d} isSelected={d.date.getTime() === date.getTime()}
                                    onClick={() => handleChange(d)}>{d.dateNum}</DateCell>
                            </td>)
                        }</tr>)
                    }
                </tbody>
            </Table>
        </Wrapper>
    )
}

export default MonthPanel;
