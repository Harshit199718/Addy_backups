import { ColumnMapping } from "../pages/skinconfig/MainTab/Layout/LayoutItemList";

export function addThousandSeparator(number) {
    let numberString = Number(number).toFixed(2).toString();

    const parts = numberString.split('.');

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return parts.join('.');
}

export const convertTtypeOption = (value) => {
    const selectedValues = value.map(value => value);
    const defaultTtype = selectedValues.join(',');
    return defaultTtype;
}

export const convertStateColor = (value) => {
    let color
    switch(value){
        case 'pending':
            color = 'rgb(234 179 8)'
        break;
        case 'approved':
            color = 'rgb(34 197 94)'
        break;
        case 'error':
            color = '#ff9999'
        break;
        case 'rejected':
            color = 'rgb(217 70 239)'
        break;
        case 'deleted':
            color = 'rgb(244 63 94)'
        break;
        default:
            color = 'rgb(234 179 8)'
    }

    return color;
}

export const convertTransactionDuration = (fromDate, toDate) => {
    const createdAt = new Date(fromDate).getTime();
    const updatedAt = new Date(toDate).getTime();

    const durationInMillis = updatedAt - createdAt;

    const minutes = Math.floor(durationInMillis / (1000 * 60));
    const seconds = Math.floor((durationInMillis % (1000 * 60)) / 1000);
    const formattedDuration = `${minutes} m ${seconds} s`;

    return formattedDuration;
}

export const convertFirstCharacter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
    ;
}

export const convertABSNumber = (number) => {
    return addThousandSeparator(Math.abs(number));
}

export const convertIDToArray = (string) => {
    if(string){
        return string.split(", ").map(Number);
    } else {
        return null
    }
}

export const removeUndefinedFields = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== undefined)
    );
};

export const converTabPanesTitle = (selectedMenu) => {
    const convertedTitle = selectedMenu?.split('/').filter((x) => x)
    .map((word) => word)
    .join('/');

    return convertedTitle?.length > 0 ? `menuoption.${convertedTitle}` : 'menuoption.dashboard'
};

export const reverseDNDLayout = (items, groupNumber, initialGroup) => {
    if(items){
        const arrayFromJson = items ? JSON.parse(items) : [];
        
        let reverseItems = Array.from({ length: groupNumber }, (_, index) => ({
            [`group${index + 1}`]: []
        })).reduce((acc, obj) => ({ ...acc, ...obj }), {});

        // Populate reverseItems with items from the arrayFromJson
        arrayFromJson.forEach(({ componentName, column }) => {
            const groupKey = `group${column}`;
            if (!reverseItems[groupKey]) {
                reverseItems[groupKey] = [];
            }
            reverseItems[groupKey].push(componentName);
        });

        // Append missing items from initialGroup to reverseItems
        initialGroup?.forEach(item => {
            if (!arrayFromJson.some(({ componentName }) => componentName === item)) {
                // Find the first non-full group to add the missing item
                for (let i = 1; i <= groupNumber; i++) {
                    const groupKey = `group${i}`;
                    reverseItems[groupKey].push(item);
                    break;
                }
            }
        });

        return reverseItems
    } else {
        return null
    }
}

export const convertDNDLayout = (items) => {
    const transformedItems = [];
    items &&
    Object.keys(items).forEach((columnName, columnIndex) => {
        items[columnName].forEach((componentName, order) => {
            transformedItems.push({
                componentName,
                column: ColumnMapping.find(item => item.key === columnName)?.column,
                order: order + 1,
            });
        });
    });
    return transformedItems
}

export const generateRandomPassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomPassword = '';
    for (let i = 0; i < 10; i++) {
        randomPassword += chars[Math.floor(Math.random() * chars.length)];
    }
    return randomPassword;
    };