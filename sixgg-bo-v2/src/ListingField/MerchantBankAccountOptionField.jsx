import NumberListingField from "./NumberListingField"

const MerchantBankAccountOptionField = ({item}) => {
    return(
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={item.icon} alt="bank icon" width="20" height="20" style={{ marginRight: 10 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.name} ({item.number}) - {item.sites_name} [<NumberListingField value={item.today_closing_balance}/>]
            </span>
        </div>
    )
}

export default MerchantBankAccountOptionField