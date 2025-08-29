export const getExpirationDate = (dateAdded, value, unit) => {
    if (value === null) {
        return new Date('9999-12-31');
    };
    
    const date = new Date(dateAdded);
    switch(unit) {
        case 'days': 
            date.setDate(date.getDate() + value);
            break;
        case 'weeks': 
            date.setDate(date.getDate() + value*7);
            break;
        case 'months': 
            date.setMonth(date.getMonth() + value); 
            break;
        case 'years': 
            date.setFullYear(date.getFullYear() + value); 
            break; 
    };

    return date;
};