const PercentListingField = ({ value }) => {

    return (
        <span>{Number(value).toFixed(2)}%</span>
    );
}

export default PercentListingField;
