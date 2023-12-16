const processZeroPrefix = (value) => value < 10 ? '0' + value : value;

const formatDateTime = (value) => {
    const date = new Date(+value);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${processZeroPrefix(day)}.${processZeroPrefix(month)}.${year} ${processZeroPrefix(hours)}:${processZeroPrefix(minutes)}`
}

module.exports = formatDateTime;
