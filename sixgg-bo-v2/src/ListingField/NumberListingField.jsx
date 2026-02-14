import { addThousandSeparator } from '../components/generalConversion';

const NumberListingField = ({ value }) => {

    return (
        <span style={{ color: value >= 0 ? 'green' : 'red' }}>{addThousandSeparator(value)}</span>
    );
}

export default NumberListingField;
