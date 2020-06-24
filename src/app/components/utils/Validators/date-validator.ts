export function IsDateExpired(date) {
    const correctFormat = (date).replace( /(\d{2})-(\d{2})-(\d{4})/, "$2-$1-$3");
    let currentDate = new Date();
    let deadLineDate = new Date(correctFormat);

    currentDate.setHours(0,0,0,0);

    if(deadLineDate < currentDate) {
        return true;
    }

    return false;
}

