import dayjs from 'dayjs';
import LocaleZhCN from 'dayjs/locale/zh-cn';
dayjs.locale(LocaleZhCN);

export const calcAdd = (a: number, b: number) => {
    return parseFloat((a + b).toFixed(6));
};

export const calcStr = (str: string) => {
    if (!str) return 0;
    str = str.replace(/[^\d.+-]/g, '');
    return str
        .split(/(?=[-+])/)
        .map((x) => Number(x) || 0)
        .reduce(calcAdd, 0);
};

export const formatMoney = (val: number) => {
    const [int, float] = (val / 100).toFixed(2).split('.');
    return Number(int).toLocaleString('zh-CN') + '.' + float;
};

export const formatDate = (date: string | Date, format = 'YYYY-MM-DD') => {
    return dayjs(date).format(format);
};
