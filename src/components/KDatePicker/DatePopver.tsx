import { useState } from "react";
import styled from 'styled-components';
import MonthPanel, { Props as MonthPanelProps } from "./MonthPanel";

export interface Props extends MonthPanelProps {
    value?: Date;
}
const Wrapper = styled.div`
    width: 280px;
    padding: 2px;
    border-radius: 16px;
    background-color: #ffffff;
`;
const Box = styled.div`
    padding: 24px 12px;
    border: 2px solid #333333;
    border-radius: 16px;
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

    const handleUpdateDate = (delta: number) => {
        const d = new Date(date);
        if (activeTab === 'month')
            d.setMonth(d.getMonth() + delta);
        if (activeTab === 'year')
            d.setFullYear(d.getFullYear() + delta);

        setDate(d);
    }
    return (
        <Wrapper>
            <Box>
                <Header>
                    <HeaderButton onClick={() => handleUpdateDate(-1)}>{'<<'}</HeaderButton>
                    <HeaderTitle>
                        <HeaderTitleButton isSelected={activeTab === 'year'}
                            onClick={() => setActiveTab('year')}>{date.getFullYear()}年
                        </HeaderTitleButton>
                        <HeaderTitleButton isSelected={activeTab === 'month'}
                            onClick={() => setActiveTab('month')}>{date.getMonth() + 1}月
                        </HeaderTitleButton>
                    </HeaderTitle>
                    <HeaderButton onClick={() => handleUpdateDate(1)}>{'>>'}</HeaderButton>
                </Header>
                <MonthPanel {...props} defaultDate={date} />
            </Box>
        </Wrapper>
    )
};

export default DatePopover;
