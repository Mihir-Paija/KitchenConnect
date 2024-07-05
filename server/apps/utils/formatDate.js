export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
};

// const currentDate = new Date()
// console.log(currentDate);
// console.log(formatDate(currentDate))
// console.log('Setting Hours')
// currentDate.setUTCHours(0,0,0,0)
// console.log(currentDate);
// console.log(formatDate(currentDate))