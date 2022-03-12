const fillNum = (num: number | string, n = 2) => {
    return '0'.repeat(n - `${num}`.length) + num;
};

export const generateMonthDates = (year: number, month: number, weekFirstDay = 0) => {
    const table = [];
    const date = new Date(year, month);
    const firstDay = date.getDay();
    const preFillDayTotal = (firstDay + 7 - weekFirstDay) % 7;
    let curRow = new Array(preFillDayTotal).fill(1).map((_, index) => {
        const d = new Date(year, month, index - preFillDayTotal + 1);
        return {
            dateNum: fillNum(d.getDate()),
            date: d,
            monthDelta: d.getMonth() - month,
        };
    });
    let curDate = new Date(date);
    do {
        const dateNum = curDate.getDate();
        curRow.push({
            dateNum: fillNum(dateNum),
            date: curDate,
            monthDelta: 0,
        });
        if (curRow.length >= 7) {
            table.push(curRow);
            curRow = [];
        }
        curDate = new Date(curDate);
        curDate.setDate(dateNum + 1);
    } while (curDate.getMonth() === month);
    if (curRow.length) {
        curRow.push(...new Array(7 - curRow.length).fill(1).map((_, index) => {
            const d = new Date(year, month + 1, index + 1);
            return {
                dateNum: fillNum(d.getDate()),
                date: d,
                monthDelta: d.getMonth() - month,
            };
        }));
        table.push(curRow);
    }
    console.log(table);

    return table;
}

export const generateWeeks = (firstDay = 0) => {
    return new Array(7).fill(1).map((_, index) => {
        const dayNum = (index + firstDay) % 7;
        return {
            dayNum,
            text: '日一二三四五六'[dayNum],
            isWeekEnd: [0, 6].includes(dayNum),
        };
    });
};