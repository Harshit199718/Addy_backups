export const addThousandSeparator = (number, country, decimal=2, digitHide=0) => {
    if (isNaN(Number(number))) {
        return null;
    }

    let seperator
    switch(country){
        case 'VN':
            seperator = '.'
            decimal = 0
            digitHide = -3
        break;
        case 'VN_Jackpot':
            seperator = '.'
            decimal = 2
        break;
        default:
            seperator = ','
    }
    const sign = Number(number) < 0 ? '-' : '';
    number = Math.abs(Number(number));
    let numberString = Number(number).toFixed(decimal).toString();
    
    const parts = numberString.split('.');

    if (digitHide < 0) {
        if(Number(parts[0]) >= Math.pow(10, Math.abs(digitHide))){
            parts[0] = parts[0].slice(0, digitHide).replace(/\B(?=(\d{3})+(?!\d))/g, seperator);
        } else {
            parts[0] = 0
        }
    } else {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, seperator);
    }
    
    return sign + parts.join('.');
}

export const convertNumberToCurrency = (number, country, handleChange, multiplied=1) => {
    if (isNaN(Number(number))) {
        return null;
    }

    let seperator
    switch(country){
        case 'VN':
            seperator = '.'
            multiplied = 1000
        break;
        default:
            seperator = ','
    }

    let inputValue = Number(number.replace(seperator, '')) * multiplied;
    handleChange({
        target: { name: "amount", value: inputValue }
    });
}