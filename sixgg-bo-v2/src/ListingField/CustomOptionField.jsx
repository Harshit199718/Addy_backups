const CustomOptionField = ({ option, mappingText }) => {
    const mappedText = option.find(text => text.value === mappingText);

    return (
        <p>{mappedText ? mappedText.label : `Invalid Text: ${mappingText}`}</p>
    );
}

export function CustomOptionLabel(option, mappingText){
    const mappedText = option?.find(text => text.value === mappingText);

    return (
        mappedText ? mappedText.label : `Invalid Text: ${mappingText}`
    );
}


export default CustomOptionField;