import dayjs from 'dayjs';

const formatDate = date => {
    return dayjs(date).format('MM/DD/YYYY');
}

const formatter = new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
});

const formatCurrency = value => {
    return formatter.format(value);
}

export { formatDate, formatCurrency };