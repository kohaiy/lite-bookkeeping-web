import { useState } from "react";
import styled from 'styled-components';
import MonthPanel, { Props as MonthPanelProps } from "./MonthPanel";

export interface Props extends MonthPanelProps {
    value?: Date;
    onChange?: (d: Date) => void;
}
const Wrapper = styled.div`
    position: relative;
    width: 280px;
    padding: 24px 12px;
    * {
        user-select: none;
    }
`;
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
`;
const HeaderButton = styled.div`
    display: flex;
    justify-content: center;
    cursor: pointer;
`;
const HeaderTitle = styled.div`
    display: flex;
    justify-content: center;
`;
const HeaderTitleButton = styled.div<{ isSelected: boolean }>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    color: ${p => p.isSelected ? '' : '#999999'};
    font-size: ${p => p.isSelected ? '1.05em' : ''};
    cursor: pointer;
    &::after {
        content: '';
        display: ${p => p.isSelected ? 'block' : 'none'};
        position: absolute;
        left: -2px;
        right: -2px;
        bottom: 0;
        height: 2px;
        background-color: #f57284;
    }
    & + & {
        margin-left: 12px;
    }
    
`;


const DatePopover: React.FC<Props> = (props) => {
    const [date, setDate] = useState(props.value ?? props.defaultDate ?? new Date());
    const [activeTab, setActiveTab] = useState<'year' | 'month'>('month');
    const [displayDate, setDisplayDate] = useState(new Date(date));

    const handleUpdateDate = (delta: number) => {
        const d = new Date(displayDate);
        if (activeTab === 'month')
            d.setMonth(d.getMonth() + delta);
        if (activeTab === 'year')
            d.setFullYear(d.getFullYear() + delta);

        setDisplayDate(d);
    }

    const handleChange = (d: Date) => {
        setDate(d);
        props.onChange?.(d);
    }
    return (
        <Wrapper>
            <Header>
                <HeaderButton onClick={() => handleUpdateDate(-1)}>{'<<'}</HeaderButton>
                <HeaderTitle>
                    <HeaderTitleButton isSelected={activeTab === 'year'}
                        onClick={() => setActiveTab('year')}>{displayDate.getFullYear()}年
                    </HeaderTitleButton>
                    <HeaderTitleButton isSelected={activeTab === 'month'}
                        onClick={() => setActiveTab('month')}>{displayDate.getMonth() + 1}月
                    </HeaderTitleButton>
                </HeaderTitle>
                <HeaderButton onClick={() => handleUpdateDate(1)}>{'>>'}</HeaderButton>
            </Header>
            <MonthPanel {...props}
                defaultDate={date}
                onChange={handleChange}
                year={displayDate.getFullYear()} month={displayDate.getMonth()} />
        </Wrapper>
    )
};

export default DatePopover;
